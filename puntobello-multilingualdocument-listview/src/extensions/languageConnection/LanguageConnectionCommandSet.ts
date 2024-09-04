// React and ReactDOM imports
import * as React from 'react';
import * as ReactDom from 'react-dom';

// SPFx specific imports
import { override } from '@microsoft/decorators';
import { Guid } from '@microsoft/sp-core-library';
import {
  BaseListViewCommandSet,
  Command,
  IListViewCommandSetListViewUpdatedParameters,
  IListViewCommandSetExecuteEventParameters,
  RowAccessor
} from '@microsoft/sp-listview-extensibility';

// Fluent UI imports for UI-related utilities
import { assign } from "@fluentui/react";

// PnPJS imports for SharePoint operations
import { getSP } from '../../pnpjs-config';
import { SPFI } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";

// Custom component imports
import ConfirmationDialog from "./components/ConfirmationDialog";

// Utility imports
import { Logger, Utility } from './utils';

// Model imports
import { IConfirmationDialog } from './models';

/**
 * LanguageConnectionCommandSet class extends BaseListViewCommandSet.
 * It handles the logic for creating and deleting language connections for documents in a SharePoint library.
 */
export default class LanguageConnectionCommandSet extends BaseListViewCommandSet<{ never }> {
  private dialogPlaceHolder: HTMLDivElement = null; // Placeholder for the React dialog component
  private _sp: SPFI = null; // SharePoint Framework interface instance
  private logger: Logger; // Logger instance for logging information and errors

  /**
   * Initializes the command set, setting up the logger, PnPJS instance, 
   * and creating the dialog placeholder element.
   */
  @override
  public onInit(): Promise<void> {
    this.logger = Logger.getInstance();
    this.logger.setContextInfo(this.context.manifest.alias + " with id " + this.context.manifest.id);
    this.logger.info('Logger initialized');

    // PnP initialization
    this._sp = getSP(this.context);

    // Initialize commands with localized titles
    const createCommand = this.tryGetCommand('COMMAND_CONN_DELETE');
    if (createCommand) {
      createCommand.title = Utility.getStringTranslation4Locale('CommandDelName', this.context.pageContext.cultureInfo.currentUICultureName);
    }
    const deleteCommand = this.tryGetCommand('COMMAND_CONN_CREATE');
    if (deleteCommand) {
      deleteCommand.title = Utility.getStringTranslation4Locale('CommandCreateName', this.context.pageContext.cultureInfo.currentUICultureName);
    }

    // Create the container for our React component
    this.dialogPlaceHolder = document.body.appendChild(document.createElement("div"));
    return Promise.resolve();
  }

  /**
   * Handles the logic for updating the visibility of commands 
   * based on the current selection in the list view.
   */
  @override
  public onListViewUpdated(event: IListViewCommandSetListViewUpdatedParameters): void {
    const compareConnDeleteCommand: Command = this.tryGetCommand('COMMAND_CONN_DELETE');
    const compareConnCreateCommand: Command = this.tryGetCommand('COMMAND_CONN_CREATE');

    // If no rows are selected, hide the commands
    if (event.selectedRows.length === 0) {
      compareConnCreateCommand.visible = false;
      compareConnDeleteCommand.visible = false;
      return;
    }

    try {
      const checkField1 = event.selectedRows[0].getValueByName('pb_LangConn');
      const checkField2 = event.selectedRows[0].getValueByName('pb_LangCd');
      if (checkField1.length > 0 && checkField2.length > 0) {
        const fakeTest = 1;
      }
    } catch (err) {
      this.logger.error('Commands not activated because pb_LangConn and/or pb_LangCd do not exist in this document library', err);
      compareConnCreateCommand.visible = false;
      compareConnDeleteCommand.visible = false;
      return;
    }

    // Show delete command when one row is selected and we have a language connection set for this row
    if (compareConnDeleteCommand) {
      compareConnDeleteCommand.visible = event.selectedRows.length === 1 && event.selectedRows[0].getValueByName('pb_LangConn').length > 0;
    }

    // Show create command when:
    // - We have a mix between one document with language connection and some documents without language connection
    // - But never more than one document in a specific language
    let condition = true;
    if (compareConnCreateCommand && event.selectedRows.length > 1) {
      const groupedConn: any = {};
      const groupedLang: any = {};

      event.selectedRows.forEach((arrayItem) => {
        const currLangConn = arrayItem.getValueByName('pb_LangConn');
        const currLang = arrayItem.getValueByName('pb_LangCd');
        let keyFoundConn = false;
        let keyFoundLang = false;

        // Group all the language connection entries
        for (const key1 in groupedConn) {
          if (key1 === currLangConn) {
            keyFoundConn = true;
            groupedConn[key1] += 1;
          }
        }
        // Group all the language entries
        for (const key2 in groupedLang) {
          if (key2 === currLang) {
            keyFoundLang = true;
            groupedLang[key2] += 1;
          }
        }
        // Create the keys if we have no match
        if (!keyFoundConn) {
          groupedConn[currLangConn] = 1;
        }
        if (!keyFoundLang) {
          groupedLang[currLang] = 1;
        }
      });

      // Condition checks for language connections and languages
      let numberOfGuids = 0;
      let emptyGuid = false;
      if (Object.keys(groupedConn).length > 2) {
        condition = false;
      } else {
        for (const key3 in groupedConn) {
          if (key3.length > 0) {
            numberOfGuids++;
          } else {
            emptyGuid = true;
          }
        }
        if (numberOfGuids > 1) condition = false;
        if (!emptyGuid) condition = false;
      }

      // Count the number of entries per language, which should never be more than one
      if (condition) {
        for (const key in groupedLang) {
          if (parseInt(groupedLang[key]) > 1) {
            condition = false;
            break;
          }
        }
      }
    }
    compareConnCreateCommand.visible = event.selectedRows.length > 1 && condition;
  }

