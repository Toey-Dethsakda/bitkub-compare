const Upbit = ({upbitList}) => {

    return (
        <div>
            <table className="border-collapse border border-green-800 ">
                <thead>
                    <tr>
                        <th className="border border-green-600">
                            Upbit Coins
                    </th>
                        <th className="border border-green-600">
                            Price
                    </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        upbitList.data.map((sym) => (
                            <tr key={sym.market}>
                                <th>{sym.market}</th>
                                <th>{sym.trade_price || 0}</th>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Upbit