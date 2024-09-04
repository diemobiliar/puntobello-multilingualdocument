import { IDetailsColumnStyles } from '@fluentui/react';
import { mergeStyleSets } from '@fluentui/react/lib/Styling';
import { getRootEnv } from '../utils/envconfig';

const rootEnv = getRootEnv();

export const docListLayoutStyles = mergeStyleSets({
  fileIconHeaderIcon: {
    padding: 0,
    fontSize: rootEnv.css['--spfx_font_size_generic']
  },
  fileIconCell: {
    textAlign: "center",
    selectors: {
      "&:before": {
        content: "",
        display: "inline-block",
        verticalAlign: "middle",
        height: "100%",
        width: "0px",
        visibility: "hidden"
      }
    }
  },
  fileIconImg: {
    verticalAlign: "middle",
    padding: '0',
    fontSize: rootEnv.css['--spfx_font_size_generic']
  },
  listTitle: {
    fontSize: rootEnv.css['--spfx_font_size_title'],
    display: "block",
  },
  headerFileTitle: {
    selector: {
      '&:hover': {
        'background-color': 'none',
      },
    },
  },
  fileTitle: {
    'text-decoration': 'none',
    color: rootEnv.css['--spfx_color_filetitle'],
    display: 'block',
    overflow: 'hidden',
    whiteSpace: 'normal',
    textOverflow: 'clip',
    lineHeight: '1.5',
    fontSize: rootEnv.css['--spfx_font_size_generic'],
  },
  documentCardLinkListLanguage: {
    padding: "0px 0px",
  },
  documentCardLinkListItemLanguage: {
    color: rootEnv.css['--spfx_color_primary'],
    padding: "0 3px 0 0",
    "text-decoration": "none",
    margin: "0 5px 0 0",
    '&:hover': {
      color: rootEnv.css['--spfx_color_primary'],
      filter: `brightness(${rootEnv.css['--spfx_color_primary_brightness_dark']})`

    },
  },
  documentCardLinkListTarget: {
    'text-decoration': 'none',
  },
});

export const headerStyle: Partial<IDetailsColumnStyles> = {
  root: {
    '&:hover': {
      'background-color': "transparent",
    }
  }
};