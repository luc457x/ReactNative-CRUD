import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { UserRepository } from '../database/UserRepository';

export default function RegisterScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [permission, setPermission] = useState('user'); // 'admin' or 'user'
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!username || !password || !confirmPassword) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem.');
      return;
    }

    setLoading(true);
    try {
      // Check if user already exists
      const existingUser = await UserRepository.getByName(username);
      if (existingUser) {
        Alert.alert('Erro', 'Este nome de usuário já está em uso.');
        setLoading(false);
        return;
      }

      await UserRepository.create(username, password, permission);
      Alert.alert('Sucesso', 'Usuário cadastrado com sucesso!', [
        { text: 'OK', onPress: () => navigation.navigate('Login') }
      ]);
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro ao tentar cadastrar o usuário.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.flex}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <TouchableOpacity 
              style={styles.backButton} 
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.backButtonText}>← Voltar</Text>
            </TouchableOpacity>
            <View style={styles.logoCircle}>
              <Text style={styles.logoText}>👤</Text>
            </View>
            <Text style={styles.title}>Novo Usuário</Text>
            <Text style={styles.subtitle}>Crie uma conta para acessar o sistema</Text>
          </View>

          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Nome de Usuário</Text>
              <TextInput
                style={styles.input}
                placeholder="Digite o nome de usuário"
                placeholderTextColor="#64748b"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Senha</Text>
              <TextInput
                style={styles.input}
                placeholder="Digite a senha"
                placeholderTextColor="#64748b"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Confirmar Senha</Text>
              <TextInput
                style={styles.input}
                placeholder="Confirme a senha"
                placeholderTextColor="#64748b"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Tipo de Permissão</Text>
              <View style={styles.permissionContainer}>
                <TouchableOpacity
                  style={[
                    styles.permissionOption,
                    permission === 'user' && styles.permissionOptionActive
                  ]}
                  onPress={() => setPermission('user')}
                >
                  <Text style={[
                    styles.permissionText,
                    permission === 'user' && styles.permissionTextActive
                  ]}>Funcionário</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.permissionOption,
                    permission === 'admin' && styles.permissionOptionActive
                  ]}
                  onPress={() => setPermission('admin')}
                >
                  <Text style={[
                    styles.permissionText,
                    permission === 'admin' && styles.permissionTextActive
                  ]}>Administrador</Text>
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity
              style={[styles.button, loading && styles.buttonDisabled]}
              onPress={handleRegister}
              disabled={loading}
            >
              <Text style={styles.buttonText}>
                {loading ? 'Cadastrando...' : 'Cadastrar'}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a', // Slate 900
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  backButtonText: {
    color: '#3b82f6',
    fontSize: 16,
    fontWeight: '600',
  },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#1e293b', // Slate 800
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  logoText: {
    fontSize: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#f8fafc', // Slate 50
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 16,
    color: '#94a3b8', // Slate 400
    marginTop: 8,
    textAlign: 'center',
  },
  form: {
    width: '100%',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#cbd5e1', // Slate 300
    marginBottom: 8,
    marginLeft: 4,
  },
  input: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    color: '#f8fafc',
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  permissionContainer: {
    flexDirection: 'row',
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 4,
    borderWidth: 1,
    borderColor: '#334155',
  },
  permissionOption: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  permissionOptionActive: {
    backgroundColor: '#3b82f6',
  },
  permissionText: {
    color: '#94a3b8',
    fontSize: 14,
    fontWeight: '600',
  },
  permissionTextActive: {
    color: '#ffffff',
  },
  button: {
    backgroundColor: '#3b82f6', // Blue 500
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 12,
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
