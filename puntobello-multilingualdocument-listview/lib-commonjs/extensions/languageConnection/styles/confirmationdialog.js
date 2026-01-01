"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fadeInKeyframes = exports.stackTokens = exports.confirmationDialogStyles = void 0;
var react_1 = require("@fluentui/react");
var envconfig_1 = require("../utils/envconfig");
var rootEnv = (0, envconfig_1.getRootEnv)();
exports.confirmationDialogStyles = (0, react_1.mergeStyleSets)({
    container: {
        display: 'flex',
        flexFlow: 'column nowrap',
        alignItems: 'stretch',
        borderRadius: "12px solid ".concat(rootEnv.css['--spfx_border_radius']),
        minWidth: '360px',
        animationName: 'modalFadeIn',
        animationDuration: '0.6s',
        animationTimingFunction: 'ease-out',
        '& body, & p, & h1, & h2, & h3, & h4, & h5, & h6, & li, & a, & span, & div': {
            fontFamily: "".concat(rootEnv.css['--spfx_font_family'], "!important"),
        },
    },
    header: [
        {
            flex: '1 1 auto',
            borderTop: "12px solid ".concat(rootEnv.css['--spfx_color_primary']),
            color: "".concat(rootEnv.css['--spfx_color_primary']),
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
exports.stackTokens = { childrenGap: 15 };
// Keyframe animations as strings
exports.fadeInKeyframes = "\n  @keyframes modalFadeIn {\n    from {\n      opacity: 0;\n      transform: translateY(-20px);\n    }\n    to {\n      opacity: 1;\n      transform: translateY(0);\n    }\n  }\n";
//# sourceMappingURL=confirmationdialog.js.map