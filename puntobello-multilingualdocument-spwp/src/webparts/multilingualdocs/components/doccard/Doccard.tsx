// React import for component creation
import * as React from 'react';

// Interface for the DocCard component
import { IDoccard } from '.';

// Fluent UI components for rendering Document Cards and related elements
import {
  DocumentCard,
  DocumentCardDetails,
  DocumentCardPreview,
  DocumentCardTitle,
  DocumentCardType,
} from '@fluentui/react/lib/DocumentCard';

// Fluent UI components for buttons, overflow sets, and text
import { IButtonStyles, IconButton, OverflowSet, Text } from '@fluentui/react';

// Utility functions used throughout the component
import { Utility } from '../../utils';

// Custom styles for the Document Card component layout
import { cardLayoutStyles } from '../../styles/doccard';

/**
 * Renders an individual item in the OverflowSet, which is a link to a related document.
 * 
 * @param item - The item to render, containing the link and name of the related document.
 * @returns A JSX.Element representing the link to the related document.
 */
const onRenderItem = (item): JSX.Element => {
  return (
    <a href={item.link} className={cardLayoutStyles.documentCardLinkListItem} role="listitem" rel="noreferrer" target="_blank" data-interception="off">
      {item.name}
    </a>
  );
};

/**
 * Renders the overflow button in the OverflowSet, which provides additional options when there are too many items to display.
 * 
 * @param overflowItems - The list of items that overflow and are not directly displayed.
 * @returns A JSX.Element representing the overflow button.
 */
const onRenderOverflowButton = (overflowItems: any[] | undefined): JSX.Element => {
  const buttonStyles: Partial<IButtonStyles> = {
    root: {
      minWidth: 0,
      padding: '0 4px',
      alignSelf: 'stretch',
      height: 'auto',
    },
  };
  return (
    <IconButton
      role="menuitem"
      title="More options"
      styles={buttonStyles}
      menuIconProps={{ iconName: 'More' }}
      menuProps={{ items: overflowItems! }}
    />
  );
};

/**
 * The main component that renders a document card with a preview, title, description, and related documents.
 * 
 * @param props - The properties passed to the Doccard component, including preview, targetUrl, activity, title, desc, relatedDocs, and language.
 * @returns A JSX.Element representing the document card layout.
 */
export default function Doccard(props: IDoccard) {
  const {
    preview,     // Document preview image or icon
    targetUrl,   // URL to the document
    activity,    // Recent activity or date related to the document
    title,       // Title of the document
    desc,        // Description of the document
    relatedDocs, // Related documents with language and links
    language     // Language for translation purposes
  } = props;

  /**
   * The normal layout for the document card, including the preview, title, and related documents.
   */
  const layoutNormal: JSX.Element = (
    <a href={targetUrl} className={cardLayoutStyles.documentCardLinkCard} target="_blank" data-interception="off" rel="noreferrer">
      <DocumentCard
        aria-label={title}
        type={DocumentCardType.compact}
        className={cardLayoutStyles.documentCardSmall}
      >
        <DocumentCardPreview
          {...preview}
          className={cardLayoutStyles.DocumentCardPreview}
        />
        <DocumentCardDetails>
          <DocumentCardTitle
            title={title}
            className={cardLayoutStyles.cardTitle}
          />
          <OverflowSet
            aria-label={Utility.getStringTranslation4Locale('LanguageList', language)}
            role="list"
            items={relatedDocs.map((doc) => {
              return {
                key: doc.key,
                name: doc.langCd,
                link: doc.Url,
                target: doc.target
              };
            })}
            className={cardLayoutStyles.documentCardLinkList}
            onRenderItem={onRenderItem}
            onRenderOverflowButton={onRenderOverflowButton}
          />
          <Text nowrap block className={cardLayoutStyles.documentCardDate}>
            {activity}
          </Text>
        </DocumentCardDetails>
      </DocumentCard>
    </a>
  );

  return layoutNormal;
}
