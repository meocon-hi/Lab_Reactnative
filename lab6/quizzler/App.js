import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const questions = [
  { question: 'Cá heo là động vật có vú.', answer: true },
  { question: 'Chim cánh cụt biết bay.', answer: false },
  { question: 'Voi là loài động vật sống lâu nhất.', answer: false },
  { question: 'Rùa biển có thể sống hơn 100 năm.', answer: true },
  { question: 'Mắt của bạch tuộc có hình chữ W.', answer: false },
  { question: 'Sư tử là loài động vật sống theo bầy đàn.', answer: true },
  { question: 'Hươu cao cổ có thể bơi.', answer: false },
  { question: 'Cá mập phải bơi liên tục để thở.', answer: true },
  { question: 'Ếch có thể uống nước qua da.', answer: true },
  { question: 'Gấu trúc chỉ ăn tre.', answer: false },
];

export default function App() {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [showIcon, setShowIcon] = useState(null); // null | true | false

  const handleAnswer = (userAnswer) => {
    const correct = questions[current].answer === userAnswer;
    setShowIcon(correct);
    if (correct) setScore(score + 1);
    setTimeout(() => {
      setShowIcon(null);
      if (current + 1 < questions.length) {
        setCurrent(current + 1);
      } else {
        setShowResult(true);
      }
    }, 900);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.quizBox}>
        {!showResult ? (
          <>
            <Text style={styles.question}>{questions[current].question}</Text>
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: '#4CAF50' }]}
                onPress={() => handleAnswer(true)}
                disabled={showIcon !== null}
              >
                <Text style={styles.buttonText}>True</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: '#2196F3' }]}
                onPress={() => handleAnswer(false)}
                disabled={showIcon !== null}
              >
                <Text style={styles.buttonText}>False</Text>
              </TouchableOpacity>
            </View>
            {showIcon !== null && (
              <View style={styles.iconBox}>
                {showIcon ? (
                  <MaterialIcons name="check-circle" size={60} color="#4CAF50" />
                ) : (
                  <MaterialIcons name="cancel" size={60} color="#F44336" />
                )}
              </View>
            )}
            <Text style={styles.progress}>{current + 1} / {questions.length}</Text>
          </>
        ) : (
          <View style={styles.resultBox}>
            <Text style={styles.resultText}>Bạn đã hoàn thành!</Text>
            <Text style={styles.scoreText}>Số câu đúng: {score} / {questions.length}</Text>
            <TouchableOpacity style={styles.restartBtn} onPress={() => {
              setCurrent(0);
              setScore(0);
              setShowResult(false);
            }}>
              <Text style={styles.restartText}>Làm lại</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E3F2FD',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quizBox: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 28,
    width: '90%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  question: {
    fontSize: 22,
    color: '#222',
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 30,
    fontFamily: 'System',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 24,
  },
  button: {
    flex: 1,
    marginHorizontal: 8,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.07,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
    letterSpacing: 1,
  },
  iconBox: {
    marginVertical: 18,
    alignItems: 'center',
  },
  progress: {
    marginTop: 10,
    color: '#888',
    fontSize: 16,
  },
  resultBox: {
    alignItems: 'center',
  },
  resultText: {
    fontSize: 26,
    fontWeight: '700',
    color: '#388E3C',
    marginBottom: 18,
  },
  scoreText: {
    fontSize: 20,
    color: '#1976D2',
    marginBottom: 24,
  },
  restartBtn: {
    backgroundColor: '#1976D2',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 10,
  },
  restartText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
  },
});
