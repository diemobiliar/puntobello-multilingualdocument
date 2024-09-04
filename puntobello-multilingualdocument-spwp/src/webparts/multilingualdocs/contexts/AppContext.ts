// React and related imports
import * as React from "react";

// SPFx-specific imports
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { DisplayMode } from "@microsoft/sp-core-library";

// Models
import { IDoccardInfo, ILanguageRepresentation, ILogger } from '../models';

/**
 * The `AppContext` class is a container for the various properties and configurations used throughout the application.
 * This includes the SharePoint WebPart context, logging utility, language settings, and various display properties.
 */
export class AppContext {
    context: WebPartContext;  // The SPFx WebPart context, providing information about the current environment
    logger: ILogger;  // Logger instance for logging messages and errors
    pageLanguage: ILanguageRepresentation;  // Represents the current language settings
    title: string;  // Title of the web part or the current document
    cardLayout: string;  // Layout style for displaying cards (e.g., list or grid)
    collectionData: IDoccardInfo[];  // Data collection representing the documents or items to be displayed
    displayMode: DisplayMode;  // The current display mode (e.g., edit or read-only)
    truncateLocale: boolean;  // Flag indicating whether the locale should be truncated
    upperCaseLocale: boolean;  // Flag indicating whether the locale should be displayed in uppercase

    /**
     * Constructs an instance of `AppContext` with the given parameters.
     *
     * @param {WebPartContext} context - The SPFx WebPart context.
     * @param {ILogger} logger - Logger instance for logging.
     * @param {ILanguageRepresentation} pageLanguage - The current language settings.
     * @param {string} title - The title of the web part or document.
     * @param {string} cardLayout - The layout style for displaying cards.
     * @param {IDoccardInfo[]} collectionData - The data collection for the documents/items.
     * @param {DisplayMode} displayMode - The current display mode.
     * @param {boolean} truncateLocale - Whether the locale should be truncated.
     * @param {boolean} upperCaseLocale - Whether the locale should be displayed in uppercase.
     */
    constructor(
        context: WebPartContext, 
        logger: ILogger, 
        pageLanguage: ILanguageRepresentation, 
        title: string, 
        cardLayout: string, 
        collectionData: IDoccardInfo[], 
        displayMode: DisplayMode, 
        truncateLocale: boolean, 
        upperCaseLocale: boolean
    ) {
        this.context = context;
        this.logger = logger;
        this.pageLanguage = pageLanguage;
        this.title = title;
        this.cardLayout = cardLayout;
        this.collectionData = collectionData;
        this.displayMode = displayMode;
        this.truncateLocale = truncateLocale;
        this.upperCaseLocale = upperCaseLocale;
    }
}

/**
 * React Context for managing the application state and dispatch function.
 * Provides the application context (`AppContext`) and a dispatch function for updating the app state.
 */
const AppContextInstance = React.createContext<{ context: AppContext } | undefined>(undefined);

/**
 * The `AppContextProvider` component wraps its children with the `AppContextInstance` provider.
 * This makes the app context available to all nested components.
 * 
 * @param {AppContext} appContext - The application context to provide.
 * @param {React.ReactNode} children - The children components that will have access to the app context.
 * 
 * @returns {JSX.Element} The rendered provider component wrapping the children components.
 */
export const AppContextProvider: React.FC<{ appContext: AppContext }> = ({ appContext, children }) => {
    return React.createElement(
        AppContextInstance.Provider,
        { value: { context: appContext } },
        children
    );
};

/**
 * Custom hook to access the application context within any component.
 * Ensures that the hook is used within a component wrapped by `AppContextProvider`.
 * 
 * @returns The application context properties, such as `context`, `logger`, `pageLanguage`, etc.
 * @throws Will throw an error if used outside of `AppContextProvider`.
 */
export const useAppContext = (): {
    context: WebPartContext;
    pageLanguage: ILanguageRepresentation;
    logger: ILogger;
    title: string;
    cardLayout: string;
    collectionData: IDoccardInfo[];
    displayMode: DisplayMode;
    truncateLocale: boolean;
    upperCaseLocale: boolean;
} => {
    const contextValue = React.useContext(AppContextInstance);
    if (!contextValue) {
        throw new Error('useAppContext must be used within an AppContextProvider');
    }
    const { context, pageLanguage, logger, title, cardLayout, collectionData, displayMode, truncateLocale, upperCaseLocale } = contextValue.context;

    return { context, pageLanguage, logger, title, cardLayout, collectionData, displayMode, truncateLocale, upperCaseLocale };
};

