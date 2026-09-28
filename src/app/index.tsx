import {
  Text,
  View,
  StyleSheet,
  Button,
} from "react-native";

import * as Location from "expo-location";

import { useState } from "react";


export default function Home() {

  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);


  async function pegarLocalizacao() {

    const { status } =
      await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      console.log("Permissão de localização negada");
      return;
    }

    const localizacao =
      await Location.getCurrentPositionAsync({});

    setLatitude(localizacao.coords.latitude);
    setLongitude(localizacao.coords.longitude);
  }

  
  return (
    <View style={styles.container}>

      <View style={styles.headerNav}>

        <View style={styles.headerNavLeft}>
          <Text style={styles.logo}>
            DataBook
          </Text>
        </View>

        <View style={styles.headerNavRight}>
          <Text>Buscar</Text>
          <Text>Perfil</Text>
        </View>

      </View>


      <View style={styles.content}>

        <Text style={styles.titulo}>
          Minha localização
        </Text>

        <Button
          title="Pegar minha localização"
          onPress={pegarLocalizacao}
        />


        {latitude !== null && longitude !== null && (
          <View style={styles.localizacao}>

            <Text style={styles.localizacaoTitulo}>
              Localização atual
            </Text>

            <Text>
              Latitude: {latitude}
            </Text>

            <Text>
              Longitude: {longitude}
            </Text>

          </View>
        )}

      </View>

    </View>
  );
}


const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#eeeeee",
  },


  headerNav: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#CDCDCD",
    padding: 15,
  },


  headerNavLeft: {
    justifyContent: "center",
  },


  logo: {
    fontSize: 18,
    fontWeight: "bold",
  },


  headerNavRight: {
    flexDirection: "row",
    gap: 15,
  },


  content: {
    padding: 20,
  },


  titulo: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 20,
  },


  localizacao: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    gap: 5,
  },


  localizacaoTitulo: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },

});