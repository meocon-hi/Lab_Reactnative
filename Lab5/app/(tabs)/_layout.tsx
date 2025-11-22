import { Tabs } from 'expo-router';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { View, Text } from 'react-native';

function GradientHeader({ title }: { title: string }) {
  return (
    <LinearGradient
      colors={["#2193b0", "#6dd5ed"]} // Modern Blue
      style={{
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
      }}
      start={[0, 0]}
      end={[1, 1]}
    >
      <Text
        style={{
          fontSize: 24,
          fontWeight: 'bold',
          color: 'white', // đổi trắng để nổi trên nền xanh
          letterSpacing: 2,
        }}
      >
        {title}
      </Text>
    </LinearGradient>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { display: 'none' },
        header: ({ route }) => (
          <GradientHeader
            title={route.name === 'index' ? 'XYLOPHONE' : route.name}
          />
        ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'XYLOPHONE',
        }}
      />
    </Tabs>
  );
}
