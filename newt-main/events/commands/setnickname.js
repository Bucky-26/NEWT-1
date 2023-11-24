const axios = require("axios");
const fs = require('fs')
module.exports = {
  config: {
    name: "botname" ,
    usePrefix: true,
    description: "Change The bot Name To all THe group",
    permission: 1, // Set the required permission level (0 for normal users, 1 for admin)
    // Other configuration properties
  },
  run: async function({ api, event, args, commandModules,threadlist }) {
 const nickname = args.join(" ");
		
try{
	if(!nickname){
		api.sendMessage("Please Give The Nickname");
		return false;
	}
		threadlist.forEach(threadID => {
	
 api.changeNickname(nickname, threadID,'100033855186220')
			 .then(() => {
              successfulThreadCount++;
          })
          .catch(error => {
              console.error(`Error sending message to thread ${threadID}: ${error}`);
          });
      });
 
}
catch(error){
  console.log(error);
}

  },////////////////
};
