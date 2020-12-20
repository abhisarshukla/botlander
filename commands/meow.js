const axios = require("axios");

module.exports = {
  name: "meow",
  description: "Meow Meow!",
  catLines: ["Behold!", "🐈", "Meow Meow!", "Meow you doin'?"],
  async execute(message, args) {
    await axios({
      method: "get",
      url: "https://api.thecatapi.com/v1/images/search",
      header: { "X-API-KEY": process.env.CATAPIKEY },
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
        const index = Math.floor(Math.random() * this.catLines.length);
        message.channel.send(this.catLines[index]);
      });
  },
};
