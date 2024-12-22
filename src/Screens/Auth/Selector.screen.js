import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const SelectionScreen = ({ navigation }) => {
  const [isLogin, setIsLogin] = React.useState(true);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Our App</Text>
      <Text style={styles.subtitle}>Please choose an option:</Text>

      <View style={styles.optionsContainer}>
        <TouchableOpacity
          style={[
            styles.optionButton,
            isLogin && styles.activeOption,
          ]}
          onPress={() => navigation.navigate('login')}
        >
          <Text style={isLogin ? styles.activeText : styles.inactiveText}>
            Login
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.optionButton,
            !isLogin && styles.activeOption,
          ]}
          onPress={() => navigation.navigate('register')}
        >
          <Text style={styles.activeText }>
            Register
          </Text>
        </TouchableOpacity>
      </View>

    </View>
  );
};

export default SelectionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    marginBottom: 20,
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
  },
  optionButton: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    backgroundColor: '#4caf50',
    marginHorizontal: 10,
  },
  activeOption: {
    backgroundColor: '#4caf50',
  },
  activeText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  nextButton: {
    backgroundColor: '#4caf50',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
