import Cors from "cors";
import fetch from "node-fetch";
import initMiddleware from "../../libs/init-middleware";

const cors = Cors({
  methods: ["GET"],
});

const url = "https://th-api.upbit.com/v1/ticker?markets=THB-BTC,THB-ETH,THB-XRP,THB-LTC,THB-USDT";

export default async (req, res) => {
  const response = await fetch(url, {
    body: null,
    headers: { "Content-Type": "application/json" },
  });

  await initMiddleware(req, res, cors);
  const upbit = await response.json();
  return res.status(200).json(upbit);
};
