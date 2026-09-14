import { useEffect, useState } from "react";
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


    function cadastrarPersonagem() {
        const novoPersonagem: Personagem = {
            id: Date.now(),
            name: nome,
            idade: idade,
            especie: especie,
        };

        setPersonagens((personagensAnteriores) => [...personagensAnteriores, novoPersonagem]);

        setNome("");
        setIdade("");
        setEspecie("");

        setModalVisible(false);
    }

  

    const TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxYmU5MWY0YzIzNTEyZDgxMjQ5NDFiNjViYTBhNmU3NSIsIm5iZiI6MTc4OTM0NDc1OC4zMTQsInN1YiI6IjZhYTczYmY2NTA3NDM4NGQwNTUzODJhOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.F7HH1ahkJWbznQgYHtFLC18pPQe2hGqobz6qp9XVn-4";

    async function buscarPersonagens() {

        const resposta = await fetch(
        "https://api.themoviedb.org/3/person/popular?language=pt-BR&page=7",
        {
            headers: {
            Authorization: `Bearer ${TOKEN}`,
            accept: "application/json",
            },
        }
        );

        const dados = await resposta.json();

        console.log(dados);

        setPersonagens(dados.results);
    }

    useEffect(() => {
        buscarPersonagens();
    }, []);

  return (
    <View style={styles.container}>

      <Text style={styles.titulo}>
        Personagens
      </Text>
      <Button title="Cadastrar personagem" onPress={() => setModalVisible(true)}/>

      <FlatList
        data={personagens}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.nome}>
              {item.name}
            </Text>

            <Text>
              id: {item.id}
            </Text>
          </View>
        )}
      />




    <Modal visible={modalVisible} animationType="slide" transparent={true}>
    <View style={styles.modalContainer}>

        <View style={styles.modal}>

            <Text style={styles.modalTitle}>
                Cadastrar personagem
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
                title="Cadastrar"
                onPress={cadastrarPersonagem}
            />

        </View>

    </View>
    </Modal>

    </View>
  );
}

const styles = StyleSheet.create({

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

  nome: {
    fontSize: 20,
    fontWeight: "bold",
  },
});