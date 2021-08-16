export class APIAdministrator {
    private origin: string;
    constructor(origin: string = `${location.protocol}//${location.host}`) {
        this.origin = origin;
    }
    async access(functionName: string, requiredObj: any): Promise<any> {
        const convertedName = functionName.replace(/\_/g, "/");
        
        const response = await fetch(`${this.origin}/api/${convertedName}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requiredObj)
        });
        const responseText = await response.text()
        if (response.status !== 200){
            let responseMessage:string;
            try{
                responseMessage = JSON.parse(responseText).message
            } catch(error) {
                responseMessage = `メッセージがありませんでした : ${responseText}`
            }
            throw new Error(`# API: ${convertedName}へのリクエストの結果\n\n### ${response.status} : ${response.statusText} \n\n${responseMessage}\n\n# 入力\n\n${JSON.stringify(requiredObj)}`);
        
        }
        const result = await JSON.parse(responseText);
        return result;
    }
}

export interface IItemOfResolveTableToName {
    id: string;
    Japanese: string;
    JDescription?:string;
    English: string;
    EDescription?:string;
}