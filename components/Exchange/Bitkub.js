export const IntlFormatNumber = (bitcoin) => {
    return new Intl.NumberFormat("th-TH").format(bitcoin);
};

const Bitkub = ({ bitkub }) => {
    const bitkubCoin = () => {
        const bitkubtArr = []
        if (typeof bitkub !== "undefined") {
            bitkub.symbols.forEach(bitkubRes => {
                let bitArr = {
                    symbol: bitkubRes.symbol,
                    last: IntlFormatNumber(bitkubRes.last)
                }
                bitkubtArr.push(bitArr)
            });
            return {
                symbols: bitkubtArr
            }
        }
        return {}
    }

    const bitkubList = bitkubCoin()

    if (typeof bitkubList.symbols !== "undefined") {
        return (
            <div>
                {
                    bitkubList.symbols.map((sym) => (
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