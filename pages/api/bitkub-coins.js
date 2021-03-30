import Cors from "cors";
import fetch from "node-fetch";
import initMiddleware from "../../libs/init-middleware";

const cors = Cors({
  methods: ["GET"],
});

const url = "https://api.bitkub.com/api/market/ticker";

export default async (req, res) => {
  const response = await fetch(url, {
    body: null,
    headers: { "Content-Type": "application/json" },
  });

  await initMiddleware(req, res, cors);
  const bitRes = await response.json();
  const bitkub = {
    symbols: Object.keys(bitRes).map(v => ({
      ...bitRes[v],
      symbol: v.replace('THB_', '')
    }))
  }

  bitkub.symbols.sort((a, b) => a.id - b.id)
  return res.status(200).json(bitkub);

}