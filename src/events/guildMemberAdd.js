const { Events } = require("discord.js");
const { logToChannel } = require("../core/logger");

module.exports = {
    name: Events.GuildMemberAdd,
    async execute(client, member) {
        await logToChannel(
            member.guild,
            `👋 **${member.user.tag}** ha entrado al servidor.`
        );
    }
};
