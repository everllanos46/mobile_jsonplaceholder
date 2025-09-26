
import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { usePost, useComments } from '../../hooks/usePosts';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { PostsStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<PostsStackParamList, 'PostDetail'>;

export default function PostDetailScreen({ route }: Props) {
  const { id } = route.params;
  const { data: post } = usePost(id);
  const { data: comments = [] } = useComments(id);

  const [localComments, setLocalComments] = useState<any[]>([]);
  const [form, setForm] = useState({ name: '', email: '', body: '' });

  function addLocal() {
    const newC = {
      ...form,
      id: `local-${Date.now()}`,
      postId: id,
      local: true,
    };
    setLocalComments([newC, ...localComments]);
    setForm({ name: '', email: '', body: '' });
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.postCard}>
        <Text style={styles.postTitle}>{post?.title}</Text>
        <Text style={styles.postBody}>{post?.body}</Text>
      </View>

      <Text style={styles.sectionTitle}>Agregar comentario</Text>
      <View style={styles.form}>
        <TextInput
          placeholder="Nombre"
          style={styles.input}
          value={form.name}
          onChangeText={(n) => setForm((s) => ({ ...s, name: n }))}
        />
        <TextInput
          placeholder="Email"
          style={styles.input}
          value={form.email}
          onChangeText={(n) => setForm((s) => ({ ...s, email: n }))}
        />
        <TextInput
          placeholder="Comentario"
          style={[styles.input, styles.inputMultiline]}
          value={form.body}
          multiline
          numberOfLines={3}
          onChangeText={(n) => setForm((s) => ({ ...s, body: n }))}
        />
        <Button title="Agregar comentario (local)" onPress={addLocal} />
      </View>

      <Text style={styles.sectionTitle}>Comentarios</Text>
      <FlatList
        data={[...localComments, ...comments]}
        keyExtractor={(c) => String(c.id)}
        scrollEnabled={false}
        renderItem={({ item }) => (
          <View style={styles.commentCard}>
            <Text style={styles.commentName}>
              {item.name} {item.local ? '(local)' : ''}
            </Text>
            <Text style={styles.commentEmail}>{item.email}</Text>
            <Text style={styles.commentBody}>{item.body}</Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>No hay comentarios</Text>
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
  postCard: {
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
  postTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
    color: '#333',
  },
  postBody: {
    fontSize: 15,
    color: '#555',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    marginLeft: 4,
    color: '#333',
  },
  form: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 1,
  },
  input: {
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 8,
    fontSize: 14,
    backgroundColor: '#fefefe',
  },
  inputMultiline: {
    height: 70,
    textAlignVertical: 'top',
  },
  commentCard: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.02,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 1,
    elevation: 1,
  },
  commentName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
  },
  commentEmail: {
    fontSize: 13,
    color: '#777',
    marginBottom: 4,
  },
  commentBody: {
    fontSize: 14,
    color: '#555',
  },
  empty: {
    textAlign: 'center',
    color: '#999',
    marginTop: 12,
  },
});
