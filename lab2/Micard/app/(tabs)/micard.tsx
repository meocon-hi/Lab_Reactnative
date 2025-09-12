import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function MicardScreen() {
  const [form, setForm] = useState({
    name: '',
    job: '',
    phone: '',
    email: '',
    avatar: '',
  });
  // Hàm chọn ảnh (chỉ dùng cho mobile)
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Bạn cần cấp quyền truy cập ảnh để chọn ảnh đại diện!');
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled && result.assets && result.assets.length > 0) {
      setForm({ ...form, avatar: result.assets[0].uri });
    }
  };
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <View style={styles.outer}>
        <View style={styles.card}>
          <Image
            source={form.avatar ? { uri: form.avatar } : require('../../assets/images/react-logo.png')}
            style={styles.avatar}
          />
          <Text style={styles.name}>{form.name}</Text>
          <Text style={styles.job}>{form.job}</Text>
          <View style={styles.divider} />
          <Text style={styles.info}>📞 {form.phone}</Text>
          <Text style={styles.info}>✉️ {form.email}</Text>
          <View style={{ marginTop: 16, width: '100%' }}>
            <Button title="Sửa lại" onPress={() => setSubmitted(false)} color="#e75480" />
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.outer}>
      <View style={styles.formBox}>
        <Text style={styles.formTitle}>Nhập thông tin cá nhân</Text>
        {Platform.OS === 'web' ? (
          <View style={{ alignItems: 'center', width: '100%' }}>
            <Image
              source={form.avatar ? { uri: form.avatar } : require('../../assets/images/react-logo.png')}
              style={styles.avatar}
            />
            <TextInput
              placeholder="Dán link ảnh đại diện (URL)"
              style={styles.input}
              value={form.avatar}
              onChangeText={avatar => setForm({ ...form, avatar })}
            />
          </View>
        ) : (
          <TouchableOpacity style={styles.avatarPicker} onPress={pickImage}>
            <Image
              source={form.avatar ? { uri: form.avatar } : require('../../assets/images/react-logo.png')}
              style={styles.avatar}
            />
            <Text style={styles.avatarText}>Chọn ảnh đại diện</Text>
          </TouchableOpacity>
        )}
        <TextInput
          placeholder="Họ tên"
          style={styles.input}
          value={form.name}
          onChangeText={name => setForm({ ...form, name })}
        />
        <TextInput
          placeholder="Nghề nghiệp"
          style={styles.input}
          value={form.job}
          onChangeText={job => setForm({ ...form, job })}
        />
        <TextInput
          placeholder="Số điện thoại"
          style={styles.input}
          value={form.phone}
          onChangeText={phone => setForm({ ...form, phone })}
          keyboardType="phone-pad"
        />
        <TextInput
          placeholder="Email"
          style={styles.input}
          value={form.email}
          onChangeText={email => setForm({ ...form, email })}
          keyboardType="email-address"
        />
        <View style={{ marginTop: 16, width: '100%' }}>
          <Button title="Submit" onPress={() => setSubmitted(true)} color="#e75480" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f6fc',
    minHeight: '100%',
    padding: 16,
  },
  formBox: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    alignItems: 'center',
  },
  formTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 18,
    color: '#2d3a4b',
    textAlign: 'center',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#d1d5db',
    marginVertical: 8,
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: '#f8fafc',
  },
  card: {
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
    margin: 24,
    padding: 32,
    borderRadius: 20,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#e0e7ef',
    backgroundColor: '#f2f6fc',
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1a2233',
    marginBottom: 4,
    textAlign: 'center',
  },
  job: {
    fontSize: 17,
    color: '#4b5563',
    marginBottom: 10,
    textAlign: 'center',
  },
  divider: {
    height: 1,
    width: '80%',
    backgroundColor: '#e5e7eb',
    marginVertical: 16,
  },
  info: {
    fontSize: 17,
    marginVertical: 3,
    color: '#374151',
    textAlign: 'center',
  },
  avatarPicker: {
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarText: {
    color: '#2563eb',
    fontSize: 14,
    marginTop: 4,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});
