const axios = require("axios");
const fs = require("fs");

module.exports = {
	config: {
		name: "viralVideos",
		usePrefix: true,
		description: "List viral videos and select one to view.",
		permission: 0,
		credits: "OPERATOR ISOY",
		description: "",
		commandCategory: "group",
		usages: "",
		cooldowns: 5,
	},
	run: async function ({ api, event }) {
		try {
			// Fetch viral video data from the provided endpoint
			const response = await axios.get(
				"https://adonisapi.easyapi0.repl.co/api/pnayflex?search=viral"
			);
			const videos = response.data;

			if (videos.length === 0) {
				api.sendMessage("No viral videos found.", event.threadID);
				return;
			}

			// Create a numbered list of video titles
			const videoList = videos.map((video, index) => {
				return `${index + 1}. ${video.title}`;
			});

			// Send the list of videos to the user
			api.sendMessage(videoList.join("\n"), event.threadID);

			// Listen for the user's selection
				if (message.body && /^\d+$/.test(message.body)) {
					const selectedIndex = parseInt(message.body) - 1;

					if (selectedIndex >= 0 && selectedIndex < videos.length) {
						// User selected a valid video, send the video link
						const selectedVideo = videos[selectedIndex];
						api.sendMessage(
							`You selected: ${selectedVideo.title}\nLink: ${selectedVideo.link}`,
							event.threadID
						);
					} else {
						api.sendMessage("Invalid selection. Please reply with a valid number.", event.threadID);
					}

					// Stop listening for further messages
				}
		} catch (error) {
			console.error(error);
			api.sendMessage("An error occurred while fetching viral videos.", event.threadID);
		}
	},
};
