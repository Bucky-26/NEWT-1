const axios = require("axios");
const fs = require('fs')
module.exports = {
	config: {
		name: "prefix" ,
		usePrefix: false,
		description: "An template command",
		permission: 0,  //// 0|1|2   -0 all user  - 1 for admin and 3 for dev 
		credits: "OPERATOR ISOY",
		description: "",
		commandCategory: "template",
		usages: "",
	cooldowns: 5,
	},
	run: async function({ api, event, args, commandModules,prefix }) {

try{
	const messsage = `
 Hi I'm Newt\n\nThis is my Prefix [ ${prefix} ]
 AI Commands:
 ${prefix}ai
 ${prefix}bard
 ${prefix}blackai
 ${prefix}palm
 ${prefix}mistral
 ${prefix}llama
 ${prefix}toppy
 ${prefix}zephyr
 
 `;
	api.sendMessage(messsage,event.threadID,event.messageID);

}
catch(error){
	console.log(error);
}

	},
};
