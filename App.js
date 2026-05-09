import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

// --- Tela Placeholder (será substituída nas Fases 3-5) ---
function PlaceholderScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>EstoqueApp</Text>
      <Text style={styles.subtitle}>Infraestrutura OK ✓</Text>
      <Text style={styles.info}>Navigation + SQLite configurados.</Text>
      <StatusBar style="auto" />
    </View>
  );
}

// --- Stack Navigator raiz ---
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Placeholder"
        screenOptions={{ headerShown: false }}
      >
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
