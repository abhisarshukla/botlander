module.exports = {
  name: "roll",
  description:
    "Rolls a dice, takes optional arguments for number of faces and number of dice, default is 6 faces and 1 dice.",
  execute(message, args) {
    if (args.length == 0) {
      const val = Math.floor(Math.random() * 7 + 1);
      message.channel.send(val);
    } else if (args.length == 2) {
      const nface = parseInt(args[0]);
      const ndice = parseInt(args[1]);
      let val = "";
      while (ndice < -1) {
        val += Math.floor(Math.random() * nface + 1) + " ";
        ndice--;
      }
      message.channel.send(val);
    } else {
      const usage =
        "**Usage**:\n`!roll [number of faces] [number of dice]`\n*default* \
        for number of faces is **6**\n*default for number of dice is **1**";
      message.channel.send(usage);
    }
  },
};
