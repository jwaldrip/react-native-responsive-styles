import React from "react";
import { Text } from "react-native";
import { useStyles } from "style";

type Props = {
  uri: string
}

export default function ExampleText({ uri }: Props) {
  const styles = useStyles(({ colors }) => ({
    text: {
      color: colors.primary.placement
    }
  }))

  return <Text style={styles.text}>Hello World</Text>
}
