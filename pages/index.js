import Head from 'next/head'
import styles from '../styles/Home.module.css'
import useSWR from "swr";

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
          let diff = (huoArr.last == 0 ? '' : Number.parseFloat(((huoArr.last - bitkubList.last) / huoArr.last * 100)).toFixed(2))
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

  // console.log('* bitkubList = ', bitkubList);
  // console.log('biList = ', biList);
  // console.log('geckoList = ', geckoList);
  // console.log('saList = ', saList);
  // console.log('huobiList = ', huobiList);
  // console.log('upbitList = ', upbitList);

  // Render --------------------------------------------------

  return (
    <div class="relative bg-white">
      <nav class="bg-gray-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6">
          <div class="flex justify-between items-center border-gray-100 py-6 md:justify-start md:space-x-10">
            <div class="flex justify-start lg:w-0 lg:flex-1">
              <a href="#">
                <span class="text-white">Bitkub compare</span>
              </a>
            </div>
          </div>
        </div>
      </nav>

      

      <div class="flex flex-col">
        <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      CURRENCY
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      SYMBOLS
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <img src="/bitkub-icon.png" alt="bitkub" className="max-w-md mx-auto h-10" />
                    BITKUB
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <img src="/binance-icon.png" alt="binance" className="max-w-md mx-auto h-10" />
                    BINANCE
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Different
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <img src="/coingecko-icon.png" alt="coingecko" className="max-w-md mx-auto h-10" />
                    GECKOCOIN
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Different
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <img src="/satang-icon.png" alt="satang" className="max-w-md mx-auto h-10" />
                    Satang | Pro
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Different
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <img src="/huobi.png" alt="huobi" className="max-w-md mx-auto h-10" />
                    Huobi
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Different
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <img src="/upbit.png" alt="upbit" className="max-w-md mx-auto h-10" />
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Different
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                <tr>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div>
                      {
                        bitkubList.symbols.map((sym) => (
                          <div className={styles.currency} key={sym.symbol}>
                            <img src={`https://www.bitkub.com/static/images/icons/${sym.symbol}.png`} />
                          </div>
                        ))
                      }
                    </div>
                  </td>

                  <td class="px-6 py-4 whitespace-nowrap">
                    <div>
                      {
                        bitkubList.symbols.map((sym) => (
                          <div className={styles.coinlistHead} key={sym.symbol}>
                            <div>{sym.symbol || 0}</div>
                          </div>
                        ))
                      }
                    </div>
                  </td>

                  <td class="px-6 py-4 whitespace-nowrap">
                    <div>
                      {
                        bitkubList.symbols.map((sym) => (
                          <div className={styles.coinlistHead} key={sym.symbol}>
                            <div>{sym.last || 0}</div>
                          </div>
                        ))
                      }
                    </div>
                  </td>

                  {/* Start Binance */}

                  <td class="px-6 py-4 whitespace-nowrap">
                    <div>
                      {
                        biList.biSymbol.map((sym) => (
                          <div className={styles.coinlist} key={`binance-${sym.symbol}`}>
                            {
                              (sym.price != 0 ?
                                <div
                                 
                                >
                                  {sym.price}
                                  {
                                    (sym.diff != 0 ?
                                      <div
                                       
                                        style={{
                                          
                                          color: sym.diff > 0 ? "#019716" : "#e60000",
                                        }}
                                      >
                                      </div>
                                      :
                                      <br />
                                    )
                                  }
                                </div> :
                                <br />)
                            }
                          </div>
                        ))
                      }
                    </div>
                  </td>

                  <td class="px-6 py-4 whitespace-nowrap">
                    <div>
                      {
                        biList.biSymbol.map((sym) => (
                          <div className={styles.coinlist} key={`binance-${sym.symbol}`}>
                            {
                              (sym.price != 0 ?
                                <div
                                 
                                >
                                  {
                                    (sym.diff != 0 ?
                                      <div
                                       
                                        style={{
                                          
                                          color: sym.diff > 0 ? "#019716" : "#e60000",
                                        }}
                                      >
                                        {/* {
                                (sym.diff > 0 ?
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" style={{ width: 15 }}>
                                    <path fillRule="evenodd" d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                </svg>
                                :
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" style={{ width: 15 }}>
                                    <path fillRule="evenodd" d="M14.707 12.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                )
                            } */}
                                        <div style={{ position: 'relative' }}>{sym.diff}%</div>
                                      </div>
                                      :
                                      <br />
                                    )
                                  }
                                </div> :
                                <br />)
                            }
                          </div>
                        ))
                      }
                    </div>
                  </td>


                  {/* Start Coingecko */}

                  <td class="px-6 py-4 whitespace-nowrap">
                    <div>
                      {
                        geckoList.geckoSymbol.map((sym) => (
                          <div className={styles.coinlist} key={sym.symbol}>
                            {
                              (sym.last != 0 ?
                                <div
                                 
                                >
                                  {sym.last}
                                  {
                                    (sym.diff != 0 ?
                                      <div
                                       
                                        style={{
                                          
                                          color: sym.diff > 0 ? "#019716" : "#e60000",
                                        }}
                                      >
                                      </div>
                                      :
                                      <br />
                                    )
                                  }
                                </div> :
                                <br />)
                            }
                          </div>
                        ))
                      }
                    </div>
                  </td>

                  <td class="px-6 py-4 whitespace-nowrap">
                    <div>
                      {
                        geckoList.geckoSymbol.map((sym) => (
                          <div className={styles.coinlist} key={sym.symbol}>
                            {
                              (sym.last != 0 ?
                                <div
                                 
                                >
                                  {
                                    (sym.diff != 0 ?
                                      <div
                                       
                                        style={{
                                          
                                          color: sym.diff > 0 ? "#019716" : "#e60000",
                                        }}
                                      >
                                        {/* {
                                (sym.diff > 0 ?
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" style={{ width: 15 }}>
                                    <path fillRule="evenodd" d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                </svg>
                                :
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" style={{ width: 15 }}>
                                    <path fillRule="evenodd" d="M14.707 12.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                )
                            } */}
                                        <div style={{ position: 'relative' }}>{sym.diff}%</div>
                                      </div>
                                      :
                                      <br />
                                    )
                                  }
                                </div> :
                                <br />)
                            }
                          </div>
                        ))
                      }
                    </div>
                  </td>

                  {/* Start Satang  */}

                  <td class="px-6 py-4 whitespace-nowrap">
                    <div>
                      {
                        saList.saSymbol.map((sym) => (
                          <div className={styles.coinlist} key={sym.symbol}>
                            {
                              (sym.last != 0 ?
                                <div
                                 
                                >
                                  {sym.last}
                                  {
                                    (sym.diff != 0 ?
                                      <div
                                       
                                        style={{
                                          
                                          color: sym.diff > 0 ? "#019716" : "#e60000",
                                        }}
                                      >
                                      </div>
                                      :
                                      <br />
                                    )
                                  }
                                </div> :
                                <br />)
                            }
                          </div>
                        ))
                      }
                    </div>
                  </td>

                  <td class="px-6 py-4 whitespace-nowrap">
                    <div>
                      {
                        saList.saSymbol.map((sym) => (
                          <div className={styles.coinlist} key={sym.symbol}>
                            {
                              (sym.last != 0 ?
                                <div
                                 
                                >
                                  {
                                    (sym.diff != 0 ?
                                      <div
                                       
                                        style={{
                                          
                                          color: sym.diff > 0 ? "#019716" : "#e60000",
                                        }}
                                      >
                                        {/* {
                                (sym.diff > 0 ?
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" style={{ width: 15 }}>
                                    <path fillRule="evenodd" d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                </svg>
                                :
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" style={{ width: 15 }}>
                                    <path fillRule="evenodd" d="M14.707 12.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                )
                            } */}
                                        <div style={{ position: 'relative' }}>{sym.diff}%</div>
                                      </div>
                                      :
                                      <br />
                                    )
                                  }
                                </div> :
                                <br />)
                            }
                          </div>
                        ))
                      }
                    </div>
                  </td>

                  {/*  Start Huobi */}

                  <td class="px-6 py-4 whitespace-nowrap">
                    <div>
                      {
                        huobiList.data.map((sym) => (
                          <div className={styles.coinlist} key={sym.symbol}>
                            {
                              (sym.last != 0 ?
                                <div
                                 
                                >
                                  {sym.last}
                                  {
                                    (sym.diff != 0 ?
                                      <div
                                       
                                        style={{
                                          
                                          color: sym.diff > 0 ? "#019716" : "#e60000",
                                        }}
                                      >
                                      </div>
                                      :
                                      <br />
                                    )
                                  }
                                </div> :
                                <br />)
                            }
                          </div>
                        ))
                      }
                    </div>
                  </td>

                  <td class="px-6 py-4 whitespace-nowrap">
                    <div>
                      {
                        huobiList.data.map((sym) => (
                          <div className={styles.coinlist} key={sym.symbol}>
                            {
                              (sym.last != 0 ?
                                <div
                                 
                                >
                                  {
                                    (sym.diff != 0 ?
                                      <div
                                       
                                        style={{
                                          
                                          color: sym.diff > 0 ? "#019716" : "#e60000",
                                        }}
                                      >
                                        {/* {
                                (sym.diff > 0 ?
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" style={{ width: 15 }}>
                                    <path fillRule="evenodd" d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                </svg>
                                :
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" style={{ width: 15 }}>
                                    <path fillRule="evenodd" d="M14.707 12.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                )
                            } */}
                                        <div style={{ position: 'relative' }}>{sym.diff}%</div>
                                      </div>
                                      :
                                      <br />
                                    )
                                  }
                                </div> :
                                <br />)
                            }
                          </div>
                        ))
                      }
                    </div>
                  </td>

                  {/* Start Upbit */}

                  <td class="px-6 py-4 whitespace-nowrap">
                    <div>
                      {
                        upbitList.data.map((sym) => (
                          <div className={styles.coinlist} key={sym.market}>
                            {
                              (sym.last != 0 ?
                                <div
                                 
                                >
                                  {sym.last}
                                  {
                                    (sym.diff != 0 ?
                                      <div
                                       
                                        style={{
                                          
                                          color: sym.diff > 0 ? "#019716" : "#e60000",
                                        }}
                                      >
                                      </div>
                                      :
                                      <br />
                                    )
                                  }
                                </div> :
                                <br />)
                            }
                          </div>
                        ))
                      }
                    </div>
                  </td>

                  <td class="px-6 py-4 whitespace-nowrap">
                    <div>
                      {
                        upbitList.data.map((sym) => (
                          <div className={styles.coinlist} key={sym.market}>
                            {
                              (sym.last != 0 ?
                                <div
                                 
                                >
                                  {
                                    (sym.diff != 0 ?
                                      <div
                                       
                                        style={{
                                          
                                          color: sym.diff > 0 ? "#019716" : "#e60000",
                                        }}
                                      >
                                        {/* {
                                (sym.diff > 0 ?
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" style={{ width: 15 }}>
                                    <path fillRule="evenodd" d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                </svg>
                                :
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" style={{ width: 15 }}>
                                    <path fillRule="evenodd" d="M14.707 12.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                )
                            } */}
                                        <div style={{ position: 'relative' }}>{sym.diff}%</div>
                                      </div>
                                      :
                                      <br />
                                    )
                                  }
                                </div> :
                                <br />)
                            }
                          </div>
                        ))
                      }
                    </div>
                  </td>

                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <footer class="py-5 bg-gray-700 text-center text-white">
        Bitkub 😎
      </footer>

    </div>


  )
}



