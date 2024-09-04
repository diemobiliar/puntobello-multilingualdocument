// React core imports for component creation and rendering
import * as React from 'react';
import * as ReactDom from 'react-dom';

// SharePoint Framework (SPFx) core imports for web part development
import { Version } from '@microsoft/sp-core-library';
import { 
  IPropertyPaneConfiguration, 
  PropertyPaneChoiceGroup, 
  PropertyPaneTextField, 
  PropertyPaneToggle 
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart, IWebPartPropertiesMetadata } from '@microsoft/sp-webpart-base';

// SPFx Property Controls for enhancing the Property Pane functionality
import { PropertyFieldCollectionData, CustomCollectionFieldType } from '@pnp/spfx-property-controls/lib/PropertyFieldCollectionData';
import { PropertyFieldOrder } from '@pnp/spfx-property-controls/lib/PropertyFieldOrder';
import { FilePicker, IFilePickerResult } from '@pnp/spfx-controls-react/lib/FilePicker';

// Fluent UI and theming imports for UI components and theming support
import { 
  ThemeProvider, 
  ThemeChangedEventArgs, 
  IReadonlyTheme 
} from '@microsoft/sp-component-base';

// Utility and Logger imports for logging and shared functionalities
import { Logger, Utility } from './utils';

// Service and model imports for SharePoint data handling and types
import SharePointService, { ISharePointService } from './services/SharePointService';
import { ILanguageRepresentation, IMultilingualDocsWP } from './models';

// Context and component imports for managing and rendering the main application
import MultilingualDocs from './components/MultilingualDocs';
import { AppContext, AppContextProvider } from './contexts/AppContext';

// Specific component imports for custom UI components
import { orderedItem } from './components/fieldOrderItem/orderedItem';

/**
 * This class defines the MultilingualDocsWebPart, a SharePoint web part that handles multilingual document display
 * with configurable properties through the property pane. It leverages Fluent UI and the SPFx framework.
 */
export default class MultilingualDocsWebPart extends BaseClientSideWebPart<IMultilingualDocsWP> {
  
  // Fields for holding various internal states and services
  private customCollectionFieldType; // Holds the custom collection field type used in property pane
  private _themeProvider: ThemeProvider; // Theme provider for handling theme changes
  private _themeVariant: IReadonlyTheme | undefined; // Holds the current theme variant
  private pageLanguage: ILanguageRepresentation; // Stores the current page language
  private logger: Logger; // Logger instance for logging information and errors
  private initialized = false; // Flag to track whether the web part has been initialized
  private spo: ISharePointService; // SharePoint service for interacting with SharePoint data

  /**
   * Specifies that the indexableContent property is searchable as plain text.
   * This property is set in the onAfterDeserialize method with the document title so that the documents can be indexed and searched on the page.
   */
  protected get propertiesMetadata(): IWebPartPropertiesMetadata {
    return {
      'indexableContent': { isSearchablePlainText: true } // Indicates that the indexableContent property is searchable as plain text
    };
  }

  protected async onInit(): Promise<void> {
    this.logger = Logger.getInstance();
    this.logger.setContextInfo(this.context.manifest.alias + " with id " + this.context.manifest.id);
    this.logger.info('Logger initialized');

    try {
      this._themeProvider = this.context.serviceScope.consume(ThemeProvider.serviceKey);
      this._themeVariant = this._themeProvider.tryGetTheme();
      this._themeProvider.themeChangedEvent.add(this, this._handleThemeChangedEvent);

      const listId = this.context.pageContext.list.id.toString();
      const listItemId = this.context.pageContext.listItem.id;
      const language = this.context.pageContext.web.language;

      await super.onInit();
      this.spo = this.context.serviceScope.consume(SharePointService.serviceKey);
      this.pageLanguage = await this.spo.calculateLanguage(listId, listItemId, language);
      this.initialized = true;
    } catch (error) {
      this.logger.error("Error in onInit Webpart: ", error);
    }
  }

