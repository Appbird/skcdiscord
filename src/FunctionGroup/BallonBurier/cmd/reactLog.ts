import { Message} from "discord.js";
import SaveDataController from "../Base/SaveDataController";
import { embedMessageMaker, embedMsgState } from "../../../helper/embedMessageMaker";
import BallonBurier from "../BallonBurier";

export default function reactLog(msg:Message,tokens:string[]){
    const saved = SaveDataController.configLoad();
    
    saved.idOfChannelWhichItOutputReactLogTo = msg.channel.id;
    if (tokens[2].toLowerCase() === "-delete") {
        saved.idOfChannelWhichItOutputReactLogTo = ""
    }

    SaveDataController.configSave(saved);
    msg.channel.send(embedMessageMaker(
        (saved.idOfChannelWhichItOutputReactLogTo !== "")?
                "このチャンネルをログ出力先チャンネルとして設定しました！":
                "ログを出力しないように設定しました！",
                BallonBurier.realFuncName,
        (saved.idOfChannelWhichItOutputReactLogTo !== "")?
                "今後このチャンネルにログが出力されます。":
                "どこかのチャンネルでもう一度このコマンドを入力するとログが出力されるようになります。",
                [],new Date(),embedMsgState.Normal))

}
