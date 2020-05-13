export enum embedMsgState{
    Success,
    Normal,
    Error
}
export interface IEmbedMessageField{
    name:string;
    value:string;
    inline:boolean;
}
export function embedMessageMaker(title:string,authorName:string,description:string,fields:IEmbedMessageField[],timestamp:Date,state:embedMsgState){
    return {
        embed:{
            color: returnColor(state),
            title: `${returnIcon(state)}${title}`,
            author:{
                name: authorName
            },
            description: description,
            fields: fields,
            timestamp: timestamp
        }
    }
}
function returnColor(state:embedMsgState){

    switch(state){
        case embedMsgState.Success: return 0x64e35f;
        case embedMsgState.Normal: return 0x4297ff;
        case embedMsgState.Error: return 0xff4f42;
    }
}
function returnIcon(state:embedMsgState){
    switch(state){
        case embedMsgState.Success: return ":white_check_mark:";
        case embedMsgState.Normal: return ":information_source:";
        case embedMsgState.Error: return ":exclamation:";
    }
}