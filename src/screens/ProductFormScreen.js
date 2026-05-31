import React, { useState, useEffect, useContext } from 'react';
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
import { ProductRepository } from '../database/ProductRepository';
import { AuthContext } from '../../App';

export default function ProductFormScreen({ route, navigation }) {
  const productToEdit = route?.params?.product;
  const isEditing = !!productToEdit;

  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unitPrice, setUnitPrice] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [loading, setLoading] = useState(false);
  // Toast feedback state
  const [toast, setToast] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!user) {
      navigation.replace('Login');
      return;
    }

    if (productToEdit) {
      setName(productToEdit.name || '');
      setCategory(productToEdit.category || '');
      setQuantity(productToEdit.quantity?.toString() || '0');
      setUnitPrice(productToEdit.unitPrice?.toString() || '0.00');
      setExpirationDate(productToEdit.expirationDate || '');
    }
  }, [user, navigation, productToEdit]);

  if (!user) {
    return null;
  }

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 2000);
  };

  const handleSave = async () => {
    if (!name || !quantity || !unitPrice) {
      // Keep Alert for validation errors — these are synchronous and fine
      Alert.alert('Erro', 'Preencha os campos obrigatórios: Nome, Quantidade e Preço.');
      return;
    }

    setLoading(true);
    try {
      const qty = parseInt(quantity, 10) || 0;
      const price = parseFloat(unitPrice) || 0;

      if (isEditing) {
        await ProductRepository.update(productToEdit.id, name, category, qty, price, expirationDate);
        // When editing, go back to ProductDetailScreen
        navigation.goBack();
      } else {
        await ProductRepository.create(name, category, qty, price, expirationDate);
        // When creating, go to Dashboard and show success toast
        navigation.navigate('Dashboard', { successMessage: 'Produto cadastrado com sucesso!' });
      }
    } catch (error) {
      Alert.alert('Erro', isEditing ? 'Não foi possível atualizar o produto.' : 'Não foi possível cadastrar o produto.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      {/* Toast notification */}
      {toast && (
        <View style={[styles.toast, toast.type === 'error' ? styles.toastError : styles.toastSuccess]}>
          <Text style={styles.toastText}>{toast.message}</Text>
        </View>
      )}

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
            <Text style={styles.title}>{isEditing ? 'Editar Produto' : 'Novo Produto'}</Text>
            <Text style={styles.subtitle}>{isEditing ? 'Altere os dados do item' : 'Cadastre um item no estoque'}</Text>
          </View>

          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Nome *</Text>
              <TextInput
                style={styles.input}
                placeholder="Nome do produto"
                placeholderTextColor="#64748b"
                value={name}
                onChangeText={setName}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Categoria</Text>
              <TextInput
                style={styles.input}
                placeholder="Categoria (opcional)"
                placeholderTextColor="#64748b"
                value={category}
                onChangeText={setCategory}
              />
            </View>

            <View style={styles.row}>
              <View style={[styles.inputContainer, styles.flexHalf]}>
                <Text style={styles.label}>Quantidade *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="0"
                  placeholderTextColor="#64748b"
                  value={quantity}
                  onChangeText={setQuantity}
                  keyboardType="numeric"
                />
              </View>

              <View style={[styles.inputContainer, styles.flexHalf]}>
                <Text style={styles.label}>Preço *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="0.00"
                  placeholderTextColor="#64748b"
                  value={unitPrice}
                  onChangeText={setUnitPrice}
                  keyboardType="numeric"
                />
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Data de Validade</Text>
              <TextInput
                style={styles.input}
                placeholder="AAAA-MM-DD (opcional)"
                placeholderTextColor="#64748b"
                value={expirationDate}
                onChangeText={setExpirationDate}
              />
            </View>

            <TouchableOpacity
              style={[styles.button, loading && styles.buttonDisabled]}
              onPress={handleSave}
              disabled={loading}
            >
              <Text style={styles.buttonText}>
                {loading ? 'Salvando...' : (isEditing ? 'Salvar Alterações' : 'Salvar Produto')}
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
    backgroundColor: '#0f172a',
  },
  flex: {
    flex: 1,
  },
  toast: {
    position: 'absolute',
    top: 60,
    left: 24,
    right: 24,
    zIndex: 999,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  toastSuccess: {
    backgroundColor: '#16a34a',
  },
  toastError: {
    backgroundColor: '#dc2626',
  },
  toastText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 24,
    maxWidth: 600,
    width: '100%',
    alignSelf: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
    width: '100%',
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
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#f8fafc',
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 16,
    color: '#94a3b8',
    marginTop: 8,
    textAlign: 'center',
  },
  form: {
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  flexHalf: {
    flex: 1,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#cbd5e1',
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
  button: {
    backgroundColor: '#3b82f6',
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