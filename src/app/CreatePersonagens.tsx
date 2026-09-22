import { useState } from "react";
import { Button, TextInput, View, Text, StyleSheet } from "react-native";





type Personagem = {
    id: number;
    name: string;
    idade: string;
    especie: string;
};
export default function CreatePersonagens() {



    const [nome, setNome] = useState("");
    const [idade, setIdade] = useState("");
    const [especie, setEspecie] = useState("");
    return (
        <View style={styles.Create}>

                <Text style={styles.bodyTitle}>
                    Cadastrar personagem
                </Text>
            <View style={styles.bodyCreate}>


                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder="Nome"
                        style={styles.input}
                        value={nome}
                        onChangeText={setNome}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder="Idade"
                        style={styles.input}
                        value={idade}
                        onChangeText={setIdade}
                        keyboardType="numeric"
                    />

                </View>

                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder="Espécie"
                        style={styles.input}
                        value={especie}
                        onChangeText={setEspecie}
                    />
                </View>
                <Button
                    title="Cadastrar"
                    
                />




            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    Create: {
        display: "flex",
        
        backgroundColor: "#eeeeee",
        height: "100%",
    },

    bodyTitle: {
        fontSize: 30,
        fontWeight: "bold",
        textAlign: "center",
        margin: 20,
        marginTop: 50,
        borderBottomWidth: 1,
        borderBottomColor: "#000",
        paddingBottom: 10,
        width: "90%",
    },
    bodyCreate: {
        top: 150,
        gap: 10,
        height: 800,
        borderRadius: 10,
        display: "flex",


        padding: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        padding: 20,
        border: "1px solid #505050",
        marginBottom: 10,
        backgroundColor: "#fff",

    },
    inputContainer: {
        marginBottom: 20,
        gap: 5,
    },
    
})