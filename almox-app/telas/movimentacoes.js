import React, { useState, useEffect } from 'react';
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

const API_URL = "http://10.154.20.69:5000";

export default function Movimentacoes({ navigation }) {
  const [resultado, setResultado] = useState([]);
  const [produto, setProduto] = useState('');
  const [tipoMovimentacao, setTipoMovimentacao] = useState('Entrada');
  const [quantidade, setQuantidade] = useState('');

  useEffect(() => {
    carregarEstoque();
  }, []);

  const carregarEstoque = async () => {
    try {
      const resposta = await fetch(`${API_URL}/api/estoque`);
      const dados = await resposta.json();
      
      if (resposta.ok && Array.isArray(dados)) {
        setResultado(dados);
      } else {
        console.error("A resposta da API não é um array válido:", dados);
      }
    } catch (erro) {
      console.error("Erro ao carregar estoque:", erro);
      Alert.alert("Erro", "Não foi possível conectar ao servidor.");
    }
  };

  const handleSalvarMovimentacao = async () => {
    if (!produto || !quantidade) {
      Alert.alert("Erro", "Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    try {
      const resposta = await fetch(`${API_URL}/api/registrarmovimentacao`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          produto: produto.trim(),
          tipo_movimentacao: tipoMovimentacao,
          quantidade: Number(quantidade)
        })
      });

      const textoResposta = await resposta.text();
      let resultadoApi;
      try {
        resultadoApi = JSON.parse(textoResposta);
      } catch (e) {
        Alert.alert("Erro", "O servidor retornou uma resposta inesperada. Verifique o terminal do Python.");
        return;
      }

      if (resposta.ok) {
        Alert.alert("Sucesso", "Movimentação registrada com sucesso!");
        setProduto('');
        setQuantidade('');
        navigation.goBack();
      } else {
        Alert.alert("Erro", resultadoApi.mensagem || "Não foi possível registrar a movimentação.");
      }
    } catch (erro) {
      console.error("Erro ao comunicar com a API:", erro);
      Alert.alert("Erro", "Falha na conexão com o servidor.");
    }
  };

  const mostrarFoto = (urlFoto) => {
    if (!urlFoto) {
      Alert.alert("Aviso", "Este item não possui link de imagem cadastrado.");
      return;
    }
    Alert.alert("Link da Imagem", urlFoto);
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
              <Text style={styles.navLink}>Voltar para Home</Text>
            </TouchableOpacity>
          </View>

          {/* Tabela de Estoque Atual */}
          <View style={styles.caixaTabela}>
            <Text style={styles.tituloTabela}>Estoque Atual</Text>

            <ScrollView horizontal={true} showsHorizontalScrollIndicator={true}>
              <View style={styles.tabelaContainer}>
                
                <View style={styles.tabelaHeader}>
                  <Text style={[styles.thText, { width: 50 }]}>ID</Text>
                  <Text style={[styles.thText, { width: 130 }]}>Produto</Text>
                  <Text style={[styles.thText, { width: 90 }]}>Quantidade</Text>
                  <Text style={[styles.thText, { width: 180 }]}>Descrição</Text>
                  <Text style={[styles.thText, { width: 80 }]}>Preço</Text>
                  <Text style={[styles.thText, { width: 100 }]}>Estoque Mínimo</Text>
                  <Text style={[styles.thText, { width: 100 }]}>Categoria</Text>
                  <Text style={[styles.thText, { width: 80 }]}>Imagem</Text>
                </View>

                {resultado.map((item, index) => (
                  <View key={index} style={styles.tabelaRow}>
                    <Text style={[styles.tdTextBold, { width: 50 }]}>{item.ID}</Text>
                    <Text style={[styles.tdText, { width: 130 }]} numberOfLines={1}>{item.Item}</Text>
                    
                    <View style={{ width: 90, alignItems: 'center' }}>
                      <View style={styles.badgeContainer}>
                        <Text style={styles.badgeText}>{item.quantidade} un</Text>
                      </View>
                    </View>

                    <Text style={[styles.tdTextMuted, { width: 180 }]} numberOfLines={1}>{item.Descricao}</Text>
                    <Text style={[styles.tdText, { width: 80 }]}>{Number(item.Preço).toFixed(2)}</Text>
                    <Text style={[styles.tdText, { width: 100 }]}>{item.estoque_min}</Text>
                    <Text style={[styles.tdText, { width: 100 }]} numberOfLines={1}>{item.Categoria}</Text>
                    
                    <View style={{ width: 80, alignItems: 'center' }}>
                      <TouchableOpacity 
                        style={styles.btnFoto} 
                        onPress={() => mostrarFoto(item.foto)}
                      >
                        <Text style={styles.btnFotoTexto}>Foto</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}

              </View>
            </ScrollView>
          </View>

          {/* Formulário de Lançamento de Movimentação */}
          <View style={[styles.caixaTabela, { marginBottom: 40 }]}>
            <Text style={styles.tituloTabela}>Lançar Movimentação</Text>

            <View style={styles.formCard}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Nome do Produto</Text>
                <TextInput
                  style={styles.input}
                  value={produto}
                  onChangeText={setProduto}
                  placeholder="Ex: Cabo eletrico"
                  placeholderTextColor="#adb5bd"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Tipo de Movimentação</Text>
                <View style={styles.tipoRow}>
                  <TouchableOpacity 
                    style={[styles.tipoBtn, tipoMovimentacao === 'Entrada' && styles.tipoBtnAtivo]}
                    onPress={() => setTipoMovimentacao('Entrada')}
                  >
                    <Text style={[styles.tipoTexto, tipoMovimentacao === 'Entrada' && styles.tipoTextoAtivo]}>Entrada</Text>
                  </TouchableOpacity>

                  <TouchableOpacity 
                    style={[styles.tipoBtn, tipoMovimentacao === 'Saida' && styles.tipoBtnAtivo]}
                    onPress={() => setTipoMovimentacao('Saida')}
                  >
                    <Text style={[styles.tipoTexto, tipoMovimentacao === 'Saida' && styles.tipoTextoAtivo]}>Saída</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Quantidade</Text>
                <TextInput
                  style={styles.input}
                  value={quantidade}
                  onChangeText={setQuantidade}
                  placeholder="0"
                  placeholderTextColor="#adb5bd"
                  keyboardType="numeric"
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
                  onPress={handleSalvarMovimentacao}
                  activeOpacity={0.8}
                >
                  <Text style={styles.btnSalvarTexto}>Salvar Movimentação</Text>
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
  tabelaContainer: { backgroundColor: '#ffffff', borderRadius: 8, overflow: 'hidden', minWidth: 900 },
  tabelaHeader: { 
    flexDirection: 'row', 
    backgroundColor: '#f8f9fa', 
    paddingVertical: 12, 
    paddingHorizontal: 10, 
    borderBottomWidth: 1, 
    borderBottomColor: '#dee2e6',
    alignItems: 'center'
  },
  thText: { fontWeight: 'bold', color: '#495057', fontSize: 13, textAlign: 'center' },
  tabelaRow: { 
    flexDirection: 'row', 
    paddingVertical: 12, 
    paddingHorizontal: 10, 
    borderBottomWidth: 1, 
    borderBottomColor: '#f1f3f5',
    alignItems: 'center',
    backgroundColor: '#ffffff'
  },
  tdText: { color: '#212529', fontSize: 13, textAlign: 'center' },
  tdTextBold: { fontWeight: 'bold', color: '#6c757d', fontSize: 13, textAlign: 'center' },
  tdTextMuted: { color: '#6c757d', fontSize: 12, textAlign: 'left', paddingLeft: 5 },
  badgeContainer: {
    backgroundColor: '#6c757d',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: { color: '#ffffff', fontSize: 12, fontWeight: 'bold' },
  btnFoto: { 
    backgroundColor: '#0d6efd', 
    paddingVertical: 6, 
    paddingHorizontal: 12, 
    borderRadius: 4,
    alignItems: 'center'
  },
  btnFotoTexto: { color: '#ffffff', fontWeight: 'bold', fontSize: 12 },
  formCard: { backgroundColor: '#ffffff', borderRadius: 8, padding: 20 },
  inputGroup: { marginBottom: 15 },
  label: { fontWeight: 'bold', color: '#6c757d', fontSize: 14, marginBottom: 6 },
  input: {
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    backgroundColor: '#fff',
    color: '#000',
  },
  tipoRow: { flexDirection: 'row', justifyContent: 'space-between' },
  tipoBtn: {
    flex: 1,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 6,
    alignItems: 'center',
    marginHorizontal: 4,
    backgroundColor: '#f8f9fa',
  },
  tipoBtnAtivo: {
    backgroundColor: 'rgb(8, 69, 201)',
    borderColor: 'rgb(8, 69, 201)',
  },
  tipoTexto: { color: '#6c757d', fontWeight: 'bold', fontSize: 14 },
  tipoTextoAtivo: { color: '#ffffff' },
  buttonContainer: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginTop: 15 
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
  btnSalvarTexto: { color: '#ffffff', fontWeight: 'bold', fontSize: 13 }
});