const { Events } = require("discord.js");
const { logToChannel } = require("../core/logger");

module.exports = {
    name: Events.VoiceStateUpdate,
    async execute(client, oldState, newState) {
        const user = newState.member.user;

        // Entrar a un canal
        if (!oldState.channel && newState.channel) {
            await logToChannel(
                newState.guild,
                `🔊 **${user.tag}** ha entrado al canal de voz **${newState.channel.name}**`
            );
        }

        // Salir de un canal
        if (oldState.channel && !newState.channel) {
            await logToChannel(
                oldState.guild,
                `🔇 **${user.tag}** ha salido del canal de voz **${oldState.channel.name}**`
            );
        }
    }
};
