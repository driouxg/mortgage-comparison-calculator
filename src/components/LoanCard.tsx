import {
  Card,
  CardBody,
  CardHeader,
  FormControl,
  FormLabel,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react"
import React, { useState } from "react"

type Props = {
  years: number
  onLoanYearsChange: (val: number) => void
}

export default function LoanCard({ years, onLoanYearsChange }: Props) {
  const [interestRate, setInterestRate] = useState(6)

  return (
    <Card>
      <CardHeader>Loan</CardHeader>
      <CardBody>
        <FormControl>
          <FormLabel>Amount</FormLabel>
          <NumberInput
            value={years}
            max={50}
            min={10}
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
            value={interestRate}
            onChange={(_, valAsNumber) => setInterestRate(valAsNumber)}
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
      </CardBody>
    </Card>
  )
}
