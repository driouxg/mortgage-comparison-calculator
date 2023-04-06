import { Flex } from "@chakra-ui/react"
import { ReactNode } from "react"

type SectionProps = {
  id?: string
  children: ReactNode
  style?: React.CSSProperties
}

export default function Section({ children, id, style }: SectionProps) {
  return (
    <section
      id={id}
      style={{
        padding: "10rem 0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        // position: "relative",
        ...style,
      }}
    >
      <Flex
        gap={40}
        style={{
          margin: "0 auto",
          maxWidth: "72rem",
          width: "100%",
          display: "flex",
          flexGrow: 1,
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        {children}
      </Flex>
    </section>
  )
}
