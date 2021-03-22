import Head from 'next/head'
import styles from '../styles/Home.module.css'
import useSWR from "swr";
import Coingecko from "../components/Exchange/Coingecko";
import Bitkub from "../components/Exchange/Bitkub";
import Binance from "../components/Exchange/Binance"
import Satang from '../components/Exchange/Satang';
import Huobi from '../components/Exchange/Huobi';
import Upbit from '../components/Exchange/Upbit';

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function Home() {

  const bitkub = bitkubCall()
  const coingecko = geckoCall()
  const binance = binanceCall()
  const satang = satangCall()
  const huobi = huobiCall()
  const upbit = upbitCall()

  // Render --------------------------------------------------

  return (
    <div>
      <Head>
        <title>Bitkub Compare</title>
        <link rel="icon" href="/bitkub-logo.png" />
      </Head>

      <table>
        <thead>
          <tr>
            <th className="border border-green-600">
              CURRENCY
            </th>
            <th className="border border-green-600">
              BITKUB
            </th>
            <th className="border border-green-600">
              BINANCE
            </th>
            <th className="border border-green-600">
              GECKOCOIN
            </th>
            <th className="border border-green-600">
              Satang | Pro
            </th>
            <th className="border border-green-600">
              Huobi
            </th>
            <th className="border border-green-600">
              Upbit
            </th>
          </tr>

        </thead>

        <tbody>

          <tr>
            <td>

            </td>
            <td className="border border-green-600">
              <Bitkub bitList={bitkub} />
            </td>

            <td className="border border-green-600">
              <Binance biList={binance} />
            </td>

            <td className="border border-green-600">
              <Coingecko geckoList={coingecko} />
            </td>

            <td className="border border-green-600">
              <Satang saList={satang} />
            </td>

            <td className="border border-green-600">
              <Huobi huobiList={huobi} />
            </td>

            <td className="border border-green-600">
              <Upbit upbitList={upbit} />
            </td>

          </tr>

        </tbody>

      </table>
      <footer className={styles.footer}>

      </footer>
    </div>
  )
}

function bitkubCall() {
  const { data: bitkub, error } = useSWR('/api/bitkub-coins', fetcher, {
    refreshInterval: 5000,
  })

  if (typeof bitkub !== "undefined") {
    const bitList = {
      symbol: Object.keys(bitkub).map(v => ({
        ...bitkub[v],
        symbol: v
      }))
    }
    bitList.symbol.sort((a, b) => a.id - b.id)
    return bitList;
  } else {
    const bitList = {}
    return bitList;
  }

}

function binanceCall() {
  const { data: bi, error } = useSWR("/api/binance-coins", fetcher, {
    refreshInterval: 5000,
  });

  if (typeof bi !== "undefined") {
    const biList = {
      biSymbol: Object.keys(bi).map(v => ({
        ...bi[v]
      }))
    }
    return biList;
  } else {
    const biList = {}
    return biList
  }

}

function geckoCall() {
  const { data: coingecko } = useSWR("/api/coingecko-coins", fetcher, {
    refreshInterval: 5000,
  });

  if (typeof coingecko !== "undefined") {
    const geckoList = {
      geckoSymbol: coingecko
    }
    geckoList.geckoSymbol.sort((a, b) => a.market_cap_rank - b.market_cap_rank)
    return geckoList;
  } else {
    const geckoList = {}
    return geckoList;
  }
}

function satangCall() {
  const { data: satang, error } = useSWR("/api/satang-coins", fetcher, {
    refreshInterval: 5000,
  });

  if (typeof satang !== "undefined") {
    const satangList = {
      saSymbol: satang
    }
    return satangList;
  } else {
    const satangList = {}
    return satangList
  }
}

function huobiCall() {
  const { data: huobi, error } = useSWR("/api/huobi-coins", fetcher, {
    refreshInterval: 5000,
  });

  if (typeof huobi !== "undefined") {
    const huobiList = huobi
    return huobiList;
  } else {
    const huobiList = {}
    return huobiList;
  }
}

function upbitCall() {
  const { data: upbit, error } = useSWR("/api/upbit-coins", fetcher, {
    refreshInterval: 1000,
  });

  if (typeof upbit !== "undefined") {
    const upbitList = {
      data: upbit
    }
    return upbitList;
  } else {
    const upbitList = {}
    return upbitList;
  }
}