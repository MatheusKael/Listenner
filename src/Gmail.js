const fs = require("fs");
const readline = require("readline");
const { google } = require("googleapis");
const token = require("../listenner-c2fb0cad2ccf.json");
/**
 * Lists the labels in the user's account.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */

module.exports = {
  Profile,
  Notifications,
  ListMessages,
  EspecicMessage,
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

async function ListMessages(auth) {
  const gmail = google.gmail({ version: "v1", auth });

  await gmail.users.messages.list(
    {
      userId: "me",
      labelIds: ["INBOX", "Label_1669741166474549732"],
      oauth_token: token,
    },
    (err, res) => {
      if (err) return console.log(err);
      console.log(res.data.messages);
    }
  );
}

async function EspecicMessage(auth) {
  const gmail = google.gmail({ version: "v1", auth });

  const message = await gmail.users.messages.get({
    userId: "me",
    id: "176f41a8b9719fe3",
  });

  console.log(message.data);
}
