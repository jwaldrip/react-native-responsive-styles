import React from "react";
import { Image } from "react-native";
import { useStyles } from "style";

type Props = {
  uri: string
}

export default function ExampleImage({ uri }: Props) {
  const styles = useStyles(({ colors }) => ({
    image: {
      borderColor: colors.primary.placement
    }
  }))

  return <Image style={styles.image} source={{ uri }} />
}
