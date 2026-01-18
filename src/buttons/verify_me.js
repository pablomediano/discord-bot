const env = require("../config/env");

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

        if (interaction.member.roles.cache.has(role.id)) {
            return interaction.reply({
                content: "✅ Ya estás verificado.",
                ephemeral: true
            });
        }

        try {
            await interaction.member.roles.add(role);
            await interaction.reply({
                content: "✅ Verificado! Ya tienes acceso.",
                ephemeral: true
            });
        } catch (e) {
            console.error(e);
            await interaction.reply({
                content: "❌ No pude asignar el rol. Revisa permisos.",
                ephemeral: true
            });
        }
    }
};
