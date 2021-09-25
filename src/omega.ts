import { OmegaDB, event, CommandClient, command, CommandContext, GatewayIntents } from '../deps.ts';
import "https://deno.land/x/dotenv@v3.0.0/load.ts";
import Logger from "https://deno.land/x/logger@v1.0.0/logger.ts";

import { OmegaCore } from './extensions/core/core.ts'

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

        this.loadExtensions()

        this.getGuildPrefix = function(guildId: string) {
            return OmegaDB.getGuildPrefix(guildId)
        }
    }

    loadExtensions(): void {
        this.logger.info(`[${this.constructor.name}]`, '#loadExtensions');
        this.extensions.load(OmegaCore)
    }

    @event()
    ready(): void {
        this.logger.info(`[${this.constructor.name}]`, `Logged in as ${this.user?.tag}!`);
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
}

const client = new OmegaClient();
client.connect(DISCORD_TOKEN, [
    GatewayIntents.DIRECT_MESSAGES,
    GatewayIntents.GUILDS,
    GatewayIntents.GUILD_MESSAGES,
    GatewayIntents.GUILD_MEMBERS
]);
