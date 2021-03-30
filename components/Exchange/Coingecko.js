export const IntlFormatNumber = (bitcoin) => {
  return new Intl.NumberFormat("th-TH").format(bitcoin);
};

const Coingecko = ({ coingecko, bitkub }) => {

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
  }

  const geckoList = geckoCoin()

  if (typeof geckoList !== "undefined") {
    return (
      <div>
        {
          geckoList.geckoSymbol.map((sym) => (
            <div key={sym.symbol}>
              {/* {sym.symbol}- */}
              {sym.last || 0}
              {/* {sym.diff}% */}
            </div>
          ))
        }
      </div>
    )
  } else {
    return <div>Coingecko loading...</div>;
  }
}

export default Coingecko