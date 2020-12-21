module.exports = {
  name: "toss",
  description: "Tosses a coin and prints Heads or Tails",
  execute(message, args) {
    const val = Math.random();
    if (val < 0.5) {
      message.channel.send("Heads");
    } else {
      message.channel.send("Tails");
    }
  },
};
