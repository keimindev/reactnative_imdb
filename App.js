
import React from 'react';
import Tab from "./Tabs/Tab"
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider} from "react-query"
import { useColorScheme } from 'react-native';
import { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from './styled';

const queryClient = new QueryClient();

export default function App() {
  const isDark = useColorScheme() === "dark";

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme }>
      <NavigationContainer>
        <Tab />
      </NavigationContainer>
    </ThemeProvider>
    </QueryClientProvider>
  );
}
