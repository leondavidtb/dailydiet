import AsyncStorage from "@react-native-async-storage/async-storage";
import { getMeal } from "./getMeal";
import { BEST_SEQUENCE, MEAL_COLLECTION } from "./storageConfig";
import { getAllMeals } from "./getAllMeals";
import { MealProps } from "./mealType";
import { getStatistic } from "./getStatistics";

export async function editMeal(mealId: string, meal: MealProps) {
  try {
    const storedMeals = await getAllMeals();
    const storedMeal = await getMeal(mealId);
    const { bestSequenceWithinDiet } = await getStatistic();

    const filterMeals = storedMeals.filter(
      (meal: MealProps) => meal.id !== mealId
    );

    const updatedMeal = { ...storedMeal, ...meal };

    const storage = JSON.stringify([...filterMeals, updatedMeal]);

    await AsyncStorage.setItem(MEAL_COLLECTION, storage);

    if (meal.withinDiet !== storedMeal.withinDiet) {
      if (meal.withinDiet === true) {
        await AsyncStorage.setItem(
          BEST_SEQUENCE,
          String(bestSequenceWithinDiet + 1)
        );
      } else {
        await AsyncStorage.setItem(
          BEST_SEQUENCE,
          String(bestSequenceWithinDiet - 1)
        );
      }
    }
  } catch (error) {
    throw error;
  }
}
