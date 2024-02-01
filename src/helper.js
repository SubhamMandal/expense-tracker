const { format } = new Intl.NumberFormat('hi-In', {
    style: 'currency',
    currency: 'INR'
})

export { format as currencyFormat };