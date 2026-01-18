const { Events, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const env = require("../config/env");

module.exports = {
    name: Events.ClientReady,
    once: true,
    async execute(client) {
        console.log(`🤖 Logueado como ${client.user.tag}`);

        const guild = client.guilds.cache.get(env.GUILD_ID);
        if (!guild) return console.error("❌ GUILD_ID incorrecto");

        const channel = guild.channels.cache.find(
            c => c.name === env.VERIFY_CHANNEL_NAME && c.isTextBased()
        );
        if (!channel) return console.error("❌ Canal verify no encontrado");

        // Limpia mensajes anteriores del bot
        const msgs = await channel.messages.fetch({ limit: 10 });
        const botMsgs = msgs.filter(m => m.author.id === client.user.id);
        for (const m of botMsgs.values()) await m.delete();

        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId("verify_me")
                .setLabel("✅ Verificarme")
                .setStyle(ButtonStyle.Success)
        );

        await channel.send({
            content: "Pulsa el botón para verificarte y acceder al servidor:",
            components: [row]
        });

        console.log("✅ Botón publicado en #verify");
    }
};
