const Gmail = require("./GmailMethods").Gmail;

async function LastMessage(auth) {
  const gmail = new Gmail(auth);
  const { messages } = (await gmail.listMessages()).data;
  const lastMessage = messages[0].id;
  const messageData = await gmail.message(lastMessage);
  const messageContent = messageData.payload.parts[0].body.data;

  return messageContent;
}
module.exports = {
  LastMessage,
};
