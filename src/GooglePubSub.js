const { PubSub } = require("@google-cloud/pubsub");

const { google } = require("googleapis");

const Credentials = require("../listenner-c2fb0cad2ccf.json");

const pubsub = new PubSub({
  projectId: "listenner",
  credentials: Credentials,
});

class Topics {
  constructor() {}

  async listTopics() {
    const [topics] = await pubsub.getTopics();
    console.log("TOPICS : ");
    topics.forEach((topic) => console.log(topic));
  }
  async createTopic(Topic) {
    const [topic] = await pubsub.createTopic(Topic);

    console.log("The topic " + topic + "was created \n");
  }
}

module.exports = {
  Topics,
};
