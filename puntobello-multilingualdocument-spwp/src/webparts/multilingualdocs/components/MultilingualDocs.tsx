import * as React from 'react';
import styles from './MultilingualDocs.module.scss';
import { WebPartTitle } from "@pnp/spfx-controls-react/lib/WebPartTitle";
import { Placeholder } from '@pnp/spfx-controls-react/lib/Placeholder';
import { DisplayMode } from '@microsoft/sp-core-library';
import Doccard from './doccard/Doccard';
import Doclist from './doclist/Doclist';
import { useLoadCardData } from '../hooks/useLoadCardData';
import { Stack } from '@fluentui/react';
import { getRootEnv, Utility } from '../utils';
import { useAppContext } from '../contexts/AppContext';
import SharePointService from '../services/SharePointService';

export default function MultilingualDocs(props: { fUpdateProperty: (value: string) => void, fPropertyPaneOpen: () => void }) {
  const { fUpdateProperty, fPropertyPaneOpen } = props;
  // Retrieve the SharePoint context, logger, and page language from the app context
  const { context, pageLanguage, title, cardLayout, displayMode, collectionData, truncateLocale, upperCaseLocale } = useAppContext();
  const docData = useLoadCardData(collectionData, context.serviceScope.consume(SharePointService.serviceKey), truncateLocale, upperCaseLocale);

  return (
    <div className={styles.multilingualdocs} style={getRootEnv().css}>
      <WebPartTitle displayMode={displayMode}
        title={title}
        updateProperty={fUpdateProperty} />
      {
        docData && docData.length > 0 ? (
          cardLayout === 'Cards' ? (
            <Stack horizontal horizontalAlign="start" disableShrink wrap tokens={{ childrenGap: 32 }}>
              {
                docData.map((doc, index) => (
                  <Doccard preview={doc.preview} targetUrl={doc.targetUrl} activity={doc.lastActivity} title={doc.docTitle} desc={doc.docDesc} relatedDocs={doc.relatedDocs} key={index} language={pageLanguage.Language} />
                ))
              }
            </Stack>
          ) : (
            <Doclist docdata={docData} language={pageLanguage.Language} />
          )
        ) : (
          displayMode === DisplayMode.Edit && <Placeholder
            iconName='Edit'
            iconText={Utility.getStringTranslation4Locale('CollectionPanelHeader', pageLanguage.Language)}
            description={Utility.getStringTranslation4Locale('NoCardsConfigured', pageLanguage.Language)}
            buttonLabel={Utility.getStringTranslation4Locale('ConfigureCardsButtonLabel', pageLanguage.Language)}
            onConfigure={fPropertyPaneOpen} />
        )
      }
    </div>
  );
}
