import { Message } from "discord.js";

export default interface CommandProcess {
    (msg: Message, tokenArray: String[]): Promise<boolean>;
}
