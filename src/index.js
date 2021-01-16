const fs = require("fs");
const path = require("path");
const Gtts = require("node-gtts")("pt-br");

const Authentication = require("./GoogleAuthentication");
const LastMessage = require("./LastMessage").LastMessage;

const TOKEN_PATH = "token.json";
const content = fs.readFileSync("credentials.json");

const audiospath = path.join(__dirname, "..", "audios", "Audio.wav");

async function Init() {
  const Oauth = await Authentication(TOKEN_PATH, content);

  const lastMessage = await LastMessage(Oauth);

  const converted = Base64ToUtf(lastMessage);

  console.log(converted);
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
