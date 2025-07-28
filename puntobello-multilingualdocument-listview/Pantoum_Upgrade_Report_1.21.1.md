# SPFx Upgrade Report - puntobello-multilingualdocument-listview

## Summary
- **Solution**: puntobello-multilingualdocument-listview
- **Target Version**: 1.21.1
- **Date**: 2025-07-28T09:56:26.464Z
- **Pantoum Version**: 1.0.0
- **Status**: ✅ Success (M365 CLI had warnings)

## Command Used
```bash
pantoum \\
  --local-path ../../puntobello-multilingualdocument \\
  --toVersion 1.21.1 \\
  --excludePatchIds FN019002,FN017001,FN012019 \\
  --onSingleSolutionFail continue \\
  --perSolutionReports true \\
  --fixM365UpgradeErrors true \\
  --fixSuccessStepErrors true
```

## Patches Applied (25 total)

### M365 CLI Patches (16)

#### FN001001: @microsoft/sp-core-library
- **Description**: Upgrade SharePoint Framework dependency package @microsoft/sp-core-library
- **Type**: updateDependency
- **Package**: @microsoft/sp-core-library
- **New Version**: 1.21.1

#### FN001014: @microsoft/sp-listview-extensibility
- **Description**: Upgrade SharePoint Framework dependency package @microsoft/sp-listview-extensibility
- **Type**: updateDependency
- **Package**: @microsoft/sp-listview-extensibility
- **New Version**: 1.21.1

#### FN001013: @microsoft/decorators
- **Description**: Upgrade SharePoint Framework dependency package @microsoft/decorators
- **Type**: updateDependency
- **Package**: @microsoft/decorators
- **New Version**: 1.21.1

#### FN001034: @microsoft/sp-adaptive-card-extension-base
- **Description**: Install SharePoint Framework dependency package @microsoft/sp-adaptive-card-extension-base
- **Type**: updateDependency
- **Package**: @microsoft/sp-adaptive-card-extension-base
- **New Version**: 1.21.1

#### FN002001: @microsoft/sp-build-web
- **Description**: Upgrade SharePoint Framework dev dependency package @microsoft/sp-build-web
- **Type**: updateDependency
- **Package**: @microsoft/sp-build-web
- **New Version**: 1.21.1

#### FN002002: @microsoft/sp-module-interfaces
- **Description**: Upgrade SharePoint Framework dev dependency package @microsoft/sp-module-interfaces
- **Type**: updateDependency
- **Package**: @microsoft/sp-module-interfaces
- **New Version**: 1.21.1

#### FN002022: @microsoft/eslint-plugin-spfx
- **Description**: Upgrade SharePoint Framework dev dependency package @microsoft/eslint-plugin-spfx
- **Type**: updateDependency
- **Package**: @microsoft/eslint-plugin-spfx
- **New Version**: 1.21.1

#### FN002023: @microsoft/eslint-config-spfx
- **Description**: Upgrade SharePoint Framework dev dependency package @microsoft/eslint-config-spfx
- **Type**: updateDependency
- **Package**: @microsoft/eslint-config-spfx
- **New Version**: 1.21.1

#### FN010001: .yo-rc.json version
- **Description**: Update version in .yo-rc.json
- **Type**: updateJsonSnippet
- **File**: /Users/nellodandrea/dev/mobi/github/ferrarirosso/puntobello-multilingualdocument/puntobello-multilingualdocument-listview/.yo-rc.json
- **Changes**: {
  "@microsoft/generator-sharepoint": {
    "version": "1.21.1"
  }
}

#### FN002024: eslint
- **Description**: Upgrade SharePoint Framework dev dependency package eslint
- **Type**: updateDependency
- **Package**: eslint
- **New Version**: 8.57.1

#### FN002026: typescript
- **Description**: Upgrade SharePoint Framework dev dependency package typescript
- **Type**: updateDependency
- **Package**: typescript
- **New Version**: 5.3.3

