module.exports = (key) => {
  const Hypixel = require('hypixel-api-reborn');
  const hypixel = new Hypixel.Client(key, {
    noCache: true,
    rateLimit: "NONE",
    cacheSize: 10,
    cacheTime: 120
  });
  return hypixel;
};