import { dbInit, event, CommandClient, command, CommandContext, GatewayIntents } from '../deps.ts';
//import { dbInit, setGuildPrefix, getGuildPrefix, setGuildWelcomeUrl, getGuildWelcomeUrl } from '../deps.ts';
import "https://deno.land/x/dotenv@v3.0.0/load.ts";
import Logger from "https://deno.land/x/logger@v1.0.0/logger.ts";

class OmegaClient extends CommandClient {
    readonly logger = new Logger();
    readonly discord_token = Deno.env.get('DISCORD_TOKEN');
    readonly discord_app_id = Deno.env.get('DISCORD_APP_ID');

    constructor() {
        super({
            prefix: ['~'],
            caseSensitive: false,
            allowBots: false
        });

        this.commands.loader.loadDirectory('./src/commands');
        dbInit()
    }

    @event()
    ready(): void {
        this.logger.info(`Logged in as ${this.user?.tag}!`);
    }

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
client.connect(client.discord_token, [
    GatewayIntents.DIRECT_MESSAGES,
    GatewayIntents.GUILDS,
    GatewayIntents.GUILD_MESSAGES,
    GatewayIntents.GUILD_MEMBERS
]);
