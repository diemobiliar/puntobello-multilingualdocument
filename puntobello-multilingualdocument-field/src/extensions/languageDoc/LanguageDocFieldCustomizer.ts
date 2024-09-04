import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { override } from '@microsoft/decorators';
import {
  BaseFieldCustomizer,
  IFieldCustomizerCellEventParameters
} from '@microsoft/sp-listview-extensibility';

import { Logger } from './utils';
import { getSP } from '../../pnpjs-config';

import LanguageDoc from './components/LanguageDoc';
import { ILanguageDoc } from './models';
/**
 * LanguageDocFieldCustomizer is a SharePoint Framework (SPFx) field customizer
 * that renders a React component in a list field to display language-specific
 * document information.
 * The content of the cell is rendered in LanguageDoc.tsx and shows if the document has been associated with another document in a different language.
 */
export default class LanguageDocFieldCustomizer extends BaseFieldCustomizer<never> {
  private logger: Logger;

  /**
   * Initializes the field customizer. Sets up the logger and initializes
   * the PnP JS library for SharePoint data operations.
   *
   * @returns {Promise<void>} A promise that resolves when the initialization is complete.
   */
  @override
  public async onInit(): Promise<void> {
    await super.onInit();

    this.logger = Logger.getInstance();
    this.logger.setContextInfo(this.context.manifest.alias + " with id " + this.context.manifest.id);
    this.logger.info('Logger initialized');

    // PnP initialization
    getSP(this.context);
  }

  /**
   * Renders the React component `LanguageDoc` inside the list field.
   * Retrieves the list item ID and list ID to pass as props to the React component.
   *
   * @param {IFieldCustomizerCellEventParameters} event - The event parameters provided by SPFx.
   */
  @override
  public onRenderCell(event: IFieldCustomizerCellEventParameters): void {
    let itemid = 0, listid = "";
    itemid = event.listItem.getValueByName("ID");
    listid = this.context.pageContext.list.id.toString();

    const languageDoc: React.ReactElement<ILanguageDoc> =
      React.createElement(LanguageDoc,
        {
          listid,
          itemid,
          currentUICultureName: this.context.pageContext.cultureInfo.currentUICultureName
        } as ILanguageDoc);

    ReactDOM.render(languageDoc, event.domElement);
  }

  /**
   * Disposes of the React component when the cell is no longer needed.
   * Unmounts the React component from the DOM and calls the parent class's dispose method.
   *
   * @param {IFieldCustomizerCellEventParameters} event - The event parameters provided by SPFx.
   */
  @override
  public onDisposeCell(event: IFieldCustomizerCellEventParameters): void {
    ReactDOM.unmountComponentAtNode(event.domElement);
    super.onDisposeCell(event);
  }
}
