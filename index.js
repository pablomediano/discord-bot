require("dotenv").config();
const {
    Client,
    GatewayIntentBits,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle
} = require("discord.js");

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers]
});

client.once("ready", async () => {
    console.log(`🤖 Logueado como ${client.user.tag}`);

    const guild = client.guilds.cache.get(process.env.GUILD_ID);
    if (!guild) return console.error("❌ No encuentro el servidor");

    const channelName = process.env.VERIFY_CHANNEL_NAME || "verify";
    const verifyChannel = guild.channels.cache.find(
        c => c.name === channelName && c.isTextBased()
    );

    if (!verifyChannel) {
        return console.error(`❌ No encuentro el canal #${channelName}`);
    }

    // Borrar mensajes anteriores del bot
    const messages = await verifyChannel.messages.fetch({ limit: 10 });
    const botMessages = messages.filter(m => m.author.id === client.user.id);
    for (const msg of botMessages.values()) {
        await msg.delete();
    }

    const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
            .setCustomId("verify_me")
            .setLabel("✅ Verificarme")
            .setStyle(ButtonStyle.Success)
    );

    await verifyChannel.send({
        content: "Pulsa el botón para verificarte y acceder al servidor:",
        components: [row]
    });

    console.log("✅ Botón de verificación publicado");
});

client.on("interactionCreate", async (interaction) => {
    if (!interaction.isButton() || interaction.customId !== "verify_me") return;

    const roleName = process.env.VERIFIED_ROLE_NAME || "Verified";
    const role = interaction.guild.roles.cache.find(r => r.name === roleName);

    if (!role) {
        return interaction.reply({
            content: `❌ No encuentro el rol "${roleName}"`,
            ephemeral: true
        });
    }

    try {
        await interaction.member.roles.add(role);
        await interaction.reply({
            content: "✅ Verificado! Ya tienes acceso al servidor.",
            ephemeral: true
        });
    } catch (e) {
        console.error(e);
        await interaction.reply({
            content: "❌ No pude asignarte el rol. Revisa permisos del bot.",
            ephemeral: true
        });
    }
});

client.login(process.env.DISCORD_TOKEN);
