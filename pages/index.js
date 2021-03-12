import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useState } from "react";
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
  if (!bitkub) return <div>Bitkub loading...</div>;
  // const coingecko = geckoCall()
  // if (!coingecko) return <div>Coingecko loading...</div>;
  // const binance = binanceCall()
  // if (!binance) return <div>Binance loading...</div>;
  // const satang = satangCall()
  // if (!satang) return <div>Satang loading...</div>;
  // const huobi = huobiCall()
  // if (!huobi) return <div>Huobi loading...</div>;
  // const upbit = upbitCall()
  // if (!upbit) return <div>Upbit loading...</div>;

  
  // Render --------------------------------------------------
  

  return (
    <div>
      <Head>
        <title>Bitkub Compare</title>
        <link rel="icon" href="/bitkub-logo.png" />
      </Head>

      <table>
        <thead>

        </thead>
        
        <tbody>

          <tr>
            <td>
              <Bitkub bitList={bitkub} />
            </td>
          </tr>

          {/* <tr>
            <td>
              <Coingecko symbols={coingecko} />
            </td>
          </tr> */}

          {/* <tr>
            <td>
              <Binance biList={binance} />
            </td>
          </tr>

          <tr>
            <td>
              <Satang saList={satang} />
            </td>
          </tr>

          <tr>
            <td>
              <Huobi huobiList={huobi} />
            </td>
          </tr>

          <tr>
            <td>
              <Upbit upbitList={upbit} />
            </td>
          </tr> */}

        </tbody>

      </table>




      <footer className={styles.footer}>
       
      </footer>
    </div>
  )
}

function bitkubCall() {
  const { data: bitkub } = useSWR("/api/bitkub-coins", fetcher, {
    refreshInterval: 1000,
  });

  // if (!bitkub) return <div>Bitkub loading...</div>;

  const CoinList = () => {
    if (typeof bitkub !== "undefined") {
      const bitList = {
        symbol: Object.keys(bitkub).map(v => ({
          ...bitkub[v],
          symbol: v
        }))
      }
      bitList.symbol.sort((a, b) => a.id - b.id)
      return bitList;
    }
  }
  return CoinList()
}

function geckoCall() {
  const { data: coingecko } = useSWR("/api/coingecko-coins", fetcher, {
    refreshInterval: 1000,
  });

  const CoinListGecko = () => {
    if (typeof coingecko !== "undefined") {

      const geckoList = {
        geckoSymbol: coingecko
      }
      geckoList.geckoSymbol.sort((a, b) => a.market_cap_rank - b.market_cap_rank)
      return geckoList;
    }
  }
  return CoinListGecko()
}

function binanceCall() {
  const { data: bi, error } = useSWR("/api/binance-coins", fetcher, {
    refreshInterval: 1000,
  });
  if (!bi) return <div>Binance loading...</div>;

  const CoinListBi = () => {
    if (typeof bi !== "undefined") {

      const biList = {
        biSymbol: Object.keys(bi).map(v => ({
          ...bi[v]
        }))
      }
      return biList;
    }
  }
  return CoinListBi()
}

function satangCall() {
  const { data: satang, error } = useSWR("/api/satang-coins", fetcher, {
    refreshInterval: 1000,
  });
  if (!satang) return <div>Satang loading...</div>;

  const CoinListSatang = () => {
    if (typeof satang !== "undefined") {
      const satangList = {
        saSymbol: satang
      }
      return satangList;
    }
  }
  return CoinListSatang()
}

function huobiCall() {
  const { data: huobi, error } = useSWR("/api/huobi-coins", fetcher, {
    refreshInterval: 1000,
  });
  if (!huobi) return <div>Huobi loading...</div>;

  const CoinListHuobi = () => {
    if (typeof huobi !== "undefined") {
      const huobiList = huobi
      return huobiList;
    }
  }
  return CoinListHuobi()
}

function upbitCall() {
  const { data: upbit, error } = useSWR("/api/upbit-coins", fetcher, {
    refreshInterval: 1000,
  });
  if (!upbit) return <div>Upbit loading...</div>;

  const CoinListUpbit = () => {
    if (typeof upbit !== "undefined") {
      const upbitList = {
        data: upbit
      }
      return upbitList;
    }
  }
  return CoinListUpbit()
}