require("dotenv").config();

const { Client } /*Object destruction */ = require("discord.js");
const client = new Client();
const PREFIX = "$";

client.on("ready", () => {
  console.log(`${client.user.tag} has logged in `);
});

client.on("message", async (message) => {
  console.log(message.content);
  if (message.author.bot) return;
  //console.log(`[${message.author.tag}]: ${message.content} `);

  if (message.content === "hello") {
    message.reply("Hey!");
  }
  if (message.content.startsWith(PREFIX)) {
    const [CMD_NAME, ...args] = message.content
      .substring(PREFIX.length)
      .split(/\s+/);

    if (CMD_NAME === "kick") {
      if (!message.member.hasPermission("KICK_MEMBERS"))
        return message.reply("You do have permission to use that command");
      if (args.length === 0) return message.reply("Please provide an ID");
      const member = message.guild.members.cache.get(args[0]);

      if (member) {
        member
          .kick()
          .then((member) => message.channel.send(`${member} was kicked.`))
          .catch((err) => message.channel.send("Permissions required to kick"));
      } else {
        message.channel.send("Member not found");
      }
    } else if (CMD_NAME === "ban") {
      if (!message.member.hasPermission("BAN_MEMBERS"))
        return message.reply("You do have permission to use that command");
      if (args.length === 0) return message.reply("Please provide an ID");
      const member = message.guild.members.cache.get(args[0]);

      try {
        const user = await message.guild.members.ban(args[0]);
        message.channel.send("User has been banned");
      } catch (err) {
        message.channel.send(
          "An error occured. Either I do not have permissions or the user was not found"
        );
      }
    }
  }
});

client.login(process.env.DISCORDJS_BOT_TOKEN);
