import { SPFI } from "@pnp/sp";

/**
 * Returns the corresponding Fluent UI icon name based on the file extension of a given file name.
 *
 * @param {string} fileName - The name of the file including its extension.
 * @returns {string} - The icon name corresponding to the file type, such as 'WordDocument' for Word files,
 *                     'ExcelDocument' for Excel files, or a generic icon for unknown file types.
 *
 * @example
 * getIconNameByFileName('document.pdf'); // Returns 'PDF'
 * getIconNameByFileName('spreadsheet.xlsx'); // Returns 'ExcelDocument'
 * getIconNameByFileName('presentation.pptx'); // Returns 'PowerPointDocument'
 */
export const getIconNameByFileName = (fileName: string): string => {
  const fileExtensionPattern = /\.([0-9a-z]+)(?=[?#])|(\.)(?:[\w]+)$/gmi;
  const matchExt = fileName.match(fileExtensionPattern)[0];
  
  switch (matchExt.toLowerCase()) {
    case '.doc':
    case '.docx':
      return 'WordDocument';
    case '.xls':
    case '.xlsx':
      return 'ExcelDocument';
    case '.ppt':
    case '.pptx':
      return 'PowerPointDocument';
    case '.one':
      return 'OneNoteLogoInverse';
    case '.pdf':
      return 'PDF';
    default:
      return 'StatusCircleQuestionMark'; // Returns a generic icon for unknown file types
  }
};

/**
 * Retrieves language-specific documents related to a given list item and updates the state with the results.
 * This function is used to fetch documents that are connected by a language connection (pb_LangConn).
 *
 * @param {SPFI} sp - The SPFI instance for interacting with SharePoint.
 * @param {string} listid - The ID of the SharePoint list from which to retrieve the documents.
 * @param {number} itemid - The ID of the list item to which the documents are related.
 * @param {(items: any[]) => void} setDocItems - A callback function to update the state with the retrieved documents.
 * @param {(show: boolean) => void} setShowProgress - A callback function to control the loading state.
 *
 * @returns {Promise<void>} - A promise that resolves when the documents have been successfully retrieved and the state has been updated.
 *
 * @example
 * getLanguageDoc(sp, 'list-id', 1, setDocItems, setShowProgress);
 */
export const getLanguageDoc = async (sp: SPFI, listid: string, itemid: number, setDocItems: (items: any[]) => void, setShowProgress: (show: boolean) => void): Promise<void> => {
  const docItem: any = await sp.web.lists.getById(listid).items.getById(itemid)();
  
  if (docItem) {
    const langConn = docItem["pb_LangConn"];
    
    if (langConn != null && langConn.length > 0) {
      const filterQuery = `(ID ne ${itemid}) and (pb_LangConn eq '${langConn}')`;
      const docItems: any[] = await sp.web.lists.getById(listid).items.select('File', 'Title', 'pb_LangCd', 'pb_LangConn').expand('File').filter(filterQuery)();
      setDocItems(docItems); // Updates the state with the retrieved documents
      setShowProgress(false); // Hides the loading indicator
    }
  }
};

