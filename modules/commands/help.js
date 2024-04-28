module.exports = {
  config: {
    name: "help",
    version: "1.0.0",
    description: "Show available commands",
    usage: "{pn} [cmd]",
    author: "Rui",
    role: 0
  },
  async onRun({ message, args }) {
    const cmd = args.join(" ");
    const { botPrefix, commands } = global.client;

    if (!cmd) {
      let reply = "⭓─────────────⭓\n";
      if (commands && commands.size > 0) {
        let index = 1;
        for (const command of commands.keys()) {
          const config = commands.get(command).config;
          if (config) {
            const { name, description } = config;
            reply += `${index}. ${name} - ${description}\n`;
            index++;
          }
        }
      } else {
        reply += "No commands available.\n";
      }
      reply += "⭓─────────────⭓";
      message.reply(reply);
    } else {
      const command = commands.get(cmd);
      if (command) {
        const { name, description, role, author } = command.config;
        const formattedUsage = command.config.usage ? command.config.usage.replace("{p}", botPrefix).replace("{pn}", `${botPrefix}${cmd}`) : '';
        const formattedRole = role === 0 ? "Everyone" : "Admin";
        const reply = `
⭓─────────────⭓
Command: ${name}
Author: ${author}
Description: ${description}
Usage: ${formattedUsage}
Role: ${role === undefined ? "Everyone" : formattedRole}
⭓─────────────⭓
        `.trim();
        message.reply(reply);
      } else {
        message.reply(`Command "${cmd}" not found.`);
      }
    }
  }
};