const Pubsub = require("./googlePubSub").Pubsub;
const readline = require("readline");

const messagesIDs = [];

function messageHandler(message) {
  // console.log(`Received message ${message.id}:`);
  // console.log(`\tData: ${message.data}`);
  // console.log(`\tAttributes: ${message.attributes}`);
  messagesIDs.push(message.id);
  // "Ack" (acknowledge receipt of) the message
  message.ack();
  return messagesIDs;
}
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
  const lockers = [];
  subscription.on("message", messageHandler);

  const response = new Promise((resolve, reject) => {
    console.log("Type 'end' to kill the connection");

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    rl.question("Answer: ", (answer) => {
      if (answer === "end") {
        subscription.removeListener("message", messageHandler);
        rl.close();
        console.log("done... ");
        resolve(answer);
      } else {
        return console.log("Try again");
      }
    });
  });

  return response;
}

module.exports = { ListenMessages, messagesIDs };
