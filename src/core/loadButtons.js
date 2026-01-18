const fs = require("fs");
const path = require("path");

function loadButtons() {
    const buttons = new Map();
    const buttonsPath = path.join(__dirname, "..", "buttons");
    const files = fs.readdirSync(buttonsPath).filter(f => f.endsWith(".js"));

    for (const file of files) {
        const btn = require(path.join(buttonsPath, file));
        if (!btn?.id || typeof btn.execute !== "function") continue;
        buttons.set(btn.id, btn);
    }

    return buttons;
}

module.exports = { loadButtons };
