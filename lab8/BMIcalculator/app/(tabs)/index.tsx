
import { StyleSheet, View } from 'react-native';
import BMICalculator from '@/components/BMICalculator';

export default function HomeScreen() {
  return (
    <View style={styles.screen}>
      <BMICalculator />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f6f8ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
