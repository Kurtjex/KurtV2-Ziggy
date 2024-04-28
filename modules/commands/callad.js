const _ = require('lodash');

module.exports = {
  config: {
    name: "callad",
    role: 0,
    description: "Notify all bot admins.",
    usePrefix: true,
    usage: "{pn} [question]",
  },
  async onRun({ message, api, args }) {
    const botAdmins = global.client.config.botAdmins || {};
    if (!botAdmins || !Array.isArray(botAdmins)) {
      return message.reply("Bot admins list is not available.");
    }

    if (!args.length) {
      return message.reply("Please provide a question.");
    }

    const question = args.join(" ");

    _.forEach(botAdmins, adminID => {
      api.sendMessage(`Attention! You've been called by a user with the question: "${question}"`, adminID);
    });

    message.reply("Admins have been notified.");
  },
};