import { IRootEnv } from "../models";

let rootEnv: IRootEnv | null = null;

/**
 * Retrieves the root environment configuration settings, including CSS variables and SharePoint configuration.
 * The configuration is lazily initialized and cached for future use.
 * 
 * @returns {IRootEnv} The root environment configuration object containing CSS variables and SharePoint configuration settings.
 * 
 * @example
 * const env = getRootEnv();
 * console.log(env.css['--spfx_color_primary']); // Output: The primary UI color defined in the environment
 */
export const getRootEnv = (): IRootEnv => {
    if (!rootEnv) {
        // Lazily initialize the root environment configuration if it hasn't been initialized yet
        rootEnv = {
            css: {
                '--spfx_color_primary': process.env.SPFX_COLOR_PRIMARY,
                '--spfx_color_primary_brightness_dark': process.env.SPFX_COLOR_PRIMARY_BRIGHTNESS_DARK,
                '--spfx_theme_color_ui_dark_primary': process.env.SPFX_THEME_COLOR_UI_DARK_PRIMARY,
                '--spfx_theme_color_ui_bright_grey': process.env.SPFX_THEME_COLOR_UI_BRIGHT_GREY,
                '--spfx_theme_color_ui_middle_grey': process.env.SPFX_THEME_COLOR_UI_MIDDLE_GREY,
                '--spfx_theme_color_ui_dark_grey': process.env.SPFX_THEME_COLOR_UI_DARK_GREY,
                '--spfx_border_radius': process.env.SPFX_BORDER_RADIUS,
                '--spfx_font_family': process.env.SPFX_FONT_FAMILY,
                '--spfx_font_size_generic': process.env.SPFX_FONT_SIZE_GENERIC,
                '--spfx_font_size_title': process.env.SPFX_FONT_SIZE_TITLE,
            },
            config: {
            }
        };
    }
    return rootEnv;
};
