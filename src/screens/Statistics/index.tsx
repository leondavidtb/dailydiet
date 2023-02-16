import { useCallback, useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useTheme } from "styled-components/native";

import {
  Button,
  CardGroup,
  Container,
  Content,
  ContentTitle,
  Description,
  Header,
  Icon,
  Title,
} from "./styles";
import { getStatistic } from "../../storage/getStatistics";
import { Loading } from "../../components/Loading";
import { StatisticCard } from "../../components/StatisticCard";

export function Statistics() {
  const { COLORS } = useTheme();
  const navigation = useNavigation();

  const [percent, setPercent] = useState(0);
  const [sequenceOfMealsWithinTheDiet, setSequenceOfMealsWithinTheDiet] =
    useState(0);
  const [registeredMeals, setRegisteredMeals] = useState(0);
  const [mealsWithinTheDiet, setMealsWithinTheDiet] = useState(0);
  const [mealsOutsideTheDiet, setMealsOutsideTheDiet] = useState(0);
  const [loading, setLoading] = useState(false);

  async function fetchStatistic() {
    try {
      setLoading(true);
      const {
        totalMeals,
        calculateMealsWithinDiet,
        mealsOutsideTheDiet,
        mealsWithinDiet,
        bestSequenceWithinDiet,
      } = await getStatistic();
      setPercent(calculateMealsWithinDiet);
      setRegisteredMeals(totalMeals);
      setMealsWithinTheDiet(mealsWithinTheDiet);
      setMealsOutsideTheDiet(mealsOutsideTheDiet);
      setSequenceOfMealsWithinTheDiet(bestSequenceWithinDiet);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchStatistic();
    }, [])
  );

  return (
    <Container>
      <Header isPositive={percent >= 50 ? true : false}>
        <Button onPress={() => navigation.navigate("home")}>
          <Icon color={percent >= 50 ? COLORS.GREEN_DARK : COLORS.RED_DARK} />
        </Button>
        <Title>{loading ? <Loading /> : percent.toFixed(2) + "%"}</Title>
        <Description>das refeições dentro da dieta</Description>
      </Header>
      <Content>
        <ContentTitle>Estatísticas gerais</ContentTitle>
        {loading ? (
          <Loading />
        ) : (
          <>
            <StatisticCard
              title={sequenceOfMealsWithinTheDiet.toString()}
              description="melhor sequência de pratos dentro da dieta"
            />
            <StatisticCard
              title={registeredMeals.toString()}
              description="refeições registradas"
            />
            <CardGroup>
              <StatisticCard
                title={mealsWithinTheDiet.toString()}
                description="refeições dentro da dieta"
                style={{ marginRight: 12, backgroundColor: COLORS.GREEN_LIGHT }}
              />
              <StatisticCard
                title={mealsOutsideTheDiet.toString()}
                description="refeições fora da dieta"
                style={{ backgroundColor: COLORS.RED_LIGHT }}
              />
            </CardGroup>
          </>
        )}
      </Content>
    </Container>
  );
}
