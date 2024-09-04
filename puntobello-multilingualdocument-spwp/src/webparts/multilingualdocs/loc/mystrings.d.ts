declare interface IMultilingualDocsWebPartStrings {
  PropertyPaneDescription: string;
  panelDescription: string;
  CardsLayout: string;
  ListLayout: string;
  docHasNoTitleProps: string;
  docHasNoLanguageCode: string;
  truncateLocale: string;
  upperCaseLocale: string;
  // Properties
  filePickerTitle: string;
  filePickerButtonLabel: string;
  docTitleField: string;
  docLanguageField: string;
  orderingLabel: string;
  docUrlField: string;
  DataLabel: string;
  PanelHeader: string;
  ManageBtn: string;
  CollectionPanelHeader: string;
  NoCardsConfigured: string;
  ConfigureCardsButtonLabel: string;
  errorDocNotFound: string;

  // Doccard fields
  titleField: string;
  LanguageList: string;

  // docList
  docListMoreOptions: string;
  docListFileType: string;
  docListName: string;
  docListPublished: string;
  docListLanguages: string;
  DocListLabel: string;
  DocListHeaderLabel: string;
}

declare module 'MultilingualDocsWebPartStrings' {
  const strings: IMultilingualDocsWebPartStrings;
  export = strings;
}
