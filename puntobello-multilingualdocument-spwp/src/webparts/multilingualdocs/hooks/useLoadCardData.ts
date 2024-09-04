// React and React-related imports
import { useEffect, useState } from 'react';

// Models and Interfaces
import { IDocData, IIconData, IRelatedDoc } from '../models';

// Utility Libraries
import * as moment from 'moment';

// Fluent UI and Styling
import { getTheme } from '@fluentui/react/lib/Styling';

// Utility Functions
import { getFileExtension, getFormattedLocale, getIconNameByFileType, getRootEnv, replaceActionInUri } from '../utils';

/**
 * Custom hook for loading and processing document card data from a SharePoint list.
 * 
 * @param {Array} collectionData - The data collection that includes document information.
 * @param {object} spo - SharePoint service object for making API requests.
 * @param {boolean} truncateLocale - Whether to truncate the locale code.
 * @param {boolean} upperCaseLocale - Whether to convert the locale code to uppercase.
 * 
 * @returns {Array<IDocData>} - An array of processed document data ready to be rendered.
 */
export const useLoadCardData = (collectionData, spo, truncateLocale, upperCaseLocale) => {
    const [docData, setDocData] = useState<IDocData[]>([]); // State to hold document data
    const currDocData: IDocData[] = []; // Temporary array to accumulate document data

    // useEffect to load card data whenever the collectionData changes
    useEffect(() => {
        if (collectionData) {
            loadCardData();
        }
    }, [collectionData]);

    /**
     * Loads and processes document data for the collectionData provided.
     * 
     * This function:
     * - Fetches the main document item from SharePoint.
     * - Determines the file type and retrieves the corresponding icon.
     * - Creates a preview card for the document.
     * - Fetches related documents and prepares them for display.
     * - Sorts the related documents and updates the state with processed data.
     */
    const loadCardData = async () => {
        currDocData.length = 0; // Reset the temporary array

        await Promise.all(collectionData.map(async (doccard, idx) => {
            const theme = getTheme(); // Get the current theme for styling
            const { palette, fonts } = theme;
            const previewCard = { previewImages: [], styles: { previewIcon: { backgroundColor: getRootEnv().css['--spfx_color_grey_brightness_bright'] } } };
            const relatedDocuments: IRelatedDoc[] = []; // Array to hold related documents
            let currLinkingUri: string;
            let currFileType = '';
            let tenantFileUrl: string;

            // Determine the tenant file URL
            if (doccard.docweburl.indexOf('/sites/') > 0) {
                tenantFileUrl = doccard.docweburl.substring(0, doccard.docweburl.indexOf('/sites/'));
            } else {
                tenantFileUrl = doccard.docweburl;
            }

            // Fetch the main document item from SharePoint
            const mainItem = await spo.getItemFromWebFromFileUrl(doccard.docweburl, doccard.docurl);

            // Determine the file type and retrieve the corresponding icon
            currFileType = getFileExtension(doccard.docurlhidden);
            const iconData: IIconData = getIconNameByFileType(currFileType);

            // Prepare the preview card with the retrieved icon
            previewCard.previewImages.push({
                previewIconProps: {
                    iconName: iconData.iconName,
                    styles: {
                        root: {
                            fontSize: fonts.superLarge.fontSize,
                            color: iconData.iconColor,
                            backgroundColor: getRootEnv().css['--spfx_color_grey_brightness_bright'],
                        },
                    },
                },
            });

            // Generate the linking URI based on the file type
            if (currFileType === 'pdf') {
                currLinkingUri = replaceActionInUri(decodeURI(doccard.docurl));
            } else {
                currLinkingUri = replaceActionInUri(mainItem['ServerRedirectedEmbedUri']);
            }

            // Add the main document as a related document
            relatedDocuments.push({
                key: mainItem['Id'],
                langCd: getFormattedLocale(truncateLocale, upperCaseLocale, mainItem['pb_LangCd']),
                name: mainItem['Title'],
                Url: currLinkingUri,
                target: '_blank',
                tooltip: mainItem['Title']
            });

            let currMobiConn: string;
            if (mainItem['pb_LangConn'] != null && mainItem['pb_LangConn'].length > 0) {
                currMobiConn = mainItem['pb_LangConn'];
            } else {
                currMobiConn = '';
            }

            // Filter and fetch related documents based on language connection
            const filterQuery = `(pb_LangConn eq '${currMobiConn}') and (pb_LangCd ne '${mainItem['pb_LangCd']}')`;
             //eslint-disable-next-line
            const guidRegex = '(\{){0,1}[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}(\}){0,1}';
            const editLink = mainItem['odata.editLink'];
            const guidFound = editLink.match(guidRegex);
            const otherItems = await spo.getFilteredExpandedItems(doccard.docweburl, guidFound[0], filterQuery);

            // Process each related document and add to the relatedDocuments array
            otherItems.forEach(otherItem => {
                let currOtherItemUri = '';
                if (currFileType === 'pdf') {
                    currOtherItemUri = replaceActionInUri(tenantFileUrl + otherItem['File']['ServerRelativeUrl']);
                } else {
                    currOtherItemUri = replaceActionInUri(otherItem['ServerRedirectedEmbedUri']);
                }
                relatedDocuments.push({
                    key: otherItem['Id'],
                    langCd: getFormattedLocale(truncateLocale, upperCaseLocale, otherItem['pb_LangCd']),
                    name: otherItem['Title'],
                    Url: currOtherItemUri,
                    target: '_blank',
                    tooltip: otherItem['Title']
                });
            });

            // Sort related documents by language code
            relatedDocuments.sort((a, b) => (a.langCd > b.langCd) ? 1 : ((b.langCd > a.langCd) ? -1 : 0));

            // Create the document data object
            const tempDocData: IDocData = {
                preview: previewCard,
                targetUrl: currLinkingUri,
                relatedDocs: relatedDocuments,
                lastActivity: moment(mainItem['Modified']).format('DD.MM.YYYY'),
                docTitle: mainItem['Title'],
                docDesc: mainItem['_Extended_Description'],
                iconName: iconData.iconName,
                fileType: currFileType,
                sortOrder: idx,
            };

            // Add the document data object to the array
            currDocData.push(tempDocData);
        }));

        // Sort the document data by sort order and update the state
        currDocData.sort((a, b) => (a.sortOrder > b.sortOrder) ? 1 : ((b.sortOrder > a.sortOrder) ? -1 : 0));
        setDocData([...currDocData]); // Update the state with the sorted data
    };

    return docData; // Return the processed document data
};

