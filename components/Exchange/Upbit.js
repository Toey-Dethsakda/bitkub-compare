const Upbit = ({upbitList}) => {

    if (typeof upbitList.data !== "undefined") {
        return (
            <div>
                {
                    upbitList.data.map((sym) => (
                        <div key={sym.market}>
                            {sym.trade_price || 0}
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