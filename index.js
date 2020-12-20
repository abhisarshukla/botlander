const Discord = require("discord.js");
const dotenv = require("dotenv");
const fs = require("fs");
const { prefix } = require("./config.json");

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
  console.log("💖");
});

client.on("message", (message) => {
  if (
    message.channel.id == process.env.BOTCHANNELID ||
    !message.content.startsWith(prefix) ||
    message.author.bot
  )
    return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (!client.commands.has(command)) return;

  try {
    client.commands.get(command).execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply("there was an error trying to execute that command!");
  }
});
