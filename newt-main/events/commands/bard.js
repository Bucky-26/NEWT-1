const axios = require("axios");
const fs = require('fs');
const { Leopard } = require("@picovoice/leopard-node");

module.exports = {
	config: {
		name: "bard",
		credits: "1SOY DEV",
		prefix: true,
		description: "use google bard ai",
		usage: `bard <question here> \n\nNote: To Send Image to bard ai just reply to the image you want to send`,
		permission: 0,
	},
	run: async function ({ api, event, args }) {
		try {
			api.sendMessage('Generating Response, Please Wait!!!! ', event.threadID, event.messageID);

			const userId = event.senderID;
			let question = args.join(" ");

			if (!question && event.type !== "message_reply") {
				api.sendMessage('Please Provide A question or query', event.threadID, event.messageID);
				return;
			}

			let res;

			if (event.type === "message_reply") {
				const replyMessage = event.body;
				const originalMessage = event.messageReply.body;

				if (event.messageReply.attachments && event.messageReply.attachments.length > 0) {
					for (const attachment of event.messageReply.attachments) {
						if (attachment.type === "photo") {
							const largePreviewUrl = attachment.url;
							const filename = attachment.filename;
							const imageResponse = await axios.get(largePreviewUrl, { responseType: "arraybuffer" });

							fs.writeFileSync(`cache/${filename}.jpg`, Buffer.from(imageResponse.data, "binary"));
							res = await axios.get(`https://api-bard.easy0.repl.co/api/bard?message=${encodeURIComponent(question)}&url=${encodeURIComponent(largePreviewUrl)}&userID=${encodeURIComponent(userId)}&api=ISOYXD`);
						} else if (attachment.type === 'audio') {
							const audio = attachment.url;
							const filename = attachment.filename;
							const aud = await axios.get(audio, { responseType: "arraybuffer" });

							fs.writeFileSync(`cache/${filename}`, Buffer.from(aud.data, "binary"));
							const handle = new Leopard('0iFpdxmhvJKzPZ7M/gmGqXpLYm9WyHIZ4xVNUQAZvLKuN4YC/IeAiQ==');
							const result = handle.processFile(`cache/${filename}`);
							res = await axios.get(`https://api-bard.easy0.repl.co/api/bard?message=${encodeURIComponent(question)} ${encodeURIComponent(result.transcript)}&userID=${encodeURIComponent(userId)}&api=ISOYXD`);
						}
					}
				}
			} else {
				res = await axios.get(`https://api-bard.easy0.repl.co/api/bard?message=${encodeURIComponent(question)}&userID=${encodeURIComponent(userId)}&api=ISOYXD`);
			}

			const respond = res.data.content;
			const imageUrls = res.data.images;

			if (Array.isArray(imageUrls) && imageUrls.length > 0) {
				const attachments = [];

				for (let i = 0; i < imageUrls.length; i++) {
					const url = imageUrls[i];
					const imagePath = `cache/image${i + 1}.png`;

					try {
						const imageResponse = await axios.get(url, { responseType: "arraybuffer" });
						fs.writeFileSync(imagePath, Buffer.from(imageResponse.data));
						attachments.push(fs.createReadStream(imagePath));
					} catch (error) {
						api.sendMessage('Error While Saving Image', event.threadID, event.messageID);
					}
				}

				api.sendMessage({
					body: `${respond}`,
					attachment: attachments,
				}, event.threadID, event.messageID);
			} else {
				api.sendMessage(respond, event.threadID, event.messageID);
			}
		} catch (error) {
			api.sendMessage('An error occurred while processing your request', event.threadID, event.messageID);
			console.error(error);
		}
	},
};
