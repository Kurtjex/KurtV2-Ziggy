const axios = require("axios");

module.exports = {
  config: {
    name: "chat",
    author: "Rui | AkhiroDEV",
    ussPrefix: false,
    description: "Chat with AKHIRO",
    usage: "chat [ message ]"
  },
  async onRun({ message, args }) {
    const msg = args.join(" ");
    if (!message) {
      await message.send("Please provide a message.");
      return;
    }
    try {
      const response = await axios.get(`https://akhirosimv2.onrender.com/api/sim?content=${encodeURIComponent(msg)}`);
      const reply = response.data.message;
      await message.send(reply);
    } catch (error) {
      await message.send(`An error occurred: ${error.message}`);
    }
  }
};