import { MealProps } from "src/storage/meal/mealType";

export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      home: undefined;
      addOrEditMeal: {
        type: "add" | "edit";
        meal?: MealProps;
      };
      meal: {
        meal: MealProps;
      };
      statistics: undefined;
      feedback: {
        isPositive: boolean;
      };
    }
  }
}
