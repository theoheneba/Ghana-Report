import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Toast from 'react-native-toast-message';
import { LandingScreen } from './src/screens/LandingScreen';
import { ReportFormScreen } from './src/screens/ReportFormScreen';
import { ReportStatusScreen } from './src/screens/ReportStatusScreen';
import { AdminLoginScreen } from './src/screens/AdminLoginScreen';
import { DashboardScreen } from './src/screens/DashboardScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="Landing" component={LandingScreen} />
          <Stack.Screen name="ReportForm" component={ReportFormScreen} />
          <Stack.Screen name="ReportStatus" component={ReportStatusScreen} />
          <Stack.Screen name="AdminLogin" component={AdminLoginScreen} />
          <Stack.Screen name="Dashboard" component={DashboardScreen} />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </>
  );
}