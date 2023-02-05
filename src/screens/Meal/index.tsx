import { useState } from "react";
import { Modal } from "react-native";
import { useTheme } from "styled-components/native";
import { PencilLine, Trash } from "phosphor-react-native";

import {
  Container,
  Content,
  Filter,
  Footer,
  MealDateAndHour,
  MealDateAndHourTitle,
  MealDescription,
  MealTitle,
  ModalButtons,
  ModalContainer,
  ModalContent,
  ModalText,
} from "./styles";
import { Button } from "../../components/Button";
import { Header } from "../../components/Header";
import { Tag } from "../../components/Tag";

export function Meal() {
  const [modalVisible, setModalVisible] = useState(false);
  const { COLORS } = useTheme();

  return (
    <Container>
      <Header title="Refeição" color="RED_LIGHT" />
      <Content>
        <MealTitle>X-tudo com fritas</MealTitle>
        <MealDescription>Jantar</MealDescription>
        <MealDateAndHourTitle>Data e hora</MealDateAndHourTitle>
        <MealDateAndHour>04/02/2023 às 20:51</MealDateAndHour>
        <Tag type="SECONDARY" />
      </Content>
      <Footer>
        <Button
          title="Editar refeição"
          style={{
            marginBottom: 9,
          }}
          type="PRIMARY"
          icon={<PencilLine size={18} color={COLORS.WHITE} />}
        />
        <Button
          title="Excluir refeição"
          type="TERTIARY"
          icon={<Trash size={18} color={COLORS.GRAY_100} />}
          onPress={() => setModalVisible(true)}
        />
      </Footer>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
        statusBarTranslucent
      >
        <ModalContainer>
          <Filter />
          <ModalContent>
            <ModalText>
              Deseja realmente excluir o registro da refeição?
            </ModalText>
            <ModalButtons>
              <Button
                title="Cancelar"
                type="QUATERNARY"
                style={{ marginRight: 12 }}
                onPress={() => setModalVisible(false)}
              />
              <Button title="Sim, excluir" type="SECONDARY" />
            </ModalButtons>
          </ModalContent>
        </ModalContainer>
      </Modal>
    </Container>
  );
}
