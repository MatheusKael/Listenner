const fs = require("fs");
const Gmail = require("./GmailMethods").Gmail;
const Topics = require("./GooglePubSub").Topics;
const authorize = require("./GoogleAuthentication");
const path = require("path");
const Gtts = require("node-gtts")("pt-br");
const audiospath = path.join(__dirname, "..", "audios", "Audio.wav");

const TOKEN_PATH = "token.json";

const content = fs.readFileSync("credentials.json");

async function Init() {
  const oAuth2Client = await authorize(JSON.parse(content), TOKEN_PATH);

  const topics = new Topics();
  const gmail = new Gmail(oAuth2Client);

  const messageData = await gmail.message();

  const messageContent = messageData.payload.parts[0].body.data;

  const buff = Buffer.from(messageContent, "base64");
  const decoded = buff.toString("utf-8");

  Gtts.save(audiospath, decoded, (err, result) => {
    if (err) return console.log(err);
    console.log("DONE");
    return result;
  });
}

Init();
