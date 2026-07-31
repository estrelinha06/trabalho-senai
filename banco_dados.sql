create database almoxarifado;

use almoxarifado;

CREATE TABLE usuarios( 
    usuario VARCHAR(255), 
    senha VARCHAR(255),
    papel VARCHAR(255)
	);
    
CREATE TABLE estoque(
	id INT, 
    nome_do_produto VARCHAR(255), 
    categoria VARCHAR(255),
    descricao VARCHAR(255),
    qtde INT,
    preco DECIMAL (10, 2),
    foto VARCHAR(255),
    estoque_min INT
    );
    
INSERT INTO usuarios (usuario, senha, papel)
VALUES ('admin', '12345', 'admin');

INSERT INTO usuarios (usuario, papel, senha)
VALUES ('clara', 'usuario', '$2a$12$9zHvufS3L9QQX6XN7/MGT.pZiUuL2Mao4f/9LPmB.W07C0LisZDV2');


INSERT INTO estoque (id, nome_do_produto, categoria, descricao, qtde, preco, foto, estoque_min)
VALUES (1, "Chave Fenda", "ferramenta", "Serve pra apertar parafuso", 20, 10.90,"https://static.martineliferramentas.com.br/image/cache/catalog/2021/produtos/todas-as-categorias/ferramentas-manuais/chave-de-fenda/chave-de-fenda-cruzada-phillips-14-x-12-gedore-036284_1-1000x1000.webp", 10);

INSERT INTO estoque (id, nome_do_produto, categoria, descricao, qtde, preco, foto, estoque_min)
VALUES (2, "Alicate", "ferramenta", "Serve pra cortar fio", 5, 50.90,"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPCmBLDjwtQzbiNdstY7XNPFo9o0E06DMy5fC1YOyMS5ppMQzvHO1yZFI&s=10", 10);

INSERT INTO estoque (id, nome_do_produto, categoria, descricao, qtde, preco, foto, estoque_min)
VALUES (3, "Martelo", "ferramenta", "Serve pra bater", 43, 40.53,"https://eletrorastro.fbitsstatic.net/img/p/martelo-unha-27mm-vonder-80167/267270.jpg?w=800&h=800&v=no-value", 10);

INSERT INTO estoque (id, nome_do_produto, categoria, descricao, qtde, preco, foto, estoque_min)
VALUES (4, "Fita isolante", "insumos", "Serve pra isolar", 100, 5.49, "https://www.eletropartscomponentes.com.br/wp-content/uploads/2016/05/fita_isolante_legrand.jpg", 100);

INSERT INTO estoque (id, nome_do_produto, categoria, descricao, qtde, preco, foto, estoque_min)
VALUES (5, "Cabo eletrico", "insumos", "Serve pra conduzir energia", 10, 99.49, "https://lojaartech.cdn.magazord.com.br/img/2021/07/produto/4091/verde-site.jpg", 6);


select * from usuarios;
select * from estoque;

SELECT qtde FROM estoque WHERE nome_do_produto = 'Alicate';
UPDATE estoque SET qtde = 12 WHERE nome_do_produto = 'Chave Fenda';

INSERT INTO usuarios (usuario, senha, papel)
VALUES ('luiza', 'luiza', 'admin');

DELETE FROM usuarios WHERE usuario = '';

INSERT INTO usuarios (usuario, senha, papel)
VALUES ('marcos', '$2a$12$QCbbakFUnfiru.DuOVtoa.bXQBMZ1/M4C3437RQp0aCDo5uxIR0Eq', 'usuario');

INSERT INTO usuarios (usuario, senha, papel)
VALUES ('jorge', '$2a$12$QCbbakFUnfiru.DuOVtoa.bXQBMZ1/M4C3437RQp0aCDo5uxIR0Eq', 'admin');