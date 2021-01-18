function Base64ToUtf(content) {
  const buff = Buffer.from(content, "base64");
  const decoded = buff.toString("utf-8");

  return decoded;
}

module.exports = Base64ToUtf;
