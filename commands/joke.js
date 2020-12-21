const axios = require("axios");

module.exports = {
  name: "joke",
  description: "A random Joke each time.",
  async execute(message, args) {
    await axios({
      method: "get",
      url: "https://sv443.net/jokeapi/v2/joke/Any",
      params: {
        blacklistFlags: "racist,sexist",
      },
    })
      .then((response) => {
        const jokeSetup = response.data.setup;
        const jokeDelivery = response.data.delivery;
        if (jokeSetup == undefined || jokeDelivery == undefined) {
          await axios({
            method: "get",
            url: "https://icanhazdadjoke.com/",
            header: {
              "Accept": "application/json",
              "User-Agent": "Botlander Discord Bot"
            }
          })
            .then((response) => {
            const joke = response.data.joke;
            message.channel.send(joke);
          })
            .catch((error) => {
            console.error(error);
            console.log("Above Error happened while doing some task.");
          });
        } else {
          message.channel.send(`**${jokeSetup}** \r *${jokeDelivery}*`);
        }
      })
      .catch((error) => {
        console.error(error);
        console.log("Above Error happened while doing some task.");
      });
  },
};
