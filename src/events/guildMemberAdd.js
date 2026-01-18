const { Events } = require("discord.js");
const { baseEmbed, logEmbed } = require("../core/logger");

module.exports = {
    name: Events.GuildMemberAdd,
    async execute(client, member) {
        const embed = baseEmbed({
            title: "👋 Nuevo miembro",
            member,
            color: 0x57F287, // verde
            description: `**${member.user.tag}** ha entrado al servidor.\nID: \`${member.id}\``
        });

        await logEmbed(member.guild, embed);
    }
};
