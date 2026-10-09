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

const API_URL = "http://10.154.20.23:5000";

export default function CadastrarItem({ navigation }) {
  const [nome, setNome] = useState('');
  const [idItem, setIdItem] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [estoqueMinimo, setEstoqueMinimo] = useState('');
  const [preco, setPreco] = useState('');
  const [categoria, setCategoria] = useState('');
  const [descricao, setDescricao] = useState('');
  const [imagem, setImagem] = useState('');

  const handleSalvar = async () => {
    if (!nome || !idItem || !quantidade || !preco) {
      Alert.alert("Erro", "Por favor, preencha os campos principais obrigatórios.");
      return;
    }

    try {
      const resposta = await fetch(`${API_URL}/api/salvaritem`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: parseInt(idItem),
          nome_do_produto: nome,
          categoria: categoria,
          descricao: descricao,
          qtde: parseInt(quantidade),
          preco: parseFloat(preco),
          foto: imagem,
          estoque_min: parseInt(estoqueMinimo || 0)
        }),
      });

      const resultado = await resposta.json();

      if (resposta.ok) {
        Alert.alert("Sucesso", "Item salvo no banco de dados com sucesso!");
        navigation.goBack();
      } else {
        Alert.alert("Erro", resultado.mensagem || "Não foi possível guardar o item.");
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
            <Text style={styles.tituloTabela}>Novo Cadastro de Item</Text>

            <View style={styles.formCard}>
              <View style={styles.row}>
                <View style={[styles.inputGroup, { flex: 2, marginRight: 10 }]}>
                  <Text style={styles.label}>Nome do Produto</Text>
                  <TextInput
                    style={styles.input}
                    value={nome}
                    onChangeText={setNome}
                    placeholder="Digite o nome"
                    placeholderTextColor="#adb5bd"
                  />
                </View>

                <View style={[styles.inputGroup, { flex: 1 }]}>
                  <Text style={styles.label}>ID</Text>
                  <TextInput
                    style={styles.input}
                    value={idItem}
                    onChangeText={setIdItem}
                    placeholder="ID"
                    placeholderTextColor="#adb5bd"
                    keyboardType="numeric"
                  />
                </View>
              </View>

              <View style={styles.rowTriple}>
                <View style={styles.inputGroupTriple}>
                  <Text style={styles.label} numberOfLines={1}>Quantidade</Text>
                  <TextInput
                    style={styles.input}
                    value={quantidade}
                    onChangeText={setQuantidade}
                    placeholder="0"
                    placeholderTextColor="#adb5bd"
                    keyboardType="numeric"
                  />
                </View>

                <View style={styles.inputGroupTriple}>
                  <Text style={styles.label} numberOfLines={1}>Estoque Mín.</Text>
                  <TextInput
                    style={styles.input}
                    value={estoqueMinimo}
                    onChangeText={setEstoqueMinimo}
                    placeholder="0"
                    placeholderTextColor="#adb5bd"
                    keyboardType="numeric"
                  />
                </View>

                <View style={styles.inputGroupTriple}>
                  <Text style={styles.label} numberOfLines={1}>Preço</Text>
                  <TextInput
                    style={styles.input}
                    value={preco}
                    onChangeText={setPreco}
                    placeholder="0.00"
                    placeholderTextColor="#adb5bd"
                    keyboardType="numeric"
                  />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Categoria</Text>
                <TextInput
                  style={styles.input}
                  value={categoria}
                  onChangeText={setCategoria}
                  placeholder="Categoria do item"
                  placeholderTextColor="#adb5bd"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Descrição Detalhada</Text>
                <TextInput
                  style={[styles.input, { height: 80, textAlignVertical: 'top' }]}
                  value={descricao}
                  onChangeText={setDescricao}
                  placeholder="Detalhes sobre o produto"
                  placeholderTextColor="#adb5bd"
                  multiline={true}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Link para foto do Item</Text>
                <TextInput
                  style={styles.input}
                  value={imagem}
                  onChangeText={setImagem}
                  placeholder="https://exemplo.com/foto.jpg"
                  placeholderTextColor="#adb5bd"
                  autoCapitalize="none"
                />
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
                  <Text style={styles.btnSalvarTexto}>Salvar</Text>
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
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  rowTriple: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginBottom: 15 
  },
  inputGroupTriple: { 
    flex: 1, 
    marginHorizontal: 3 
  },
  inputGroup: { marginBottom: 15 },
  label: { fontWeight: 'bold', color: '#6c757d', fontSize: 13, marginBottom: 6 },
  input: {
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 10,
    fontSize: 15,
    backgroundColor: '#fff',
    color: '#000',
  },
  buttonContainer: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginTop: 20 
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