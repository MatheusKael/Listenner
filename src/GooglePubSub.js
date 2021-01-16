const { PubSub } = require("@google-cloud/pubsub");

const Credentials = require("../listenner-c2fb0cad2ccf.json");

class Pubsub {
  constructor() {
    this.pubsub = new PubSub({
      projectId: "listenner",
      credentials: Credentials,
    });
  }
  async subscription(subscription) {
    const response = this.pubsub.subscription(subscription);

    return response;
  }
  async listSubscriptions() {
    // const response = this.pubsub.subscription("free", { topic: "free" });
    const response = await this.pubsub.getSubscriptions();

    return response;
  }
  async createSubscription() {
    const created = await this.pubsub.createSubscription("free", "teste");

    console.log(created);
  }
  async listTopics() {
    const [topics] = await this.pubsub.getTopics();
    console.log("TOPICS : ");
    topics.forEach((topic) => console.log(topic));
  }
  async createTopic(Topic) {
    const [topic] = await this.pubsub.createTopic(Topic);

    console.log("The topic " + topic + "was created \n");
  }
}

module.exports = {
  Pubsub,
};
