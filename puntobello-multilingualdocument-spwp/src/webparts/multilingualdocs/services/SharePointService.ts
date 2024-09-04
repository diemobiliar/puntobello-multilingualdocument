import { ServiceKey, ServiceScope } from "@microsoft/sp-core-library";
import { PageContext } from "@microsoft/sp-page-context";
import { IPageContext, ILanguageRepresentation } from "../models";
import { SPFI, spfi, SPFx } from "@pnp/sp";
import "@pnp/sp/regional-settings/web";
import "@pnp/sp/fields";
import "@pnp/sp/webs";
import "@pnp/sp/site-users/web";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/files";

import { Logger } from '../utils/logger';
import * as lcid from "lcid";

export interface ISharePointService {
    getPageContext(listId: string, listItemId: number): Promise<IPageContext>;
    calculateLanguage(listId: string, listItemId: number, defaultLanguage: number): Promise<ILanguageRepresentation>;
    getItemFromFileUrl(fileUrl: string): Promise<any>;
    checkFileExistsForWeb(currWebUrl: string, fileUrl: string): Promise<boolean>;
    getItemFromWebFromFileUrl(currWebUrl: string, fileUrl: string): Promise<any>;
    getFromWebExpandedFileItem(currWebUrl: string, fileUrl: string): Promise<any>;
    getFilteredExpandedItems(currWebUrl: string, listId: string, filterQuery: string): Promise<any[]>;
    sp: SPFI;
}

export default class SharePointService implements ISharePointService {
    public static readonly serviceKey: ServiceKey<ISharePointService> =
        ServiceKey.create<ISharePointService>('SPFx:SharePointService', SharePointService);
    private pageContext: PageContext;
    private logger: Logger;
    public sp: SPFI;

    constructor(serviceScope: ServiceScope) {
        this.logger = Logger.getInstance();
        serviceScope.whenFinished(() => {
            this.pageContext = serviceScope.consume(PageContext.serviceKey);
            this.sp = spfi().using(SPFx({ pageContext: this.pageContext }));
        });
    }

    public getPageContext = async (listId: string, listItemId: number): Promise<IPageContext> => {
        // Check if we are in a multilingual setup
        const fields = await this.sp.web.lists.getById(listId).fields();
        const requiredFields = ['OData__SPIsTranslation', 'OData__SPTranslationLanguage'];

        // Check if all required fields exist
        const fieldNames = fields.map(field => field.InternalName);
        const allFieldsExist = requiredFields.every(field => fieldNames.includes(field));
        if (!allFieldsExist) {
            return null;
        } else {
            const context = await this.sp.web.lists.getById(listId)
                .items
                .getById(listItemId)
                .select(
                    'OData__SPIsTranslation',
                    'OData__SPTranslationLanguage')();
            return context;
        }
    }

    public calculateLanguage = async (listId: string, listItemId: number, defaultLanguage: number): Promise<ILanguageRepresentation> => {
        let pageContext = null;
        const languageData: ILanguageRepresentation = {
            lcid: 0,
            Language: '',
            LanguageLC: '',
            LanguageDashed: '',
            LanguageDashedLC: '',
        };
        try {
            pageContext = await this.getPageContext(listId, listItemId);
        } catch (error) {
            this.logger.info("calculateLanguage, getPageContext returned an error, probably not running in a multilingual setup, defaulting to web language", error);
        }
        if (!pageContext || !pageContext.OData__SPIsTranslation || !pageContext.OData__SPTranslationLanguage) {
            // Not running in a multilingual setup
            // Get language from web
            languageData.lcid = defaultLanguage;
            languageData.Language = lcid.from(defaultLanguage);
            languageData.LanguageLC = languageData.Language.toLowerCase();
            languageData.LanguageDashed = languageData.Language.replace('_', '-');
            languageData.LanguageDashedLC = languageData.LanguageLC.replace('_', '-');
            return languageData;
        }
        // Page is a translation
        // Get language from page property
        languageData.lcid = lcid.to(pageContext.OData__SPTranslationLanguage);
        languageData.Language = pageContext.OData__SPTranslationLanguage;
        languageData.LanguageLC = languageData.Language.toLowerCase();
        languageData.LanguageDashed = languageData.Language.replace('_', '-');
        languageData.LanguageDashedLC = languageData.LanguageLC.replace('_', '-');
        return languageData;
    }

    public async getItemFromFileUrl(fileUrl: string): Promise<any> {
        try {
            const spitem = await this.sp.web.getFileByUrl(fileUrl).getItem();
            return spitem;
        } catch (error) {
            this.logger.error("Error getting item from file URL:", error);
            throw error;
        }
    }

    public async checkFileExistsForWeb(currWebUrl: string, fileUrl: string): Promise<boolean> {
        try {
            const currsp: SPFI = spfi(currWebUrl).using(SPFx({ pageContext: this.pageContext }));
            const spFileExists = await currsp.web.getFileByUrl(fileUrl).exists();
            return spFileExists;
        } catch (error) {
            this.logger.error("Error checking if file exists:", error);
            throw error;
        }
    }

    public async getItemFromWebFromFileUrl(currWebUrl: string, fileUrl: string): Promise<any> {
        try {
            const currsp: SPFI = spfi(currWebUrl).using(SPFx({ pageContext: this.pageContext }));
            const spitem = await currsp.web.getFileByUrl(fileUrl).getItem();
            return spitem;
        } catch (error) {
            this.logger.error("Error getting item from web from file url:", error);
            throw error;
        }
    }

    public async getFromWebExpandedFileItem(currWebUrl: string, fileUrl: string): Promise<any> {
        try {
            const currsp: SPFI = spfi(currWebUrl).using(SPFx({ pageContext: this.pageContext }));
            const spfile = await currsp.web.getFileByUrl(fileUrl).getItem().then(async item => {
                return await item.select('File').expand('File')();
            });
            return spfile;
        } catch (error) {
            this.logger.error("Error expanding file item:", error);
            throw error;
        }
    }

    public async getFilteredExpandedItems(currWebUrl: string, listId: string, filterQuery: string): Promise<any[]> {
        try {
            const currsp: SPFI = spfi(currWebUrl).using(SPFx({ pageContext: this.pageContext }));
            const items = await currsp.web.lists.getById(listId).items.filter(filterQuery).expand('File')();
            return items;
        } catch (error) {
            this.logger.error("Error getting filtered and expanded items:", error);
            throw error;
        }
    }
}
