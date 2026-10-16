import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Image, 
  ScrollView, 
  TextInput, 
  TouchableOpacity, 
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Alert 
} from 'react-native';

const API_URL = "http://10.154.20.15:5000";

export default function CadastrarUsuario({ navigation }) {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [papel, setPapel] = useState('usuario');

  const handleSalvar = async () => {
    if (!usuario || !senha) {
      Alert.alert("Erro", "Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    try {
      const resposta = await fetch(`${API_URL}/api/cadastrarusuario`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          usuario: usuario,
          senha: senha,
          papel: papel
        }),
      });

      const resultado = await resposta.json();

      if (resposta.ok) {
        Alert.alert("Sucesso", "Usuário cadastrado com sucesso no banco de dados!");
        navigation.goBack();
      } else {
        Alert.alert("Erro", resultado.mensagem || "Não foi possível cadastrar o usuário.");
      }
    } catch (erro) {
      console.error("Erro ao comunicar com a API:", erro);
      Alert.alert("Erro", "Falha na conexão com o servidor.");
    }
  };

  return (
    <ImageBackground 
      source={require('../assets/fundohomesenai.jpg')} 
      style={styles.bodyHome}
      imageStyle={styles.backgroundImage}
    >
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          
          <View style={styles.logoContainer}>
            <Image 
              source={require('../assets/logo_senai.png')} 
              style={styles.logoSenai}
              resizeMode="contain"
            />
          </View>

          <View style={styles.caixaNavbar}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.navLink}>Voltar</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.caixaTabela}>
            <Text style={styles.tituloTabela}>Novo Cadastro de Usuário</Text>

            <View style={styles.formCard}>
              
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Nome do Usuário</Text>
                <TextInput
                  style={styles.input}
                  value={usuario}
                  onChangeText={setUsuario}
                  placeholder="Digite o nome de usuário"
                  placeholderTextColor="#adb5bd"
                  autoCapitalize="none"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Senha</Text>
                <TextInput
                  style={styles.input}
                  value={senha}
                  onChangeText={setSenha}
                  placeholder="********"
                  placeholderTextColor="#adb5bd"
                  secureTextEntry={true}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Papel</Text>
                <View style={styles.papelRow}>
                  <TouchableOpacity 
                    style={[styles.papelBtn, papel === 'admin' && styles.papelBtnAtivo]}
                    onPress={() => setPapel('admin')}
                  >
                    <Text style={[styles.papelTexto, papel === 'admin' && styles.papelTextoAtivo]}>Administrador</Text>
                  </TouchableOpacity>

                  <TouchableOpacity 
                    style={[styles.papelBtn, papel === 'usuario' && styles.papelBtnAtivo]}
                    onPress={() => setPapel('usuario')}
                  >
                    <Text style={[styles.papelTexto, papel === 'usuario' && styles.papelTextoAtivo]}>Usuário</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.buttonContainer}>
                <TouchableOpacity 
                  style={styles.btnCancelar} 
                  onPress={() => navigation.goBack()}
                  activeOpacity={0.8}
                >
                  <Text style={styles.btnCancelarTexto}>Cancelar</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={styles.btnSalvar} 
                  onPress={handleSalvar}
                  activeOpacity={0.8}
                >
                  <Text style={styles.btnSalvarTexto}>Cadastrar Usuário</Text>
                </TouchableOpacity>
              </View>

            </View>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bodyHome: { flex: 1, width: '100%', height: '100%', backgroundColor: '#f8f9fa' },
  backgroundImage: { resizeMode: 'cover' },
  scrollContainer: { paddingBottom: 40, paddingTop: 30 },
  logoContainer: { alignItems: 'flex-start', paddingHorizontal: 20, marginBottom: 10 },
  logoSenai: { width: 200, height: 50 },
  caixaNavbar: {
    marginHorizontal: 20,
    backgroundColor: 'rgb(8, 69, 201)',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  navLink: { color: '#ffffff', fontWeight: 'bold', fontSize: 16 },
  caixaTabela: {
    backgroundColor: '#f58427',
    marginTop: 20,
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 8,
  },
  tituloTabela: { color: '#ffffff', fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  formCard: { backgroundColor: '#ffffff', borderRadius: 8, padding: 20 },
  inputGroup: { marginBottom: 20 },
  label: { fontWeight: 'bold', color: '#6c757d', fontSize: 14, marginBottom: 6 },
  input: {
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: '#fff',
    color: '#000',
  },
  papelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  papelBtn: {
    flex: 1,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 6,
    alignItems: 'center',
    marginHorizontal: 4,
    backgroundColor: '#f8f9fa',
  },
  papelBtnAtivo: {
    backgroundColor: 'rgb(8, 69, 201)',
    borderColor: 'rgb(8, 69, 201)',
  },
  papelTexto: {
    color: '#6c757d',
    fontWeight: 'bold',
    fontSize: 14,
  },
  papelTextoAtivo: {
    color: '#ffffff',
  },
  buttonContainer: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginTop: 10 
  },
  btnCancelar: { 
    flex: 1, 
    marginRight: 10, 
    paddingVertical: 12, 
    borderWidth: 1, 
    borderColor: '#6c757d', 
    borderRadius: 6, 
    alignItems: 'center',
    backgroundColor: '#f8f9fa'
  },
  btnCancelarTexto: { color: '#6c757d', fontWeight: 'bold', fontSize: 13 },
  btnSalvar: { 
    flex: 2, 
    backgroundColor: 'rgb(8, 69, 201)', 
    paddingVertical: 12, 
    borderRadius: 6, 
    alignItems: 'center' 
  },
  btnSalvarTexto: { color: '#ffffff', fontWeight: 'bold', fontSize: 13 },
});