  /**
   * Handles the execution of commands when they are triggered from the command set.
   */
  @override
  public async onExecute(event: IListViewCommandSetExecuteEventParameters): Promise<void> {
    let updateRC = 0;
    const selectedItem = event.selectedRows[0];

    try {
      const checkField1 = selectedItem.getValueByName('pb_LangConn');
      const checkField2 = selectedItem.getValueByName('pb_LangCd');
      if (checkField1.length > 0 && checkField2.length > 0) {
        const fakeTest = 1;
      }
    } catch (error) {
      this.logger.error('Command not executed because pb_LangConn and/or pb_LangCd do not exist in this document library', error);
      return;
    }
    
    const list = this._sp.web.lists.getById(this.context.pageContext.list.id.toString());

    switch (event.itemId) {
      case 'COMMAND_CONN_DELETE':
        // Remove the GUID on the field and show the dialog
        await Promise.all(event.selectedRows.map(async (arrayItem) => {
          if (updateRC == 0) updateRC = await this.updateDocGuid('DELETE', list, arrayItem.getValueByName('ID'), '', arrayItem.getValueByName('pb_LangConn'));
        }));
        this.displayDialog(updateRC === 423 ? 'lock' : 'delete');
        break;

      case 'COMMAND_CONN_CREATE': {
        let guidKey = false;
        let guidFound = null;
        const fileTypes = new Set();
        let multipleFileTypes = false;

        event.selectedRows.forEach((arrayItem) => {
          // Search for a GUID key
          if (arrayItem.getValueByName('pb_LangConn').length > 0) {
            guidFound = arrayItem.getValueByName('pb_LangConn');
            guidKey = true;
          }
          // Track file types
          const fileType = arrayItem.getValueByName('File_x0020_Type');
          fileTypes.add(fileType);
          // Check if there is more than one file type
          if (fileTypes.size > 1) {
            multipleFileTypes = true;
          }
        });

        // If we have multiple file types, show an error message in the dialog and stop processing
        if (multipleFileTypes) {
          this.displayDialog('multipleFileTypes');
          return;
        }

        // No GUID key found, we will create a new one
        if (guidFound === null) {
          guidFound = Guid.newGuid().toString();
        }

        // If we have a GUID key, perform additional checks
        // - Check if we already have a connection for this language and one of the selected items
        //   If yes, show an error message in the dialog
        const hasExistingConnection = await this.checkExistingConnections(event.selectedRows, guidFound, list);
        if (hasExistingConnection) {
          this.displayDialog('existingConnection');
          return;
        }

        // Update all the list items
        await Promise.all(event.selectedRows.map(async (arrayItem) => {
          if (updateRC == 0) updateRC = await this.updateDocGuid('CREATE', list, arrayItem.getValueByName('ID'), guidFound, guidFound);
        }));
        this.displayDialog(updateRC === 423 ? 'lock' : 'create');
        break;
      }
      default:
        throw new Error('Unknown command');
    }
  }

