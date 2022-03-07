export type ClassName = string | undefined;

export type Icon = {
    type: string;
    name: string;
    position: "top" | "right" | "bottom" | "left" | "center";
} | undefined;

export type Justification = "left" | "center" | "right" | undefined;