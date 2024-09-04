import { mergeStyleSets } from '@fluentui/react/lib/Styling';
import './doccard.css';
import { getRootEnv } from '../utils/envconfig';

const rootEnv = getRootEnv();

export const cardLayoutStyles = mergeStyleSets({
  previewImageCss: {
    width: '100%',
  },
  listTitle: {
    fontSize: rootEnv.css['--spfx_font_size'],
    display: "block",
    marginBottom: 30,
    width: '100%'
  },
  documentCardLinkCard: {
    textDecoration: 'none',
    width: '100%',
    selectors: {
      '@media (min-width: 860px)': {
        width: `calc(50% - 32px)`,
      },
    },
  },
  documentCardSmall: {
    maxWidth: rootEnv.css['--spfx_card_maxwidth'],
    height: rootEnv.css['--spfx_card_height'],
    boxShadow: rootEnv.css['--spfx_card_box_shadow'],
    borderRadius: rootEnv.css['--spfx_border_radius'],
    transitionProperty: 'transform, box-shadow',
    transitionDuration: '0.15s',
    transitionTimingFunction: 'ease',
    selectors: {
      '&:hover': {
        animation: 'slide 1s ease-in-out',
        boxShadow: rootEnv.css['--spfx_card_box_shadow_hover'],
        border: '1px solid rgba(0, 0, 0, 0.06)',
      },
      '&:hover:after': {
        border: 0,
      },
    },
  },
  cardTitle: {
    padding: '8px 15px',
    color: rootEnv.css['--spfx_color_filetitle'],
    lineHeight: `${rootEnv.css['--spfx_font_size_title']}!important`,
    height: '48px',
    display: '-webkit-box',
    '-webkit-box-orient': 'vertical',
    '-webkit-line-clamp': '3',
    overflow: 'hidden',
    textDecoration: 'none',
  },
  DocumentCardPreview: {
    maxWidth: '100% !important',
    maxHeight: '100% !important',
    minWidth: '108px',
    borderRadius: rootEnv.css['--spfx_border_radius'],
  },
  documentCardDate: {
    padding: '2px 16px 10px 16px',
    color: rootEnv.css['--spfx_color_grey'], 
    filter: `brightness(${rootEnv.css['--spfx_color_grey_brightness_dark']})`, 
    fontSize: rootEnv.css['--spfx_font_size_generic'],
  },
    documentCardLinkList: {
    padding: '12px 16px 0px 16px',
  },
  documentCardLinkListItem: {
    color: rootEnv.css['--spfx_color_primary'],
    padding: '0 3px 0 0',
    textDecoration: 'none',
    margin: '0px 5px 0 0',
    display: 'inline-block',
    transition: 'transform 0.2s ease-in-out, color 0.2s ease-in-out',
    fontSize: rootEnv.css['--spfx_font_size_generic'],
    '&:hover': {
      color: rootEnv.css['--spfx_color_primary'],
      transform: 'scale(1.18)',
      filter: `brightness(${rootEnv.css['--spfx_color_primary_brightness_dark']})`
    },
  },
});
