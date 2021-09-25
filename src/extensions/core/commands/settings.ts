import { ButtonStyle, Command, CommandContext, Embed, MessageComponents } from '../deps.ts';

export class SettingsCommand extends Command {
    name = 'settings'
    description = 'configures omega'
    category = 'config'

    execute(ctx: CommandContext): void {
        ctx.channel.send({
            embed: new Embed()
                .setAuthor({
                    name: 'Omega',
                    url: 'https://theomega.zone/',
                    icon_url: 'https://cdn.discordapp.com/avatars/747551324849307810/fb85aa37b55ef67efdf45df0322a5a2d.png'
                })
                .setTitle('Settings Menu')
                .setURL('https://theomega.zone/doc/configuring-omega/')
                .addField('Welcome', 'Allows you to configure automated welcome messages', true)
                .addField('Prefix', 'Sets the prefix that Omega will respond to', true)
                .addField('Roles', 'Enables adding privileged roles with special permissions', true)
                .addField('Media', 'Configures the media module', true)
                .addField('Uninstall', 'Removes Omega from the server', true)
                .setColor(0x1ABC9C),
            components: new MessageComponents()
                .row(row =>
                    row
                    .button({
                        style: ButtonStyle.PRIMARY,
                        customID: 'setting.welcome',
                        label: 'Welcome',
                    })
                    .button({
                        style: ButtonStyle.PRIMARY,
                        customID: 'setting.prefix',
                        label: 'Prefix',
                    })
                    .button({
                        style: ButtonStyle.PRIMARY,
                        customID: 'setting.roles',
                        label: 'Roles',
                    })
                    .button({
                        style: ButtonStyle.PRIMARY,
                        customID: 'setting.media',
                        label: 'Media',
                    })
                    .button({
                        style: ButtonStyle.DANGER,
                        customID: 'setting.uninstall',
                        label: 'Uninstall',
                    })
                )
        })
    }
}