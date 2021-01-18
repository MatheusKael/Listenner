const fs = require("fs");
const path = require("path");
const Gtts = require("node-gtts")("pt-br");
const Gmail = require("./GmailMethods").Gmail;
const Authentication = require("./GoogleAuthentication");
const LastMessage = require("./LastMessage").LastMessage;
const { ListenMessages, messagesIDs } = require("./listeningMessages");

const TOKEN_PATH = "token.json";
const content = fs.readFileSync("credentials.json");

const audiospath = path.join(__dirname, "..", "audios", "Audio.wav");

async function Init() {
  const Oauth = await Authentication(TOKEN_PATH, content);

  const lastMessage = await LastMessage(Oauth);

  // const converted = Base64ToUtf(lastMessage);
  // console.log(converted);

  //testing

  const teste = await ListenMessages(
    "projects/listenner/subscriptions/teste",
    10
  );

  console.log("Listenner was " + (await teste) + "ed");
  console.log(await ReadMessage(Oauth));
  // CheckNewNotification(Oauth);
}

//toDo: Refactor ->

async function ReadMessage(auth) {
  const gmail = new Gmail(auth);
  const [response] = messagesIDs.map(async (messageID) => {
    console.log(await messageID);
    const response = await gmail.message(await messageID);
    console.log(response);
    return response;
  });
  console.log(await response);
}

async function CheckNewNotification(auth) {
  const gmail = new Gmail(auth);
  const { data } = await gmail.notifications();

  console.log("notifications : " + JSON.stringify(data));
}

function DoMp4(decoded) {
  Gtts.save(audiospath, decoded, (err, result) => {
    if (err) return console.log(err);
    console.log("DONE");
    return result;
  });
}

Init();
