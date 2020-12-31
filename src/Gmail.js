const fs = require("fs");
const readline = require("readline");
const { google } = require("googleapis");
/**
 * Lists the labels in the user's account.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */

module.exports = {
  Profile,
  Notifications,
};

async function Profile(auth) {
  const gmail = google.gmail({ version: "v1", auth });

  await gmail.users.getProfile({ userId: "me" }, (err, res) => {
    if (err) return console.log("Ocorreu um erro: " + err);
    console.log(res.data);
  });
}

async function Notifications(auth) {
  const gmail = google.gmail({ version: "v1", auth });

  await gmail.users.watch(
    {
      userId: "me",
      requestBody: {
        labelIds: ["INBOX"],
        topicName: "projects/listenner/topics/free",
      },
    },
    (err, res) => {
      if (err) return console.log(err);
      console.log(res.data);
    }
  );
}
