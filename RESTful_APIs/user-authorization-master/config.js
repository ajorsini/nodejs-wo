// Get the config either from environment variables or pick the default
const config = {
  PORT: process.env.PORT || "3000",
  CLIENT_ID: process.env.CLIENT_ID || "1f0b4b4ad1fa5b7a4a46",
  CLIENT_SECRET: process.env.CLIENT_SECRET || "6edb1a58bc026662fd88fb4d2cb73d07d6841c3c"
}

module.exports = config;
