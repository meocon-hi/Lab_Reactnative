

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Pressable, Platform, Modal } from 'react-native';
import RNSlider from '@react-native-community/slider';

const GENDERS = [
  { key: 'male', label: 'Male', icon: '♂' },
  { key: 'female', label: 'Female', icon: '♀' },
];

const getBMICategory = (bmi: number) => {
  if (bmi < 18.5) return { label: 'Underweight', color: '#FFD600' };
  if (bmi < 25) return { label: 'Normal', color: '#64FFDA' };
  if (bmi < 30) return { label: 'Overweight', color: '#FFA726' };
  return { label: 'Obese', color: '#FF1744' };
};

const Slider = Platform.OS === 'web'
  ? (props: any) => (
      <input
        type="range"
        min={props.minimumValue}
        max={props.maximumValue}
        value={props.value}
        onChange={e => props.onValueChange(Number(e.target.value))}
        style={{ width: '100%', accentColor: '#64FFDA', marginTop: 12, marginBottom: 4 }}
      />
    )
  : (props: any) => (
      <RNSlider
        minimumValue={props.minimumValue}
        maximumValue={props.maximumValue}
        value={props.value}
        step={props.step}
        onValueChange={props.onValueChange}
        minimumTrackTintColor="#64FFDA"
        maximumTrackTintColor="#233554"
        thumbTintColor="#64FFDA"
        style={{ width: '100%', marginTop: 12, marginBottom: 4 }}
      />
    );

