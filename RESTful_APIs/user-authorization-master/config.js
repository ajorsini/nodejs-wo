// Get the config either from environment variables or pick the default
const config = {
  PORT: process.env.PORT || "3000",
  CLIENT_ID: process.env.CLIENT_ID || "147796ee271cd36b810f",
  CLIENT_SECRET: process.env.CLIENT_SECRET || "e714aa0b501c70b245305f886802b1ec1885dc76"  
}

module.exports = config;
