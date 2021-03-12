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
  const bitkub = await response.json();
  return res.status(200).json(bitkub);
};