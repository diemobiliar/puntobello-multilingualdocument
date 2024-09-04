import { ExtensionContext } from "@microsoft/sp-extension-base";

// import pnp, pnp logging system, and any other selective imports needed
import { spfi, SPFI, SPFx } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";

let _sp: SPFI = null;

export const getSP = (context?: ExtensionContext): SPFI => {
  if (context != null) {
    _sp = spfi().using(SPFx(context));
  }
  return _sp;
};

