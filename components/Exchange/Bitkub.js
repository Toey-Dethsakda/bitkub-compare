const Bitkub = ({bitList}) => {
    if (typeof bitList.symbol !== "undefined") {
        return (
            <div>
                {
                    bitList.symbol.map((sym) => (
                        <div key={sym.symbol}>
                            {sym.last || 0}
                        </div>
                    ))
                }
            </div>
        )
    } else {
        return <div>Bitkub loading...</div>;
    } 
}

export default Bitkub