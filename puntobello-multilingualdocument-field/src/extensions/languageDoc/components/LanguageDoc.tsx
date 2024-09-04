import * as React from 'react';
import styles from './LanguageDoc.module.scss';
import { getSP } from '../../../pnpjs-config';
import { SPFI } from "@pnp/sp";

import { ILanguageDoc } from '../models';
import { getRootEnv, getLanguageDoc } from '../utils';

import LoadingSpinner from './LoadingSpinner';
import DocumentList from './DocumentList';
import NoDocuments from './NoDocuments';

/**
 * The `LanguageDoc` component is responsible for fetching and displaying language-specific documents
 * based on the provided `listid` and `itemid` properties. It utilizes the PnP SPFx framework to retrieve
 * document data from SharePoint and conditionally renders a loading spinner, a document list, or a "no documents" message
 * based on the state of the data fetching process.
 * 
 * @param {ILanguageDoc} props - The properties passed to the component.
 * @param {string} props.listid - The ID of the SharePoint list containing the documents.
 * @param {number} props.itemid - The ID of the list item for which documents are being retrieved.
 * @param {string} props.currentUICultureName - The current UI culture name for localization purposes.
 * 
 * @returns {JSX.Element} The rendered component displaying the appropriate content based on the fetched data.
 */
export default function LanguageDoc(props: ILanguageDoc) {
  const { listid, itemid, currentUICultureName } = props;
  
  // State to track the loading progress of the documents
  const [showProgress, setShowProgress] = React.useState(true);
  
  // State to store the fetched document items
  const [docItems, setDocItems] = React.useState([]);
  
  // Initialize the SharePoint Framework (SPFx) context
  const _sp: SPFI = getSP();
  
  // Effect hook to fetch documents when the itemid changes
  React.useEffect(() => {
    if (itemid !== 0) {
      getLanguageDoc(_sp, listid, itemid, setDocItems, setShowProgress);
    }
  }, [itemid]);

  return (
    <div className={styles.LanguageDoc} style={getRootEnv().css}>
      {listid && itemid !== 0 && docItems && docItems.length > 0 ? (
        showProgress ? (
          <LoadingSpinner />
        ) : (
          <DocumentList docItems={docItems} currentUICultureName={currentUICultureName} />
        )
      ) : (
        <NoDocuments currentUICultureName={currentUICultureName} />
      )}
    </div>
  );
}
