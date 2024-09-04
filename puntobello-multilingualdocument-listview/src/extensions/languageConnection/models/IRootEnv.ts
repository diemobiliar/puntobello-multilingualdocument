import ICustomCSS from "./ICustomCSS";
import ICustomConfig from "./ICustomConfig";

interface IRootEnv {
    css: ICustomCSS;
    config: ICustomConfig;
}

export default IRootEnv