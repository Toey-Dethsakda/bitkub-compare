const Binance = ({biList}) => {
    if (typeof biList.biSymbol !== 'undefined') {
        return (
            <div>
                {
                    biList.biSymbol.map((sym) => (
                        <div key={sym.symbol}>
                            {sym.price || 0}
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