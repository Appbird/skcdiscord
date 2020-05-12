export interface FragConversion {
    [key: string]: (str: string) => string;
}
export const fragConverses: FragConversion = {
    "false-es": str => str.replace(/\s+/g, ""),
    "false-edbhk": str => str.replace(/[\u30A1-\u30FA]/g, ch => String.fromCharCode(ch.charCodeAt(0) - 0x60)),
    "false-edabls": str => str.toLowerCase()
};
