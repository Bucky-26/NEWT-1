const axios = require("axios");
const fs = require('fs')
module.exports = {
  config: {
    name: "gid" ,
    usePrefix: true,
    description: "An example command",
    permission: 1, // Set the required permission level (0 for normal users, 1 for admin)
    // Other configuration properties
  },
  run: async function({ api, event, args, commandModules }) {

try{
  api.sendMessage(event.threadID,event.threadID,event.messageID);
}
catch(error){
  console.log(error);
}

    
  },////////////////
};
