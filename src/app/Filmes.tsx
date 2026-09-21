import { useEffect, useState } from "react";
import {
    Button,
    Modal,
    Text,
    TextInput,
    View,
    FlatList,
    StyleSheet,
} from "react-native";

type Filme = {
    id: number;
    name: string;
    ano: string;
    genero: string;
};

export default function Filmes() {

    const [filmes, setFilmes] = useState<Filme[]>([]);

    const [modalVisible, setModalVisible] = useState(false);

    const [nome, setNome] = useState("");
    const [ano, setAno] = useState("");
    const [genero, setGenero] = useState("");

    const [filmeEditando, setFilmeEditando] = useState<Filme | null>(null);


    function editarFilme(filme: Filme) {
        setFilmeEditando(filme);

        setNome(filme.name);
        setAno(filme.ano);
        setGenero(filme.genero);

        setModalVisible(true);
    }


    function excluirFilme(id: number) {
        setFilmes((filmesAnteriores) =>
            filmesAnteriores.filter((filme) => filme.id !== id)
        );
    }


    function atualizarFilme() {
        if (filmeEditando === null) {
            return;
        }

        setFilmes((filmesAnteriores) =>
            filmesAnteriores.map((filme) => {
                if (filme.id === filmeEditando.id) {
                    return {
                        ...filme,
                        name: nome,
                        ano: ano,
                        genero: genero,
                    };
                }

                return filme;
            })
        );

        setFilmeEditando(null);

        setNome("");
        setAno("");
        setGenero("");

        setModalVisible(false);
    }

    function cadastrarFilme() {
        const novoFilme: Filme = {
            id: Date.now(),
            name: nome,
            ano: ano,
            genero: genero,
        };

        setFilmes((filmesAnteriores) => [
            ...filmesAnteriores,
            novoFilme,
        ]);

        setNome("");
        setAno("");
        setGenero("");

        setModalVisible(false);
    }

    

    return (
        <View style={styles.container}>

            <Text style={styles.title}>Filmes</Text>

            <Button
                title="Cadastrar Filme"
                onPress={() => setModalVisible(true)}
            />

            <FlatList
                data={filmes}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Text style={styles.nome}>
                            {item.name}
                        </Text>

                        <Text>
                            Ano: {item.ano}
                        </Text>

                        <Text>
                            Gênero: {item.genero}
                        </Text>

                        <Button title="Editar" onPress={() => editarFilme(item)}/>
                        <Button title="Excluir" onPress={() => excluirFilme(item.id)}/>
                    </View>
                )}
            />

            <Modal
                visible={modalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>

                    <View style={styles.modal}>

                        <Text style={styles.modalTitle}>
                            Cadastrar filme
                        </Text>

                        <TextInput
                            placeholder="Nome"
                            style={styles.input}
                            value={nome}
                            onChangeText={setNome}
                        />

                        <TextInput
                            placeholder="Ano"
                            style={styles.input}
                            value={ano}
                            onChangeText={setAno}
                            keyboardType="numeric"
                        />

                        <TextInput
                            placeholder="Gênero"
                            style={styles.input}
                            value={genero}
                            onChangeText={setGenero}
                        />

                        <Button
                            title={filmeEditando ? "Salvar alterações" : "Cadastrar"}
                            onPress={filmeEditando ? atualizarFilme : cadastrarFilme}
                        />

                        <Button
                            title="Cancelar"
                            onPress={() => setModalVisible(false)}
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

    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },

    card: {
        padding: 15,
        marginTop: 15,
        borderWidth: 1,
        borderRadius: 8,
    },

    nome: {
        fontSize: 18,
        fontWeight: "bold",
    },

    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
    },

    modal: {
        width: "85%",
        padding: 20,
        backgroundColor: "white",
        borderRadius: 10,
    },

    modalTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 20,
    },

    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
    },
});

