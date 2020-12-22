const axios = require("axios").default;

module.exports = {
  name: "joke",
  description: "A random Joke each time.",
  async execute(message, args) {
    const response = await axios({
      method: "get",
      url: "https://sv443.net/jokeapi/v2/joke/Any",
      params: {
        blacklistFlags: "racist,sexist,nsfw",
      },
    }).catch((error) => {
      console.error(error);
      console.log("Above Error happened on fetching from s443.net api.");
    });
    const jokeSetup = response.data.setup;
    const jokeDelivery = response.data.delivery;
    let joke = `**${jokeSetup}** \r *${jokeDelivery}*`;
    if (jokeSetup == undefined || jokeDelivery == undefined) {
      const response = await axios({
        method: "get",
        url: "https://icanhazdadjoke.com/",
        header: {
          Accept: "application/json",
          "User-Agent": "Botlander Discord Bot",
        },
      }).catch((error) => {
        console.error(error);
        console.log(
          "Above Error happened on fetching from icanhazdadjoke.com api."
        );
      });
      joke = response.data.joke;
    }
    message.channel.send(joke);
  },
};
