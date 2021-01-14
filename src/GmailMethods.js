const { google } = require("googleapis");

class Gmail {
  constructor(auth) {
    this.gmail = google.gmail({ version: "v1", auth: auth });
  }
  profile() {
    this.gmail.users.getProfile({ userId: "me" }, (err, res) => {
      if (err) return console.log("Ocorreu um erro: " + err);
      console.log(res.data);
    });
  }
  notifications() {
    this.gmail.users.watch(
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
  listMessages(token) {
    this.gmail.users.messages.list(
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
  async message() {
    const message = await this.gmail.users.messages.get({
      userId: "me",
      id: "176fc3808811443b",
    });

    return message.data;
  }
  listLabels() {
    this.gmail.users.labels.list(
      {
        userId: "me",
      },
      (err, res) => {
        if (err) return console.log("The API returned an error: " + err);
        const labels = res.data.labels;
        if (labels.length) {
          console.log("Labels:");
          labels.forEach((label) => {
            console.log(`name- ${label.name}`);
            console.log(`id - ${label.id}`);
            console.log("\n");
          });
        } else {
          console.log("No labels found.");
        }
      }
    );
  }
}

module.exports = {
  Gmail,
};
