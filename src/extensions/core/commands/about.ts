import { ButtonStyle, Command, CommandContext, Embed, MessageComponents, OmegaDB, VERSION } from '../deps.ts'

export class AboutCommand extends Command {
    name = 'about'
    aliases = [ 'why', 'bot', 'info' ]
    description = 'information about Omega'
    category = 'general'

    async execute(ctx: CommandContext): Promise<void> {
        const prefix = OmegaDB.getGuildPrefix(ctx.guild?.id)

        ctx.message.reply({
            reply: ctx.message,
            embed: new Embed()
                // .setAuthor({
                //     name: 'Omega',
                //     url: 'https://theomega.zone/',
                //     icon_url: 'https://cdn.discordapp.com/avatars/747551324849307810/fb85aa37b55ef67efdf45df0322a5a2d.png'
                // })
                .setTitle('Awaiting your command...')
                .setDescription(`I\'m listening to messages starting with \`${prefix}\`, so feel free to ask for \`${prefix}help\``)
                .addField({
                    name: 'Prefix',
                    value: `\`${prefix}\``,
                    inline: true
                })
                .addField({
                    name: 'Guilds',
                    value: `\`${await ctx.client.guilds.size()}\``,
                    inline: true
                })
                .addField({
                    name: 'Version',
                    value: `\`${VERSION}\``,
                    inline: true
                })
                .setColor(0x3498DB),
            components: new MessageComponents()
                .row(row =>
                    row
                    .button({
                        style: ButtonStyle.LINK,
                        label: 'Website',
                        url: 'https://theomega.zone/'
                    })
                    .button({
                        style: ButtonStyle.LINK,
                        label: 'Code',
                        url: 'https://github.com/compaqdisc/omega/'
                    })
                )
        });
    }
}