import { ScrollView } from "react-native";
import {
  Container,
  Ellipse,
  Header,
  Logo,
  MealsSection,
  MealsSectionContent,
  MealsSectionHeader,
  MealsTitle,
  PercentSection,
} from "./styles";

import logoImg from "../../assets/logo.png";
import ellipseImg from "../../assets/ellipse.png";
import { useTheme } from "styled-components/native";
import { PercentCard } from "../../components/PercentCard";

export function Home() {
  const { COLORS } = useTheme();

  return (
    <>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: 130,
          backgroundColor: COLORS.GRAY_100,
        }}
      >
        <Container>
          <Header>
            <Logo source={logoImg} />
            <Ellipse source={ellipseImg} />
          </Header>
          <PercentSection>
            <PercentCard loading={false} percent={30} />
          </PercentSection>

          <MealsSection>
            <MealsSectionHeader>
              <MealsTitle>Refeições</MealsTitle>
            </MealsSectionHeader>

            <MealsSectionContent></MealsSectionContent>
          </MealsSection>
        </Container>
      </ScrollView>
    </>
  );
}
