const Coingecko = ({ symbols }) => {
    
    return (
        <div>
            <table className="border-collapse border border-green-800 ">
                <thead>
                    <tr>
                        <th className="border border-green-600">
                            Coingecko
                    </th>
                        <th className="border border-green-600">
                            Price
                    </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        symbols.geckoSymbol.map((sym) => (
                            <tr key={sym.symbol}>
                                <th>{sym.symbol}</th>
                                <th>{sym.current_price || 0}</th>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )

}

export default Coingecko