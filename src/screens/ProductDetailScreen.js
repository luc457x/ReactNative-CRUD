import React, { useEffect, useState, useContext, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Alert,
  SafeAreaView,
  Platform,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { ProductRepository } from '../database/ProductRepository';
import { AuthContext } from '../../App';

export default function ProductDetailScreen({ route, navigation }) {
  const { productName, category } = route.params;
  const [productEntries, setProductEntries] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  // Inline delete confirmation: stores the id to confirm, or null
  const [pendingDeleteId, setPendingDeleteId] = useState(null);
  const { user } = useContext(AuthContext);

  const loadProductEntries = useCallback(async () => {
    setRefreshing(true);
    try {
      const entries = await ProductRepository.getByNameAndCategory(productName, category);
      if (entries.length === 0) {
        navigation.goBack();
      } else {
        setProductEntries(entries);
      }
    } catch (error) {
      console.error('Error loading product entries:', error);
    } finally {
      setRefreshing(false);
    }
  }, [productName, category, navigation]);

  useEffect(() => {
    if (!user) {
      navigation.replace('Login');
      return;
    }
    loadProductEntries();
    const unsubscribe = navigation.addListener('focus', loadProductEntries);
    return unsubscribe;
  }, [loadProductEntries, navigation, user]);

  const handleDeleteConfirmed = async () => {
    const id = pendingDeleteId;
    setPendingDeleteId(null);
    try {
      await ProductRepository.delete(id);
      await loadProductEntries();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível excluir o produto.');
    }
  };

  const handleIncrement = async (id) => {
    try {
      await ProductRepository.incrementQuantity(id);
      await loadProductEntries();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível incrementar a quantidade.');
    }
  };

  const handleDecrement = async (id) => {
    try {
      await ProductRepository.decrementQuantity(id);
      await loadProductEntries();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível decrementar a quantidade.');
    }
  };

  const renderEntry = ({ item }) => (
    <View style={styles.entryCard}>
      <View style={styles.entryInfo}>
        <Text style={styles.entryLabel}>Lote #{item.id}</Text>
        {item.expirationDate ? (
          <Text style={styles.entryLabel}>Validade: {item.expirationDate}</Text>
        ) : (
          <Text style={[styles.entryLabel, styles.entryLabelMuted]}>Sem validade</Text>
        )}
        <Text style={styles.entryLabel}>Preço: R$ {(item.unitPrice ?? 0).toFixed(2)}</Text>
      </View>
      <View style={styles.entryRight}>
        <View style={styles.qtyRow}>
          <TouchableOpacity
            style={styles.qtyButton}
            onPress={() => handleDecrement(item.id)}
          >
            <Text style={styles.qtyButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.entryQty}>{item.quantity}</Text>
          <TouchableOpacity
            style={[styles.qtyButton, styles.qtyButtonPlus]}
            onPress={() => handleIncrement(item.id)}
          >
            <Text style={styles.qtyButtonText}>+</Text>
          </TouchableOpacity>
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
            onPress={() => setPendingDeleteId(item.id)}
          >
            <Text style={styles.deleteButtonText}>🗑️</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      {/* Inline delete confirmation overlay — works on web AND native */}
      {pendingDeleteId !== null && (
        <View style={styles.confirmOverlay}>
          <View style={styles.confirmBox}>
            <Text style={styles.confirmTitle}>Excluir lote?</Text>
            <Text style={styles.confirmMessage}>Esta ação não pode ser desfeita.</Text>
            <View style={styles.confirmButtons}>
              <TouchableOpacity
                style={styles.confirmCancel}
                onPress={() => setPendingDeleteId(null)}
              >
                <Text style={styles.confirmCancelText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.confirmDelete}
                onPress={handleDeleteConfirmed}
              >
                <Text style={styles.confirmDeleteText}>Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>← Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.title}>{productName}</Text>
        <Text style={styles.category}>{category || 'Sem categoria'}</Text>
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
  // Inline delete confirmation
  confirmOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    zIndex: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmBox: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 24,
    width: '80%',
    maxWidth: 360,
    borderWidth: 1,
    borderColor: '#334155',
  },
  confirmTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#f8fafc',
    marginBottom: 8,
  },
  confirmMessage: {
    fontSize: 14,
    color: '#94a3b8',
    marginBottom: 24,
  },
  confirmButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  confirmCancel: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: '#334155',
    alignItems: 'center',
  },
  confirmCancelText: {
    color: '#f8fafc',
    fontWeight: '600',
    fontSize: 15,
  },
  confirmDelete: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: '#dc2626',
    alignItems: 'center',
  },
  confirmDeleteText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  header: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1e293b',
    width: '100%',
    maxWidth: 800,
    alignSelf: 'center',
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
    width: '100%',
    maxWidth: 800,
    alignSelf: 'center',
  },
  entryCard: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  entryLabelMuted: {
    color: '#475569',
    fontStyle: 'italic',
  },
  entryRight: {
    alignItems: 'flex-end',
    gap: 10,
  },
  qtyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  qtyButton: {
    backgroundColor: '#334155',
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyButtonPlus: {
    backgroundColor: '#1d4ed8',
  },
  qtyButtonText: {
    fontSize: 18,
    color: '#f8fafc',
    fontWeight: 'bold',
  },
  entryQty: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#f8fafc',
    minWidth: 32,
    textAlign: 'center',
  },
  entryActions: {
    flexDirection: 'row',
    gap: 8,
  },
  editButton: {
    backgroundColor: '#1e293b',
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#334155',
  },
  editButtonText: {
    fontSize: 16,
  },
  deleteButton: {
    backgroundColor: '#dc2626',
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteButtonText: {
    fontSize: 16,
  },
  emptyText: {
    color: '#94a3b8',
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
  },
});