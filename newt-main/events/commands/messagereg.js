const axios = require("axios");
const fs = require('fs')
module.exports = {
  config: {
    name: "accept" ,
    usePrefix: true,
    description: "An example command",
    permission: 0,  //// 0|1|2   -0 all user  - 1 for admin and 3 for dev 
	credits: "OPERATOR ISOY",
	description: "",
	commandCategory: "group",
	usages: "",
	cooldowns: 5,
  },
  run: async function({ api, event, args, commandModules }) {

try{
  api.handleMessageRequest(event.threadID, accept);
	    api.sendMessage('Your Message Request Are Accepted',event.threadID,event.messageID);

}
catch(error){
		    api.sendMessage('Error Occur \n please contact my dev',event.threadID,event.messageID);

  console.log(error);
}

  },
};
