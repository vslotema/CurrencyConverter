const KEY = "a01a310d5f514cd1b7dd30b43ff705fd";
const URL = "https://api.currencyfreaks.com/latest?apikey=" + KEY;
const halfDay = 4.32e7;

/* This API only updates every 12 hours. So only fetch from API when last update has been more then 12 hours ago or 
   when the rates have not been previously stored in the localStorage */
export async function getRates() {
  try {
    var rates = JSON.parse(localStorage.getItem("rates"));
    const d1 = rates ? new Date(rates.date) : null;
    const d2 = new Date();
    const diff = d1 ? d2.getTime() - d1.getTime() : -1;

    if (diff >= halfDay || diff === -1) {
      let currencyRatesAPI = await fetch(URL);
      let rates = await currencyRatesAPI.json();
      localStorage.setItem("rates", JSON.stringify(rates));
      return rates;
    }
    return rates;
  } catch (err) {
    console.log("Error caught in getRates ", err);
  }
}
