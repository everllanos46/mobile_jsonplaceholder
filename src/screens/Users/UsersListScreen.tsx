import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useUsers } from "../../hooks/useUsers";
import { filterAndSort } from "../../utils/filter";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { UsersStackParamList } from "../../navigation/types";

type Props = NativeStackScreenProps<UsersStackParamList, "UsersList">;

export default function UsersListScreen({ navigation }: Props) {
  const { data, isLoading, isError, refetch } = useUsers();
  const [query, setQuery] = useState("");

  const users = data ?? [];
  const filtered = useMemo(
    () => filterAndSort(users, query, null, "name"),
    [users, query]
  );

  if (isLoading && users.length === 0) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Cargando usuarios…</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>Error al cargar usuarios</Text>
        <TouchableOpacity style={styles.retryBtn} onPress={() => refetch()}>
          <Text style={styles.retryText}>Reintentar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.search}
        placeholder="Buscar usuario por nombre"
        value={query}
        onChangeText={setQuery}
      />

      <FlatList
        data={filtered}
        keyExtractor={(i) => String(i.id)}
        contentContainerStyle={{ paddingBottom: 16 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("UserDetail", { id: item.id })}
          >
            <View style={styles.card}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.info}>
                {item.username} • {item.email}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={refetch}
            colors={["#007AFF"]}
            tintColor="#007AFF"
          />
        }
        ListEmptyComponent={
          <View style={styles.center}>
            <Text style={styles.empty}>No hay usuarios</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    backgroundColor: "#f9f9f9",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 8,
    fontSize: 16,
    color: "#555",
  },
  error: {
    color: "red",
    marginBottom: 8,
    fontSize: 16,
  },
  retryBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#007AFF",
    borderRadius: 6,
  },
  retryText: {
    color: "white",
    fontWeight: "600",
  },
  search: {
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  info: {
    color: "#555",
  },
  empty: {
    textAlign: "center",
    color: "#999",
    fontSize: 15,
  },
});
