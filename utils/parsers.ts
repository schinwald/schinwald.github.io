import type { ClassName, Icon, Justification } from "./types";

export function parseClassName(className: ClassName): string {
    let result = "";
    if (className) result = result.concat(className);
    return result;
}

export function parseIcon(icon: Icon): string {
    let result = "";
    if (icon) {
        switch (icon.type) {
            case 'fontawesome':
                result = ["icon", "icon--" + icon.name, "icon--position-" + icon.position].join(" ");
                break;
            case 'devicon':
                result = ["icon", "devicon-" + icon.name, "icon--position-" + icon.position].join(" ");
                break;
        }
    }
    return result;
}