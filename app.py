from flask import Flask, render_template, redirect, url_for, request
import mysql.connector
import bcrypt 

app = Flask(__name__)


def obter_conexao():
    return mysql.connector.connect(
        host='localhost',
        port=3306,
        user='root',
        password='',
        database='almoxarifado'
    )

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/home", methods=['POST', 'GET'])
def home():
    conexao = obter_conexao()
    cursor = conexao.cursor()

   
    if request.method == 'GET':
        cursor.execute("SELECT * FROM estoque;")
        resultado = cursor.fetchall()
        
        cursor.close()
        conexao.close()
        return render_template("home.html", resultado=resultado)

  
    else:
        usuario = request.form.get("usuario")
        senha = request.form.get("senha")

        cursor.execute(
            "SELECT usuario, senha FROM usuarios WHERE usuario=%s",
            (usuario,)
        )
        resultado = cursor.fetchone()

  
        if resultado is None:
            cursor.close()
            conexao.close()
            return render_template("index_invalido.html")

        print(resultado[1])
       
        senha_correta = bcrypt.checkpw(
            senha.encode("utf-8"),
            resultado[1].encode("utf-8")
        )
        
        print(senha_correta)
       
        if not senha_correta:
            cursor.close()
            conexao.close()
            return render_template("index_invalido.html")

       
        cursor.execute("SELECT * FROM estoque")
        produtos = cursor.fetchall()

        cursor.close()
        conexao.close()
        return render_template("home.html", resultado=produtos)


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


if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0')