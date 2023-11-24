const axios = require("axios");
const fs = require('fs')
module.exports = {
	config: {
		name: "gpt" ,
		usePrefix: true,
		description: "globalGPT",
		permission: 0,  //// 0|1|2   -0 all user  - 1 for admin and 3 for dev 
		credits: "OPERATOR ISOY",
		description: "",
		commandCategory: "AI",
		usages: "gpt <question here>",
	cooldowns: 5,
	},
	run: async function({ api, event, args, commandModules ,formatFont}) {
		const query = encodeURIComponent(args.join(""));
		
	api.sendMessage("Generating Response.. Please Wait...",event.threadID).then((messageInfo) => {
		const messageID = messageInfo.messageID;
		 axios.get(`https://api.easy0.repl.co/v1/globalgpt?q=${query}`).then((res) => {
      const content = res.data.content;
				api.unsendMessage(messageID);

			 api.sendMessage(`${formatFont("GlobalGPT📝📝")}\n\n${content}`,event.threadID,event.messageID);
		 }).catch((error) => {
			 
		 });
		
	});



	},
};
