import Cors from "cors";
import fetch from "node-fetch";
import initMiddleware from "../../libs/init-middleware";

const cors = Cors({
  methods: ["GET"],
});
// This key client_id BOT
const client_id = 'c9ee5c8e-b730-478c-898b-b34e747fcc54'

const yesterday = new Date((new Date()).valueOf() - 1000*60*60*24);
const yesterdayReq = yesterday.toISOString().slice(0, 10)
const start_period = yesterdayReq
const end_period = yesterdayReq
const url = `https://apigw1.bot.or.th/bot/public/Stat-ReferenceRate/v2/DAILY_REF_RATE/?start_period=${start_period}&end_period=${end_period}`;
export default async (req, res) => {
  const response = await fetch(url,
  {
    body: null,
    headers: { "Content-Type": "application/json",'x-ibm-client-id': client_id }
  });

  await initMiddleware(req, res, cors)
  const exchange = await response.json()
  const exchangeData = exchange.result.data
  const exchangeTHB = (exchangeData ? exchangeData.data_detail.map(dataRes => dataRes.rate): 1)
  return res.status(200).json(exchangeTHB)
};