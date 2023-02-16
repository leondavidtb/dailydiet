import { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation, useRoute } from "@react-navigation/native";

import {
  Button,
  ButtonContainer,
  ButtonText,
  Container,
  Content,
  DateAndHour,
  Footer,
  OptionText,
  Options,
  Title,
} from "./styles";
import { addMeal } from "../../storage/addMeal";
import { editMeal } from "../../storage/editMeal";
import { getStatistic } from "../../storage/getStatistics";
import { MealProps } from "../../storage/mealType";

import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import { OptionButton } from "../../components/OptionButton";
import { Button as ButtonComponent } from "../../components/Button";

type RouteParams = {
  meal?: MealProps;
  type: "add" | "edit";
};

export function AddOrEditMeal() {
  const route = useRoute();
  const { meal, type } = route?.params as RouteParams;

  const [date, setDate] = useState(meal?.date || "");
  const [time, setTime] = useState(meal?.time || "");
  const [mealName, setMealName] = useState(meal?.name || "");
  const [showDate, setShowDate] = useState(false);
  const [showHour, setShowHour] = useState(false);
  const [selectedOption, setSelectedOption] = useState(
    meal?.withinDiet === true ? "Sim" : meal?.withinDiet === false ? "Não" : ""
  );
  const [mealDescription, setMealDescription] = useState(
    meal?.description || ""
  );

  const navigation = useNavigation();

  async function handleMeal() {
    try {
      if (type === "add") {
        await addMeal({
          id: new Date().getTime().toString(),
          name: mealName,
          description: mealDescription,
          date: date,
          time: time,
          withinDiet: selectedOption === "Sim",
        });
      } else {
        await editMeal(meal.id, {
          id: meal.id,
          name: mealName,
          description: mealDescription,
          date: date,
          time: time,
          withinDiet: selectedOption === "Sim",
        });
      }

      const { calculateMealsWithinDiet } = await getStatistic();

      navigation.navigate("feedback", {
        isPositive: calculateMealsWithinDiet > 50 ? true : false,
      });

      setDate("");
      setTime("");
      setMealName("");
      setMealDescription("");
      setSelectedOption("");
      setShowDate(false);
      setShowHour(false);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Container>
      <Header title="Nova refeição" navigate="home" />
      <Content>
        <Input label="Nome" onChangeText={setMealName} value={mealName} />
        <Input
          label="Descrição"
          type="SECONDARY"
          onChangeText={setMealDescription}
          value={mealDescription}
        />
        <DateAndHour>
          <ButtonContainer
            style={{
              marginRight: 24,
            }}
          >
            <Title>Data</Title>
            <Button onPress={() => setShowDate(true)}>
              <ButtonText>{date}</ButtonText>
            </Button>
          </ButtonContainer>
          <ButtonContainer>
            <Title>Hora</Title>
            <Button onPress={() => setShowHour(true)}>
              <ButtonText>{time}</ButtonText>
            </Button>
          </ButtonContainer>
        </DateAndHour>
        <OptionText>Está dentro da dieta?</OptionText>
        <Options>
          <OptionButton
            title="Sim"
            type={selectedOption === "Sim" ? "PRIMARY" : undefined}
            onPress={() =>
              selectedOption === "Sim"
                ? setSelectedOption("")
                : setSelectedOption("Sim")
            }
          />
          <OptionButton
            title="Não"
            type={selectedOption === "Não" ? "SECONDARY" : undefined}
            onPress={() =>
              selectedOption === "Não"
                ? setSelectedOption("")
                : setSelectedOption("Não")
            }
          />
        </Options>
        {showDate && (
          <DateTimePicker
            value={new Date()}
            mode={"date"}
            is24Hour={true}
            display="default"
            onChange={(event, date) => {
              setShowDate(false);
              setDate(
                event.type === "set"
                  ? date?.getDate().toString().padStart(2, "0") +
                      "/" +
                      (date?.getMonth() + 1) +
                      "/" +
                      date?.getFullYear()
                  : (prevDate) => prevDate
              );
            }}
            locale="pt-BR"
            positiveButtonLabel="Confirmar"
          />
        )}
        {showHour && (
          <DateTimePicker
            value={new Date()}
            mode={"time"}
            is24Hour={true}
            display="default"
            onChange={(event, hour) => {
              setShowHour(false);
              setTime(
                event.type === "set"
                  ? hour?.getHours().toString().padStart(2, "0") +
                      ":" +
                      hour?.getMinutes().toString().padStart(2, "0")
                  : (prevHour) => prevHour
              );
            }}
            locale="pt-BR"
            positiveButtonLabel="Confirmar"
          />
        )}
      </Content>
      <Footer>
        <ButtonComponent
          title={type === "add" ? "Cadastrar refeição" : "Salvar alterações"}
          type="SECONDARY"
          onPress={handleMeal}
        />
      </Footer>
    </Container>
  );
}
