const Pubsub = require("./googlePubSub").Pubsub;

const messagesIDs = [];

const messageHandler = (message) => {
  console.log(`Received message ${message.id}:`);
  console.log(`\tData: ${message.data}`);
  console.log(`\tAttributes: ${message.attributes}`);
  messagesIDs.push(message.id);
  // "Ack" (acknowledge receipt of) the message
  message.ack();
  return messagesIDs;
};
async function ListenMessages(SubscriptionName, timeout) {
  const pubsub = new Pubsub();
  const [subscriptions] = await pubsub.listSubscriptions();

  const [name] = subscriptions.map((subscription) => {
    if (subscription.metadata.name === SubscriptionName) {
      return SubscriptionName;
    }

    console.log(subscription);
    return;
  });

  console.log(name);

  const subscription = await pubsub.subscription(name);

  // console.log(subscription);

  let messageCount = 0;
  subscription.on("message", messageHandler);
  setTimeout(() => {
    subscription.removeListener("message", messageHandler);
    console.log(`${messageCount} message(s) received.`);
  }, timeout * 1000);
}

module.exports = { ListenMessages, messagesIDs };
