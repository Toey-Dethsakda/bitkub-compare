export const IntlFormatNumber = (bitcoin) => {
  return new Intl.NumberFormat("th-TH").format(bitcoin);
};

const Upbit = ({ upbit, bitkub }) => {

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
  }

  const upbitList = upbitCoin()

  if (typeof upbitList !== "undefined") {
    return (
      <div>
        {
          upbitList.data.map((sym) => (
            <div key={sym.market}>
              {/* {sym.symbol}- */}
              {sym.last || 0}
              {/* {sym.diff}% */}
            </div>
          ))
        }
      </div>
    )
  } else {
    return <div>Upbit loading...</div>;
  }
}

export default Upbit