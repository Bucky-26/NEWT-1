const axios = require("axios");
const fs = require("fs");

module.exports = {
	config: {
		name: "ocr",
		usePrefix: true,
		description: "Image To Text",
		permission: 0,
		credits: "OPERATOR ISOY",
		commandCategory: "group",
		usages: "",
		cooldowns: 5,
	},
	run: async function({ api, event }) {
		try {
			if (event.type === "message_reply") {
				const replyMessage = event.body;
				const originalMessage = event.messageReply.body;

				if (event.messageReply.attachments && event.messageReply.attachments.length > 0) {
					console.log("Attachments found in the message reply:");
					for (const attachment of event.messageReply.attachments) {
						if (attachment.type === "audio") {
							const largePreviewUrl = attachment.url;
							const filename = attachment.filename;
							const imageResponse = await axios.get(largePreviewUrl, {
								responseType: "arraybuffer",
							});

							// Write the image data to a file
							fs.writeFileSync(`cache/${filename}`, Buffer.from(imageResponse.data, "binary"));

							api.sendMessage(largePreviewUrl, event.threadID, event.messageID);
						}
					}
				}
			}
		} catch (error) {
			console.log(error);
		}
	},
};