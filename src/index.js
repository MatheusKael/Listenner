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

  const converted = Base64ToUtf(lastMessage);
  // console.log(converted);

  //testing
  await ListenMessages("projects/listenner/subscriptions/teste", 10);

  setTimeout(async () => {
    const gmail = new Gmail(Oauth);
    const [response] = messagesIDs.map(async (messageID) => {
      console.log(await messageID);
      const response = await gmail.message(await messageID);
      console.log(response);
      return response;
    });
    console.log(await response);
  }, 11 * 1000);

  // CheckNewNotification(Oauth);
}

//toDo: Refactor ->

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

function Base64ToUtf(content) {
  const buff = Buffer.from(content, "base64");
  const decoded = buff.toString("utf-8");

  return decoded;
}
Init();
