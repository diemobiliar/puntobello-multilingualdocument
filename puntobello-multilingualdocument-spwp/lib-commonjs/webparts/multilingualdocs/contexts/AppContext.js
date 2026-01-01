"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAppContext = exports.AppContextProvider = exports.AppContext = void 0;
var tslib_1 = require("tslib");
// React and related imports
var React = tslib_1.__importStar(require("react"));
/**
 * The `AppContext` class is a container for the various properties and configurations used throughout the application.
 * This includes the SharePoint WebPart context, logging utility, language settings, and various display properties.
 */
var AppContext = /** @class */ (function () {
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
    function AppContext(context, logger, pageLanguage, title, cardLayout, collectionData, displayMode, truncateLocale, upperCaseLocale) {
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
    return AppContext;
}());
exports.AppContext = AppContext;
/**
 * React Context for managing the application state and dispatch function.
 * Provides the application context (`AppContext`) and a dispatch function for updating the app state.
 */
var AppContextInstance = React.createContext(undefined);
/**
 * The `AppContextProvider` component wraps its children with the `AppContextInstance` provider.
 * This makes the app context available to all nested components.
 *
 * @param {AppContext} appContext - The application context to provide.
 * @param {React.ReactNode} children - The children components that will have access to the app context.
 *
 * @returns {JSX.Element} The rendered provider component wrapping the children components.
 */
var AppContextProvider = function (_a) {
    var appContext = _a.appContext, children = _a.children;
    return React.createElement(AppContextInstance.Provider, { value: { context: appContext } }, children);
};
exports.AppContextProvider = AppContextProvider;
/**
 * Custom hook to access the application context within any component.
 * Ensures that the hook is used within a component wrapped by `AppContextProvider`.
 *
 * @returns The application context properties, such as `context`, `logger`, `pageLanguage`, etc.
 * @throws Will throw an error if used outside of `AppContextProvider`.
 */
var useAppContext = function () {
    var contextValue = React.useContext(AppContextInstance);
    if (!contextValue) {
        throw new Error('useAppContext must be used within an AppContextProvider');
    }
    var _a = contextValue.context, context = _a.context, pageLanguage = _a.pageLanguage, logger = _a.logger, title = _a.title, cardLayout = _a.cardLayout, collectionData = _a.collectionData, displayMode = _a.displayMode, truncateLocale = _a.truncateLocale, upperCaseLocale = _a.upperCaseLocale;
    return { context: context, pageLanguage: pageLanguage, logger: logger, title: title, cardLayout: cardLayout, collectionData: collectionData, displayMode: displayMode, truncateLocale: truncateLocale, upperCaseLocale: upperCaseLocale };
};
exports.useAppContext = useAppContext;
//# sourceMappingURL=AppContext.js.map