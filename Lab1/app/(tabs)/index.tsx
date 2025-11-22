import { StatusBar } from "expo-status-bar";
import { StyleSheet,Text,View, Image,  } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      
      <Text style={styles.title}>I Am Rich</Text>
      <Image
        source={require('@/assets/images/bitcoin.jpg')}
        style={styles.reactLogo}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  reactLogo: {
    marginTop: 20,
    width: 200,
    height: 200,
    resizeMode: "center",
    borderBlockColor: 'blue',
    borderWidth: 2,
    borderRadius: 50,
  },
});