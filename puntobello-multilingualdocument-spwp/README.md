# PuntoBello Multilingual Documents Webpart

## Summary
This webpart shows documents which may optionally have language connected documents in various layouts.
If other documents have the same language connection, all the connected will be listed and are accessible with a simple click

![Webpart in action](../assets/multiling-docs-webpart.gif)

### _Notes_
* The fields `pb_LangConn`, `pb_LangCd` must be present in your document library
* This solution depends on [PuntoBello Multilingual Field Customizer](../puntobello-multilingualdocument-field/) and [PuntoBello Multilingual ListView](../puntobello-multilingualdocument-listview/)
* Uses [PnP JS](https://pnp.github.io/pnpjs/) library for all interactions with SharePoint.

### Features
The webpart can show two type of layouts, definable through the webpart property pane :
- Cards 
- Lists 

The webpart renders a list of documents which can be managed through the webpart property pane. The document rendering order can also be managed.

The following informations are displayed :
- File type as an icon
- Document title for the document which url was pasted in
- List of linked documents presented as a clickable link with the locale of the document, e.g. `en-US`, `de-DE`  
  The locale can also be truncated like this `en`, `de`  or uppercased `EN`, `DE`
- Last modified date for the document which url was pasted in

The layout is based on [the fluent ui document card](https://developer.microsoft.com/en-us/fluentui#/controls/web/documentcard) and [the fluent ui detaillist](https://developer.microsoft.com/en-us/fluentui#/controls/web/detailslist)

### Parameters
You can configure all the parameters in the corresponding files located in the `env` directory. Once set, build the solution accordingly.

| Parameter                              | Description                                                              |
|----------------------------------------|--------------------------------------------------------------------------|
| SPFX_COLOR_FILETITLE                   | Color used for file title text.                                           |
| SPFX_COLOR_PRIMARY                     | Primary color used across the application.                                |
| SPFX_COLOR_PRIMARY_BRIGHTNESS_DARK     |Adjusts the brightness of the primary color to a darker shade. The value should be less than 1; the lower the value, the darker the color.           |
| SPFX_COLOR_GREY                        | Standard grey color used for backgrounds or text.                         |
| SPFX_COLOR_GREY_BRIGHTNESS_DARK        | Darker variant of the grey color.  The value should be less than 1; the lower the value, the darker the color.                                       |
| SPFX_COLOR_GREY_BRIGHTNESS_BRIGHT      | Brighter variant of the grey color.  The value should be higher than 1; the higher the value, the brighter the color.                                   |
| SPFX_COLOR_DOC_ICON                    | Color used for document icons.                                            |
| SPFX_COLOR_DOCX_ICON                   | Color specifically for DOCX file icons.                                   |
| SPFX_COLOR_XLS_ICON                    | Color used for XLS file icons.                                            |
| SPFX_COLOR_XLSX_ICON                   | Color specifically for XLSX file icons.                                   |
| SPFX_COLOR_XLSM_ICON                   | Color specifically for XLSM file icons.                                   |
| SPFX_COLOR_PPT_ICON                    | Color used for PPT file icons.                                            |
| SPFX_COLOR_PPTX_ICON                   | Color specifically for PPTX file icons.                                   |
| SPFX_COLOR_ONE_ICON                    | Color used for OneNote file icons.                                        |
| SPFX_COLOR_PDF_ICON                    | Color used for PDF file icons.                                            |
| SPFX_BORDER_RADIUS                     | Radius for rounding the corners of elements.                              |
| SPFX_FONT_FAMILY                       | Font family used throughout the application.                              |
| SPFX_FONT_SIZE_GENERIC                 | Generic font size used for regular text.                                  |
| SPFX_FONT_SIZE_TITLE                   | Font size used for titles and headings.                                   |
| SPFX_CARD_MAXWIDTH                     | Maximum width for card elements.                                          |
| SPFX_CARD_HEIGHT                       | Height for card elements.                                                 |
| SPFX_CARD_BOX_SHADOW                   | Box shadow styling for card elements.                                     |
| SPFX_CARD_BOX_SHADOW_HOVER             | Box shadow styling for card elements when hovered.                        |


### _Note_
* Uses PnP-Js library for all rest interactions with sharepoint.

## Compatibility
![SPFx 1.21.0](https://img.shields.io/badge/SPFx-1.21.0-green.svg)
![Node.js v22.15.0](https://img.shields.io/badge/Node.js-%20v22.15.0-green.svg)
![SharePoint Online](https://img.shields.io/badge/SharePoint-Online-green.svg)
![Teams N/A: Untested with Microsoft Teams](https://img.shields.io/badge/Teams-N%2FA-lightgrey.svg "Untested with Microsoft Teams") 
![Local Workbench](https://img.shields.io/badge/Workbench-Local-red.svg)
![Workbench Hosted](https://img.shields.io/badge/Workbench-Hosted-red.svg)

## Solution

Solution|Author(s)
--------|---------
puntobello-multilingualdocument-spwp | Nello D'Andrea, die Mobiliar

## Version history

Version|Date|Comments
-------|----|--------
1.1.0   | July 2025 | Upgraded with Pantoum SPFx AI Upgrader
1.0.0|September 2024|Initial release

## License
[MIT License](../LICENSE.md)

## Acknowledgment Request

If you find this software useful and incorporate it into your own projects, especially for commercial purposes, we kindly ask that you acknowledge its use. This acknowledgment can be as simple as mentioning "Powered by Die Mobiliar - PuntoBello" in your product's documentation, website, or any related materials.

While this is not a requirement of the MIT License and is entirely voluntary, it helps support and recognize the efforts of the developers who contributed to this project. We appreciate your support!