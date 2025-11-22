import { Image } from 'expo-image';
import {StyleSheet, View, Text,Button, TouchableOpacity} from 'react-native';
import React from 'react';


export default function HomeScreen() {
  const diceImages: { [key: number]: any } = {
  1: require('@/assets/images/Dice1.png'),
  2: require('@/assets/images/Dice2.png'),
  3: require('@/assets/images/Dice3.png'),
  4: require('@/assets/images/Dice4.png'),
  5: require('@/assets/images/Dice5.png'),
  6: require('@/assets/images/Dice6.png'),
};
  const  [dice1, setDice1] = React.useState(1);
  const  [dice2, setDice2] = React.useState(1);
  const rollDice = () => {
    setDice1(Math.floor(Math.random() * 6) + 1);
    setDice2(Math.floor(Math.random() * 6) + 1);
  };
  return (
    <View style={styles.container}>
      <View style={styles.diceContainer}>
        <Image
          source={diceImages[dice1]}
          style={styles.dice}
        />
        <Image
          source={diceImages[dice2]}
          style={styles.dice}
        />
      
      </View>
        <TouchableOpacity style={styles.button} onPress={rollDice}>
          <Text style={styles.buttonText}>Roll Dice</Text>
        </TouchableOpacity>
    </View>
  );
} 

const styles = StyleSheet.create({
   container: {
    flex: 1,
    backgroundColor: '#e6ffe6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  diceContainer: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  dice: {
    width: 120,
    height: 120,
    marginHorizontal: 10,
  },
  button: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#4CAF50',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});


