const axios = require("axios");
const fs = require('fs');
const { createReadStream } = require('fs'); // Import createReadStream from fs

module.exports = {
	config: {
		name: "tikdl",
		usePrefix: true,
		description: "TikTok Video Downloader",
		permission: 0, // 0 for all users, 1 for admin, 2 for dev
		credits: "OPERATOR ISOY",
		commandCategory: "group",
		usages: "",
		cooldowns: 5,
	},
	run: async function({ api, event, args, commandModules }) {
		const url = args.join("");

		try {
			if (!url) {
				api.sendMessage("Please provide a TikTok Video Url.", event.threadID, event.messageID);
				return false;
			}

			if (!url.startsWith("https://vt.tiktok.com/") && !url.startsWith("https://www.tiktok.com")) {
				api.sendMessage("Please provide a valid TikTok Video Url.", event.threadID, event.messageID);
				return false;
			}

			// Check if the 'cache' directory exists, create it if not
			if (!fs.existsSync('cache')) {
				fs.mkdirSync('cache');
			}

			const res = await axios.get(`https://api.easy0.repl.co/v2/tiktok?url=${encodeURIComponent(url)}`);
			const data = res.data;
			const title = data.title;
			const videoQuality = data.videoQuality;
			const creator = data.creator;
			const vids = data.videoUrl;
			const vid = (await axios.get(vids,
				{ responseType: 'arraybuffer' }
			)).data;
			fs.writeFileSync('cache/TIK.mp4',Buffer.from(vid, 'binary'));

			const mes = {
				body: `TITLE : ${title}`,
				attachment: fs.createReadStream('cache/TIK.mp4')
			};
			api.sendMessage(mes, event.threadID, event.messageID);
		} catch (error) {
			console.error(error);
		}
	},
};
