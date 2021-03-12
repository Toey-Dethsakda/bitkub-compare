const Satang = ({saList}) => {

    return (
        <div>
            <table className="border-collapse border border-green-800 ">
                <thead>
                    <tr>
                        <th className="border border-green-600">
                            Satang Coins
                    </th>
                        <th className="border border-green-600">
                            Price
                    </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        saList.saSymbol.map((sym) => (
                            <tr key={sym.symbol}>
                                <th>{sym.symbol}</th>
                                <th>{sym.lastPrice || 0}</th>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Satang