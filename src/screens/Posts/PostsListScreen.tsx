import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useAllPosts } from '../../hooks/usePosts';
import { filterAndSort } from '../../utils/filter';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { PostsStackParamList } from '../../navigation/types';

const PAGE_SIZE = 20;

type Props = NativeStackScreenProps<PostsStackParamList, 'PostsList'>;

export default function PostsListScreen({ navigation }: Props) {
  const { data, isLoading, isError, refetch } = useAllPosts();
  const [query, setQuery] = useState('');
  const [order, setOrder] = useState<'asc' | 'desc' | null>(null);
  const [page, setPage] = useState(1);

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
    return <Text style={styles.loadingText}>Cargando posts...</Text>;
  if (isError)
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Error al cargar posts</Text>
        <Button title="Reintentar" onPress={() => refetch()} />
      </View>
    );

  return (
    <View style={styles.container}>
      {/* Search */}
      <TextInput
        placeholder="Buscar por título"
        placeholderTextColor="#999"
        value={query}
        onChangeText={setQuery}
        style={styles.searchInput}
      />

      {/* Order buttons */}
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

      {/* List */}
      <FlatList
        data={paged}
        keyExtractor={(i) => String(i.id)}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('PostDetail', { id: item.id })}
          >
            <View style={styles.postCard}>
              <Text style={styles.postTitle}>{item.title}</Text>
              <Text style={styles.postBody}>
                {item.body.slice(0, 80)}...
              </Text>
            </View>
          </TouchableOpacity>
        )}
        onEndReached={loadMore}
        onEndReachedThreshold={0.4}
        ListEmptyComponent={<Text style={styles.emptyText}>No hay posts</Text>}
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
  loadingText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
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
  postTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
    color: '#333',
  },
  postBody: {
    fontSize: 14,
    color: '#555',
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    marginTop: 20,
  },
});
