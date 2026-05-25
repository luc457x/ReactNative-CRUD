import React, { useState, useEffect, useContext, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  Alert,
  SafeAreaView,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { AuthContext } from '../../App';
import { ProductRepository } from '../database/ProductRepository';

export default function DashboardScreen({ navigation }) {
  const [products, setProducts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const { user, setUser } = useContext(AuthContext);

  const loadProducts = useCallback(async () => {
    try {
      const data = await ProductRepository.getAll();
      setProducts(data);
    } catch (error) {
      console.error('Error loading products:', error);
    }
  }, []);

  useEffect(() => {
    if (!user) {
      navigation.replace('Login');
      return;
    }

    loadProducts();
    const unsubscribe = navigation.addListener('focus', loadProducts);
    return unsubscribe;
  }, [loadProducts, navigation, user]);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadProducts();
    setRefreshing(false);
  };

  const handleLogout = () => {
    setUser(null);
    navigation.replace('Login');
  };

  const handleIncrement = async (id) => {
    try {
      await ProductRepository.incrementQuantity(id);
      await loadProducts();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível incrementar a quantidade.');
    }
  };

  const handleDecrement = async (id) => {
    try {
      await ProductRepository.decrementQuantity(id);
      await loadProducts();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível decrementar a quantidade.');
    }
  };

  const renderProduct = ({ item }) => (
    <TouchableOpacity 
      style={styles.productCard}
      onPress={() => navigation.navigate('ProductDetail', { 
        productName: item.name, 
        category: item.category 
      })}
    >
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productCategory}>{item.category}</Text>
        <Text style={styles.productPrice}>R$ {item.unitPrice?.toFixed(2)}</Text>
        <Text style={styles.totalQty}>Total: {item.totalQuantity} unidades</Text>
      </View>
      <View style={styles.quantityContainer}>
        <Text style={styles.quantityLabel}>Qtd</Text>
        <Text style={styles.quantityValue}>{item.quantity}</Text>
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.qtyButton}
            onPress={() => handleDecrement(item.id)}
          >
            <Text style={styles.qtyButtonText}>-</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.qtyButton}
            onPress={() => handleIncrement(item.id)}
          >
            <Text style={styles.qtyButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  const groupedProducts = products.reduce((acc, product) => {
    const key = `${product.name}-${product.category}`;
    if (!acc[key]) {
      acc[key] = {
        ...product,
        totalQuantity: 0,
        entries: [],
      };
    }
    acc[key].totalQuantity += product.quantity;
    acc[key].entries.push(product);
    return acc;
  }, {});

  const groupedList = Object.values(groupedProducts);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Dashboard</Text>
          <Text style={styles.welcome}>Olá, {user?.name || 'Usuário'}</Text>
        </View>
        <View style={styles.headerButtons}>
          {user?.permission === 'admin' && (
            <TouchableOpacity
              style={styles.headerButton}
              onPress={() => navigation.navigate('Register')}
            >
              <Text style={styles.headerButtonText}>👤</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.headerButton} onPress={handleLogout}>
            <Text style={styles.headerButtonText}>🚪</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Estoque</Text>
          <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('ProductForm')}>
            <Text style={styles.addButtonText}>+ Novo</Text>
          </TouchableOpacity>
        </View>

        {groupedList.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Nenhum produto cadastrado</Text>
          </View>
        ) : (
          <FlatList
            data={groupedList}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderProduct}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1e293b',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#f8fafc',
  },
  welcome: {
    fontSize: 14,
    color: '#94a3b8',
  },
  headerButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  headerButton: {
    backgroundColor: '#1e293b',
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#334155',
  },
  headerButtonText: {
    fontSize: 20,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#f8fafc',
  },
  addButton: {
    backgroundColor: '#3b82f6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  productCard: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#334155',
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#f8fafc',
  },
  productCategory: {
    fontSize: 13,
    color: '#94a3b8',
    marginTop: 4,
  },
  productPrice: {
    fontSize: 14,
    color: '#22c55e',
    marginTop: 8,
    fontWeight: '600',
  },
  totalQty: {
    fontSize: 12,
    color: '#94a3b8',
    marginTop: 4,
  },
  quantityContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityLabel: {
    fontSize: 11,
    color: '#94a3b8',
    textTransform: 'uppercase',
  },
  quantityValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#f8fafc',
    marginVertical: 8,
  },
  buttonRow: {
    flexDirection: 'row',
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
  qtyButtonText: {
    fontSize: 18,
    color: '#f8fafc',
    fontWeight: 'bold',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    color: '#94a3b8',
    fontSize: 16,
  },
});