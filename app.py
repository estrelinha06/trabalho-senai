from flask import Flask, render_template, redirect, url_for, request, session, jsonify
import mysql.connector
import bcrypt 

app = Flask(__name__)
app.secret_key = 'sua_chave_secreta_aqui'

def obter_conexao():
    return mysql.connector.connect(
        host='db',
        port=3306,
        user='root',
        password='mysql_root',
        database='almoxarifado'
    )

@app.route("/")
def index():
    
    session.clear()
    return render_template("index.html")

@app.route("/home", methods=['POST', 'GET'])
def home():
    conexao = obter_conexao()
    cursor = conexao.cursor()
       
    if request.method == 'GET':
        if 'usuario' not in session:
            cursor.close()
            conexao.close()
            return redirect(url_for('index'))
            
        cursor.execute("SELECT * FROM estoque;")
        resultado = cursor.fetchall()
        
        cursor.close()
        conexao.close()
        return render_template("home.html", resultado=resultado, papel=session.get('papel'))
    
    else:
        usuario = request.form.get("usuario")
        senha = request.form.get("senha")

        
        cursor.execute(
            "SELECT usuario, senha, papel FROM usuarios WHERE usuario=%s",
            (usuario,)
        )
        resultado = cursor.fetchall()
 
        if not resultado:
            cursor.close()
            conexao.close()
            return render_template("index_invalido.html")
       
        senha_correta = bcrypt.checkpw(
            senha.encode("utf-8"),
            resultado[0][1].encode("utf-8")
        )
        
        if not senha_correta:
            conexao.close()
            return render_template("index_invalido.html")
        else:
        
            session['usuario'] = resultado[0][0]
            session['papel'] = resultado[0][2]
            
            cursor.execute("SELECT * FROM estoque")
            produtos = cursor.fetchall()
            
            cursor.close()
            conexao.close()
            return render_template("home.html", resultado=produtos, papel=session['papel'])


@app.route("/cadastrarnovoitem")
def cadastrarnovoitem():
    return render_template("cadastrarnovoitem.html")


@app.route("/salvaritem", methods=['POST', 'GET'])
def salvaritem():



    if request.method == 'POST':
        nome_produto = request.form.get('nome')
        qtde = request.form.get('quantidade')
        estoque_min = request.form.get('estoque_minimo')
        preco = request.form.get('preco')
        categoria = request.form.get('categoria')
        id = request.form.get('id')
        foto = request.form.get('imagem')
        descricao = request.form.get('descricao')

        conexao = obter_conexao()
        cursor = conexao.cursor()
        
        query = "INSERT INTO estoque (id, nome_do_produto, categoria, descricao, qtde, preco, foto, estoque_min) VALUES (%s, %s, %s, %s, %s, %s, %s, %s);"
        valores = (id, nome_produto, categoria, descricao, qtde, preco, foto, estoque_min)
        cursor.execute(query, valores)
        conexao.commit()
        
        cursor.close()
        conexao.close()

    return redirect(url_for('home'))


