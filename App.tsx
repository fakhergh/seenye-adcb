import '@/i18n';

import { ThemeProvider } from '@shopify/restyle';
import { QueryClientProvider } from '@tanstack/react-query';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { queryClient } from '@/core/lib/queryClient';
import { AppNavigator } from '@/navigation/AppNavigator';
import { theme } from '@/styles';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <AppNavigator />
        </QueryClientProvider>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}

export default App;
