const env = require("../config/env");
const { logToChannel } = require("../core/logger");

module.exports = {
    id: "verify_me",
    async execute(interaction) {
        const role = interaction.guild.roles.cache.find(
            r => r.name === env.VERIFIED_ROLE_NAME
        );

        if (!role) {
            return interaction.reply({
                content: `❌ No existe el rol "${env.VERIFIED_ROLE_NAME}"`,
                ephemeral: true
            });
        }

        // YA VERIFICADO
        if (interaction.member.roles.cache.has(role.id)) {
            await interaction.reply({
                content: "✅ Ya estás verificado.",
                ephemeral: true
            });

            await logToChannel(
                interaction.guild,
                `ℹ️ ${interaction.user.tag} intentó verificarse pero ya estaba verificado.`
            );
            return;
        }

        // NUEVA VERIFICACIÓN
        try {
            await interaction.member.roles.add(role);

            await interaction.reply({
                content: "✅ Verificado! Ya tienes acceso.",
                ephemeral: true
            });

            await logToChannel(
                interaction.guild,
                `✅ ${interaction.user.tag} se ha verificado correctamente.`
            );
        } catch (e) {
            console.error(e);
            await interaction.reply({
                content: "❌ No pude asignar el rol. Revisa permisos.",
                ephemeral: true
            });
        }
    }
};
