import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { login, selectIsLoggedIn } from '../store/slice/authSlice';
import { selectUser, setUser } from '../store/slice/UserSlice';
// Import navigation hook from React Navigation if using React Navigation for navigation in React Native
import { useNavigation } from '@react-navigation/native';
// Assume toast library suitable for React Native is installed, for example react-native-toast-message
import Toast from 'react-native-toast-message';

const Login = () => {
  const dispatch = useDispatch();
  // Use React Navigation's hook for navigation
  const navigation = useNavigation();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (user && isLoggedIn) {
      // Navigate using React Navigation
      navigation.navigate('Home');
    }
  }, [isLoggedIn, navigation, user]);

  const handleSubmit = async () => {
    try {
      const response = await axios.post(`http://185.199.53.202:3000/api/admin/loginEmployee`, { email, password });
      if (response.status === 200) {
        dispatch(login());
        dispatch(setUser(response.data.employee));
        Toast.show({ type: 'success', text1: response.data.message });
        navigation.navigate('Home');
      } else {
        console.error('Unexpected status code:', response.status);
        Toast.show({ type: 'error', text1: 'An unexpected error occurred. Please try again later.' });
      }
    } catch (error) {
      console.error('Error logging in:', error);
      Toast.show({ type: 'error', text1: 'An error occurred. Please try again later.' });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Employee Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email address"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {error !== '' && <Text style={styles.errorText}>{error}</Text>}
      <Button title="Login" onPress={handleSubmit} />
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    marginVertical: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
  },
  errorText: {
    color: 'red',
  },
});

export default Login;
