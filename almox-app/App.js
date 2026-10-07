import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  Switch, 
  ImageBackground,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Importação das telas
import Home from './telas/home';
import CadastrarItem from './telas/cadastrodeitem';
import CadastrarUsuario from './telas/cadastrodeusuario';
import Movimentacoes from './telas/movimentacoes';

const Stack = createNativeStackNavigator();
const API_URL = "http://10.154.20.23:5000"

function LoginScreen({ navigation }) {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [lembrar, setLembrar] = useState(false);

  const handleLogin = () => {
    console.log('Usuário:', usuario);
    navigation.navigate('Home');
  };

  return (
    <ImageBackground 
      source={require('./assets/SENAI.jpg')} 
      style={styles.background}
      imageStyle={styles.backgroundImage}
    >
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.containerKeyboard}
      >
        <View style={styles.container}>
          <Text style={styles.title}>LOGIN</Text>

          <View style={styles.inputBox}>
            <TextInput
              style={styles.input}
              placeholder="Usuário"
              placeholderTextColor="#ceceb7"
              value={usuario}
              onChangeText={setUsuario}
              autoCapitalize="none"
            />
            <Ionicons name="person" size={20} color="#000" style={styles.icon} />
          </View>

          <View style={styles.inputBox}>
            <TextInput
              style={styles.input}
              placeholder="Senha"
              placeholderTextColor="#ceceb7"
              secureTextEntry={true}
              value={senha}
              onChangeText={setSenha}
            />
            <Ionicons name="lock-closed" size={20} color="#000" style={styles.icon} />
          </View>

          <View style={styles.rememberContainer}>
            <View style={styles.switchRow}>
              <Switch
                value={lembrar}
                onValueChange={setLembrar}
                trackColor={{ false: '#767577', true: '#ceceb7' }}
                thumbColor={'#f4f3f4'}
              />
              <Text style={styles.rememberText}>Lembrar senha</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.loginButton} onPress={handleLogin} activeOpacity={0.8}>
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
        </View>

        <StatusBar style="light" />
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}><Stack.Screen name="Login" component={LoginScreen} /><Stack.Screen name="Home" component={Home} /><Stack.Screen name="CadastrarItem" component={CadastrarItem} /><Stack.Screen name="CadastrarUsuario" component={CadastrarUsuario} /><Stack.Screen name="Movimentacoes" component={Movimentacoes} /></Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  logoSenai: { width: 180, height: 45 },
  background: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  backgroundImage: {
    resizeMode: 'cover',
  },
  containerKeyboard: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  container: {
    width: '90%',
    maxWidth: 420,
    backgroundColor: 'rgb(241, 241, 234)',
    borderRadius: 10,
    paddingVertical: 30,
    paddingHorizontal: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  title: {
    fontSize: 36,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000',
  },
  inputBox: {
    position: 'relative',
    width: '100%',
    height: 50,
    marginVertical: 15,
  },
  input: {
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: 'rgb(231, 231, 206)',
    borderRadius: 40,
    fontSize: 16,
    color: '#000',
    paddingLeft: 20,
    paddingRight: 45,
  },
  icon: {
    position: 'absolute',
    right: 20,
    top: 15,
  },
  rememberContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rememberText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#000',
  },
  loginButton: {
    width: '100%',
    height: 50,
    backgroundColor: 'rgb(206, 206, 183)',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    shadowColor: '#64646f',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
});