import { Command, CommandContext, Embed } from '../../deps.ts';

export default class HelpCommand extends Command {
    name = 'help'
    aliases = [ '?', 'wtf' ]
    description = 'you aint gonna get no help'
    category = 'utility'

    execute(ctx: CommandContext): void {
        ctx.message.reply({
            embed: new Embed()
                .setAuthor({
                    name: 'Omega',
                    url: 'https://theomega.zone/',
                    icon_url: 'https://cdn.discordapp.com/avatars/747551324849307810/fb85aa37b55ef67efdf45df0322a5a2d.png'
                })
                .setTitle('Omega Help')
                .setURL('https://theomega.zone/doc/command-help/')
                .setDescription('Commands with a ~~strikethough~~ are unavailable.')
                .addField('general', '`about`\n`welcome`', true)
                .addField('utility', '`help`\n`roll`\n`whoami`', true)
                .setColor(0x1ABC9C)
        })
    }
}