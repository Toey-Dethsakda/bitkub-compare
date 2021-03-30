import Cors from "cors";
import fetch from "node-fetch";
import initMiddleware from "../../libs/init-middleware";

const cors = Cors({
  methods: ["GET"],
});

const url = "https://api.binance.com/api/v3/ticker/price";

export default async (req, res) => {
  const response = await fetch(url, {
    body: null,
    headers: { "Content-Type": "application/json" },
  });

  await initMiddleware(req, res, cors);
  const biRes = await response.json();
  const binance = {
    biSymbol: Object.keys(biRes).map(v => ({
      ...biRes[v]
    }))
  }
  return res.status(200).json(binance);
};