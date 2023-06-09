import Head from "next/head"
import styles from "@/styles/Home.module.css"
import {
  Box,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text,
} from "@chakra-ui/react"
import { useEffect, useState } from "react"
import LoanCard from "@/components/LoanCard"
import {
  asCurrency,
  monthlyPayment,
  totalCost,
} from "@/util/amortizationFormulas"
import { compoundInterestWithContributions } from "@/util/compoundInterestFormulas"
import Section from "@/components/Section"
import Navbar from "@/components/Navbar"

export default function Home() {
  const [loan, setLoan] = useState(400000)
  const [indexFundAverageReturnRate, setIndexFundAverageReturnRate] =
    useState(0.075)

  const [loanDuration1, setLoanDuration1] = useState(15)
  const [loanDuration2, setLoanDuration2] = useState(30)

  const [interestRate1, setInterestRate1] = useState(0.05424)
  const [interestRate2, setInterestRate2] = useState(0.06158)

  const [monthlyPayment1, setMonthlyPayment1] = useState(0)
  const [monthlyPayment2, setMonthlyPayment2] = useState(0)

  const monthlyPaymentDiff = monthlyPayment1 - monthlyPayment2

  useEffect(() => {
    setMonthlyPayment1(monthlyPayment(loan, loanDuration1, interestRate1))
    setMonthlyPayment2(monthlyPayment(loan, loanDuration2, interestRate2))
  }, [loan, loanDuration1, loanDuration2, interestRate1, interestRate2])

  const investingMinusTotalCost1 =
    compoundInterestWithContributions(
      loanDuration1,
      monthlyPayment1,
      indexFundAverageReturnRate
    ) - totalCost(loan, loanDuration1, interestRate1)
  const investingMinusTotalCost2 =
    compoundInterestWithContributions(
      loanDuration2,
      monthlyPaymentDiff,
      indexFundAverageReturnRate
    ) - totalCost(loan, loanDuration2, interestRate2)

  const loanOption1IsBetter = () =>
    investingMinusTotalCost2 <= investingMinusTotalCost1

  return (
    <>
      <Head>
        <title>Mortgage Comparison Tool</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header></header>

      <Navbar />

      <main className={styles.main}>
        <Section>
          <FormControl>
            <FormLabel>Loan Value</FormLabel>
            <NumberInput
              value={loan}
              onChange={(_, valAsNumber) => setLoan(valAsNumber)}
              step={10000}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>

            <FormLabel mt="1rem">
              Index Fund Average Return Percentage
            </FormLabel>
            <NumberInput
              value={indexFundAverageReturnRate * 100}
              onChange={(_, valAsNumber) =>
                setIndexFundAverageReturnRate(valAsNumber / 100)
              }
              precision={3}
              step={0.1}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>

          <Flex justifyContent={"space-between"} width={"100%"} gap="10rem">
            <LoanCard
              loan={loan}
              years={loanDuration1}
              onLoanYearsChange={setLoanDuration1}
              interestRate={interestRate1}
              onInterestRateChange={setInterestRate1}
            />

            <Center>vs.</Center>

            <LoanCard
              loan={loan}
              years={loanDuration2}
              onLoanYearsChange={setLoanDuration2}
              interestRate={interestRate2}
              onInterestRateChange={setInterestRate2}
            />
          </Flex>

          <Flex justifyContent="space-between" width="100%">
            <Flex flexDir="column" gap={5} maxW="17rem">
              <Heading>Loan Option 1</Heading>

              <Box>
                <Text>
                  You start investing your monthly mortgage payment amount (
                  {asCurrency(monthlyPayment1)}) for{" "}
                  {loanDuration2 - loanDuration1} years once you have fully paid
                  off the loan:
                </Text>

                <Heading as="h3" size="md">
                  {asCurrency(
                    compoundInterestWithContributions(
                      loanDuration1,
                      monthlyPayment1,
                      indexFundAverageReturnRate
                    )
                  )}
                </Heading>
              </Box>

              <Box>
                <Text>Investing - total house cost:</Text>
                <Heading as="h3" size="md">
                  {asCurrency(investingMinusTotalCost1)}
                </Heading>
              </Box>
            </Flex>

            <Flex flexDir="column" gap={5} maxW="17rem">
              <Heading>Loan Option 2</Heading>

              <Box>
                <Text>
                  If you invest the monthly payment difference between loan 1
                  and 2 ({asCurrency(monthlyPaymentDiff)}) into S&P 500 for a{" "}
                  {indexFundAverageReturnRate * 100}% annualized return for{" "}
                  {loanDuration2} years.
                </Text>

                <Heading as="h3" size="md">
                  {asCurrency(
                    compoundInterestWithContributions(
                      loanDuration2,
                      monthlyPaymentDiff,
                      indexFundAverageReturnRate
                    )
                  )}
                </Heading>
              </Box>

              <Box>
                <Text>Investing - total house cost:</Text>
                <Heading as="h3" size="md">
                  {asCurrency(investingMinusTotalCost2)}
                </Heading>
              </Box>
            </Flex>
          </Flex>

          <Flex flexDir="column">
            <Heading>Results</Heading>
            <Text>
              Loan Option {loanOption1IsBetter() ? "1" : "2"} is better. You
              will earn{" "}
              {asCurrency(
                Math.abs(investingMinusTotalCost1 - investingMinusTotalCost2)
              )}{" "}
              more by going with this option.
            </Text>
          </Flex>
        </Section>
      </main>
    </>
  )
}
