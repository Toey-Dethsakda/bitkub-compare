const Huobi = ({huobiList}) => {

    return (
        <div>
            <table className="border-collapse border border-green-800 ">
                <thead>
                    <tr>
                        <th className="border border-green-600">
                            Huobi Coins
                    </th>
                        <th className="border border-green-600">
                            Price
                    </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        huobiList.data.map((sym) => (
                            <tr key={sym.symbol}>
                                <th>{sym.symbol}</th>
                                <th>{sym.ask || 0}</th>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Huobi