  /**
   * Checks if any of the selected items already have a connection for the given language.
   * @param selectedRows - The rows selected in the list view.
   * @param langConn - The language connection GUID.
   * @param list - The SharePoint list instance.
   * @returns A boolean indicating whether an existing connection is found.
   */
  private async checkExistingConnections(selectedRows: readonly RowAccessor[], langConn: string, list: any): Promise<boolean> {
    for (const arrayItem of selectedRows) {
      const languageCode = arrayItem.getValueByName('pb_LangCd');
      const id = arrayItem.getValueByName('ID');
      const items = await list.items.filter(`pb_LangCd eq '${languageCode}' and pb_LangConn eq '${langConn}' and ID ne '${id}'`)();

      // Check if any of the items have a connection for the selected language
      if (items.some(item => item.pb_LangConn)) {
        return true; // Connection already exists for this language
      }
    }
    return false; // No existing connection found
  }

  /**
   * Displays a dialog based on the type of action performed (e.g., lock, delete, create).
   * @param type - The type of dialog to display.
   */
  private displayDialog(type: 'lock' | 'delete' | 'create' | 'multipleFileTypes' | 'existingConnection'): void {
    let titleKey: string;
    let messageKey: string;

    switch (type) {
      case 'lock':
        titleKey = 'CommandLockDialogTitle';
        messageKey = 'CommandLock';
        break;
      case 'delete':
        titleKey = 'CommandDelDialogTitle';
        messageKey = 'CommandDel';
        break;
      case 'create':
        titleKey = 'CommandCreateDialogTitle';
        messageKey = 'CommandCreate';
        break;
      case 'multipleFileTypes':
        titleKey = 'MultipleFileTypesDialogTitle';
        messageKey = 'MultipleFileTypes';
        break;
      case 'existingConnection':
        titleKey = 'ExistingConnectionDialogTitle';
        messageKey = 'ExistingConnection';
        break;
      default:
        throw new Error('Unknown dialog type');
    }

    this.showDialog(
      Utility.getStringTranslation4Locale(titleKey, this.context.pageContext.cultureInfo.currentUICultureName),
      Utility.getStringTranslation4Locale(messageKey, this.context.pageContext.cultureInfo.currentUICultureName),
      Utility.getStringTranslation4Locale('OkBtnLabel', this.context.pageContext.cultureInfo.currentUICultureName)
    );
  }

  /**
   * Helper function to show the dialog by rendering the ConfirmationDialog component.
   * @param Title - The title of the dialog.
   * @param Message - The message of the dialog.
   * @param OkBtnLabel - The label for the OK button.
   */
  private showDialog(Title: string, Message: string, OkBtnLabel: string) {
    this.renderDialogComponent({
      isOpen: true,
      Title,
      Message,
      OkBtnLabel,
      onClose: this.dismissDialog
    });
  }

  /**
   * Dismisses the currently open dialog and refreshes the page.
   */
  private dismissDialog = () => {
    this.renderDialogComponent({ isOpen: false });
    location.reload();
  }

  /**
   * Renders the dialog component into the placeholder element.
   * @param props - The properties for the ConfirmationDialog component.
   */
  private renderDialogComponent(props: any) {
    const element: React.ReactElement<IConfirmationDialog> = React.createElement(ConfirmationDialog, assign({
      onClose: null,
      currentTitle: "",
      currentMessage: "",
      isOpen: false,
    }, props));
    ReactDom.render(element, this.dialogPlaceHolder);
  }

  /**
   * Updates the document GUID (language connection) for a given item in the list.
   * @param updateType - The type of update (CREATE or DELETE).
   * @param list - The SharePoint list instance.
   * @param id - The ID of the item to update.
   * @param updGuid - The updated GUID to set.
   * @param originalGuid - The original GUID before the update.
   * @returns A promise resolving to a status code indicating success or failure.
   */
  private async updateDocGuid(updateType: string, list: any, id: number, updGuid: string, originalGuid: string): Promise<number> {
    let retVal = 0;
    await list.items.getById(id).update({
      pb_LangConn: updGuid
    }).then(async () => {
      if (updateType == 'DELETE') {
        // Check if we have only one last item with the original guid, if yes => remove the connection
        const filterQueryLangConn = "pb_LangConn eq '" + originalGuid + "'";
        await list.items.filter(filterQueryLangConn)().then(async (items) => {
          if (items.length == 1) {
            await list.items.getById(items[0].Id).update({
              pb_LangConn: ''
            }).catch((errorMsg) => {
              const errMsgString = JSON.stringify(errorMsg);
              if (errMsgString.indexOf('423') > 0) {
                retVal = 423;
              }
            });
          }
        });
      }
    }).catch((errorMsg) => {
      const errMsgString = JSON.stringify(errorMsg);
      if (errMsgString.indexOf('423') > 0) {
        retVal = 423;
      }
    });
    return retVal;
  }
}
