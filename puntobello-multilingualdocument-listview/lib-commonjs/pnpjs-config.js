"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSP = void 0;
// import pnp, pnp logging system, and any other selective imports needed
var sp_1 = require("@pnp/sp");
require("@pnp/sp/webs");
require("@pnp/sp/lists");
require("@pnp/sp/items");
var _sp = null;
var getSP = function (context) {
    if (context != null) {
        _sp = (0, sp_1.spfi)().using((0, sp_1.SPFx)(context));
    }
    return _sp;
};
exports.getSP = getSP;
//# sourceMappingURL=pnpjs-config.js.map