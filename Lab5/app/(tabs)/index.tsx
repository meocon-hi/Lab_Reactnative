import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { Audio } from 'expo-av';

const sounds = {
  1: require('../../assets/note1.wav'),
  2: require('../../assets/note2.wav'),
  3: require('../../assets/note3.wav'),
  4: require('../../assets/note4.wav'),
  5: require('../../assets/note5.wav'),
  6: require('../../assets/note6.wav'),
  7: require('../../assets/note7.wav'),
};


const colors = ['#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF', '#4B0082', '#8B00FF'];

export default function App() {
  const playSound = async (note) => {
    const { sound } = await Audio.Sound.createAsync(sounds[note]);
    await sound.playAsync();
    // Tự động giải phóng sau khi phát xong
    sound.setOnPlaybackStatusUpdate((status) => {
      if (status.didJustFinish) {
        sound.unloadAsync();
      }
    });
  };

  return (
    <View style={styles.container}>
      {colors.map((color, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.key, { backgroundColor: color }]}
          onPress={() => playSound(index + 1)}
        >
          <Text style={styles.text}>Note {index + 1}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  key: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
