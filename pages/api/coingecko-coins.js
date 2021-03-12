import Cors from "cors";
import fetch from "node-fetch";
import initMiddleware from "../../libs/init-middleware";

const cors = Cors({
  methods: ["GET"],
});

// const queryGecko = {
//     vs_currency: "usd",
//     ids: "bitcoin",
//     orders: "market_cap_desc",
//     per_page: 100,
//     page: 1,
//     sparkline: false
// }

const url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=thb&order=market_cap_desc&per_page=100&page=1&sparkline=false";

export default async (req, res) => {
  const response = await fetch(url, {
    body: null,
    headers: { "Content-Type": "application/json"},
  });

  await initMiddleware(req, res, cors);
  const coingecko = await response.json();
  return res.status(200).json(coingecko);
};
