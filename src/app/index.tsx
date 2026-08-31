  import { Text, View, StyleSheet } from "react-native";

  export default function Home() {
    return (
      <>
        <View style={styles.headerNav}>
          <View style={styles.headerNavLeft}>
            <Text>DataBook</Text>
          </View>
          <View style={styles.headerNavRight}>
            <Text>Buscar</Text>
            <Text>Perfil</Text>
          </View>
        </View>
        <View style={styles.content}>
          <Text>Conteudo</Text>
        </View>
      </>
    );
  }

  const styles = StyleSheet.create({
    headerNav: {
      flexDirection: "row",
      justifyContent: "space-between",
      backgroundColor: "#CDCDCD",
      padding: 10,
    },
    headerNavLeft: {},
    headerNavRight: {
      flexDirection: "row",
      gap: 10,
    },
    content: {},
  });