  public render(): void {
    if (this.initialized) {
      const appContext = new AppContext(
        this.context,
        this.logger,
        this.pageLanguage,
        this.properties.title,
        this.properties.cardLayout,
        this.properties.collectionData,
        this.displayMode,
        this.properties.truncateLocale,
        this.properties.upperCaseLocale
      );
      const element: React.ReactElement = React.createElement(
        AppContextProvider,
        { appContext },
        React.createElement(MultilingualDocs, {
          fUpdateProperty: (value: string) => {
            this.properties.title = value;
            this.render();
          },
          fPropertyPaneOpen: this.context.propertyPane.open,
        })
      );
      ReactDom.render(element, this.domElement);
    }
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  private _handleThemeChangedEvent(args: ThemeChangedEventArgs): void {
    this._themeVariant = args.theme;
    this.render();
  }

  /**
   * Loads the resources required for the property pane.
   * @returns {Promise<void>} A promise that resolves when the property pane resources are loaded.
   */
  protected async loadPropertyPaneResources(): Promise<void> {
    this.customCollectionFieldType = CustomCollectionFieldType;
  }

  /**
   * Called after deserialization of the web part properties.
   * Updates the indexable content based on the collection data.
   * @param {any} deserializedObject - The deserialized web part object.
   * @param {Version} dataVersion - The version of the data.
   * @returns {IMultilingualDocsWP} The updated web part properties.
   */
  protected onAfterDeserialize(deserializedObject: any, dataVersion: Version): IMultilingualDocsWP {
    let indexableString = '';
    if (deserializedObject.collectionData) {
      deserializedObject.collectionData.forEach(obj => {
        // Add the document title to the indexable content
        // if other properties are needed, update here
        indexableString += obj.doctitle + '; ';
      });
      deserializedObject.indexableContent = indexableString;
    }
    return super.onAfterDeserialize(deserializedObject, dataVersion);
  }

  /**
   * Configures the property pane for this web part, including layout options, locale settings, and document collection management.
   * @returns {IPropertyPaneConfiguration} The configuration of the property pane.
   */
  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    const { cardLayout } = this.properties;

    // Show the upperCaseLocale toggle only if the truncateLocale toggle is enabled
    let templatePropertyUpperCaseLanguage: any;
    if (this.properties.truncateLocale) {
      templatePropertyUpperCaseLanguage =
        PropertyPaneToggle('upperCaseLocale', {
          label: Utility.getStringTranslation4Locale('upperCaseLocale', this.pageLanguage.Language),
        });
    } else {
      templatePropertyUpperCaseLanguage = "";
    }

    return {
      pages: [
        {
          header: {
            description: Utility.getStringTranslation4Locale('PropertyPaneDescription', this.pageLanguage.Language)
          },
          groups: [
            {
              groupFields: [
                // Choose the layout type for the document between Cards and List
                PropertyPaneChoiceGroup("cardLayout", {
                  label: Utility.getStringTranslation4Locale('LayoutType', this.pageLanguage.Language),
                  options: [
                    {
                      key: "Cards",
                      text: Utility.getStringTranslation4Locale('CardsLayout', this.pageLanguage.Language),
                      iconProps: { officeFabricIconFontName: "Tiles" },
                      checked: cardLayout === "Tiles" ? true : false
                    },
                    {
                      key: "List",
                      text: Utility.getStringTranslation4Locale('ListLayout', this.pageLanguage.Language),
                      iconProps: { officeFabricIconFontName: "List" },
                      checked: cardLayout === "List" ? true : false
                    },
                  ]
                }),
                // Toggle to enable/disable the truncation of the locale
                // eg. en-US -> en
                PropertyPaneToggle('truncateLocale', {
                  label: Utility.getStringTranslation4Locale('truncateLocale', this.pageLanguage.Language),
                }),
                // Inject template for upperCaseLocale toggle
                // if present, en -> EN
                templatePropertyUpperCaseLanguage,
                // collection which contains all the selected file to be shown in the document card/list
                PropertyFieldCollectionData("collectionData", {
                  key: "collectionData",
                  label: Utility.getStringTranslation4Locale('DataLabel', this.pageLanguage.Language),
                  panelHeader: Utility.getStringTranslation4Locale('PanelHeader', this.pageLanguage.Language),
                  panelDescription: Utility.getStringTranslation4Locale('panelDescription', this.pageLanguage.Language),
                  manageBtnLabel: Utility.getStringTranslation4Locale('ManageBtn', this.pageLanguage.Language),
                  value: this.properties.collectionData,
                  disabled: false,
                  enableSorting: true,
                  fields: [
                    {
                      id: "filePicker",
                      title: Utility.getStringTranslation4Locale('filePickerTitle', this.pageLanguage.Language),
                      type: CustomCollectionFieldType.custom,
                      onCustomRender: (field, value, onUpdate, item, itemId, onError) => {
                        return (
                          React.createElement(FilePicker, {
                            key: itemId,
                            context: this.context as any,
                            buttonLabel: Utility.getStringTranslation4Locale('filePickerButtonLabel', this.pageLanguage.Language),
                            buttonIcon: 'FileImage',
                            hideRecentTab: true,
                            hideWebSearchTab: true,
                            hideLocalUploadTab: true,
                            hideLinkUploadTab: true,
                            onChange: (selectedFile: IFilePickerResult[]) => {
                              onUpdate(field.id, selectedFile[0]);
                            },
                            // Get the current file and populate the document title, language code, and URL
                            onSave: (filePickerResult: IFilePickerResult[]) => {
                              this.spo.getItemFromFileUrl(filePickerResult[0].fileAbsoluteUrl).then(i => {
                                if (i['Title'] != null) {
                                  onUpdate('doctitle', i['Title']);
                                } else {
                                  onUpdate('doctitle', Utility.getStringTranslation4Locale('docHasNoTitleProps', this.pageLanguage.Language));
                                }
                                if (i['pb_LangCd'] != null) {
                                  onUpdate('doclangcd', i['pb_LangCd']);
                                } else {
                                  onUpdate('doclangcd', Utility.getStringTranslation4Locale('docHasNoLanguageCode', this.pageLanguage.Language));
                                }
                                onUpdate('docurl', filePickerResult[0].fileAbsoluteUrl);
                                onUpdate('docurlhidden', filePickerResult[0].fileAbsoluteUrl);
                              });
                            }
                          }));
                      }
                    },
                    {
                      // Hidden field to store the URL of the document
                      // Depending if the URL is a SharePoint URL or a direct link
                      // we populate the document title and language code and the hidden URL
                      // These fields will then be used to display the documents / gather info from the file in the web part
                      id: "docurl",
                      title: Utility.getStringTranslation4Locale('docUrlField', this.pageLanguage.Language),
                      type: CustomCollectionFieldType.string,
                      deferredValidationTime: 420,
                      onGetErrorMessage: async (value: string, index: number, item: any) => {
                        let retMsg = '';
                        let currentSCNameFromFile = '';
                        // Retrieve the document
                        if (value.indexOf('https://') == 0) {
                          const siteUrl = this.context.pageContext.site.absoluteUrl;
                          const siteTenantName = siteUrl.substring(0, siteUrl.lastIndexOf('/'));
                          //eslint-disable-next-line
                          const spIsLink = RegExp('\/:[a-z]:\/[a-z]\/');
                          const spIsLinkPosition: number = value.search(spIsLink);
                          if (spIsLinkPosition > 0) {
                            // We have a short sp url, check if we find the pattern /sites/
                            //eslint-disable-next-line
                            if (value.indexOf('\/sites\/') > 0) {
                              //eslint-disable-next-line
                              const scShort = value.substring(value.indexOf('\/sites\/') + 7, value.length);
                              currentSCNameFromFile = scShort.substring(0, scShort.indexOf('/'));
                            } else {
                              const scShort = value.substring(spIsLinkPosition + 7, value.length);
                              currentSCNameFromFile = scShort.substring(0, scShort.indexOf('/'));
                            }
                          } else {
                            // We don't have a short url
                            //eslint-disable-next-line
                            const scShort = value.substring(value.indexOf('\/sites\/') + 7, value.length);
                            currentSCNameFromFile = scShort.substring(0, scShort.indexOf('/'));
                          }
                          const currWebUrl = siteTenantName + '/' + currentSCNameFromFile;
                          item.docweburl = currWebUrl;
                          this.spo.checkFileExistsForWeb(currWebUrl, value).then(async spfileexists => {
                            if (spfileexists) {
                              this.spo.getItemFromWebFromFileUrl(currWebUrl, value).then(i => {
                                if (i['Title'] != null) {
                                  item.doctitle = i['Title'];
                                } else {
                                  item.doctitle = Utility.getStringTranslation4Locale('docHasNoTitleProps', this.pageLanguage.Language);
                                }
                                if (i['pb_LangCd'] != null) {
                                  item.doclangcd = i['pb_LangCd'];
                                } else {
                                  item.doclangcd = Utility.getStringTranslation4Locale('docHasNoLanguageCode', this.pageLanguage.Language);
                                }
                              });
                              this.spo.getFromWebExpandedFileItem(currWebUrl, value).then(f => {
                                const currDocUrl: string = f.File.ServerRelativeUrl;
                                item.docurlhidden = currDocUrl;
                              });
                            } else {
                              retMsg = Utility.getStringTranslation4Locale('errorDocNotFound', this.pageLanguage.Language);
                              item.doctitle = '';
                              item.docurlhidden = '';
                              item.doclangcd = '';
                            }
                          });
                        }
                        return retMsg;
                      },
                      required: true,
                      disableEdit: false
                    },
                    {
                      id: "doctitle",
                      title: Utility.getStringTranslation4Locale('docTitleField', this.pageLanguage.Language),
                      type: CustomCollectionFieldType.custom,
                      onCustomRender: (field, value, onUpdate, item, itemId) => {
                        return (
                          React.createElement("div", { key: itemId }, value)
                        );
                      },
                      required: false,
                      disableEdit: false
                    },
                    {
                      id: "doclangcd",
                      title: Utility.getStringTranslation4Locale('docLanguageField', this.pageLanguage.Language),
                      type: CustomCollectionFieldType.custom,
                      onCustomRender: (field, value, onUpdate, item, itemId) => {
                        return (
                          React.createElement("div", { key: itemId }, value)
                        );
                      },
                      required: false,
                      disableEdit: false
                    },
                    {
                      id: "docweburl",
                      title: "",
                      type: CustomCollectionFieldType.custom,
                      onCustomRender: (field, value, onUpdate, item, itemId) => {
                        return (
                          React.createElement("div")
                        );
                      },
                      required: false,
                      disableEdit: true
                    },
                    {
                      id: "docurlhidden",
                      title: "",
                      type: CustomCollectionFieldType.custom,
                      onCustomRender: (field, value, onUpdate, item, itemId) => {
                        return (
                          React.createElement("div")
                        );
                      },
                      required: false,
                      disableEdit: true
                    }]
                }),
                // Copntrol to reorder the documents in the collection
                PropertyFieldOrder("orderedItems", {
                  key: "orderedItems",
                  label: Utility.getStringTranslation4Locale('orderingLabel', this.pageLanguage.Language),
                  items: this.properties.collectionData,
                  onRenderItem: orderedItem,
                  properties: this.properties,
                  onPropertyChange: (path: string, oldVal: any, newVal: any) => {
                    this.properties.collectionData = [...newVal];
                  }
                }),
                // Field with the indexable content for search
                // The field is not protected and is always visible
                PropertyPaneTextField("indexableContent", {
                }),
              ]
            }
          ]
        }
      ]
    };
  }
}

