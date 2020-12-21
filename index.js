const Discord = require("discord.js");
const dotenv = require("dotenv");
const fs = require("fs");
const express = require("express");
const { prefix } = require("./config.json");

// For Cron-Job webapp hit to prevent heroku-app from sleeping
const app = express();
app.get("/", (req, res) => {
  res.send("Botlander is Well and Running!");
});
app.listen(process.env.PORT, () => {
  console.log(`botlander-discord app listening port ${process.env.PORT}`);
});

const client = new Discord.Client();
client.commands = new Discord.Collection();

// store the name of all the command files in the './commands' folder.
const commandFiles = fs
  .readdirSync("./commands")
  .filter((path) => path.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);

  // set a new item in the Collection
  // with the key as the command name and the value as the exported module
  client.commands.set(command.name, command);
}

dotenv.config();
client.login(process.env.BOTTOKEN);
client.on("ready", () => {
  console.log("Successfully Logged!");
});

client.on("message", (message) => {
  if (
    message.channel.id != process.env.BOTCHANNELID ||
    !message.content.startsWith(prefix) ||
    message.author.bot
  )
    return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  if (!client.commands.has(commandName)) return;

  const command = client.commands.get(commandName);

  try {
    command.execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply("there was an error trying to execute that command!");
  }
});
