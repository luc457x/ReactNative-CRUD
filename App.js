import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { initDatabase } from './src/database/database';
import LoginScreen from './src/screens/LoginScreen';

// --- Tela Placeholder (será substituída nas Fases 3-5) ---
function PlaceholderScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Painel de Controle</Text>
      <Text style={styles.subtitle}>Login realizado com sucesso! ✅</Text>
      <Text style={styles.info}>O Dashboard será implementado na Fase 5.</Text>
      <StatusBar style="auto" />
    </View>
  );
}

// --- Stack Navigator raiz ---
const Stack = createNativeStackNavigator();

export default function App() {
  const [dbInitialized, setDbInitialized] = useState(false);

  useEffect(() => {
    async function setup() {
      await initDatabase();
      setDbInitialized(true);
    }
    setup();
  }, []);

  if (!dbInitialized) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Placeholder" component={PlaceholderScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#f8fafc',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#22c55e',
    marginBottom: 4,
  },
  info: {
    fontSize: 13,
    color: '#94a3b8',
  },
});
