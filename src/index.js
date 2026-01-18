const { createClient } = require("./core/client");
const { loadEvents } = require("./core/loadEvents");
const { loadButtons } = require("./core/loadButtons");
const env = require("./config/env");

const client = createClient();

loadEvents(client);
const buttons = loadButtons();

client.on("interactionCreate", async (interaction) => {
    if (!interaction.isButton()) return;

    const handler = buttons.get(interaction.customId);
    if (!handler) return;

    try {
        await handler.execute(interaction);
    } catch (e) {
        console.error(e);
        if (interaction.isRepliable()) {
            await interaction.reply({
                content: "❌ Error interno del bot.",
                ephemeral: true
            }).catch(() => {});
        }
    }
});

client.login(env.DISCORD_TOKEN);
