
import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useUser } from '../../hooks/useUsers';
import { usePostsByUser } from '../../hooks/usePosts';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { UsersStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<UsersStackParamList, 'UserDetail'>;

export default function UserDetailScreen({ route, navigation }: Props) {
  const { id } = route.params;
  const { data: user } = useUser(id);
  const { data: posts = [] } = usePostsByUser(id);

  return (
    <ScrollView style={styles.container}>
      {user && (
        <View style={styles.card}>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.info}>📞 {user.phone}</Text>
          <Text style={styles.info}>🌐 {user.website}</Text>
          <Text style={styles.info}>🏙️ {user.address?.city}</Text>
        </View>
      )}

      <Text style={styles.sectionTitle}>Posts del usuario</Text>
      <FlatList
        data={posts}
        keyExtractor={(i) => String(i.id)}
        scrollEnabled={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('PostDetail', { id: item.id })}
          >
            <View style={styles.postCard}>
              <Text style={styles.postTitle}>{item.title}</Text>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>Este usuario no tiene posts</Text>
        }
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 12,
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
    color: '#333',
  },
  info: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    marginLeft: 4,
    color: '#333',
  },
  postCard: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 8,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 1,
  },
  postTitle: {
    fontSize: 15,
    color: '#444',
  },
  empty: {
    textAlign: 'center',
    color: '#999',
    marginTop: 12,
  },
});
