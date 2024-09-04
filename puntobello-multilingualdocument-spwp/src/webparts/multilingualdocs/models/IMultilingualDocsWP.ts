import { IDoccardInfo } from "./IDoccardInfo";

export interface IMultilingualDocsWP {
  cardLayout: string;
  truncateLocale: boolean;
  upperCaseLocale?: boolean;
  collectionData: IDoccardInfo[];
  title: string;
}
