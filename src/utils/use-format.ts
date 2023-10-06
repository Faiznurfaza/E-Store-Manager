export function useFormatCurrency(value: number) {
    let USDollar = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    })
    return `${USDollar.format(value)}`
}

export function useFormatPercentage(value: number) {
    return `${value} %`
}