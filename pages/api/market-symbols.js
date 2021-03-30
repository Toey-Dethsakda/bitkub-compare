import Cors from "cors";
import fetch from "node-fetch";
import initMiddleware from "../../libs/init-middleware";

const cors = Cors({
  methods: ["GET"],
});

const url = "https://api.bitkub.com/api/market/symbols";

export default async (req, res) => {
  const response = await fetch(url, {
    body: null,
    headers: { "Content-Type": "application/json" },
  });

  await initMiddleware(req, res, cors);
  const bitkubSymbolsRes = await response.json();
  const bitkubSymbols = {
    dataResult: bitkubSymbolsRes.result.map(item => ({
      symbol: item.symbol.replace('THB_', ''),
      info: item.info.replace('Thai Baht to ', '')
    }))
  }
  return res.status(200).json(bitkubSymbols);
};