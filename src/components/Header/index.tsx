import React from "react";
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
};

export function Header({ title, color = "GRAY_500" }: Props) {
  return (
    <Container color={color}>
      <Button>
        <Icon />
      </Button>
      <Title>{title}</Title>
    </Container>
  );
}
