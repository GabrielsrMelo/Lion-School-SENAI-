// URL Base da sua API no Render
const API_URL = 'https://lion-school-phbo.onrender.com';

// Elementos Principais
const telaInicio = document.getElementById('tela-inicio');
const telaTurma = document.getElementById('tela-turma');
const telaAluno = document.getElementById('tela-aluno');

const tituloCurso = document.getElementById('titulo-curso');
const gridAlunos = document.getElementById('grid-alunos');
const selectStatus = document.getElementById('select-status');
const btnVoltar = document.querySelector('.sair');

// Variáveis de Controle
let telaAtual = 'inicio';
let cursoAtualId = null;

// ----------------------------------------------------
// 1. BUSCAR CURSOS DA API (Gera os botões na Tela 1)
// ----------------------------------------------------
async function carregarCursos() {
    try {
        const response = await fetch(`${API_URL}/cursos`);
        const cursos = await response.json();

        const containerBotoes = document.querySelector('.botoes-cursos');
        
        while (containerBotoes.firstChild) {
            containerBotoes.removeChild(containerBotoes.firstChild);
        }

        cursos.forEach(curso => {
            const btn = document.createElement('button');
            btn.classList.add('btn-curso');
            btn.textContent = curso.sigla;
            
            btn.addEventListener('click', () => {
                carregarAlunosPorCurso(curso.id, curso.nome);
            });

            containerBotoes.appendChild(btn);
        });
    } catch (error) {
        console.error('Erro ao buscar cursos:', error);
    }
}

// ----------------------------------------------------
// 2. BUSCAR ALUNOS DA TURMA (Com Filtro de Status)
// ----------------------------------------------------
async function carregarAlunosPorCurso(cursoId, nomeCurso, statusFiltro = 'todos') {
    try {
        cursoAtualId = cursoId;

        // Transição para a Tela de Alunos
        telaInicio.classList.add('escondido');
        telaAluno.classList.add('escondido');
        telaTurma.classList.remove('escondido');
        
        telaAtual = 'turma';
        tituloCurso.textContent = nomeCurso;
        document.querySelector('.sair span').textContent = "Voltar";

        // Limpa lista anterior
        while (gridAlunos.firstChild) {
            gridAlunos.removeChild(gridAlunos.firstChild);
        }

        // Monta a requisição com/sem filtro de status
        let url = `${API_URL}/alunos?curso_id=${cursoId}`;
        if (statusFiltro !== 'todos') {
            url += `&status=${statusFiltro}`;
        }

        const response = await fetch(url);
        const alunos = await response.json();

        // Insere cards via DOM
        alunos.forEach(aluno => {
            const card = criarCardAluno(aluno);
            gridAlunos.appendChild(card);
        });

    } catch (error) {
        console.error('Erro ao buscar alunos:', error);
    }
}

// ----------------------------------------------------
// 3. CRIAR CARD DO ALUNO (DOM Puro)
// ----------------------------------------------------
function criarCardAluno(aluno) {
    const card = document.createElement('div');
    card.classList.add('card-aluno');

    // Define cor com base no status
    if (aluno.status) {
        card.classList.add(aluno.status.toLowerCase());
    }

    const img = document.createElement('img');
    img.src = aluno.foto;
    img.alt = `Foto do aluno ${aluno.nome}`;

    const nome = document.createElement('p');
    nome.textContent = aluno.nome;

    card.appendChild(img);
    card.appendChild(nome);

    // Evento para Tela 3 (Detalhes do Aluno)
    card.addEventListener('click', () => {
        carregarDetalhesAluno(aluno.id);
    });

    return card;
}

// ----------------------------------------------------
// 4. VER DETALHES DO ALUNO (TELA 3)
// ----------------------------------------------------
async function carregarDetalhesAluno(alunoId) {
    try {
        const response = await fetch(`${API_URL}/alunos/${alunoId}`);
        const aluno = await response.json();
        
        // Alterna a exibição das telas
        telaTurma.classList.add('escondido');
        telaAluno.classList.remove('escondido');
        telaAtual = 'aluno';

        const container = document.getElementById('detalhes-aluno-container');
        
        // Limpa visualização anterior
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }

        // --- BLOCO 1: FOTO E NOME ---
        const perfilDiv = document.createElement('div');
        perfilDiv.classList.add('perfil-aluno');

        const img = document.createElement('img');
        img.src = aluno.foto;
        img.alt = `Foto de ${aluno.nome}`;

        const nome = document.createElement('h3');
        nome.textContent = aluno.nome;

        perfilDiv.appendChild(img);
        perfilDiv.appendChild(nome);

        // --- BLOCO 2: MATÉRIAS E BARRAS DE NOTAS ---
        const materiasDiv = document.createElement('div');
        materiasDiv.classList.add('materias-aluno');

        // Mapeia a lista 'desempenho' que vem da sua API
        const listaDesempenho = aluno.desempenho || [];

        listaDesempenho.forEach(item => {
            const linhaMateria = document.createElement('div');
            linhaMateria.classList.add('linha-materia');

            // Header da matéria: Sigla/Categoria e Valor/Nota
            const infoMateria = document.createElement('div');
            infoMateria.classList.add('info-materia');

            const nomeMateria = document.createElement('span');
            nomeMateria.textContent = item.categoria; // Ex: "SGP", "IP", "BD"

            const nota = document.createElement('span');
            nota.textContent = item.valor; // Ex: 85, 92

            infoMateria.appendChild(nomeMateria);
            infoMateria.appendChild(nota);

            // Container da Barra de Progresso
            const barraContainer = document.createElement('div');
            barraContainer.classList.add('barra-container');

            const barraProgresso = document.createElement('div');
            barraProgresso.classList.add('barra-progresso');
            
            // Ajusta a largura proporcional à nota (ex: 85%)
            barraProgresso.style.width = `${item.valor}%`;

            // Atribui cor baseada no valor numérico da nota
            const notaValor = Number(item.valor);
            if (notaValor >= 70) {
                barraProgresso.classList.add('aprovado');
            } else if (notaValor >= 50) {
                barraProgresso.classList.add('exame');
            } else {
                barraProgresso.classList.add('reprovado');
            }

            barraContainer.appendChild(barraProgresso);

            linhaMateria.appendChild(infoMateria);
            linhaMateria.appendChild(barraContainer);

            materiasDiv.appendChild(linhaMateria);
        });

        // Adiciona os blocos na tela
        container.appendChild(perfilDiv);
        container.appendChild(materiasDiv);

    } catch (error) {
        console.error('Erro ao carregar detalhes do aluno:', error);
    }
}

// ----------------------------------------------------
// 5. EVENTOS DO FILTRO E DO BOTÃO VOLTAR
// ----------------------------------------------------
selectStatus.addEventListener('change', (e) => {
    if (cursoAtualId) {
        carregarAlunosPorCurso(cursoAtualId, tituloCurso.textContent, e.target.value);
    }
});

btnVoltar.addEventListener('click', () => {
    if (telaAtual === 'aluno') {
        telaAluno.classList.add('escondido');
        telaTurma.classList.remove('escondido');
        telaAtual = 'turma';
    } else if (telaAtual === 'turma') {
        telaTurma.classList.add('escondido');
        telaInicio.classList.remove('escondido');
        document.querySelector('.sair span').textContent = "Sair";
        selectStatus.value = 'todos'; // Reseta o filtro
        telaAtual = 'inicio';
    }
});

// Inicialização
carregarCursos();