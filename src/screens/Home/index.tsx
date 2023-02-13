import { useState, useCallback } from "react";
import { ScrollView } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

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

import { MealProps } from "../../storage/mealType";
import { getAllMeals } from "../../storage/getAllMeals";
import { getStatistic } from "../../storage/getStatistics";
import { Loading } from "../../components/Loading";

type Meal = {
  meal: MealProps;
};

export function Home() {
  const { COLORS } = useTheme();
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);
  const [meals, setMeals] = useState<MealProps[]>([]);
  const [mealsPercent, setMealsPercent] = useState(0);
  const [dates, setDates] = useState<string[]>([]);

  async function fetchMeals() {
    try {
      setLoading(true);

      const data = await getAllMeals();

      setMeals(data);
      setDates(
        data
          .map((meal: MealProps) => meal.date)
          .filter(
            (value: any, index: any, self: string | any[]) =>
              self.indexOf(value) === index
          )
      );

      const { calculateMealsWithinDiet } = await getStatistic();
      setMealsPercent(calculateMealsWithinDiet);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchMeals();
    }, [])
  );

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
              loading={loading}
              percent={mealsPercent}
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
              {loading ? (
                <Loading />
              ) : (
                dates
                  .map((date, index) => (
                    <MealsContainer key={index} date={date}>
                      {meals
                        .filter((meal) => meal.date === date)
                        .map((meal) => (
                          <MealsCard
                            key={meal.id}
                            time={meal.time}
                            title={meal.name}
                            type={meal.withinDiet ? "PRIMARY" : "SECONDARY"}
                            onPress={() =>
                              navigation.navigate("meal", { meal } as Meal)
                            }
                          />
                        ))
                        .sort((a, b) =>
                          b.props.time.localeCompare(a.props.time)
                        )}
                    </MealsContainer>
                  ))
                  .sort((a, b) => {
                    const dateA = new Date(a.props.date);
                    const dateB = new Date(b.props.date);
                    return dateB.getTime() - dateA.getTime();
                  })
              )}
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
