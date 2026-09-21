import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Modal,
  TextInput,
  Button,
} from "react-native";

type Personagem = {
  id: number;
  name: string;
  idade: string;
  especie: string;
};

export default function Personagens() {

  const [personagens, setPersonagens] = useState<Personagem[]>([]);

  const [modalVisible, setModalVisible] = useState(false);

  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");
  const [especie, setEspecie] = useState("");

  const [personagemEditando, setPersonagemEditando] =
    useState<Personagem | null>(null);


  
  function cadastrarPersonagem() {

    const novoPersonagem: Personagem = {
      id: Date.now(),
      name: nome,
      idade: idade,
      especie: especie,
    };

    setPersonagens((personagensAnteriores) => [
      ...personagensAnteriores,
      novoPersonagem,
    ]);

    limparFormulario();
  }


  
  function editarPersonagem(personagem: Personagem) {

    setPersonagemEditando(personagem);

    setNome(personagem.name);
    setIdade(personagem.idade);
    setEspecie(personagem.especie);

    setModalVisible(true);
  }


  function atualizarPersonagem() {

    if (personagemEditando === null) {
      return;
    }

    setPersonagens((personagensAnteriores) =>
      personagensAnteriores.map((personagem) => {

        if (personagem.id === personagemEditando.id) {

          return {
            ...personagem,
            name: nome,
            idade: idade,
            especie: especie,
          };

        }

        return personagem;

      })
    );

    limparFormulario();
  }


  
  function excluirPersonagem(id: number) {

    setPersonagens((personagensAnteriores) =>
      personagensAnteriores.filter(
        (personagem) => personagem.id !== id
      )
    );
  }


  
  function limparFormulario() {

    setNome("");
    setIdade("");
    setEspecie("");

    setPersonagemEditando(null);

    setModalVisible(false);
  }


  return (
    <View style={styles.container}>

      <Text style={styles.titulo}>
        Personagens
      </Text>


      <Button
        title="Cadastrar personagem"
        onPress={() => setModalVisible(true)}
      />


      <FlatList
        data={personagens}

        keyExtractor={(item) =>
          item.id.toString()
        }

        renderItem={({ item }) => (

          <View style={styles.card}>

            <View style={styles.informacoes}>

              <Text style={styles.nome}>
                {item.name}
              </Text>

              <Text>
                Idade: {item.idade}
              </Text>

              <Text>
                Espécie: {item.especie}
              </Text>

            </View>


            <View style={styles.botoes}>

              <Button
                title="Editar"
                onPress={() =>
                  editarPersonagem(item)
                }
              />

              <Button
                title="Excluir"
                onPress={() =>
                  excluirPersonagem(item.id)
                }
              />

            </View>

          </View>

        )}
      />


      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
      >

        <View style={styles.modalContainer}>

          <View style={styles.modal}>

            <Text style={styles.modalTitle}>
              {personagemEditando
                ? "Editar personagem"
                : "Cadastrar personagem"}
            </Text>


            <TextInput
              placeholder="Nome"
              style={styles.input}
              value={nome}
              onChangeText={setNome}
            />


            <TextInput
              placeholder="Idade"
              style={styles.input}
              value={idade}
              onChangeText={setIdade}
              keyboardType="numeric"
            />


            <TextInput
              placeholder="Espécie"
              style={styles.input}
              value={especie}
              onChangeText={setEspecie}
            />


            <Button
              title={
                personagemEditando
                  ? "Salvar alterações"
                  : "Cadastrar"
              }

              onPress={
                personagemEditando
                  ? atualizarPersonagem
                  : cadastrarPersonagem
              }
            />


            <Button
              title="Cancelar"
              onPress={limparFormulario}
            />

          </View>

        </View>

      </Modal>

    </View>
  );
}


const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 20,
  },

  titulo: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
  },

  card: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: "#CDCDCD",
    borderRadius: 10,
  },

  informacoes: {
    marginBottom: 10,
  },

  nome: {
    fontSize: 20,
    fontWeight: "bold",
  },

  botoes: {
    flexDirection: "row",
    gap: 10,
  },

  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },

  modal: {
    width: "85%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },

  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },

  input: {
    borderWidth: 1,
    borderColor: "#999",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },

});
