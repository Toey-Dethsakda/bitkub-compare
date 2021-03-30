export const IntlFormatNumber = (bitcoin) => {
  return new Intl.NumberFormat("th-TH").format(bitcoin);
};

const Binance = ({ binance, bitkub, exchangeTHB }) => {

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
  }

  const biList = binanceCoin()
  if (typeof biList !== 'undefined') {
    return (
      <div>
        {
          biList.biSymbol.map((sym) => (
            <div key={`binance-${sym.symbol}`}>
              {/* {sym.symbol || 0}- */}
              {sym.price || 0}
              {/* {sym.diff} % */}
            </div>
          ))
        }

      </div>
    )
  } else {
    return <div>Binance loading...</div>;
  }
}

export default Binance