import fetch from "node-fetch";
// import fetch from 'node-fetch'
class Weather {
  async getWheater(res, req) {
    try {
      const response = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=Minsk&appid=${process.env.WEATHER_KEY}`
      );
      const data = await response.json();
      return data;
    } catch (e) {
      console.log(e.message);
    }
  }
}

export default new Weather();
