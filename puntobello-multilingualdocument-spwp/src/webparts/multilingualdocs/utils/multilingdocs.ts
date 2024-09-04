import { IIconData } from '../models';
import { getRootEnv } from './envconfig';

// Retrieve the environment configuration settings
const rootEnv = getRootEnv();

/**
 * Extracts the file extension from a given file URL.
 *
 * @param {string} fileUrl - The URL of the file.
 * @returns {string} The file extension if found; otherwise, returns 'ENF' (Extension Not Found).
 */
export const getFileExtension = (fileUrl: string): string => {
  const lastPoint = fileUrl.lastIndexOf('.');
  if (lastPoint > 0) {
    return fileUrl.substring(lastPoint + 1, fileUrl.length);
  } else {
    return 'ENF';
  }
};

/**
 * Formats a language code based on truncation and case options.
 *
 * @param {boolean} truncateLocale - Whether to truncate the locale code to two characters.
 * @param {boolean} upperCaseLocale - Whether to convert the locale code to uppercase.
 * @param {string} langCd - The original language code.
 * @returns {string} The formatted language code.
 */
export const getFormattedLocale = (truncateLocale: boolean, upperCaseLocale: boolean, langCd: string): string => {
  if (!truncateLocale) return langCd;
  return upperCaseLocale ? langCd.substring(0, 2).toUpperCase() : langCd.substring(0, 2);
};

/**
 * Retrieves the appropriate icon name and color based on the file type.
 *
 * @param {string} fileType - The file extension/type.
 * @returns {IIconData} An object containing the icon name and icon color associated with the file type.
 */
export const getIconNameByFileType = (fileType: string): IIconData => {
  switch (fileType.toLowerCase()) {
    case 'doc':
    case 'docx':
      return { iconName: 'WordDocument', iconColor: rootEnv.css['--spfx_color_doc_icon'] };
    case 'xls':
    case 'xlsx':
    case 'xlsm':
      return { iconName: 'ExcelDocument', iconColor: rootEnv.css['--spfx_color_xls_icon'] };
    case 'ppt':
    case 'pptx':
      return { iconName: 'PowerPointDocument', iconColor: rootEnv.css['--spfx_color_ppt_icon'] };
    case 'one':
      return { iconName: 'OneNoteLogoInverse', iconColor: rootEnv.css['--spfx_color_one_icon'] };
    case 'pdf':
      return { iconName: 'PDF', iconColor: rootEnv.css['--spfx_color_pdf_icon'] };
    default:
      return { iconName: 'StatusCircleQuestionMark', iconColor: rootEnv.css['--spfx_color_primary'] };
  }
};

/**
 * Ensures that specific parameters are present in the URL's query string.
 * If a parameter is missing, it is added with the provided value.
 *
 * @param {string | URL} url - The original URL or a URL object.
 * @param {Array<[string, string]>} params - An array of key-value pairs representing the parameters to be added.
 * @returns {string} The updated URL with the ensured parameters.
 */
export const ensureParameters = (url: string | URL, params: string[][] | [any, any][]): string => {
  const urlObject = new URL(url);
  const searchParams = new URLSearchParams(urlObject.search);
  params.forEach(([key, value]) => {
    if (!searchParams.has(key)) {
      searchParams.append(key, value);
    }
  });
  urlObject.search = searchParams.toString();
  return urlObject.toString();
};

/**
 * Modifies the action parameter in a URI and ensures that certain parameters are included.
 * Primarily used to adjust document viewing behavior and ensure correct URL parameters.
 *
 * @param {string} uri - The original URI.
 * @returns {string} The modified URI with updated actions and ensured parameters.
 */
export const replaceActionInUri = (uri: string): string => {
  let retVal = uri;
  if (uri.indexOf('&action=interactivepreview') > 0) {
    retVal = uri.replace('&action=interactivepreview', '&action=view');
  }

  const parametersToAdd = [
    ['csf', '1'],
    ['web', '1']
  ];
  retVal = ensureParameters(retVal, parametersToAdd);
  return retVal;
};
