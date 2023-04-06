import {
  asCurrency,
  interestPaid,
  totalCost,
} from "@/util/amortizationFormulas"
import {
  Card,
  CardBody,
  CardHeader,
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
import React from "react"

type Props = {
  loan: number
  years: number
  onLoanYearsChange: (val: number) => void
  interestRate: number
  onInterestRateChange: (val: number) => void
}

export default function LoanCard({
  loan,
  years,
  onLoanYearsChange,
  interestRate,
  onInterestRateChange,
}: Props) {
  return (
    <Card>
      <CardHeader>Loan</CardHeader>
      <CardBody gap={5}>
        <FormControl>
          <FormLabel>Years</FormLabel>
          <NumberInput
            value={years}
            max={50}
            min={0}
            onChange={(_, valAsNumber) => onLoanYearsChange(valAsNumber)}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>

          <FormLabel>Interest Rate</FormLabel>
          <NumberInput
            value={interestRate * 100}
            onChange={(_, valAsNumber) =>
              onInterestRateChange(valAsNumber / 100)
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

        <Flex flexDir="column" m="1rem 0">
          <Text>Interest Paid: </Text>
          <Heading as="h3" size="md">
            {asCurrency(interestPaid(loan, years, interestRate))}
          </Heading>
        </Flex>

        <Flex flexDir="column">
          <Text>Total Cost: </Text>
          <Heading as="h3" size="md">
            {asCurrency(totalCost(loan, years, interestRate))}
          </Heading>
        </Flex>
      </CardBody>
    </Card>
  )
}
