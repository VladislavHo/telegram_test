// const bot = new Telegraf(process.env.BOT_TOKEN);
class Middle{
  wheaterMiddle(bot, chatID, data) {
   return Promise.all([
      bot.telegram.sendMessage(
        chatID,
        `In ${data.name}, ${Math.round(
          data.main.temp - 273
        )} C now. Temperature will be between ${Math.round(
          data.main.temp_min - 273
        )} C and ${Math.round(data.main.temp_max - 273)} C`
      ),
      bot.telegram.sendMessage(
        chatID,
        `Wind ${data.wind.speed} m/s now`
      ),
    ]);
  }
  riteMiddle(bot, chatID, data) {
   return Promise.all([
      bot.telegram.sendMessage(chatID, "Rate on Belarusbank"),
      bot.telegram.sendMessage(
        chatID,
        `USD: ${data["USD_in"]} ${data["USD_out"]}`
      ),
      bot.telegram.sendMessage(
        chatID,
        `EUR: ${data["EUR_in"]} ${data["EUR_out"]}`
      ),
      bot.telegram.sendMessage(
        chatID,
        `RUB: ${data["RUB_in"]} ${data["RUB_out"]}`
      ),
    ]);
  }
}


export default new Middle()