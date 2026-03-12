# 🌙 Lunaris - Sistema de Gestão Educacional

Sistema completo de gestão educacional com módulos para administração, professores e alunos.

## 📋 Sobre o Projeto

Lunaris é uma plataforma web moderna para gestão educacional que oferece funcionalidades completas para três perfis de usuários:

- **👨‍💼 Administradores**: Gestão de alunos, funcionários e análise de desempenho geral
- **👨‍🏫 Professores**: Acompanhamento de turmas, lançamento de notas e avaliação de desempenho
- **👨‍🎓 Alunos**: Dashboard personalizado, fórum, acesso a matérias e acompanhamento de desempenho

## 🚀 Tecnologias

- **React 18** - Biblioteca JavaScript para interfaces
- **Vite** - Build tool e dev server
- **Axios** - Cliente HTTP para comunicação com API
- **React Router** - Navegação entre páginas
- **CSS Modules** - Estilização componentizada

## 📁 Estrutura do Projeto

```
lunaris-frontend/
├── src/
│   ├── assets/              # Imagens, ícones e recursos estáticos
│   ├── components/          # Componentes reutilizáveis
│   │   ├── AlunoBox/        # Card de aluno
│   │   ├── Button/          # Botões customizados
│   │   ├── Loading/         # Componente de loading
│   │   ├── Search/          # Barra de pesquisa
│   │   ├── Select/          # Select customizado
│   │   ├── Sidebar/         # Sidebars por perfil
│   │   └── TextInput/       # Input de texto
│   ├── features/            # Features por domínio
│   │   ├── admin/           # Módulo administrativo
│   │   ├── auth/            # Autenticação
│   │   ├── student/         # Módulo do aluno
│   │   ├── teacher/         # Módulo do professor
│   │   └── landing/         # Landing page
│   ├── services/            # Camada de API
│   ├── hooks/               # Custom React Hooks
│   ├── utils/               # Funções utilitárias
│   ├── constants/           # Constantes da aplicação
│   └── styles/              # Estilos globais
├── docs/                    # Documentação
└── public/                  # Arquivos públicos
```

Para mais detalhes sobre a estrutura, veja [STRUCTURE.md](./docs/STRUCTURE.md)

## 🛠️ Instalação

### Pré-requisitos

- Node.js 18+ 
- npm ou yarn

### Passo a passo

1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/lunaris-frontend.git
cd lunaris-frontend
```

2. Instale as dependências
```bash
npm install
```

3. Configure as variáveis de ambiente
```bash
cp .env.example .env
```
Edite o arquivo `.env` com suas configurações:
```env
VITE_API_URL=http://localhost:8080/api
```

4. Inicie o servidor de desenvolvimento
```bash
npm run dev
```

O projeto estará rodando em `http://localhost:5173`

## 📜 Scripts Disponíveis

```bash
npm run dev          # Inicia o servidor de desenvolvimento
npm run build        # Gera build de produção
npm run preview      # Preview do build de produção
npm run lint         # Executa o linter
```

## 🎯 Funcionalidades

### Módulo Administrativo
- ✅ Gestão completa de alunos
- ✅ Cadastro e gerenciamento de funcionários
- ✅ Análise de desempenho geral
- ✅ Cadastro de disciplinas

### Módulo do Professor
- ✅ Visualização de alunos por turma
- ✅ Lançamento de notas
- ✅ Acompanhamento de desempenho
- ✅ Gestão de perfil

### Módulo do Aluno
- ✅ Dashboard personalizado
- ✅ Fórum de discussões
- ✅ Acesso a matérias
- ✅ Visualização de desempenho
- ✅ Perfil do aluno

### Autenticação
- ✅ Login seguro
- ✅ Cadastro de novos usuários
- ✅ Gerenciamento de sessão

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👥 Equipe

Desenvolvido com ❤️ pela equipe Lunaris
- Beatriz
- Breno
- Clara
- Giulia
- Isabela
- Maria Eduarda

## 📞 Contato

Para dúvidas ou sugestões, entre em contato:
- Email: lunaris.school@gmail.com

---

⭐ Se este projeto foi útil para você, considere dar uma estrela!