const { PubSub } = require("@google-cloud/pubsub");

const { google } = require("googleapis");

const Credentials = require("../listenner-c2fb0cad2ccf.json");
/**
 * Lists the labels in the user's account.
 *
 * @property {google.auth.OAuth2} auth1 An authorized OAuth2 client.
 */

const pubsub = new PubSub({
  projectId: "listenner",
  credentials: Credentials,
  auth: auth1,
});
module.exports = {
  listAlltopics: async function () {
    const [topics] = await pubsub.getTopics();
    console.log("TOPICS : ");
    topics.forEach((topic) => console.log(topic));
  },
  CreateTopic: async function (t) {
    const [topic] = await pubsub.createTopic(t);

    console.log("The topic " + topic + "was created \n");
  },
};
