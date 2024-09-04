import { mergeStyleSets } from '@fluentui/react';
import { getRootEnv } from '../utils/envconfig';

const rootEnv = getRootEnv();

export const confirmationDialogStyles = mergeStyleSets({
  container: {
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'stretch',
    borderRadius: `12px solid ${rootEnv.css['--spfx_border_radius']}`,
    minWidth: '360px',
    animationName: 'modalFadeIn',
    animationDuration: '0.6s',
    animationTimingFunction: 'ease-out',
    '& body, & p, & h1, & h2, & h3, & h4, & h5, & h6, & li, & a, & span, & div': {
      fontFamily: `${rootEnv.css['--spfx_font_family']}!important`,
    },
  },
  header: [
    {
      flex: '1 1 auto',
      borderTop: `12px solid ${rootEnv.css['--spfx_color_primary']}`,
      color: `${rootEnv.css['--spfx_color_primary']}`,
      display: 'flex',
      alignItems: 'center',
      fontSize: rootEnv.css['--spfx_font_size_title'],
      padding: '12px 12px 14px 24px',
    },
  ],
  body: {
    flex: '4 4 auto',
    padding: '0 24px 24px 24px',
    overflowY: 'hidden',
    fontSize: rootEnv.css['--spfx_font_size_generic'],
    selectors: {
      p: { margin: '14px 0' },
      'p:first-child': { marginTop: 0 },
      'p:last-child': { marginBottom: 0 },
    },
  },
  button: {
    margin: '0 24px',
  },
});

export const stackTokens = { childrenGap: 15 };

// Keyframe animations as strings
export const fadeInKeyframes = `
  @keyframes modalFadeIn {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

