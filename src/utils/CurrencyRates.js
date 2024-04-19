// const SERVER_URL = "http://localhost:3001";
const SERVER_URL = "https://yen-converter-server-64169f15af96.herokuapp.com";

export function getRates() {
  return fetch(`${SERVER_URL}/api/CurrencyRates/`)
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else return;
    })
    .catch((err) => console.error(err));
}
