export const IntlFormatNumber = (bitcoin) => {
  return new Intl.NumberFormat("th-TH").format(bitcoin);
};

const Huobi = ({ huobi, bitkub }) => {

  const huobiCoin = () => {
    if (bitkub && bitkub.symbols && huobi && huobi.data) {
      const result = bitkub.symbols.map((bitkubList) => {
        const huobiResult = huobi.data.find((huobiRes) => huobiRes.symbol.replace('thb', '').toUpperCase() == bitkubList.symbol)
        if (huobiResult) {
          let huoArr = {
            symbol: huobiResult.symbol.replace('thb', '').toUpperCase(),
            last: Number.parseFloat(huobiResult.ask).toFixed(2)
          }
          let diff = Number.parseFloat(((huoArr.last - bitkubList.last) / huoArr.last * 100)).toFixed(2)
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
  }
  
  const huobiList = huobiCoin()

  if (typeof huobiList !== "undefined") {
    return (
      <div>
        {
          huobiList.data.map((sym) => (
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
    return <div>Huobi loading...</div>;
  }
}

export default Huobi