// React and Fluent UI imports
import * as React from 'react';
import { IButtonStyles, IColumn, IconButton, IDetailsListProps, OverflowSet } from '@fluentui/react';
import { FontIcon } from '@fluentui/react/lib/Icon';

// Utility functions and environment configuration
import { Utility } from './utils';
import { getRootEnv } from './envconfig';

// Models and styles
import { IDocData } from '../models';
import { docListLayoutStyles, headerStyle } from '../styles/doclist';
import { getIconNameByFileType } from './multilingdocs';

const rootEnv = getRootEnv();

/**
 * Renders an item as a link within the document card list. The link opens in a new tab.
 * 
 * @param {any} item - The item to render, which contains a link and name.
 * @returns {JSX.Element} A JSX element representing the rendered link.
 */
export const onRenderItem = (item: any): JSX.Element => (
  <a
    href={item.link}
    className={docListLayoutStyles.documentCardLinkListItemLanguage}
    role="listitem"
    rel="noreferrer"
    target="_blank"
    data-interception="off"
  >
    {item.name}
  </a>
);

/**
 * Renders the overflow button for the list item in the document card. The button shows more options when clicked.
 * 
 * @param {any[]} overflowItems - The items to show in the overflow menu.
 * @param {string} language - The language code for localization purposes.
 * @returns {JSX.Element} A JSX element representing the rendered overflow button.
 */
export const onRenderOverflowButton = (overflowItems: any[] | undefined, language: string): JSX.Element => {
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
      title={Utility.getStringTranslation4Locale('docListMoreOptions', language)}
      styles={buttonStyles}
      menuIconProps={{ iconName: 'More' }}
      menuProps={{ items: overflowItems! }}
    />
  );
};

/**
 * Custom row renderer for the DetailsList. It wraps each row in a link that opens in a new tab.
 * The background color changes on hover based on the theme settings.
 * 
 * @param {IDetailsListProps['onRenderRow']} props - The properties for rendering the row.
 * @param {function} defaultRender - The default render method for the row.
 * @returns {JSX.Element} A JSX element representing the rendered row.
 */
export const onRenderRow: IDetailsListProps['onRenderRow'] = (props, defaultRender) => {
  return (
    <a href={props.item.targetUrl} className={docListLayoutStyles.documentCardLinkListTarget} target="_blank" data-interception="off" rel="noreferrer">
      {defaultRender && defaultRender({
        ...props,
        styles: {
          root: {
            selectors: {
              '&:hover': {
                'background-color': rootEnv.css['--spfx_theme_color_bright_grey'],
              },
            },
          },
        },
      })}
    </a>
  );
};

/**
 * Generates a unique key for each item in the list, using the index as the key.
 * 
 * @param {any} item - The item in the list.
 * @param {number} [index] - The index of the item in the list.
 * @returns {string} The key for the item.
 */
export const getKey = (item: any, index?: number): string => {
  return index.toString();
};

/**
 * Configures the columns for the DetailsList based on the current language and screen size.
 * It adjusts the columns to show more or less information depending on the screen width.
 * 
 * @param {string} language - The language code for localization purposes.
 * @returns {IColumn[]} An array of column configurations for the DetailsList.
 */
export const getColumns = (language: string): IColumn[] => {
  const commonColumns: IColumn[] = [
    {
      key: "column1",
      name: Utility.getStringTranslation4Locale('docListFileType', language),
      className: docListLayoutStyles.fileIconCell,
      styles: headerStyle,
      iconClassName: docListLayoutStyles.fileIconHeaderIcon,
      iconName: "Page",
      isIconOnly: true,
      fieldName: "name",
      minWidth: 12,
      maxWidth: 48,
      onRender: (item: IDocData) => {
        const { iconName, iconColor } = getIconNameByFileType(item.fileType);
        return (
          <FontIcon 
           iconName={iconName} 
           className={`${docListLayoutStyles.fileIconImg}`} 
           style={{ color: iconColor }} /> 
        );
      }
    },
    {
      key: "column2",
      name: Utility.getStringTranslation4Locale('docListName', language),
      fieldName: "name",
      styles: headerStyle,
      minWidth: 110,
      maxWidth: 950,
      data: "string",
      onRender: (item: IDocData) => {
        return <span className={docListLayoutStyles.fileTitle}>{item.docTitle}</span>;
      },
      isPadded: true
    }
  ];

  if (window.innerWidth < 768) {
    return [
      ...commonColumns,
      {
        key: "column3",
        name: Utility.getStringTranslation4Locale('docListLanguages', language),
        fieldName: "docLanguages",
        styles: headerStyle,
        minWidth: 70,
        maxWidth: 100,
        isResizable: false,
        data: "string",
        onRender: (item: IDocData) => {
          return (
            <OverflowSet
              aria-label={Utility.getStringTranslation4Locale('LanguageList', language)}
              role="list"
              items={item.relatedDocs.map((doc) => ({
                key: doc.key,
                name: doc.langCd,
                link: doc.Url,
                target: doc.target
              }))}
              className={docListLayoutStyles.documentCardLinkListItemLanguage}
              onRenderItem={onRenderItem}
              onRenderOverflowButton={(overflowItems) => onRenderOverflowButton(overflowItems, language)}
            />
          );
        },
        isPadded: true
      },
      {
        key: "column4",
        name: Utility.getStringTranslation4Locale('docListPublished', language),
        fieldName: "datePlublishedValue",
        styles: headerStyle,
        minWidth: 80,
        maxWidth: 80,
        isResizable: false,
        data: "number",
        onRender: (item: IDocData) => {
          return <span>{item.lastActivity}</span>;
        },
        isPadded: true
      }
    ];
  } else {
    return [
      ...commonColumns,
      {
        key: "column3",
        name: Utility.getStringTranslation4Locale('docListPublished', language),
        fieldName: "datePlublishedValue",
        styles: headerStyle,
        minWidth: 80,
        maxWidth: 80,
        isResizable: false,
        data: "number",
        onRender: (item: IDocData) => {
          return <span>{item.lastActivity}</span>;
        },
        isPadded: true
      },
      {
        key: "column4",
        name: Utility.getStringTranslation4Locale('docListLanguages', language),
        fieldName: "docLanguages",
        styles: headerStyle,
        minWidth: 70,
        maxWidth: 100,
        isResizable: false,
        data: "string",
        onRender: (item: IDocData) => {
          return (
            <OverflowSet
              aria-label={Utility.getStringTranslation4Locale('LanguageList', language)}
              role="list"
              items={item.relatedDocs.map((doc) => ({
                key: doc.key,
                name: doc.langCd,
                link: doc.Url,
                target: doc.target
              }))}
              className={docListLayoutStyles.documentCardLinkListItemLanguage}
              onRenderItem={onRenderItem}
              onRenderOverflowButton={(overflowItems) => onRenderOverflowButton(overflowItems, language)}
            />
          );
        },
        isPadded: true
      }
    ];
  }
};


