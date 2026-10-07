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

export default function Movimentacoes({ navigation }) {
  // Lista simulada de movimentações/estoque (equivalente ao loop do backend)
  const [resultado, setResultado] = useState([
    [1, 'Produto Exemplo 1', 'Entrada', 10, '10 un', 'Descrição do primeiro produto registrado no sistema.'],
    [2, 'Produto Exemplo 2', 'Saída', 5, '5 un', 'Descrição do segundo produto registrado no sistema.']
  ]);

  // Estados do formulário de nova movimentação
  const [produto, setProduto] = useState('');
  const [tipoMovimentacao, setTipoMovimentacao] = useState('Entrada');
  const [quantidade, setQuantidade] = useState('');

  const handleSalvarMovimentacao = () => {
    if (!produto || !quantidade) {
      Alert.alert("Erro", "Por favor, preencha todos os campos obrigatórios.");
      return;
    }
    Alert.alert("Sucesso", "Movimentação registrada com sucesso!");
    // Limpar campos ou atualizar lista se necessário
    setProduto('');
    setQuantidade('');
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
          
          {/* Logo do Senai alinhada à esquerda igual às outras telas */}
          <View style={styles.logoContainer}>
            <Image 
              source={require('../assets/logo_senai.png')} 
              style={styles.logoSenai}
              resizeMode="contain"
            />
          </View>

          {/* Barra de Navegação (Voltar) */}
          <View style={styles.caixaNavbar}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.navLink}>Voltar</Text>
            </TouchableOpacity>
          </View>

          {/* Seção 1: Tabela de Estoque / Movimentações */}
          <View style={styles.caixaTabela}>
            <Text style={styles.tituloTabela}>Estoque</Text>

            <View style={styles.tabelaContainer}>
              {/* Cabeçalho da Tabela */}
              <View style={styles.tabelaHeader}>
                <Text style={[styles.thText, { flex: 1 }]}>ID Reg.</Text>
                <Text style={[styles.thText, { flex: 2 }]}>Produto</Text>
                <Text style={[styles.thText, { flex: 1.5 }]}>Quantidade</Text>
                <Text style={[styles.thText, { flex: 3 }]}>Descrição</Text>
              </View>

              {/* Linhas da Tabela */}
              {resultado.map((movimento, index) => (
                <View key={index} style={styles.tabelaRow}>
                  <Text style={[styles.tdTextBold, { flex: 1 }]}>{movimento[0]}</Text>
                  <Text style={[styles.tdText, { flex: 2 }]}>{movimento[1]}</Text>
                  <Text style={[styles.tdTextBold, { flex: 1.5 }]}>{movimento[4]}</Text>
                  <Text style={[styles.tdTextMuted, { flex: 3 }]} numberOfLines={2}>{movimento[5]}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Seção 2: Formulário para Lançar Nova Movimentação */}
          <View style={[styles.caixaTabela, { marginBottom: 40 }]}>
            <Text style={styles.tituloTabela}>Lançar Nova Movimentação</Text>

            <View style={styles.formCard}>
              
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Nome do Produto</Text>
                <TextInput
                  style={styles.input}
                  value={produto}
                  onChangeText={setProduto}
                  placeholder="Digite o nome"
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
  
  // Estilização da Tabela em React Native
  tabelaContainer: { backgroundColor: '#ffffff', borderRadius: 8, overflow: 'hidden' },
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
    alignItems: 'center'
  },
  tdText: { color: '#212529', fontSize: 13, textAlign: 'center' },
  tdTextBold: { fontWeight: 'bold', color: '#6c757d', fontSize: 13, textAlign: 'center' },
  tdTextMuted: { color: '#6c757d', fontSize: 12, textAlign: 'left' },

  // Formulário
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
  btnSalvarTexto: { color: '#ffffff', fontWeight: 'bold', fontSize: 13 },
});