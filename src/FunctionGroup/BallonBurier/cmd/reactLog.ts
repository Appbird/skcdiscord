import { Message} from "discord.js";
import SaveDataController from "../Base/SaveDataController";

export default function reactLog(msg:Message,tokens:string[]){
    const saved = SaveDataController.configLoad();
    
    saved.idOfChannelWhichItOutputReactLogTo = msg.channel.id;
    if (tokens[2].toLowerCase() === "-delete") {
        saved.idOfChannelWhichItOutputReactLogTo = ""
    }

    SaveDataController.configSave(saved);

}
