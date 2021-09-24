import { OmegaDB, event, CommandClient, command, CommandContext, GatewayIntents } from '../deps.ts';
//import { doWelcomeFor } from './util/welcome.ts';
import "https://deno.land/x/dotenv@v3.0.0/load.ts";
import Logger from "https://deno.land/x/logger@v1.0.0/logger.ts";

import { VERSION } from '../index.ts';

const DISCORD_TOKEN = Deno.env.get('DISCORD_TOKEN');
const DISCORD_APP_ID = Deno.env.get('DISCORD_APP_ID');

export class OmegaClient extends CommandClient {
    logger: Logger
    version: string

    constructor() {
        super({
            prefix: ['~'],
            mentionPrefix: true,
            caseSensitive: false,
            allowBots: false,
            presence: {
                name: 'Awaiting your command...',
                type: 'CUSTOM_STATUS'
            }
        });

        this.version = VERSION;
        this.applicationID = DISCORD_APP_ID;
        this.logger = new Logger()
        OmegaDB.init()

        this.commands.loader.loadDirectory('./src/commands');

        this.getGuildPrefix = function(guildId: string) {
            return OmegaDB.getGuildPrefix(guildId)
        }
    }

    @event()
    ready(): void {
        this.logger.info(`Logged in as ${this.user?.tag}!`);
    }

    // @event()
    // async guildMemberAdd(member: Member): Promise<void> {
    //     const channels = await member.guild.channels.array()
    //     if (OmegaDB.isGuildWelcomeEnabled(member.guild.id))

    //     doWelcomeFor(member.user, channels.filter(c=>c.name==='general'))
    // }

    @command({ aliases: 'pong' })
    ping(ctx: CommandContext): void {
        ctx.message.reply('Pong!');
    }

    // TODO: Make these privileged to guild admins and implement better structure
    // `prefix <reset|set|get>`
    // `welcome_msg <reset|set|get>`
    // `welcome_url <clear|set|get>`

    // @command()
    // setPrefix(ctx: CommandContext): void {
    //     const guildId = ctx.message.guild?.id
    //     ctx.message.reply(ctx.rawArgs[0])
    //     if (guildId !== undefined) setGuildPrefix(guildId, ctx.rawArgs[0])
    // }

    // @command()
    // getPrefix(ctx: CommandContext): void {
    //     const guildId = ctx.message.guild?.id
    //     let prefix = '~'
    //     if (guildId !== undefined) {
    //         const rowResult = getGuildPrefix(guildId)
    //         if (rowResult !== undefined) prefix = rowResult[0] as string
    //     }

    //     ctx.message.reply(prefix)
    // }

    // @command()
    // setWelcomeUrl(ctx: CommandContext): void {
    //     const guildId = ctx.message.guild?.id
    //     ctx.message.reply(ctx.rawArgs[0])
    //     if (guildId !== undefined) setGuildWelcomeUrl(guildId, ctx.rawArgs[0])
    // }
}

const client = new OmegaClient();
client.connect(DISCORD_TOKEN, [
    GatewayIntents.DIRECT_MESSAGES,
    GatewayIntents.GUILDS,
    GatewayIntents.GUILD_MESSAGES,
    GatewayIntents.GUILD_MEMBERS
]);
