import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import Svg, { Circle, Ellipse, Polygon, Text as SvgText, G, Defs, RadialGradient, Stop } from 'react-native-svg';

const ANSWERS = [
  'Chắc chắn rồi',
  'Bạn có thể tin tưởng vào điều đó',
  'Có',
  'Rất có khả năng',
  'Hỏi lại sau nhé',
  'Không thể dự đoán ngay lúc này',
  'Đừng hy vọng vào điều đó',
  'Câu trả lời của tôi là không',
];

export default function Magic8Ball() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const askBall = () => {
    if (question.trim() === '') {
      setAnswer('');
      return;
    }
    const idx = Math.floor(Math.random() * ANSWERS.length);
    setAnswer(ANSWERS[idx]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Magic 8 Ball 🎱</Text>
      <TextInput
        style={styles.input}
        placeholder="Nhập câu hỏi Yes/No..."
        placeholderTextColor="#888"
        value={question}
        onChangeText={setQuestion}
        returnKeyType="done"
      />
      <Pressable style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]} onPress={askBall}>
        <Text style={styles.buttonText}>Hỏi Quả Cầu</Text>
      </Pressable>
      <View style={styles.ballContainer}>
        <Svg width={260} height={260} viewBox="0 0 260 260">
          {/* Outer black ball */}
          <Defs>
            <RadialGradient id="grad" cx="50%" cy="50%" r="50%">
              <Stop offset="0%" stopColor="#444" stopOpacity="1" />
              <Stop offset="100%" stopColor="#111" stopOpacity="1" />
            </RadialGradient>
          </Defs>
          <Circle cx="130" cy="130" r="120" fill="url(#grad)" />
          {/* Shadow */}
          <Ellipse cx="130" cy="230" rx="80" ry="18" fill="#eee" opacity="0.5" />
          {/* Blue triangle */}
          <G>
            <Polygon
              points="130,80 90,170 170,170"
              fill="#1976d2"
              stroke="#0d47a1"
              strokeWidth="3"
              opacity="0.95"
            />
            {/* Answer text in triangle */}
            {answer !== '' && (
              <SvgText
                x="130"
                y="145"
                fontSize="18"
                fill="#fff"
                fontWeight="bold"
                textAnchor="middle"
                alignmentBaseline="middle"
                fontFamily="Arial"
              >
                {answer.length > 18 ? answer.slice(0, 18) + '...' : answer}
              </SvgText>
            )}
          </G>
        </Svg>
      </View>
      {answer !== '' && (
        <View style={styles.answerBox}>
          <Text style={styles.answerText}>{answer}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0f7fa',
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 32,
    color: '#00796b',
    textAlign: 'center',
  },
  input: {
    width: '100%',
    maxWidth: 400,
    borderWidth: 1,
    borderColor: '#b2dfdb',
    borderRadius: 16,
    padding: 16,
    fontSize: 20,
    backgroundColor: '#fff',
    marginBottom: 20,
    color: '#222',
  },
  button: {
    backgroundColor: '#26c6da',
    borderRadius: 24,
    paddingVertical: 14,
    paddingHorizontal: 40,
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonPressed: {
    backgroundColor: '#00acc1',
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  ballContainer: {
    marginTop: 32,
    marginBottom: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  answerBox: {
    marginTop: 8,
    backgroundColor: '#fffde7',
    borderRadius: 20,
    padding: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.10,
    shadowRadius: 4,
    elevation: 2,
    minWidth: 180,
    alignItems: 'center',
  },
  answerText: {
    fontSize: 26,
    color: '#6d4c41',
    textAlign: 'center',
    fontWeight: '600',
  },
});
