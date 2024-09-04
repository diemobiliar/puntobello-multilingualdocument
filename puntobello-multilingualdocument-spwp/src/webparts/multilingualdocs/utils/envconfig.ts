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
                '--spfx_color_filetitle': process.env.SPFX_COLOR_FILETITLE,
                '--spfx_color_primary': process.env.SPFX_COLOR_PRIMARY,
                '--spfx_color_primary_brightness_dark': process.env.SPFX_COLOR_PRIMARY_BRIGHTNESS_DARK,
                '--spfx_color_grey': process.env.SPFX_COLOR_GREY,
                '--spfx_color_grey_brightness_dark': process.env.SPFX_COLOR_GREY_BRIGHTNESS_DARK,
                '--spfx_color_grey_brightness_bright': process.env.SPFX_COLOR_GREY_BRIGHTNESS_BRIGHT,
                '--spfx_color_doc_icon': process.env.SPFX_COLOR_DOC_ICON,
                '--spfx_color_docx_icon': process.env.SPFX_COLOR_DOCX_ICON,
                '--spfx_color_xls_icon': process.env.SPFX_COLOR_XLS_ICON,
                '--spfx_color_xlsx_icon': process.env.SPFX_COLOR_XLSX_ICON,
                '--spfx_color_xlsm_icon': process.env.SPFX_COLOR_XLSM_ICON,
                '--spfx_color_ppt_icon': process.env.SPFX_COLOR_PPT_ICON,
                '--spfx_color_pptx_icon': process.env.SPFX_COLOR_PPTX_ICON,
                '--spfx_color_one_icon': process.env.SPFX_COLOR_ONE_ICON,
                '--spfx_color_pdf_icon': process.env.SPFX_COLOR_PDF_ICON,
                '--spfx_border_radius': process.env.SPFX_BORDER_RADIUS,
                '--spfx_card_box_shadow': process.env.SPFX_CARD_BOX_SHADOW,
                '--spfx_card_box_shadow_hover': process.env.SPFX_CARD_BOX_SHADOW_HOVER,
                '--spfx_card_maxwidth': process.env.SPFX_CARD_MAXWIDTH,
                '--spfx_card_height': process.env.SPFX_CARD_HEIGHT,
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