#### FN002029: @microsoft/rush-stack-compiler-5.3
- **Description**: Install SharePoint Framework dev dependency package @microsoft/rush-stack-compiler-5.3
- **Type**: updateDependency
- **Package**: @microsoft/rush-stack-compiler-5.3
- **New Version**: 0.1.0

#### FN012017: tsconfig.json extends property
- **Description**: Update tsconfig.json extends property
- **Type**: updateJsonSnippet
- **File**: /Users/nellodandrea/dev/mobi/github/ferrarirosso/puntobello-multilingualdocument/puntobello-multilingualdocument-listview/tsconfig.json
- **Changes**: {
  "extends": "./node_modules/@microsoft/rush-stack-compiler-5.3/includes/tsconfig-web.json"
}

#### FN021003: package.json engines.node
- **Description**: Update package.json engines.node property
- **Type**: updateJsonSnippet
- **File**: /Users/nellodandrea/dev/mobi/github/ferrarirosso/puntobello-multilingualdocument/puntobello-multilingualdocument-listview/package.json
- **Changes**: {
  "engines": {
    "node": ">=22.14.0 < 23.0.0"
  }
}

#### FN002021: @rushstack/eslint-config
- **Description**: Upgrade SharePoint Framework dev dependency package @rushstack/eslint-config
- **Type**: updateDependency
- **Package**: @rushstack/eslint-config
- **New Version**: 4.0.1

#### FN010010: .yo-rc.json @microsoft/teams-js SDK version
- **Description**: Update @microsoft/teams-js SDK version in .yo-rc.json
- **Type**: updateJsonSnippet
- **File**: /Users/nellodandrea/dev/mobi/github/ferrarirosso/puntobello-multilingualdocument/puntobello-multilingualdocument-listview/.yo-rc.json
- **Changes**: {
  "@microsoft/generator-sharepoint": {
    "sdkVersions": {
      "@microsoft/teams-js": "2.24.0"
    }
  }
}

### Manual Configuration Patches (9)

#### M000001: Upgrade pnp sp to 4.14.0 after SPFx upgrade
- **Description**: Upgrade pnp sp to 4.14.0 after SPFx upgrade
- **Type**: updateDependency
- **Package**: @pnp/sp
- **New Version**: 4.14.0

#### M000004: Remove es6-promise from tsconfig.json
- **Description**: Remove es6-promise from tsconfig.json

#### M000005: Wipe node_modules clean
- **Description**: Wipe node_modules clean
- **Type**: runShellCommand
- **Command**: `rm -rf node_modules`

#### M000006: Delete package-lock.json
- **Description**: Delete package-lock.json

#### M999998: npm install to ensure all dependencies are up to date
- **Description**: npm install to ensure all dependencies are up to date
- **Type**: runShellCommand
- **Command**: `npm install`

#### PANTOUM-VERSION-UPDATE-PACKAGE: Update package.json version
- **Description**: Increment version from 1.00.000 to 1.1.0
- **Type**: updateJsonSnippet
- **File**: /Users/nellodandrea/dev/mobi/github/ferrarirosso/puntobello-multilingualdocument/puntobello-multilingualdocument-listview/package.json
- **Changes**: {
  "version": "1.1.0"
}

#### PANTOUM-UPDATE-YORC-NODE: Update Node version in .yo-rc.json
- **Description**: Update nodeVersion to 22.15.0
- **Type**: updateJsonSnippet
- **File**: /Users/nellodandrea/dev/mobi/github/ferrarirosso/puntobello-multilingualdocument/puntobello-multilingualdocument-listview/.yo-rc.json
- **Changes**: {
  "@microsoft/generator-sharepoint": {
    "nodeVersion": "22.15.0"
  }
}

#### PANTOUM-UPDATE-BADGES: Update SPFx and Node.js version badges
- **Description**: Update badges to SPFx 1.21.1 and Node.js 22.15.0

#### PANTOUM-ADD-VERSION-HISTORY: Add version history entry
- **Description**: Add version 1.1.0 to history

## Build Verification
- **Status**: ✅ All build steps pass

## Configuration
- **Manual Config**: pantoum.config.yml

