create database Portal_Professores;
use Portal_Professores;
 
 create table Usuario(
	id int not null primary key auto_increment,
    nivel int default(0),
    nome varchar(60),
    dt_nascimento date,
    cpf varchar(14) unique,
    email varchar(30) unique,
    senha varchar(100)
);

create table Materia(
	id int not null primary key auto_increment,
    nome varchar(20),
    descricao varchar(150),
    idProf int not null,
    foreign key (idProf) REFERENCES usuario(id)
 );

create table MateriasDoAluno (
	id int not null primary key auto_increment,
    idUsuario int not null,
    idMateria int not null,
    foreign key (idUsuario) REFERENCES Usuario(id),
    foreign key (idMateria) REFERENCES materia(id)
);

create table Postagem (
	id int not null primary key auto_increment,
    idMateria int not null,
    nome varchar(30) not null,
    conteudo varchar(200),
    tipo varchar(10) default("material"),
    foreign key (idMateria) REFERENCES Materia(id)
);

create table Notas (
	id int not null primary key auto_increment,
    idUsuario int not null,
    idPostagem int not null,
    nota numeric(4, 2) default('-1'),
    foreign key (idUsuario) REFERENCES Usuario(id),
    foreign key (idPostagem) REFERENCES Postagem(id)
);

create table Questoes (
	id int not null primary key auto_increment,
    idPostagem int not null,
    pergunta varchar(100) not null,
    idAlternativaCorreta int,
    foreign key (idPostagem) REFERENCES Postagem(id)
);

create table Alternativa (
	id int not null primary key auto_increment,
    resposta varchar(100) not null,
    idQuestoes int not null,
    foreign key (idQuestoes) REFERENCES Questoes(id)
);

ALTER TABLE Questoes ADD CONSTRAINT foreign key (idAlternativaCorreta) REFERENCES Alternativa(id) ;

/*
DELIMITER $$
CREATE FUNCTION calculaFGTS(vIDFunc INT)
	RETURNS FLOAT
	BEGIN
		DECLARE retorno FLOAT;
		SELECT salarioBruto * 0.11 INTO retorno
		FROM funcionario
		WHERE id = vIDFunc;
        
		RETURN retorno;
	END;
$$
SELECT * FROM Usuario WHERE email = "dev@dev.dev" AND nivel = 0;*/
/*DELETE FROM `portal_professores`.`materia` WHERE (`descricao` = null); 


SELECT * FROM Postagem WHERE idMateria = 1 ORDER BY id desc;*/


