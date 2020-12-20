const axios = require("axios");

module.exports = {
  name: "woof",
  description: "Woof Woof!",
  goodBoyLines: [
    "Who's a good boy!",
    "Here is a good boy!",
    "Woof Woof!",
    "🐶",
  ],
  async execute(message, args) {
    await axios({
      method: "get",
      url: "https://api.thedogapi.com/v1/images/search",
      header: { "X-API-KEY": process.env.DOGAPIKEY },
      params: {
        mime_types: "jpg,png",
        limit: 1,
      },
    })
      .then((response) => {
        const mediaURL = response.data[0].url;
        message.channel.send(mediaURL);
      })
      .catch((error) => {
        console.error(error);
        console.log("Above Error happened while doing some task.");
      })
      .then(() => {
        const index = Math.floor(Math.random() * this.goodBoyLines.length);
        message.channel.send(this.goodBoyLines[index]);
      });
  },
};
