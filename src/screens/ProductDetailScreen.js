import React, { useEffect, useState, useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Alert,
  SafeAreaView,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { ProductRepository } from '../database/ProductRepository';
import { AuthContext } from '../../App';

export default function ProductDetailScreen({ route, navigation }) {
  const { productName, category } = route.params;
  const [productEntries, setProductEntries] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!user) {
      navigation.replace('Login');
      return;
    }

    loadProductEntries();
  }, [productName, category, user, navigation]);

  const loadProductEntries = async () => {
    setRefreshing(true);
    try {
      const entries = await ProductRepository.getByNameAndCategory(productName, category);
      setProductEntries(entries);
    } catch (error) {
      console.error('Error loading product entries:', error);
    } finally {
      setRefreshing(false);
    }
  };

  const handleDelete = async (id) => {
    Alert.alert(
      'Confirmar Exclusão',
      'Deseja realmente excluir este produto?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Excluir', 
          style: 'destructive',
          onPress: async () => {
            try {
              await ProductRepository.delete(id);
              loadProductEntries();
            } catch (error) {
              Alert.alert('Erro', 'Não foi possível excluir o produto.');
            }
          }
        }
      ]
    );
  };

  const renderEntry = ({ item }) => (
    <View style={styles.entryCard}>
      <View style={styles.entryInfo}>
        <Text style={styles.entryLabel}>ID: {item.id}</Text>
        {item.expirationDate && (
          <Text style={styles.entryLabel}>Validade: {item.expirationDate}</Text>
        )}
        <Text style={styles.entryLabel}>Preço: R$ {item.unitPrice?.toFixed(2)}</Text>
        <Text style={styles.entryQty}>Qtd: {item.quantity}</Text>
      </View>
      <View style={styles.entryActions}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => navigation.navigate('ProductForm', { product: item })}
        >
          <Text style={styles.editButtonText}>✏️</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDelete(item.id)}
        >
          <Text style={styles.deleteButtonText}>🗑️</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>← Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.title}>{productName}</Text>
        <Text style={styles.category}>{category}</Text>
      </View>

      <View style={styles.content}>
        {productEntries.length === 0 ? (
          <Text style={styles.emptyText}>Nenhuma entrada encontrada</Text>
        ) : (
          <FlatList
            data={productEntries}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderEntry}
            refreshing={refreshing}
            onRefresh={loadProductEntries}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  header: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1e293b',
  },
  backButton: {
    color: '#3b82f6',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#f8fafc',
  },
  category: {
    fontSize: 14,
    color: '#94a3b8',
    marginTop: 4,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  entryCard: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#334155',
  },
  entryInfo: {
    flex: 1,
  },
  entryLabel: {
    fontSize: 13,
    color: '#cbd5e1',
    marginBottom: 4,
  },
  entryQty: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#f8fafc',
    marginTop: 8,
  },
  entryActions: {
    flexDirection: 'row',
    gap: 8,
  },
  editButton: {
    backgroundColor: '#1e293b',
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#334155',
  },
  editButtonText: {
    fontSize: 18,
  },
  deleteButton: {
    backgroundColor: '#dc2626',
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteButtonText: {
    fontSize: 18,
  },
  emptyText: {
    color: '#94a3b8',
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
  },
});