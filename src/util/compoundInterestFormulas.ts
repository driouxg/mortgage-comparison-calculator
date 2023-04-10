const numTimesCompoundedPerYear = 1

export function compoundInterestWithContributions(
  years: number,
  monthlyContributions: number,
  interestRate: number
) {
  return (
    compoundInterest(years, interestRate) +
    futureValueOfSeries(years, monthlyContributions, interestRate)
  )
}

function compoundInterest(years: number, interestRate: number) {
  const principal = 1

  // Formula found via: https://www.wallstreetiswaiting.com/running-the-numbers-1/calculating-interest-recurring-payments/
  // Verified with calculator: https://morganfranklinfellowship.com/calculators/saving-investing-calculator/

  return (
    principal *
    (1 + interestRate / numTimesCompoundedPerYear) **
      (numTimesCompoundedPerYear * years)
  )
}

function futureValueOfSeries(
  years: number,
  monthlyContributions: number,
  interestRate: number
) {
  const numerator = 12 * monthlyContributions * (1 + interestRate) ** years - 1

  const denominator = interestRate

  return numerator / denominator
}
