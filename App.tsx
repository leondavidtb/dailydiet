import { StatusBar } from "expo-status-bar";
import { ThemeProvider } from "styled-components/native";
import {
  useFonts,
  Nunito_400Regular,
  Nunito_700Bold,
} from "@expo-google-fonts/nunito";

import { Home } from "./src/screens/Home";
import theme from "./src/theme";
import { Loading } from "./src/components/Loading";
import { Meal } from "./src/screens/Meal";

export default function App() {
  const [fontsLoaded] = useFonts({ Nunito_400Regular, Nunito_700Bold });

  return (
    <ThemeProvider theme={theme}>
      <StatusBar style="dark" backgroundColor="transparent" translucent />
      {fontsLoaded ? <Meal /> : <Loading />}
    </ThemeProvider>
  );
}
