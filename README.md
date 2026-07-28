
# 📚 Lion School

> Projeto desenvolvido para consumo de uma API REST, permitindo a visualização de cursos e alunos da instituição Lion School.

---

# 📌 Índice

* Sobre o Projeto
* Objetivo
* Funcionalidades
* Layout
* Tecnologias
* Estrutura do Projeto
* Como Executar
* API Utilizada
* Aprendizados
* Melhorias Futuras
* Autor
* Licença

---

# 📖 Sobre o Projeto

O **Lion School** é uma aplicação web desenvolvida com HTML, CSS e JavaScript que realiza o consumo de uma API REST para exibir informações sobre cursos e alunos.

A aplicação permite selecionar um curso, listar seus respectivos alunos e identificar visualmente sua situação acadêmica, tornando a navegação simples, intuitiva e responsiva.

---

# 🎯 Objetivo

Este projeto foi desenvolvido com o objetivo de praticar:

* Consumo de APIs REST utilizando `fetch()`;
* Manipulação do DOM;
* Programação assíncrona com JavaScript;
* Organização de projetos Front-end;
* Responsividade;
* Versionamento utilizando Git e GitHub.

---

# ✨ Funcionalidades

✅ Listagem automática dos cursos disponíveis.

✅ Exibição dos alunos pertencentes ao curso selecionado.

✅ Identificação do status do aluno:

* Cursando
* Finalizado

✅ Interface totalmente responsiva.

✅ Consumo de dados em tempo real.

---

# 🖥️ Layout

### Tela Inicial

Escolha do curso para gerenciamento dos alunos.

### Tela de Alunos

Visualização de todos os alunos do curso escolhido.

> **Sugestão:** adicione capturas de tela do projeto nesta seção.

Exemplo:

```text
📷 img/home.png

📷 img/alunos.png
```

---

# 🚀 Tecnologias Utilizadas

* HTML5
* CSS3
* JavaScript (ES6)
* API REST
* Git
* GitHub
* Visual Studio Code

---

# 📂 Estrutura do Projeto

```text
│
├── 📁 img
│   ├── back.png
│   ├── code.png
│   ├── devices.png
│   ├── facebook.png
│   ├── instagram.png
│   ├── location.png
│   ├── logo.png
│   ├── phone.png
│   ├── redes.png
│   ├── studant.png
│   ├── twitter.png
│   └── youtube.png
│
├── app.js
├── index.html
├── style.css
└── README.md
```

---

# ▶️ Como Executar

## 1. Clone o repositório

```bash
git clone https://github.com/SEU-USUARIO/lion-school.git
```

## 2. Entre na pasta

```bash
cd lion-school
```

## 3. Abra no VS Code

```bash
code .
```

## 4. Execute

Abra o arquivo **index.html** utilizando a extensão **Live Server**.

---

# 🌐 API Utilizada

Base URL:

```text
https://lion-school-phbo.onrender.com
```

Endpoints utilizados:

```http
GET /cursos
```

Retorna todos os cursos.

```http
GET /alunos?curso=SIGLA
```

Retorna os alunos do curso selecionado.

```http
GET /alunos/1
```
Detalhes de um aluno específico pelo ID

---

# 📚 Aprendizados

Durante o desenvolvimento deste projeto foram praticados conhecimentos como:

* Requisições HTTP
* JSON
* Async/Await
* Fetch API
* Eventos JavaScript
* Manipulação do DOM
* Responsividade
* Organização de arquivos
* Consumo de APIs

---

# 🔮 Melhorias Futuras

* Pesquisa de alunos.
* Filtro por status.
* Página individual do aluno.
* Dark Mode.
* Animações utilizando CSS.
* Deploy da aplicação.

---

# 👨‍💻 Autor

[Gabriel Sousa Rodrigues de Melo](https://www.linkedin.com/in/gabriell-sousa/)

Estudante de **Análise e Desenvolvimento de Sistemas**.

---

# 📄 Licença

Projeto desenvolvido exclusivamente para fins educacionais.
