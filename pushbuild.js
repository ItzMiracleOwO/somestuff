const fetch = require("node-fetch");

let args = process.argv.slice(2);
let commit = args.join(" ").toLowerCase();

if (!commit.startsWith("Chino Build")) process.exit(0);

fetch("https://discord.com/api/webhooks/856097712420552715/5nzVi1IYUgvIiY_bSKnkD2UQTC08wxZBRqRNg6Y4rg6LQa-LmrIzfcCky-dew9tvmCQ9",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      username: "ChinoKafuu [System]",
      avatar_url: "https://images-ext-2.discordapp.net/external/yaMyK4dvl7SWKEKarFHdYNxsVehfcX-PspW1U-0IJtc/%3Fsize%3D512/https/cdn.discordapp.com/avatars/651692927072075787/13d1fb0957627f754513ca4e9f2c79a6.png?width=468&height=468",
      embeds: [
        {
          color: 7506394,
          title: "Chino更新",
          description: `\`${commit}\` 已發佈，等待更新中...`
        }
      ]
    })
  })
  .then(() => {
    process.exit(0);
  })
  .catch(e => {
    console.log(e);
    process.exit(0);
  });