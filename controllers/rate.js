import fetch from "node-fetch";

class Rate {
  async getRate(req, res) {
    try {
      const response = await fetch(
        "https://belarusbank.by/api/kursExchange?city=Минск"
      );
      const data = await response.json();

      return data[0];
    } catch (error) {
      console.log(error);
    }
  }
}
export default new Rate();
