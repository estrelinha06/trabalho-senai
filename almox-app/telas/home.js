import React from 'react';
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

export default function Home({ navigation }) {
  const resultado = [
    [1, 'Produto Exemplo 1', 'Eletrônicos', 'Descrição do produto 1', 10, 'R$ 150,00', 'https://via.placeholder.com/150', 5],
  ];

  const papel = 'admin'; 

  const mostrarImagem = (urlImagem) => {
    Alert.alert("Foto do Produto", `Visualizando imagem de: ${urlImagem}`);
  };

  return (
    <ImageBackground 
      source={require('../assets/fundohomesenai.jpg')} 
      style={styles.bodyHome}
      imageStyle={styles.backgroundImage}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        
        {/* Logo do Senai */}
        <View style={styles.logoContainer}>
          <Image 
            source={require('../assets/logo_senai.png')} 
            style={styles.logoSenai}
            resizeMode="contain"
          />
        </View>

        {/* Caixa Navbar */}
        <View style={styles.caixaNavbar}>
          <TouchableOpacity onPress={() => navigation?.goBack ? navigation.goBack() : null}>
            <Text style={styles.navLink}>Voltar</Text>
          </TouchableOpacity>

          {/* Botão corrigido para navegar para a tela de Movimentações */}
          <TouchableOpacity onPress={() => navigation.navigate('Movimentacoes')}>
            <Text style={styles.navLink}>Movimentações</Text>
          </TouchableOpacity>

          {papel === 'admin' && (
            <TouchableOpacity onPress={() => navigation.navigate('CadastrarUsuario')}>
              <Text style={styles.navLink}>Cadastrar Usuário</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Caixa Tabela / Conteúdo */}
        <View style={styles.caixaTabela}>
          <View style={styles.headerTabelaContainer}>
            <Text style={styles.tituloTabela}>Últimos Produtos</Text>
            <TouchableOpacity 
              style={styles.btnCadastrarNovo} 
              onPress={() => navigation.navigate('CadastrarItem')}
              activeOpacity={0.8}
            >
              <Text style={styles.btnCadastrarTexto}>Cadastrar Novo Item</Text>
            </TouchableOpacity>
          </View>

          {resultado.map((item, index) => (
            <View key={index} style={styles.linhaTabela}>
              <View style={styles.colunaInfo}>
                <Text style={styles.idProduto}>ID: {item[0]}</Text>
                <Text style={styles.nomeProduto}>{item[1]}</Text>
                <Text style={styles.textoDetalhe}><Text style={styles.bold}>Categoria:</Text> {item[2]}</Text>
                <Text style={styles.textoDetalhe}><Text style={styles.bold}>Descrição:</Text> {item[3]}</Text>
                <Text style={styles.textoDetalhe}><Text style={styles.bold}>Preço:</Text> {item[5]}</Text>
                <Text style={styles.textoDetalhe}><Text style={styles.bold}>Estoque Mínimo:</Text> {item[7]}</Text>
                <View style={styles.badgeContainer}>
                  <Text style={styles.badgeText}>{item[4]} un</Text>
                </View>
              </View>

              <TouchableOpacity 
                style={styles.btnFoto} 
                onPress={() => mostrarImagem(item[6])}
                activeOpacity={0.8}
              >
                <Text style={styles.btnFotoTexto}>Foto</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bodyHome: { flex: 1, width: '100%', height: '100%' },
  backgroundImage: { resizeMode: 'cover' },
  scrollContainer: { paddingBottom: 40, paddingTop: 40 },
  logoContainer: { alignItems: 'center', marginBottom: 10 },
  logoSenai: { width: 180, height: 45 },
  caixaNavbar: {
    marginTop: 10,
    marginHorizontal: 20,
    backgroundColor: 'rgb(8, 69, 201)',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  navLink: { color: '#ffffff', fontWeight: 'bold', fontSize: 13 },
  caixaTabela: {
    backgroundColor: '#f58427',
    marginTop: 25,
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  headerTabelaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    flexWrap: 'wrap',
    gap: 10,
  },
  tituloTabela: { color: '#ffffff', fontSize: 22, fontWeight: 'bold' },
  btnCadastrarNovo: {
    backgroundColor: '#ffffff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  btnCadastrarTexto: { color: '#000000', fontWeight: 'bold', fontSize: 14 },
  linhaTabela: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  colunaInfo: { flex: 1, marginRight: 10 },
  idProduto: { fontWeight: 'bold', color: '#6c757d', fontSize: 12 },
  nomeProduto: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 4 },
  textoDetalhe: { fontSize: 14, color: '#6c757d', marginBottom: 2 },
  bold: { fontWeight: 'bold' },
  badgeContainer: {
    backgroundColor: '#6c757d',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    marginTop: 5,
  },
  badgeText: { color: '#ffffff', fontSize: 12, fontWeight: 'bold' },
  btnFoto: { backgroundColor: '#007bff', paddingVertical: 8, paddingHorizontal: 15, borderRadius: 5 },
  btnFotoTexto: { color: '#ffffff', fontWeight: 'bold', fontSize: 14 },
});