const Bitkub = ({bitList}) => {
    return (
        <div>
            <table className="border-collapse border border-green-800 ">
                <thead>
                    <tr>
                        <th className="border border-green-600">
                            Bitkub Coins
                    </th>
                        <th className="border border-green-600">
                            Price
                    </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        bitList.symbol.map((sym) => (
                            <tr key={sym.symbol}>
                                <th>{sym.symbol}</th>
                                <th>{sym.last || 0}</th>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Bitkub