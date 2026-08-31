import { Text, View, StyleSheet } from "react-native";

export default function Favs() {
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
        <Text>Conteudo Favs</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  headerNav: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerNavLeft: {},
  headerNavRight: {},
  content: {},
});