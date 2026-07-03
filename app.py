from flask import Flask, render_template, redirect, url_for, request
import mysql.connector

app = Flask(__name__)

@app.route("/")
def index():
     return render_template("index.html")

@app.route("/home", methods=['POST', 'GET'])
def home():

     conexao = mysql.connector.connect(
          host = 'localhost',
          port = 3306,
          user = 'root',
          password = '',
          database = 'almoxarifado'
     )

     cursor = conexao.cursor()
     cursor.execute("select * from estoque;")
     resultado = cursor.fetchall()

     return render_template("home.html", resultado = resultado)

@app.route("/cadastrarnovoitem")
def cadastrarnovoitem():
     return render_template("cadastrarnovoitem.html")

@app.route("/salvaritem", methods=['POST', 'GET'])
def salvaritem():

     nome_produto = request.form.get('nome')
     qtde = request.form.get('quantidade')
     estoque_min = request.form.get('estoque_minimo')
     preco = request.form.get('preco')
     categoria = request.form.get('categoria')
     id = request.form.get('id')
     foto = request.form.get('imagem')
     descricao = request.form.get('descricao')

     conexao = mysql.connector.connect(
          host = 'localhost',
          port = 3306,
          user = 'root',
          password = '',
          database = 'almoxarifado'
     )
     cursor = conexao.cursor()
     query = "INSERT INTO estoque (id, nome_do_produto, categoria, descricao, qtde, preco, foto, estoque_min) VALUES (%s, %s, %s, %s, %s, %s, %s, %s);"
     valores = (id, nome_produto, categoria, descricao, qtde, preco, foto, estoque_min)
     cursor.execute(query, valores)
     conexao.commit()

     return redirect(url_for('home'))

@app.route("/salvarusuario", methods=['POST', 'GET'])
def salvarusuario():
     
     usuario = request.form.get('usuario')
     senha = request.form.get('senha')
     papel = request.form.get('papel')
    
     conexao = mysql.connector.connect(
          host = 'localhost',
          port = 3306,
          user = 'root',
          password = '',
          database = 'almoxarifado'
     )
     cursor = conexao.cursor()
     query = "INSERT INTO usuarios (usuario, senha, papel) VALUES (%s, %s, %s);"
     valores = (usuario, senha, papel)
     cursor.execute(query, valores)
     conexao.commit()

     return redirect(url_for('home'))

@app.route("/cadastrarusuario")
def cadastrarusuario():
     return render_template("cadastrarusuario.html")




if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0')