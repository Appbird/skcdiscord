import { ClientEvents} from "discord.js";
export default interface IReactProcess<K extends keyof ClientEvents>{
    (...args:ClientEvents[K]): void
}
