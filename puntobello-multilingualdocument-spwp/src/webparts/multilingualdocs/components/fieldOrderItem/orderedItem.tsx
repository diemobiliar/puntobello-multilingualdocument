import * as React from 'react';

import { mergeStyleSets } from '@fluentui/react';

import { Icon } from '@fluentui/react/lib/Icon';
import { getFileTypeIconProps, initializeFileTypeIcons } from '@uifabric/file-type-icons';

// Initialize the default set of file type icons for the application.
// This function is typically called once during the application initialization.
initializeFileTypeIcons(undefined);

// Styles used for the file icon images displayed in the ordered list items.
const orderedItemStyles = mergeStyleSets({
    fileIconImg: {
      verticalAlign: "middle", // Align the icon vertically in the middle of the container
      padding: "0px 4px 0px 0px", // Add padding to the right of the icon
      maxHeight: "16px", // Set the maximum height of the icon to 16 pixels
      maxWidth: "16px", // Set the maximum width of the icon to 16 pixels
    },
  });

/**
 * Generates a JSX element representing an ordered item in a list.
 * This function is used to render items in a collection, displaying a file icon and a truncated document title.
 * 
 * @param {any} item - The item object containing document data, including the URL and title.
 * @param {number} index - The index of the item in the list (unused in this function).
 * 
 * @returns {JSX.Element} - A JSX element containing an icon corresponding to the file type and a truncated document title.
 */
export const orderedItem = (item: any, index: number): JSX.Element => {
    // Extract the file extension from the document URL
    const fullPath: string = item.docurlhidden;
    const lastPoint = fullPath.lastIndexOf('.');
    let currFileType;

    // Determine the file extension, defaulting to 'ENF' (Extension Not Found) if none is present
    if (lastPoint > 0) {
      currFileType = fullPath.substring(lastPoint + 1, fullPath.length);
    } else {
      currFileType = 'ENF';
    }

    // Truncate the document title if it exceeds 33 characters
    const docTitle = item.doctitle.length > 33 ? item.doctitle.substr(0, 33) + '...' : item.doctitle;

    return (
        <span>
            {/* Display the file type icon based on the file extension */}
            <Icon {...getFileTypeIconProps({ extension: currFileType, size: 16, imageFileType: 'svg' })} className={orderedItemStyles.fileIconImg} />
            {/* Display the (possibly truncated) document title */}
            {docTitle}
        </span>
    );
};
