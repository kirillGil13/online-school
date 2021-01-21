export default function currencyFilter(value: number | bigint, currency = 'RUB'): any {
    return new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency
    }).format(value)
}
