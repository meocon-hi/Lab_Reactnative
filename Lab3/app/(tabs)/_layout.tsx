import { Tabs } from 'expo-router';
import React from 'react';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        tabBarStyle: { display: 'none' },

        // Tùy chỉnh Header
        headerStyle: {
          backgroundColor: '#f5c542',  // màu nền header
          height: 100,                 // tăng chiều cao header
        },
        headerTitleStyle: {
          fontSize: 28,                 // tăng cỡ chữ title
          fontWeight: 'bold',
          color: '#000',
        },
        headerTitleAlign: 'center',     // căn giữa title
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Dice',
        }}
      />
    </Tabs>
  );
}
