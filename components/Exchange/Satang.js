export const IntlFormatNumber = (bitcoin) => {
  return new Intl.NumberFormat("th-TH").format(bitcoin);
};

const Satang = ({ satang, bitkub }) => {

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
  }

  const saList = satangCoin()

  if (typeof saList !== "undefined") {
    return (
      <div>
        {
          saList.saSymbol.map((sym) => (
            <div key={sym.symbol}>
              {/* {sym.symbol}- */}
              {sym.last || 0}
              {/* {sym.diff || 0}% */}
            </div>
          ))
        }
      </div>
    )
  } else {
    return <div>Satang loading...</div>;
  }

}

export default Satang