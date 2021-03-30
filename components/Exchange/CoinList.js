const CoinsList = ({coinsList}) => {
    const urlCoin = 'https://www.bitkub.com/static/images/icons/'
    const coinlistKub = () => {
        if (typeof coinsList !== "undefined") {
          const bitList = coinsList
          return bitList
        } else {
          const bitList = {}
          return bitList
        }
      }

    const list = coinlistKub()
    
    if (typeof list.symbols !== "undefined") {
        return (
            <div>
                {
                    list.symbols.map((sym) => (
                        <div key={sym.symbol}>
                            <img src={`https://www.bitkub.com/static/images/icons/${sym.symbol}.png`}/>
                            {sym.symbol}
                        </div>
                    ))
                }
            </div>
        )
    } else {
        return <div>Coins List loading...</div>;
    }
}

export default CoinsList