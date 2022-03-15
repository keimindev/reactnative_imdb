
import React from 'react';
import Tab from "./Tabs/Tab"
import { NavigationContainer } from '@react-navigation/native';
import { useColorScheme } from 'react-native';
import { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from './styled';

export default function App() {
  const isDark = useColorScheme() === "dark";

  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme }>
    <NavigationContainer>
      <Tab />
    </NavigationContainer>
    </ThemeProvider>
  );
}
