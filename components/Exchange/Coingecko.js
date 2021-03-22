const Coingecko = ({ geckoList }) => {

    if (typeof geckoList.geckoSymbol !== "undefined") {
        return (
            <div>
                {
                    geckoList.geckoSymbol.map((sym) => (
                        <div key={sym.symbol}>
                            {sym.current_price || 0}
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