@app.route("/salvarusuario", methods=['POST', 'GET'])
def salvarusuario():
    if request.method == 'POST':
        usuario = request.form.get('usuario')
        senha = request.form.get('senha')
        papel = request.form.get('papel')
        
        
        senha_criptografada = bcrypt.hashpw(senha.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
       
        conexao = obter_conexao()
        cursor = conexao.cursor()
        
        query = "INSERT INTO usuarios (usuario, senha, papel) VALUES (%s, %s, %s);"
        valores = (usuario, senha_criptografada, papel)
        cursor.execute(query, valores)
        conexao.commit()
        
        cursor.close()
        conexao.close()

    return redirect(url_for('index'))


@app.route("/cadastrarusuario")
def cadastrarusuario():
    if session.get('papel') != 'admin':
        return redirect(url_for('home'))
    return render_template("cadastrarusuario.html")


@app.route("/movimentacoes")
def movimentacoes():
    conexao = obter_conexao()
    cursor = conexao.cursor()
    
    cursor.execute("SELECT * FROM estoque;")
    resultado = cursor.fetchall()
    
    cursor.close()
    conexao.close()
    return render_template("movimentacoes.html", resultado=resultado)


@app.route("/registrarmovimentacao", methods=['POST', 'GET'])
def registrarmovimentacao():
    if request.method == 'POST':
        produto = request.form.get('produto')
        tipo_movimentacao = request.form.get('tipo_movimentacao')
        qtde = int(request.form.get('quantidade'))
       
        conexao = obter_conexao()
        cursor = conexao.cursor()
        
        query = "SELECT qtde FROM estoque WHERE nome_do_produto = %s;"
        valores = (produto,)
        cursor.execute(query, valores)
        
        resultado_busca = cursor.fetchone()
        if resultado_busca:
            qtde_banco = int(resultado_busca[0])
            
            if tipo_movimentacao == "Entrada":
                qtde = qtde_banco + qtde
            elif tipo_movimentacao == "Saida":
                qtde = qtde_banco - qtde
            
            query = "UPDATE estoque SET qtde = %s WHERE nome_do_produto = %s;"
            valores = (qtde, produto)
            cursor.execute(query, valores)     
            conexao.commit()
        
        cursor.close()
        conexao.close()

    return redirect(url_for('home'))




#api


@app.route('/api/salvaritem', methods=['POST'])
def api_salvaritem():

    dados = request.get_json()

    id = dados.get('id')
    nome_do_produto = dados.get('nome_do_produto')
    categoria = dados.get('categoria')
    descricao = dados.get('descricao')
    qtde = dados.get('qtde')
    preco = dados.get('preco')
    foto = dados.get('foto')
    estoque_min = dados.get('estoque_min')
   
    item = (id, nome_do_produto, categoria, descricao, qtde, preco, foto, estoque_min)
    query = "INSERT INTO estoque (id, nome_do_produto, categoria, descricao, qtde, preco, foto, estoque_min) VALUES (%s, %s, %s, %s, %s, %s, %s, %s);"
        
        
    con = mysql.connector.connect(
        host='db',
        database='almoxarifado',
        user='root',
        password='mysql_root',
        port=3306
        
    )

    cursor = con.cursor()
    cursor.execute(query, item)
    con.commit()


    return jsonify({"status": "sucesso", "mensagem": "item inserido com sucesso!"}), 201


@app.route("/api/cadastrarusuario", methods=['POST'])
def api_cadastrarusuario():

    dados = request.get_json()
    
    usuario = dados.get('usuario')
    senha = dados.get('senha')
    papel = dados.get('papel')
    
    senha_criptografada = bcrypt.hashpw(senha.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
    
    conexao = obter_conexao()
    cursor = conexao.cursor()
    
    query = "INSERT INTO usuarios (usuario, senha, papel) VALUES (%s, %s, %s);"
    valores = (usuario, senha_criptografada, papel)
    cursor.execute(query, valores)
    conexao.commit()
    
    cursor.close()
    conexao.close()

    return jsonify({"status": "sucesso", "mensagem": "usuario cadastrado com sucesso!"}), 201


@app.route("/api/estoque", methods=['GET'])
def api_movimentacoes():

    
    con = mysql.connector.connect(
                host='db',
                database='almoxarifado',
                user='root',
                password='mysql_root',
                port=3306
                
            )
        
    cursor = con.cursor()
    cursor.execute("SELECT * FROM estoque;")
    resultado = cursor.fetchall()
    con.commit()


    lista_produtos = []
    for row in resultado:
        produto = {
            "ID": row[0],
            "Item": row[1],
            "Categoria": row[2],
            "Descricao": row[3],
            "quantidade": row[4],
            "Preço": float(row[5]),
            "foto": row[6],
            "estoque_min": row[7]
        }
        lista_produtos.append(produto)

    return jsonify(lista_produtos), 201


if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0')
