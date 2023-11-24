const axios = require("axios");
const fs = require('fs');
const request = require('request'); // Make sure 'request' is installed

// Import the formatFont function from index.js


module.exports = {
    config: {
        name: "shoti",
        usePrefix: true,
       credits:"1SOY DEV",
     usage:`shoti`,
        description: "An example command",
        permission: 1,
        // Other configuration properties
    },
    run: async function({ api, event, args, commandModules }) {
        const Shoti = require("shoti-api");
        const shotiAPI = new Shoti("shoti-1h77dsoka19v1631e1");

        try {
            let shoti = shotiAPI.createRequest({ method: "get-shoti" });
            shoti.then((response) => {
                const playUrl = response.data.play;
                const username = response.user.username;
                const nickname = response.user.nickname;
                const id = response.user.id;

                const message = 
                    `Username: ${username}\nNickname: ${nickname}\nID: ${id}`;

                let file = fs.createWriteStream("cache/shoti.mp4");
                let rqs = request(encodeURI(playUrl));
                rqs.pipe(file);
                file.on("finish", () => {
                    api.sendMessage(
                        {
                            body: message,
                            attachment: fs.createReadStream("/cache/shoti.mp4",
                            ),
                        },
                        event.threadID,
                        event.messageID,
                    );
                });
            })
            .catch((error) => {
                console.error("Error:", error);
            });
        } catch (error) {
            console.log(error);
        }
    },
    // ...
};
