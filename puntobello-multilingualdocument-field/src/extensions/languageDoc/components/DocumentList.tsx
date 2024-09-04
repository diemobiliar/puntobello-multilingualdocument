// React and related libraries for UI components
import * as React from 'react';

// Fluent UI components for building the user interface
import { Stack } from '@fluentui/react/lib/Stack';
import { Icon } from '@fluentui/react/lib/Icon';

// Custom styling and utility functions
import styles from './LanguageDoc.module.scss';
import { Utility } from '../utils/utils';
import { getIconNameByFileName } from '../utils';

// TypeScript interfaces for type definitions
import { IDocumentList } from '../models';

/**
 * Component to render a list of documents with language-specific details.
 * 
 * @param {IDocumentList} props - The properties passed to the component.
 * @param {string} props.currentUICultureName - The current UI culture name to be used for localization.
 * @param {Array} props.docItems - An array of document items that need to be displayed.
 * 
 * @returns {JSX.Element} A React component that displays the list of documents with icons and links.
 */
export default function DocumentList(props: IDocumentList) {
  const {
    currentUICultureName, // The language/culture of the UI used for translation strings
    docItems // The list of document items to be displayed
  } = props;

  return (
    <div className={styles.cell}>
      {/* Display the total number of documents */}
      <div className={styles.totalDiv}>
        {Utility.getStringTranslation4Locale('totalLabel', currentUICultureName)}&nbsp;{docItems.length}
      </div>

      {/* Iterate over each document item and render a row with an icon and a link */}
      <div>
        {docItems.map((docItem, index) => (
          <Stack horizontal verticalAlign="center" key={index}>
            {/* Icon representing the document type based on its file name */}
            <Icon iconName={getIconNameByFileName(docItem.File.Name)} />
            &nbsp;
            {/* Link to the document with the language code and title */}
            {docItem.pb_LangCd}&nbsp;
            <a
              href={docItem.File.ServerRelativeUrl}
              target="_blank"
              data-interception="off"
              rel="noreferrer"
              className={styles.link}
            >{docItem.Title}
            </a>
          </Stack>
        ))}
      </div>
    </div>
  );
}  