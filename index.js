import express from "express";
import cors from "cors";
import { Telegraf } from "telegraf";
import LocalSession from "telegraf-session-local";
import Weather from "./controllers/weather.js";
import Rate from "./controllers/rate.js";
import Middle from "./controllers/middle.js";
import "dotenv/config";

const PORT = process.env.PORT || 5000;
const app = express();
const bot = new Telegraf(process.env.BOT_TOKEN);
app.use(cors({ origin: "*", credentials: true }));

// const localSession = new LocalSession()

bot.telegram.setMyCommands([
  { command: "/info", description: "Получить информацию о пользователе" },
  { command: "/weather", description: "Показать погоду" },
  { command: "/rate", description: "Показать текущий курсы валют" },
]);

const start = async () => {
  try {
    bot.on("message", (msg) => {
      const text = msg.message.text;
      const chatID = msg.chat.id;
      const weatherAPI = Weather.getWheater;
      setInterval(
        () =>
          bot.telegram.sendMessage(
            chatID,
            weatherAPI().then((data) => {
              Middle.wheaterMiddle(bot, chatID, data);
            })
          ),
        1000 * 1800
      );

      const { first_name, last_name, username, id } = msg.from;

      if (text === "/start") {
        bot.telegram.sendMessage(
          chatID,
          `${first_name} ${last_name} welcome in bot `
        );
      } else if (text === "/info") {
        bot.telegram.sendMessage(chatID, { ...msg.from });
      } else if (text === "/weather") {
        try {
          weatherAPI().then((data) => {
            Middle.wheaterMiddle(bot, chatID, data);
          });
        } catch (error) {
          bot.telegram.sendMessage(
            chatID,
            `Sorry happend error ${error.message}`
          );
        }
      } else if ("/rate" === text) {
        try {
          bot.telegram.sendMessage(chatID, "Loading...");
          const rateAPI = Rate.getRate;
          rateAPI().then((data) => {
            Middle.riteMiddle(bot, chatID, data);
          });
        } catch (error) {
          bot.telegram.sendMessage(
            chatID,
            `Sorry happend error ${error.message}`
          );
        }
      } else {
        const name = msg.message.text;
        bot.telegram.sendMessage(chatID, `Sorry!`);
      }
    });
    app.listen(PORT, console.log(`Server started on port ${PORT}`));
    bot.launch();
  } catch (error) {
    bot.telegram.sendMessage(chatID, `Sorry happened error!`);
  }
};

start();
// data:image/jpeg;base64,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
