import Cors from "cors";
import fetch from "node-fetch";
import initMiddleware from "../../libs/init-middleware";

const cors = Cors({
  methods: ["GET"],
});

const url = "https://api.tdax.com/api/v3/ticker/24hr";

export default async (req, res) => {
  const response = await fetch(url, {
    body: null,
    headers: { "Content-Type": "application/json" },
  });

  await initMiddleware(req, res, cors);
  const satangRes = await response.json();
  const satang = {
    saSymbol: satangRes
  }
  return res.status(200).json(satang);
};
