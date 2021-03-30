import Cors from "cors";
import fetch from "node-fetch";
import initMiddleware from "../../libs/init-middleware";

const cors = Cors({
  methods: ["GET"],
});

const url = "https://api.exchangeratesapi.io/latest?base=USD";

export default async (req, res) => {
  const response = await fetch(url, {
    body: null,
    headers: { "Content-Type": "application/json" },
  });

  await initMiddleware(req, res, cors);
  const exchange = await response.json();
  let exchangeTHB = (exchange?  exchange.rates.THB : 'undefined')
  return res.status(200).json(exchangeTHB);
};