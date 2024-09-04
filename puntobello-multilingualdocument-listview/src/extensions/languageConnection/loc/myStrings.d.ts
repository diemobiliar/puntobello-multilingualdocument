declare interface ILanguageConnectionCommandSetStrings {
  CommandDel: string;
  CommandDelName: string;
  CommandCreate: string;
  CommandCreateName: string;
  CommandLock: string;
  CommandDelDialogTitle: string;
  CommandCreateDialogTitle: string;
  CommandLockDialogTitle: string;
  MultipleFileTypesDialogTitle: string;
  MultipleFileTypes: string;
  ExistingConnectionDialogTitle: string;
  ExistingConnection: string;
  OkBtnLabel, string;
}

declare module 'LanguageConnectionCommandSetStrings' {
  const strings: ILanguageConnectionCommandSetStrings;
  export = strings;
}
