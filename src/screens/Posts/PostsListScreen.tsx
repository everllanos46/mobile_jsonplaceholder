import React, { useMemo, useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAllPosts } from '../../hooks/usePosts';
import { filterAndSort } from '../../utils/filter';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { PostsStackParamList } from '../../navigation/types';

const PAGE_SIZE = 20;
const FAVORITES_KEY = '@favorites_posts';

type Props = NativeStackScreenProps<PostsStackParamList, 'PostsList'>;

export default function PostsListScreen({ navigation }: Props) {
  const { data, isLoading, isError, refetch, isRefetching } = useAllPosts();
  const [query, setQuery] = useState('');
  const [order, setOrder] = useState<'asc' | 'desc' | null>(null);
  const [page, setPage] = useState(1);

  const [favorites, setFavorites] = useState<number[]>([]);

  useEffect(() => {
    (async () => {
      const saved = await AsyncStorage.getItem(FAVORITES_KEY);
      if (saved) setFavorites(JSON.parse(saved));
    })();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }, [favorites]);

  function toggleFavorite(id: number) {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  }

  const posts = data ?? [];
  const filtered = useMemo(
    () => filterAndSort(posts, query, order, 'title'),
    [posts, query, order]
  );
  const paged = filtered.slice(0, page * PAGE_SIZE);

  function loadMore() {
    if (paged.length < filtered.length) setPage((p) => p + 1);
  }

  if (isLoading)
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Cargando posts...</Text>
      </View>
    );

  if (isError)
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Error al cargar posts</Text>
        <TouchableOpacity style={styles.retryBtn} onPress={() => refetch()}>
          <Text style={styles.retryText}>Reintentar</Text>
        </TouchableOpacity>
      </View>
    );

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Buscar por título"
        placeholderTextColor="#999"
        value={query}
        onChangeText={setQuery}
        style={styles.searchInput}
      />

      <View style={styles.orderButtons}>
        <TouchableOpacity
          style={[
            styles.orderBtn,
            order === 'asc' && styles.orderBtnActive,
          ]}
          onPress={() => setOrder('asc')}
        >
          <Text style={styles.orderBtnText}>Asc</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.orderBtn,
            order === 'desc' && styles.orderBtnActive,
          ]}
          onPress={() => setOrder('desc')}
        >
          <Text style={styles.orderBtnText}>Desc</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.orderBtn} onPress={() => setOrder(null)}>
          <Text style={styles.orderBtnText}>Clear</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={paged}
        keyExtractor={(i) => String(i.id)}
        renderItem={({ item }) => {
          const isFav = favorites.includes(item.id);
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate('PostDetail', { id: item.id })}
            >
              <View style={styles.postCard}>
                <View style={styles.postHeader}>
                  <Text style={styles.postTitle}>{item.title}</Text>
                  <TouchableOpacity
                    onPress={() => toggleFavorite(item.id)}
                    style={[styles.favBtn, isFav && styles.favBtnActive]}
                  >
                    <Text style={styles.favBtnText}>{isFav ? '★' : '☆'}</Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.postBody}>{item.body.slice(0, 80)}...</Text>
              </View>
            </TouchableOpacity>
          );
        }}
        onEndReached={loadMore}
        onEndReachedThreshold={0.4}
        ListEmptyComponent={<Text style={styles.emptyText}>No hay posts</Text>}
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={() => refetch()} />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    backgroundColor: '#f9f9f9',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#333',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  retryBtn: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#007AFF',
    borderRadius: 6,
  },
  retryText: {
    color: '#fff',
    fontWeight: '600',
  },
  searchInput: {
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 10,
    backgroundColor: '#fff',
    fontSize: 14,
  },
  orderButtons: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  orderBtn: {
    flex: 1,
    borderRadius: 8,
    backgroundColor: '#eee',
    paddingVertical: 8,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  orderBtnActive: {
    backgroundColor: '#007AFF',
  },
  orderBtnText: {
    color: '#333',
    fontWeight: '600',
  },
  postCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    elevation: 1,
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  postTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
    color: '#333',
    flex: 1,
  },
  postBody: {
    fontSize: 14,
    color: '#555',
  },
  favBtn: {
    marginLeft: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  favBtnActive: {
    backgroundColor: '#FFE066',
    borderColor: '#FFD43B',
  },
  favBtnText: {
    fontSize: 18,
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    marginTop: 20,
  },
});
