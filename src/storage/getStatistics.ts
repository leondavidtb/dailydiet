import AsyncStorage from "@react-native-async-storage/async-storage";
import { BEST_SEQUENCE } from "./storageConfig";
import { getAllMeals } from "./getAllMeals";
import { MealProps } from "./mealType";

type StatisticProps = {
  totalMeals: number;
  calculateMealsWithinDiet: number;
  mealsWithinDiet: number;
  mealsOutsideTheDiet: number;
  bestSequenceWithinDiet: number;
};

export async function getStatistic(): Promise<StatisticProps> {
  try {
    const storedMeals = await getAllMeals();
    const storedBestSequenceWithinDiet = await AsyncStorage.getItem(
      BEST_SEQUENCE
    );

    const totalMeals = storedMeals.length;
    const mealsWithinDiet = storedMeals.filter(
      (meal: MealProps) => meal.withinDiet === true
    ).length;
    const mealsOutsideTheDiet = totalMeals - mealsWithinDiet;

    const calculateMealsWithinDiet = (mealsWithinDiet / totalMeals) * 100 || 0;

    const countMealsByDate = storedMeals
      .filter((meal: MealProps) => meal.withinDiet === true)
      .reduce((acc: { [x: string]: any }, meal: { date: string | number }) => {
        acc[meal.date] = (acc[meal.date] || 0) + 1;
        return acc;
      }, {});

    const countMaxMealsByDate = Math.max(
      ...(Object.values(countMealsByDate) as number[])
    );

    await AsyncStorage.setItem(BEST_SEQUENCE, countMaxMealsByDate.toString());

    return {
      totalMeals,
      calculateMealsWithinDiet,
      mealsWithinDiet,
      mealsOutsideTheDiet,
      bestSequenceWithinDiet: Number(storedBestSequenceWithinDiet),
    };
  } catch (error) {
    throw error;
  }
}
