const axios = require("axios");
const fs = require('fs')
module.exports = {
  config: {
    name: "read" ,
    usePrefix: true,
    description: "read the text from the image",
    permission: 0, 
  },
  run: async function({ api, event, args, commandModules }) {
 const res = await axios.get('')
try{
    if (event.type === "message_reply") {
            const repliedMessage = event.messageReply;
            if (repliedMessage.attachments && repliedMessage.attachments.length > 0) {
                const repliedAttachment = repliedMessage.attachments[0];
                if (repliedAttachment.type === "photo" && repliedAttachment.largePreviewUrl) {
                    api.sendMessage(`Large Preview URL: ${repliedAttachment.largePreviewUrl}`, event.threadID);
                } 
            } else {
                api.sendMessage("The replied message does not have any attachments.", event.threadID);
            }
        } else {
            api.sendMessage("Please reply to a message with a photo attachment.", event.threadID);
        }
}
catch(error){
  console.log(error);
}

  },////////////////
};
