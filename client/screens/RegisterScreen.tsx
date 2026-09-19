import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

const RegisterScreen = ({ navigation }: any) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name.trim() || !email.trim() || !password.trim()) {
      setMessage("Please fill in all fields.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post(
        "http://10.0.2.2:5000/api/auth/register",
        {
          name: name.trim(),
          email: email.trim(),
          password,
        }
      );
      await AsyncStorage.setItem("token", response.data.token);
      navigation.replace("Todos");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setMessage(
          error.response?.data?.message ||
            "Registration failed. Try a different email."
        );
      } else {
        setMessage("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Create Account 🚀</Text>
          <Text style={styles.subtitle}>Sign up to start organizing your todos</Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            placeholderTextColor="#9CA3AF"
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
          />

          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            placeholderTextColor="#9CA3AF"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />

          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            placeholderTextColor="#9CA3AF"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <Pressable
            style={({ pressed }) => [
              styles.button,
              pressed && styles.buttonPressed,
              loading && styles.buttonDisabled,
            ]}
            onPress={handleRegister}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.buttonText}>Register</Text>
            )}
          </Pressable>

          {message ? <Text style={styles.error}>{message}</Text> : null}

          <Pressable
            style={{ marginTop: 15 }}
            onPress={() => navigation.goBack()}
          >
            <Text style={{ color: "#2563EB", textAlign: "center", fontWeight: "600" }}>
              Already have an account? Login
            </Text>
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#F8FAFC" },
  container: { flex: 1, justifyContent: "center", paddingHorizontal: 24 },
  header: { marginBottom: 35 },
  title: { fontSize: 32, fontWeight: "800", color: "#111827", marginBottom: 8 },
  subtitle: { fontSize: 16, color: "#6B7280" },
  form: {
    backgroundColor: "#FFFFFF",
    padding: 22,
    borderRadius: 18,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 5,
  },
  label: { fontSize: 14, fontWeight: "600", color: "#374151", marginBottom: 8 },
  input: {
    height: 52,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    color: "#111827",
    backgroundColor: "#F9FAFB",
    marginBottom: 18,
  },
  button: {
    height: 52,
    backgroundColor: "#111827",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
  },
  buttonPressed: { opacity: 0.8 },
  buttonDisabled: { opacity: 0.6 },
  buttonText: { color: "#FFFFFF", fontSize: 16, fontWeight: "700" },
  error: { textAlign: "center", marginTop: 18, fontSize: 14, fontWeight: "500", color: "#DC2626" },
});

export default RegisterScreen;