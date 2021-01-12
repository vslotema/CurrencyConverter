const URL = "https://openexchangerates.org/api/currencies.json";

export async function getCurrencyMap() {
  try {
    let currenciesAPI = await fetch(URL);
    let curr = await currenciesAPI.json();
    return curr;
  } catch (err) {
    console.log("Error caught while fetching currency map ", err);
  }
}
