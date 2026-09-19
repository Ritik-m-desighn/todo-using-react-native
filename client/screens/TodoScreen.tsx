import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TodoScreen = ({ navigation }: any) => {
  const [todos, setTodos] = useState<any[]>([]);
  const [title, setTitle] = useState("");

  // Edit states for update feature
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState("");

  const getTodos = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      const response = await axios.get(
        "http://10.0.2.2:5000/api/todos",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTodos(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addTodo = async () => {
    if (!title.trim()) return;

    try {
      const token = await AsyncStorage.getItem("token");

      const response = await axios.post(
        "http://10.0.2.2:5000/api/todos",
        {
          title: title.trim(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTodos((prev) => [...prev, response.data]);
      setTitle("");
    } catch (error) {
      console.log(error);
    }
  };

  const toggleTodo = async (id: string, completed: boolean) => {
    try {
      const token = await AsyncStorage.getItem("token");

      const response = await axios.patch(
        `http://10.0.2.2:5000/api/todos/${id}`,
        {
          completed: !completed,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTodos((prev) =>
        prev.map((todo) =>
          todo._id === id ? response.data : todo
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  const updateTodoTitle = async (id: string) => {
    if (!editingTitle.trim()) return;

    try {
      const token = await AsyncStorage.getItem("token");

      const response = await axios.patch(
        `http://10.0.2.2:5000/api/todos/${id}`,
        {
          title: editingTitle.trim(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTodos((prev) =>
        prev.map((todo) =>
          todo._id === id ? response.data : todo
        )
      );
      setEditingId(null);
      setEditingTitle("");
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      const token = await AsyncStorage.getItem("token");

      await axios.delete(
        `http://10.0.2.2:5000/api/todos/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTodos((prev) =>
        prev.filter((todo) => todo._id !== id)
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem("token");
    navigation.replace("Login");
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>My Todos</Text>
        <Pressable style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </Pressable>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Enter a task"
        value={title}
        onChangeText={setTitle}
      />

      <Pressable style={styles.button} onPress={addTodo}>
        <Text style={styles.buttonText}>Add Task</Text>
      </Pressable>

      {todos.map((todo) => (
        <View key={todo._id} style={styles.todoRow}>
          {editingId === todo._id ? (
            <TextInput
              style={[styles.input, { flex: 1, marginBottom: 0 }]}
              value={editingTitle}
              onChangeText={setEditingTitle}
              autoFocus
            />
          ) : (
            <Pressable
              style={styles.todoTextContainer}
              onPress={() => toggleTodo(todo._id, todo.completed)}
            >
              <Text
                style={[
                  styles.todo,
                  todo.completed && styles.completed,
                ]}
              >
                {todo.title}
              </Text>
              
              {/* Status Badge */}
              <View
                style={[
                  styles.badge,
                  todo.completed ? styles.completedBadge : styles.pendingBadge,
                ]}
              >
                <Text
                  style={[
                    styles.badgeText,
                    todo.completed
                      ? styles.completedBadgeText
                      : styles.pendingBadgeText,
                  ]}
                >
                  {todo.completed ? "Completed" : "Pending"}
                </Text>
              </View>
            </Pressable>
          )}

          {editingId === todo._id ? (
            <Pressable
              style={styles.saveButton}
              onPress={() => updateTodoTitle(todo._id)}
            >
              <Text style={styles.actionText}>Save</Text>
            </Pressable>
          ) : (
            <Pressable
              style={styles.editButton}
              onPress={() => {
                setEditingId(todo._id);
                setEditingTitle(todo.title);
              }}
            >
              <Text style={styles.actionText}>Edit</Text>
            </Pressable>
          )}

          <Pressable
            style={styles.deleteButton}
            onPress={() => deleteTodo(todo._id)}
          >
            <Text style={styles.deleteText}>Delete</Text>
          </Pressable>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F8FAFC",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
  },
  logoutButton: {
    backgroundColor: "#374151",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  logoutText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "black",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  todoRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    gap: 8,
  },
  todoTextContainer: {
    flex: 1,
  },
  todo: {
    fontSize: 18,
  },
  completed: {
    textDecorationLine: "line-through",
    color: "#888",
  },
  // Badge Styles
  badge: {
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginTop: 4,
  },
  pendingBadge: {
    backgroundColor: "#FEF3C7", // Soft yellow/orange
  },
  completedBadge: {
    backgroundColor: "#DCFCE7", // Soft green
  },
  badgeText: {
    fontSize: 11,
    fontWeight: "700",
  },
  pendingBadgeText: {
    color: "#D97706",
  },
  completedBadgeText: {
    color: "#16A34A",
  },
  editButton: {
    backgroundColor: "#2563EB",
    padding: 8,
    borderRadius: 6,
  },
  saveButton: {
    backgroundColor: "#16A34A",
    padding: 8,
    borderRadius: 6,
  },
  deleteButton: {
    backgroundColor: "red",
    padding: 8,
    borderRadius: 6,
  },
  actionText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 12,
  },
  deleteText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 12,
  },
});

export default TodoScreen;