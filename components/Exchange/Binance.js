const Binance = ({biList}) => {

    return (
        <div>
            <table className="border-collapse border border-green-800 ">
                <thead>
                    <tr>
                        <th className="border border-green-600">
                            Binance Coins
                    </th>
                        <th className="border border-green-600">
                            Price
                    </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        biList.biSymbol.map((sym) => (
                            <tr key={sym.symbol}>
                                <th>{sym.symbol}</th>
                                <th>{sym.price || 0}</th>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Binance