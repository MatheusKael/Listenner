const fs = require("fs");
const readline = require("readline");
const { google } = require("googleapis");
const Gmail = require("./GmailMethods").Gmail;
const Topics = require("./GooglePubSub").Topics;
const path = require("path");

const SCOPES = ["https://www.googleapis.com/auth/gmail.readonly"];
const TOKEN_PATH = "token.json";

const content = fs.readFileSync("credentials.json");
async function Init() {
  const oAuth2Client = await authorize(JSON.parse(content), TOKEN_PATH);

  const topics = new Topics();
  // console.log(oAuth2Client);
  const gmail = new Gmail(oAuth2Client);
  gmail.notifications();
}

Init();

// topics.listTopics();

async function authorize(credentials, TOKEN_PATH) {
  const { client_secret, client_id, redirect_uris } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  );

  // Check if we have previously stored a token.
  try {
    const token = fs.readFileSync(TOKEN_PATH);
    oAuth2Client.setCredentials(JSON.parse(token));
    return oAuth2Client;
  } catch (err) {
    return await getNewToken(oAuth2Client, TOKEN_PATH);
  }
}
function getNewToken(oAuth2Client, TOKEN_PATH) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
  });
  console.log("Authorize this app by visiting this url:", authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve, reject) => {
    rl.question("Enter the code from that page here: ", async (code) => {
      rl.close();
      oAuth2Client.getToken(code, function (err, token) {
        if (err) {
          reject(err);
        } else {
          oAuth2Client.setCredentials(token);
          fs.writeFileSync(
            TOKEN_PATH || path.resolve(__dirname, TOKEN_PATH),
            JSON.stringify(token)
          );
          resolve(oAuth2Client);
        }
      });
    });
  });
}
