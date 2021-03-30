import Head from 'next/head'
import styles from '../styles/Home.module.css'
import useSWR from "swr";
import Coingecko from "../components/Exchange/Coingecko";
import Bitkub from "../components/Exchange/Bitkub";
import Binance from "../components/Exchange/Binance"
import Satang from '../components/Exchange/Satang';
import Huobi from '../components/Exchange/Huobi';
import Upbit from '../components/Exchange/Upbit';
import CoinsList from '../components/Exchange/CoinList';

const fetcher = (url) => fetch(url).then((r) => r.json());

export const IntlFormatNumber = (bitcoin) => {
  return new Intl.NumberFormat("th-TH").format(bitcoin);
};

export default function App() {

  const { data: exchangeTHB } = useSWR("/api/exchangerates-coins", fetcher, {
    refreshInterval: 1000,
  })

  const { data: bitkub } = useSWR('/api/bitkub-coins', fetcher, {
    refreshInterval: 1000,
  })

  const { data: binance } = useSWR("/api/binance-coins", fetcher, {
    refreshInterval: 1000,
  });

  const { data: coingecko } = useSWR("/api/coingecko-coins", fetcher, {
    refreshInterval: 1000,
  });

  const { data: satang } = useSWR("/api/satang-coins", fetcher, {
    refreshInterval: 1000,
  });

  const { data: huobi } = useSWR("/api/huobi-coins", fetcher, {
    refreshInterval: 1000,
  });

  const { data: upbit } = useSWR("/api/upbit-coins", fetcher, {
    refreshInterval: 1000,
  });

  const bitkubCoin = () => {
    const bitkubtArr = []
    if (typeof bitkub !== "undefined") {
      bitkub.symbols.forEach(bitkubRes => {
        let bitArr = {
          symbol: bitkubRes.symbol,
          last: IntlFormatNumber(bitkubRes.last)
        }
        bitkubtArr.push(bitArr)
      });
      return {
        symbols: bitkubtArr
      }
    }
    return {
      symbols: []
    }
  }

  const binanceCoin = () => {
    if (bitkub && bitkub.symbols && binance && binance.biSymbol) {
      const result = bitkub.symbols.map((bitkubList) => {
        const binanceResult = binance.biSymbol.find((binanceRes) => binanceRes.symbol.replace('USDT', '') == bitkubList.symbol)
        if (binanceResult) {
          let biArr = {
            symbol: binanceResult.symbol.replace('USDT', ''),
            price: Number.parseFloat(binanceResult.price * exchangeTHB).toFixed(2)
          }
          let diff = Number.parseFloat(((biArr.price - bitkubList.last) / biArr.price * 100)).toFixed(2)
          return {
            symbol: biArr.symbol,
            price: IntlFormatNumber(biArr.price),
            diff: diff
          }
        }

        return {
          symbol: bitkubList.symbol,
          price: '',
          diff: ''
        }
      })

      return {
        biSymbol: result
      }
    }
    return {
      biSymbol: []
    }
  }

  const geckoCoin = () => {
    if (bitkub && bitkub.symbols && coingecko && coingecko.geckoSymbol) {
      const result = bitkub.symbols.map((bitkubList) => {
        const coingeckoResult = coingecko.geckoSymbol.find((geckoRes) => geckoRes.symbol.toUpperCase() == bitkubList.symbol)
        if (coingeckoResult) {
          let gecArr = {
            symbol: coingeckoResult.symbol.replace('USDT', ''),
            last: Number.parseFloat(coingeckoResult.current_price).toFixed(2)
          }
          let diff = Number.parseFloat(((gecArr.last - bitkubList.last) / gecArr.last * 100)).toFixed(2)
          return {
            symbol: gecArr.symbol,
            last: IntlFormatNumber(gecArr.last),
            diff: diff
          }
        }

        return {
          symbol: bitkubList.symbol,
          last: '',
          diff: ''
        }
      })

      return {
        geckoSymbol: result
      }
    }
    return {
      geckoSymbol: []
    }
  }

  const satangCoin = () => {
    if (bitkub && bitkub.symbols && satang && satang.saSymbol) {
      const result = bitkub.symbols.map((bitkubList) => {
        const satangResult = satang.saSymbol.find((satangRes) => satangRes.symbol.replace('_thb', '').toUpperCase() == bitkubList.symbol)
        if (satangResult) {
          let saArr = {
            symbol: satangResult.symbol.replace('_thb', '').toUpperCase(),
            last: Number.parseFloat(satangResult.lastPrice).toFixed(2)
          }
          let diff = Number.parseFloat(((saArr.last - bitkubList.last) / saArr.last * 100)).toFixed(2)
          return {
            symbol: saArr.symbol,
            last: IntlFormatNumber(saArr.last),
            diff: diff
          }
        }

        return {
          symbol: bitkubList.symbol,
          last: '',
          diff: ''
        }
      })

      return {
        saSymbol: result
      }
    }
    return {
      saSymbol: []
    }
  }

  const huobiCoin = () => {
    if (bitkub && bitkub.symbols && huobi && huobi.data) {
      const result = bitkub.symbols.map((bitkubList) => {
        const huobiResult = huobi.data.find((huobiRes) => huobiRes.symbol.replace('thb', '').toUpperCase() == bitkubList.symbol)
        if (huobiResult) {
          let huoArr = {
            symbol: huobiResult.symbol.replace('thb', '').toUpperCase(),
            last: Number.parseFloat(huobiResult.ask).toFixed(2)
          }
          let diff = (huoArr.last == 0 ? '': Number.parseFloat(((huoArr.last - bitkubList.last) / huoArr.last * 100)).toFixed(2))
          return {
            symbol: huoArr.symbol,
            last: IntlFormatNumber(huoArr.last),
            diff: diff
          }
        }

        return {
          symbol: bitkubList.symbol,
          last: '',
          diff: ''
        }
      })

      return {
        data: result
      }
    }
    return {
      data: []
    }
  }

  const upbitCoin = () => {
    if (bitkub && bitkub.symbols && upbit && upbit.data) {
      const result = bitkub.symbols.map((bitkubList) => {
        const upbitResult = upbit.data.find((upbitRes) => upbitRes.market.replace('THB-', '') == bitkubList.symbol)
        if (upbitResult) {
          let upArr = {
            symbol: upbitResult.market.replace('THB-', ''),
            last: Number.parseFloat(upbitResult.trade_price).toFixed(2)
          }
          let diff = Number.parseFloat(((upArr.last - bitkubList.last) / upArr.last * 100)).toFixed(2)
          return {
            symbol: upArr.symbol,
            last: IntlFormatNumber(upArr.last),
            diff: diff
          }
        }

        return {
          symbol: bitkubList.symbol,
          last: '',
          diff: ''
        }
      })

      return {
        data: result
      }
    }
    return {
      data: []
    }
  }


  const bitkubList = bitkubCoin()
  const biList = binanceCoin()
  const geckoList = geckoCoin()
  const saList = satangCoin()
  const huobiList = huobiCoin()
  const upbitList = upbitCoin()

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
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              CURRENCY
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <img src="/bitkub-icon.png" alt="bitkub" className="max-w-md mx-auto h-10" />
              BITKUB
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <img src="/binance-icon.png" alt="binance" className="max-w-md mx-auto h-10" />
              BINANCE
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <img src="/coingecko-icon.png" alt="coingecko" className="max-w-md mx-auto h-10" />
              GECKOCOIN
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <img src="/satang-icon.png" alt="satang" className="max-w-md mx-auto h-10" />
              Satang | Pro
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <img src="/huobi.png" alt="huobi" className="max-w-md mx-auto h-10" />
              Huobi
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <img src="/upbit.png" alt="upbit" className="max-w-md mx-auto h-10" />
            </th>
          </tr>

        </thead>

        <tbody>

        <tr>
            {/* <td scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <CoinsList coinsList={bitkub} />
            </td> */}

            <td scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <div>
                {
                  bitkubList.symbols.map((sym) => (
                    <div className={styles.currency} key={sym.symbol}>
                      <img src={`https://www.bitkub.com/static/images/icons/${sym.symbol}.png`}/>
                    </div>
                  ))
                }
              </div>
            </td>

            {/* <td scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <Bitkub bitkub={bitkub} />
            </td> */}

            <td scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <div>
                {
                  bitkubList.symbols.map((sym) => (
                    <div className={styles.coinlistHead} key={sym.symbol}>
                      <div className="text-center">{sym.symbol || 0}</div>
                    </div>
                  ))
                }
              </div>
            </td>

            {/* <td scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <Bitkub bitkub={bitkub} />
            </td> */}

            <td scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <div>
                {
                  bitkubList.symbols.map((sym) => (
                    <div className={styles.coinlistHead} key={sym.symbol}>
                      <div className="text-center">{sym.last || 0}</div>
                    </div>
                  ))
                }
              </div>
            </td>

            {/* <td scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <Binance exchangeTHB={exchangeTHB} binance={binance} bitkub={bitkub} />
            </td> */}

            {/* Start Binance */}
            <td scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <div>
                {
                  biList.biSymbol.map((sym) => (
                    <div className={styles.coinlist} key={`binance-${sym.symbol}`}>
                      <div className="text-center">{sym.price || 0}</div>
                      <div
                        className="text-center"
                        style={{
                          fontSize: 12,
                          color: sym.diff > 0 ? "#019716" : "#e60000",
                        }}
                      >
                        {sym.diff || 0}%</div>
                    </div>
                  ))
                }
              </div>
            </td>

            {/* Start Coingecko */}

            {/* <td scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <Coingecko coingecko={coingecko} bitkub={bitkub} />
            </td> */}

            <td scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <div>
                {
                  geckoList.geckoSymbol.map((sym) => (
                    <div className={styles.coinlist} key={sym.symbol}>
                      <div className="text-center">{sym.last || 0}</div>
                      <div
                        className="text-center"
                        style={{
                          fontSize: 12,
                          color: sym.diff > 0 ? "#019716" : "#e60000",
                        }}
                      >
                        {sym.diff || 0}%
                      </div>
                    </div>
                  ))
                }
              </div>
            </td>

            {/* Start Satang  */}
            {/* <td scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <Satang satang={satang} bitkub={bitkub} />
            </td> */}

            <td scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <div>
                {
                  saList.saSymbol.map((sym) => (
                    <div className={styles.coinlist} key={sym.symbol}>
                      <div className="text-center">{sym.last || 0}</div>
                      <div
                        className="text-center"
                        style={{
                          fontSize: 12,
                          color: sym.diff > 0 ? "#019716" : "#e60000",
                        }}
                      >
                        {sym.diff || 0}%
                      </div>
                    </div>
                  ))
                }
              </div>
            </td>

            {/*  Start Huobi */}
            {/* <td scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <Huobi huobi={huobi} bitkub={bitkub} />
            </td> */}

            <td scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <div>
                {
                  huobiList.data.map((sym) => (
                    <div className={styles.coinlist} key={sym.symbol}>
                      <div className="text-center">{sym.last || 0}</div>
                      <div
                        className="text-center"
                        style={{
                          fontSize: 12,
                          color: sym.diff > 0 ? "#019716" : "#e60000",
                        }}
                      >
                        {sym.diff || 0}%
                      </div>
                    </div>
                  ))
                }
              </div>
            </td>

            {/* Start Upbit */}
            {/* <td scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <Upbit upbit={upbit} bitkub={bitkub} />
            </td> */}

            <td scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <div>
                {
                  upbitList.data.map((sym) => (
                    <div className={styles.coinlist} key={sym.market}>
                      <div className="text-center">{sym.last || 0}</div>
                      <div
                        className="text-center"
                        style={{
                          fontSize: 12,
                          color: sym.diff > 0 ? "#019716" : "#e60000",
                        }}
                      >
                        {sym.diff || 0}%
                      </div>
                    </div>
                  ))
                }
              </div>
            </td>
          </tr>
        </tbody>

      </table>
      <footer className={styles.footer}>

      </footer>
    </div>
  )
}