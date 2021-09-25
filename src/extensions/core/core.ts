import Logger from "https://deno.land/x/logger@v1.0.0/logger.ts";
import { CommandClient, Extension } from './deps.ts'
import {
    AboutCommand,
    DebugCommand,
    HelpCommand,
    PrefixCommand,
    RolesCommand,
    RollCommand,
    SettingsCommand,
    WelcomeCommand,
    WhoisCommand
} from './commands.ts'

export class OmegaCore extends Extension {
    name = this.constructor.name
    logger: Logger

    constructor(client: CommandClient) {
        super(client)
        this.logger = new Logger()
    }

    load(): void {
        this.logger.info(`[${this.name}]`, '#load')
        this.registerCommands()
        this.registerListeners()
    }

    registerCommands(): void {
        this.logger.info(`[${this.name}]`, '#registerCommands')
        this.commands.add(AboutCommand)
        this.commands.add(DebugCommand)
        this.commands.add(HelpCommand)
        this.commands.add(PrefixCommand)
        this.commands.add(RolesCommand)
        this.commands.add(RollCommand)
        this.commands.add(SettingsCommand)
        this.commands.add(WelcomeCommand)
        this.commands.add(WhoisCommand)
    }

    registerListeners(): void {
        this.logger.info(`[${this.name}]`, '#registerListeners')
    }
}