// React import for building components
import * as React from 'react';

// CSS module import for styling the LanguageDoc component
import styles from './LanguageDoc.module.scss';

// Utility functions for various helper methods
import { Utility } from '../utils';

// Type definition import for the INoDocuments interface
import { INoDocuments } from '../models';


/**
 * Component to display a message indicating that no documents are available.
 * 
 * @param {INoDocuments} props - The properties passed to the component.
 * @param {string} props.currentUICultureName - The current UI culture name to be used for localization.
 * 
 * @returns {JSX.Element} A React component that displays an icon and a message when no documents are found.
 */
export default function NoDocuments(props: INoDocuments) {
  const {
    currentUICultureName // The language/culture of the UI used for translation strings
  } = props;

  return (
    <>
      <div className={styles.noDocContainer}>
        {/* Icon to visually indicate an error or absence of documents */}
        <p className={styles.noDoc}>x</p> 
        {/* Message indicating no documents are available, translated to the appropriate language */}
        <div>{Utility.getStringTranslation4Locale('NoDocMsg', currentUICultureName)}</div>
      </div>
    </>
  );
}
