import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Image, 
  ScrollView, 
  TouchableOpacity, 
  ImageBackground,
  Alert 
} from 'react-native';

const API_URL = "http://10.154.20.69:5000";

export default function Home({ route, navigation }) {
  const [resultado, setResultado] = useState([]);
  const papel = route.params?.papel || 'usuario';
  const usuario = route.params?.usuario || 'Convidado';

  useEffect(() => {
    carregarEstoque();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      carregarEstoque();
    });
    return unsubscribe;
  }, [navigation]);

  const carregarEstoque = async () => {
    try {
      const resposta = await fetch(`${API_URL}/api/estoque`);
      const dados = await resposta.json();
      
      if (resposta.ok && Array.isArray(dados)) {
        setResultado(dados);
      } else {
        console.error("Erro ao carregar estoque:", dados);
      }
    } catch (erro) {
      console.error("Erro de conexão:", erro);
      Alert.alert("Erro", "Não foi possível conectar ao servidor para carregar o estoque.");
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
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        
        <View style={styles.headerContainer}>
          <Image 
            source={require('../assets/logo_senai.png')} 
            style={styles.logoSenai}
            resizeMode="contain"
          />
          
        </View>

        {/* Barra de Navegação */}
        <View style={styles.navButtonsContainer}>
          <TouchableOpacity 
            style={styles.navButton} 
            onPress={() => navigation.navigate('Movimentacoes')}
          >
            <Text style={styles.navButtonText}>Movimentações</Text>
          </TouchableOpacity>

          {/* Botão de Cadastrar Item visível para TODOS */}
          <TouchableOpacity 
            style={styles.navButton} 
            onPress={() => navigation.navigate('CadastrarItem')}
          >
            <Text style={styles.navButtonText}>Cadastrar Item</Text>
          </TouchableOpacity>

          {/* Botão de Cadastrar Usuário restrito apenas a admins */}
          {papel === 'admin' && (
            <TouchableOpacity 
              style={styles.navButton} 
              onPress={() => navigation.navigate('CadastrarUsuario')}
            >
              <Text style={styles.navButtonText}>Cadastrar Usuário</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity 
            style={[styles.navButton, { backgroundColor: '#dc3545' }]} 
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.navButtonText}>Sair</Text>
          </TouchableOpacity>
        </View>

        {/* Tabela de Produtos / Estoque Atual */}
        <View style={styles.caixaTabela}>
          <Text style={styles.tituloTabela}>Últimos Produtos</Text>

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

      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bodyHome: { flex: 1, width: '100%', height: '100%', backgroundColor: '#f8f9fa' },
  backgroundImage: { resizeMode: 'cover' },
  scrollContainer: { paddingBottom: 40, paddingTop: 30 },
  headerContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginBottom: 15 },
  logoSenai: { width: 150, height: 40 },
  userInfo: { alignItems: 'flex-end' },
  welcomeText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  roleText: { color: '#ddd', fontSize: 13 },
  navButtonsContainer: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    justifyContent: 'center', 
    gap: 8, 
    paddingHorizontal: 20, 
    marginBottom: 15 
  },
  navButton: { 
    backgroundColor: 'rgb(8, 69, 201)', 
    paddingVertical: 10, 
    paddingHorizontal: 12, 
    borderRadius: 6,
    marginBottom: 5
  },
  navButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 12, textAlign: 'center' },
  caixaTabela: {
    backgroundColor: '#f58427',
    marginTop: 10,
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
});