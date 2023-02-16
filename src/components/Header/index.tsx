import React from "react";
import { useNavigation } from "@react-navigation/native";

import {
  Button,
  Container,
  HeaderColorStyleProps,
  Icon,
  Title,
} from "./styles";

type Props = {
  title: string;
  color?: HeaderColorStyleProps;
  navigate: "home" | "addOrEditMeal";
};

export function Header({ title, navigate, color = "GRAY_500" }: Props) {
  const navigation = useNavigation();

  return (
    <Container color={color}>
      <Button onPress={() => navigation.navigate(navigate)}>
        <Icon />
      </Button>
      <Title>{title}</Title>
    </Container>
  );
}