export default function BMICalculator() {
  const [gender, setGender] = useState<'male' | 'female' | null>(null);
  const [height, setHeight] = useState(170);
  const [weight, setWeight] = useState(60);
  const [age, setAge] = useState(20);
  const [showResult, setShowResult] = useState(false);
  const [bmi, setBmi] = useState(0);
  const [category, setCategory] = useState<{ label: string; color: string } | null>(null);
  const [error, setError] = useState('');

  const handleCalculate = () => {
    setError('');
    if (!gender) {
      setError('Please select gender!');
      return;
    }
    if (height < 100 || height > 250 || weight < 20 || weight > 250 || age < 5 || age > 120) {
      setError('Please enter valid values!');
      return;
    }
    const bmiValue = weight / Math.pow(height / 100, 2);
    setBmi(bmiValue);
    setCategory(getBMICategory(bmiValue));
    setShowResult(true);
  };

  return (
    <View style={styles.root}>
      <Text style={styles.header}>BMI CALCULATOR</Text>
      <View style={styles.row}>
        {GENDERS.map(g => (
          <Pressable
            key={g.key}
            style={[styles.card, styles.genderCard, gender === g.key && styles.cardActive]}
            onPress={() => setGender(g.key as 'male' | 'female')}
          >
            <Text style={styles.genderIcon}>{g.icon}</Text>
            <Text style={styles.genderLabel}>{g.label}</Text>
          </Pressable>
        ))}
      </View>
      <View style={[styles.card, styles.heightCard]}> 
        <Text style={styles.label}>HEIGHT</Text>
        <Text style={styles.heightValue}>{height} <Text style={styles.unit}>cm</Text></Text>
        <Slider
          minimumValue={100}
          maximumValue={220}
          value={height}
          step={1}
          onValueChange={setHeight}
          minimumTrackTintColor="#64FFDA"
          maximumTrackTintColor="#233554"
          thumbTintColor="#64FFDA"
        />
      </View>
      <View style={styles.row}>
        <View style={[styles.card, styles.valueCard]}>
          <Text style={styles.label}>WEIGHT</Text>
          <Text style={styles.value}>{weight}</Text>
          <View style={styles.valueRow}>
            <TouchableOpacity style={styles.circleBtn} onPress={() => setWeight(w => Math.max(20, w - 1))}>
              <Text style={styles.circleBtnText}>-</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.circleBtn} onPress={() => setWeight(w => Math.min(250, w + 1))}>
              <Text style={styles.circleBtnText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={[styles.card, styles.valueCard]}>
          <Text style={styles.label}>AGE</Text>
          <Text style={styles.value}>{age}</Text>
          <View style={styles.valueRow}>
            <TouchableOpacity style={styles.circleBtn} onPress={() => setAge(a => Math.max(5, a - 1))}>
              <Text style={styles.circleBtnText}>-</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.circleBtn} onPress={() => setAge(a => Math.min(120, a + 1))}>
              <Text style={styles.circleBtnText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TouchableOpacity style={styles.calcBtn} onPress={handleCalculate} activeOpacity={0.85}>
        <Text style={styles.calcBtnText}>CALCULATE</Text>
      </TouchableOpacity>

      <Modal visible={showResult} animationType="slide" transparent>
        <View style={styles.modalBg}>
          <View style={styles.resultCard}>
            <Text style={styles.resultTitle}>Your Result</Text>
            <Text style={[styles.bmiValue, { color: category?.color }]}>{bmi.toFixed(2)}</Text>
            <Text style={[styles.bmiCategory, { color: category?.color }]}>{category?.label}</Text>
            <TouchableOpacity style={styles.closeBtn} onPress={() => setShowResult(false)}>
              <Text style={styles.closeBtnText}>CLOSE</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#0A192F',
    paddingHorizontal: 18,
    paddingTop: 32,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  },
  header: {
    color: '#E6F1FF',
    fontSize: 28,
    fontWeight: 'bold',
    letterSpacing: 2,
    textAlign: 'center',
    marginBottom: 18,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
    marginBottom: 18,
  },
  card: {
    backgroundColor: '#112240',
    borderRadius: 18,
    padding: 20,
    flex: 1,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.18,
    shadowRadius: 16,
    elevation: 8,
    marginHorizontal: 2,
  },
  genderCard: {
    flexDirection: 'column',
    gap: 8,
    minWidth: 120,
  },
  cardActive: {
    borderWidth: 2,
    borderColor: '#0EA5E9',
    backgroundColor: '#173A5E',
  },
  genderIcon: {
    fontSize: 38,
    color: '#E6F1FF',
    marginBottom: 2,
  },
  genderLabel: {
    color: '#E6F1FF',
    fontSize: 18,
    fontWeight: '600',
  },
  heightCard: {
    marginBottom: 18,
    paddingBottom: 12,
  },
  label: {
    color: '#7DD3FC',
    fontSize: 15,
    marginBottom: 6,
    fontWeight: '600',
    letterSpacing: 1,
  },
  heightValue: {
    color: '#E6F1FF',
    fontSize: 38,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  unit: {
    fontSize: 18,
    color: '#7DD3FC',
  },
  valueCard: {
    marginHorizontal: 2,
    gap: 8,
  },
  value: {
    color: '#E6F1FF',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  valueRow: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 4,
  },
  circleBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#173A5E',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#0EA5E9',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 6,
    elevation: 3,
  },
  circleBtnText: {
    color: '#64FFDA',
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: -2,
  },
  calcBtn: {
    marginTop: 18,
    borderRadius: 16,
    overflow: 'hidden',
    // backgroundColor: 'linear-gradient(90deg, #0EA5E9 0%, #2563EB 100%)', // fallback for web
    backgroundColor: '#0EA5E9',
    paddingVertical: 18,
    alignItems: 'center',
    alignSelf: 'center',
    minWidth: '90%',
    shadowColor: '#0EA5E9',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 10,
    elevation: 4,
  },
  calcBtnText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  error: {
    color: '#FF1744',
    fontSize: 16,
    marginTop: 8,
    textAlign: 'center',
    fontWeight: '600',
  },
  modalBg: {
    flex: 1,
    backgroundColor: 'rgba(10,25,47,0.92)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  resultCard: {
    backgroundColor: '#112240',
    borderRadius: 22,
    padding: 32,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.22,
    shadowRadius: 18,
    elevation: 10,
    minWidth: 280,
    maxWidth: 350,
  },
  resultTitle: {
    color: '#7DD3FC',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
    letterSpacing: 1,
  },
  bmiValue: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#64FFDA',
  },
  bmiCategory: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 18,
    letterSpacing: 1,
  },
  closeBtn: {
    marginTop: 8,
    backgroundColor: '#0EA5E9',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 32,
    alignItems: 'center',
  },
  closeBtnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});
