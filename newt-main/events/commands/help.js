const fs = require("fs");
const path = require("path");

module.exports = {
	config: {
		name: "help",
		Prefix: true,
		description: "List all available commands or get detailed information about a specific command",
		permission: 0,
		credits: "OPERATOR ISOY",
		commandCategory: "group",
		usages: ["", "<command name>", "<page no.>"],
		cooldowns: 5,
	},
	run: async function ({ api, event, args, commandModules, prefix }) {
		try {
			const commandFiles = fs.readdirSync(path.join(__dirname, "../commands")).filter((file) => file.endsWith(".js"));
			const commands = commandFiles.map((file) => {
				const command = require(path.join(__dirname, "../commands", file));
				return command.config;
			});

			if (args.length === 0) {
				// Display available commands
				const pageSize = 10;
				const page = args[0] ? parseInt(args[0]) : 1;
				const startIndex = (page - 1) * pageSize;
				const endIndex = startIndex + pageSize;
				const visibleCommands = commands.slice(startIndex, endIndex);

				const totalPages = Math.ceil(commands.length / pageSize);

				const commandList = visibleCommands
					.map((cmd) => `${cmd.name} - ${cmd.description}`)
					.join("\n");

				const message = `-- Available Commands (Page ${page}/${totalPages}) --\n\n${commandList}\n\nUse \`help <command name>\` for details on a specific command or \`${prefix}help <page no.>\` to navigate.`;

				api.sendMessage(message, event.threadID);
			} else {
				const commandName = args[0].toLowerCase();
				const command = commands.find((cmd) => cmd.name === commandName);

				if (command) {
					const permissionText = command.permission === 1 ? "Admin" : "User";
					const usage = command.usages ? command.usages.join(" | ") : "No usage information";

					const message = `-- Command Info --
Name: ${command.name}
Description: ${command.description}
Usage: ${usage}
Permission: ${permissionText}
Credits: ${command.credits}`;

					api.sendMessage(message, event.threadID);
				} else {
					api.sendMessage("Invalid command name or page number.", event.threadID);
				}
			}
		} catch (error) {
			console.log(error);
			api.sendMessage("An error occurred while listing commands.", event.threadID);
		}
	},
};
