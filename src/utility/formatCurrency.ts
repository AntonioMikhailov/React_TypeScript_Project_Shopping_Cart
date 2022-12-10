 const CURRENCY_FORMATTER = new Intl.NumberFormat("ru",  {
  currency: "RUB",
  style: 'currency',
  minimumFractionDigits: 0  
 })

export  function formatCurrency(number:number) {
  return (
    CURRENCY_FORMATTER.format(number)
  )
}
