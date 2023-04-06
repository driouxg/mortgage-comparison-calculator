export function monthlyPayment(
  loan: number,
  years: number,
  interestRate: number
) {
  let numberOfPayments = 12

  const numerator = loan * (interestRate / numberOfPayments)
  const denominator =
    1 - (1 + interestRate / numberOfPayments) ** -(numberOfPayments * years)

  return numerator / denominator
}

export function totalCost(loan: number, years: number, interestRate: number) {
  return years * monthlyPayment(loan, years, interestRate) * 12
}

export function interestPaid(
  loan: number,
  years: number,
  interestRate: number
) {
  return totalCost(loan, years, interestRate) - loan
}

export function asCurrency(val: number) {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  })

  return formatter.format(val)
}
