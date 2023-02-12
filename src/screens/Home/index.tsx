import { ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";

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
import { Button } from "../../components/Button";
import { Plus } from "phosphor-react-native";
import { MealsContainer } from "../../components/MealsContainer";
import { MealsCard } from "../../components/MealsCard";

export function Home() {
  const { COLORS } = useTheme();
  const navigation = useNavigation();

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
            <PercentCard
              loading={false}
              percent={30}
              onPress={() => navigation.navigate("statistics")}
            />
          </PercentSection>

          <MealsSection>
            <MealsSectionHeader>
              <MealsTitle>Refeições</MealsTitle>
              <Button
                title="Nova refeição"
                type="PRIMARY"
                icon={<Plus size={18} color={COLORS.WHITE} />}
              />
            </MealsSectionHeader>

            <MealsSectionContent>
              <MealsContainer date="05/02/2023">
                <MealsCard
                  time="20:25"
                  title="X-burguer com fritas"
                  type="SECONDARY"
                  onPress={() => navigation.navigate("meal")}
                />
              </MealsContainer>
            </MealsSectionContent>
          </MealsSection>
        </Container>
      </ScrollView>
    </>
  );
}
