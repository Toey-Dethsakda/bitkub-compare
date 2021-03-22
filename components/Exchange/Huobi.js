const Huobi = ({huobiList}) => {

    if (typeof huobiList.data !== "undefined") {
        return (
            <div>
                {
                    huobiList.data.map((sym) => (
                        <div key={sym.symbol}>
                            {sym.ask || 0}
                        </div>
                    ))
                }
            </div>
        )
    } else {
        return <div>Huobi loading...</div>;
    }
}

export default Huobi