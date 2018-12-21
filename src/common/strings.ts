import LocalizedStrings, { LocalizedStringsMethods } from "react-localization";
import { replaceVariablesInJson } from "./utils";
import { english } from "./localization/en";
import { spanish } from "./localization/es";

export interface IAppStrings {
    appName: string;
    common: {
        displayName: string;
        description: string;
        submit: string;
        cancel: string;
        provider: string;
    };
    homePage: {
        newProject: string;
        openProject: string;
        recentProjects: string;
    };
    appSettings: {
        storageTitle: string;
        uiHelp: string;
    };
    projectSettings: {
        sourceConnection: {
            title: string;
            description: string;
        }
        targetConnection: {
            title: string;
            description: string;
        }
        addConnection: string;
    };
    tags: {
        title: string;
        modal: {
            name: string;
            color: string;
        }
        colors: {
            white: string;
            gray: string;
            red: string;
            maroon: string;
            yellow: string;
            olive: string;
            lime: string;
            green: string;
            aqua: string;
            teal: string;
            blue: string;
            navy: string;
            fuschia: string;
            purple: string;
        }
    };
    connections: {
        title: string;
        details: string;
        settings: string;
        connectionPageInstructions: string;
        providers: {
            azureBlob: {
                title: string;
            }
            bing: {
                title: string;
                options: string;
                apiKey: string;
                query: string;
                aspectRatio: string;
            },
            local: {
                title: string;
                folderPath: string;
                selectFolder
            },
        }
    };
    editorPage: {
        width: string;
        height: string;
        toolbar: {
            select: string;
            pan: string;
            drawRectangle: string;
            drawPolygon: string;
            saveProject: string;
            exportProject: string;
        }
    };
    exportPage: {
        providers: {
            vottJson: string;
            azureCV: string;
            tfRecords: string;
        },
    };
}

interface IStrings extends LocalizedStringsMethods, IAppStrings {}

export const strings: IStrings = new LocalizedStrings({
    en: english,
    es: spanish,
});

function getLocValue(variable: string): string {
    const varName = variable.replace(/\${}\s/g, "");
    if (varName.length === 0) {
        throw new Error("Empty variable name");
    }
    const split = varName.split(".");
    let result;
    try {
        result = strings[split[0]];
    } catch (e) {
        throw new Error(`Variable ${varName} not found in strings`);
    }
    for (let i = 1; i < split.length; i++) {
        try {
            result = result[split[i]];
        } catch (e) {
            throw new Error(`Variable ${varName} not found in strings`);
        }
    }
    return result;
}

export function addLocValues(json: any) {
    return replaceVariablesInJson(json, getLocValue);
}
