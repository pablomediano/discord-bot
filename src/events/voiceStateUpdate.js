const { Events } = require("discord.js");
const { baseEmbed, logEmbed } = require("../core/logger");

module.exports = {
    name: Events.VoiceStateUpdate,
    async execute(client, oldState, newState) {
        const member = newState.member || oldState.member;
        if (!member) return;

        const oldCh = oldState.channel;
        const newCh = newState.channel;

        // Entró
        if (!oldCh && newCh) {
            const embed = baseEmbed({
                title: "🔊 Voz: entrada",
                member,
                channel: newCh,
                color: 0x5865F2, // azul
            });
            return logEmbed(newState.guild, embed);
        }

        // Salió
        if (oldCh && !newCh) {
            const embed = baseEmbed({
                title: "🔇 Voz: salida",
                member,
                channel: oldCh,
                color: 0xED4245, // rojo
            });
            return logEmbed(oldState.guild, embed);
        }

        // Cambió
        if (oldCh && newCh && oldCh.id !== newCh.id) {
            const embed = baseEmbed({
                title: "🔁 Voz: cambio de canal",
                member,
                color: 0xFEE75C, // amarillo
            });
            embed.addFields(
                { name: "Antes", value: `#${oldCh.name}`, inline: true },
                { name: "Después", value: `#${newCh.name}`, inline: true }
            );
            return logEmbed(newState.guild, embed);
        }
    }
};
