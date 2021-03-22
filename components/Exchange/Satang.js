const Satang = ({saList}) => {

    if (typeof saList.saSymbol !== "undefined") {
        return (
            <div>
                {
                    saList.saSymbol.map((sym) => (
                        <div key={sym.symbol}>
                            {sym.lastPrice || 0}
                        </div>
                    ))
                }
            </div>
        )
    } else {
        return <div>Satang loading...</div>;
    }

    
}

export default Satang