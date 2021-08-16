import { Channel, GuildMember, Message, Role } from "discord.js";
import helperAboutError from "../../helper/programHelperFunctions/helperAboutError";
import getEnvVariable from "../../helper/programHelperFunctions/helperAboutVariable";
import { APIAdministrator, IItemOfResolveTableToName } from "./APICaller";


export async function kssrs_rolegiver(msg:Message){
    try {
        const arg = msg.content.split(" ").slice(2).join(" ")
        const tokenArray = arg.replace(/\s*\/\s*/g,"/").split("/")
        const gamemode = `${tokenArray[0]}/${tokenArray[1]}`
        const gamemodeRole = msg.guild?.roles.cache.find(role => role.name === `${gamemode}`)
        if (gamemodeRole !== undefined) {
            if (msg.member === null) {
                helperAboutError.throwErrorToDiscord(msg.channel,"An Error has been Occured.",`The author of this message(${msg.content}) is not found. (From ${msg.author.username})`)
                return;
            }
            giveRole(msg.channel,gamemodeRole,msg.member)
            
            return;
        }

        //#NOTE 実際に対応する作品が存在するか調査 
        const apiCaller = new APIAdministrator()
        const gameSystemCollection = (await apiCaller.access("list_gameSystems",{})).result as IItemOfResolveTableToName[]
        const [requestedGameSystemName, requestedGameModeName] = [tokenArray[0],tokenArray[1]];
        const requestedGameSystem = gameSystemCollection.find(gameSystem => gameSystem.English === requestedGameSystemName)
        if (requestedGameSystem === undefined){
            helperAboutError.throwErrorToDiscord(msg.channel,"An Error has been Occured.",`The title **${requestedGameSystemName}** is not found. (From ${msg.author.username})`)
            
            return;
        }
        const requestedGameMode = ((await apiCaller.access("list_gameModes",{gameSystemEnv: { gameSystemID:requestedGameSystem.id }})).result as IItemOfResolveTableToName[]).find((tgamemode) => tgamemode.English === requestedGameModeName )
        if (requestedGameMode === undefined){
            helperAboutError.throwErrorToDiscord(msg.channel,"An Error has been Occured.",`The mode **${requestedGameModeName}** is not found. (From ${msg.author.username})`)
            
            return;
        }

        if (msg.guild === null || msg.member === null) {
            helperAboutError.throwErrorToDiscord(msg.channel,"An Error has been Occured.",`The guild or member is not found. (From ${msg.author.username})`)
            return
        }
        const newRole = await msg.guild.roles.create({data:{name:gamemode, color:"GREEN", mentionable:true}})
        giveRole(msg.channel,newRole,msg.member)
        await apiCaller.access("addDiscordRoleID",{gameSystemEnv:{gameSystemID:requestedGameSystem.id,gameModeID:requestedGameMode.id},id:newRole.id,token:getEnvVariable("KSSRs_TOKEN")})
    }catch(err){
        helperAboutError.throwErrorToDiscord(msg.channel,"An Error has been Occured.",err.message+` (From ${msg.author.username})`)
    }
}
    
export async function kssrs_roledepriver(msg:Message){
    try{
        const arg = msg.content.split(" ").slice(2).join(" ")
        const tokenArray = arg.replace(/\s*\/\s*/g,"/").split("/")
        const roleName = `${tokenArray[0]}/${tokenArray[1]}`
        if (msg.member === null){
            helperAboutError.throwErrorToDiscord(msg.channel,"An Error has been Occured.",`The messsage from **${msg.author.username}** of member is not found. (From ${msg.author.username})`)
            return
        }
        const role = msg.member.roles.cache.find(role => role.name === roleName)
        if (role === undefined) {
            helperAboutError.throwErrorToDiscord(msg.channel,"An Error has been Occured.",`Role **${roleName}** is not found. (From ${msg.author.username})`)
            return
        }
        await msg.member.roles.remove(role)
        await msg.channel.send(`Responder deprives ${msg.author.username} of the Role ${role.name}`)
      
    }catch(err){
        helperAboutError.throwErrorToDiscord(msg.channel,"An Error has been Occured.",err.message + `(From ${msg.author.username})`)
    }
}

export async function giveKSSRsGameTitleList(msg:Message){
    try{
        const apiCaller = new APIAdministrator()
        const gameSystemCollection = (await apiCaller.access("list_gameSystems",{})).result as IItemOfResolveTableToName[]
        msg.channel.send(gameSystemCollection.map(gamesystem => `・ ${gamesystem.Japanese} / ${gamesystem.English}`).join("\n"))
    }catch(err){
        helperAboutError.throwErrorToDiscord(msg.channel,"An Error has been Occured.",err.message + `(From ${msg.author.username})`)
    }
        
}
export async function giveKSSRsGameModeList(msg:Message){
    try{
        const arg = msg.content.split(" ").slice(2).join(" ")
        const apiCaller = new APIAdministrator()
        const gameSystemCollection = (await apiCaller.access("list_gameSystems",{})).result as IItemOfResolveTableToName[]
        const requestedGameSystemName = arg;
        const requestedGameSystem = gameSystemCollection.find(gameSystem => gameSystem.English === requestedGameSystemName)
        if (requestedGameSystem === undefined){
            helperAboutError.throwErrorToDiscord(msg.channel,"An Error has been Occured.",`The title ${requestedGameSystemName} is not found. (From ${msg.author.username})`)
            return;
        }
        const gameModeCollection = ((await apiCaller.access("list_gameModes",{gameSystemEnv: { gameSystemID:requestedGameSystem.id }})).result as IItemOfResolveTableToName[])
        
        msg.channel.send(gameModeCollection.map(gameMode => `・ ${gameMode.Japanese} / ${gameMode.English}`).join("\n"))
    }catch(err){
        helperAboutError.throwErrorToDiscord(msg.channel,"An Error has been Occured.",err.message + `(From ${msg.author.username})`)
    }
    
        
}
async function giveRole(channel:Channel,role:Role,member:GuildMember){
    await member.roles.add(role)
    await channel.send(`Role **${role.name}** is given to ${member.displayName}.`)
            
}