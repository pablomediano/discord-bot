require("dotenv").config();
const {
    Client,
    GatewayIntentBits,
    REST,
    Routes,
    SlashCommandBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    PermissionFlagsBits
} = require("discord.js");

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers]
});

const commands = [
    new SlashCommandBuilder()
        .setName("setup-verify")
        .setDescription("Publica el mensaje de verificación con botón")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
].map(c => c.toJSON());

async function registerCommands() {
    const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);

    await rest.put(
        Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
        { body: commands }
    );

    console.log("✅ Slash commands registrados");
}

client.once("ready", async () => {
    console.log(`🤖 Logueado como ${client.user.tag}`);
    await registerCommands();
});

client.on("interactionCreate", async (interaction) => {
    // /setup-verify
    if (interaction.isChatInputCommand() && interaction.commandName === "setup-verify") {
        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId("verify_me")
                .setLabel("✅ Verificarme")
                .setStyle(ButtonStyle.Success)
        );

        await interaction.reply({
            content: "Pulsa el botón para verificarte y recibir acceso al servidor:",
            components: [row]
        });
        return;
    }

    // Botón verify
    if (interaction.isButton() && interaction.customId === "verify_me") {
        const roleName = process.env.VERIFIED_ROLE_NAME || "Verified";
        const role = interaction.guild.roles.cache.find(r => r.name === roleName);

        if (!role) {
            await interaction.reply({
                content: `❌ No encuentro el rol "${roleName}". Créalo primero.`,
                ephemeral: true
            });
            return;
        }

        try {
            await interaction.member.roles.add(role);
            await interaction.reply({ content: "✅ Verificado! Ya tienes acceso.", ephemeral: true });
        } catch (e) {
            console.error(e);
            await interaction.reply({
                content: "❌ No pude asignarte el rol. Revisa permisos y la posición del rol del bot.",
                ephemeral: true
            });
        }
    }
});

client.login(process.env.DISCORD_TOKEN);
