const axios = require("axios");
const fs = require('fs');

module.exports = {
  config: {
    name: "approved" ,
    usePrefix: true,
    description: "Approved The Current Thread",
    permission: 1, // Set the required permission level (0 for normal users, 1 for admin)
    // Other configuration properties
      usage:"approved",
  },
  run: async function({ api, event, args, commandModules,approved }) {

try{
     if (!approved.approved.includes(event.threadID)) {
  approved.approved.push(event.threadID);

  fs.writeFile("./approved.json", JSON.stringify(approved, null, 2), (err) => {
      if (err) {
          console.error('Error writing to Approved.json:', err);
      } else {
         api.sendMessage("The GROUP have been Added to whitelist",event.threadID,event.messageID);
      }
  });
}
}
catch(error){
  console.log(error);
}

    api.sendMessage('',event.threadID,event.messageID);
  },////////////////
};
