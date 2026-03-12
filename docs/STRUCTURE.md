# 📁 Estrutura do Projeto

## 🏗️ Organização

```
lunaris-frontend/
├── src/
│   ├── assets/              # Imagens, ícones e recursos estáticos
│   ├── components/          # Componentes reutilizáveis
│   │   ├── AlunoBox/
│   │   ├── Button/
│   │   ├── Loading/
│   │   ├── Search/
│   │   ├── Select/
│   │   ├── Sidebar/
│   │   └── TextInput/
│   ├── features/            # Features organizadas por domínio
│   │   ├── admin/           # Módulo Administrativo
│   │   │   ├── students/    # Gestão de alunos
│   │   │   ├── employees/   # Gestão de funcionários
│   │   │   └── performance/ # Desempenho geral
│   │   ├── auth/            # Autenticação
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── student/         # Módulo do Aluno
│   │   │   ├── dashboard/
│   │   │   ├── forum/
│   │   │   ├── subjects/
│   │   │   ├── profile/
│   │   │   └── performance/
│   │   ├── teacher/         # Módulo do Professor
│   │   │   ├── students/
│   │   │   ├── grades/
│   │   │   ├── performance/
│   │   │   └── profile/
│   │   └── landing/         # Landing Page
│   ├── services/            # Camada de API/Serviços
│   ├── App.jsx              # Componente principal
│   └── main.jsx             # Entry point
├── index.html
├── package.json
└── vite.config.js
```

## 📋 Padrões de Nomenclatura

### Pastas
- **kebab-case** para pastas de features: `admin/`, `auth/`, `student/`
- **PascalCase** para pastas de componentes: `Button/`, `Sidebar/`

### Arquivos
- **PascalCase** para componentes React: `Login.jsx`, `Dashboard.jsx`
- **camelCase** para serviços: `authService.js`, `studentService.js`
- **kebab-case** para CSS modules (se necessário): `component-name.module.css`

### Componentes
- Um componente = uma pasta com seus arquivos relacionados
- Exemplo: `Button/` contém `Button.jsx` e `Button.css`

## 🎯 Princípios

1. **Separação por domínio** - Features organizadas por contexto de negócio
2. **Coesão** - Arquivos relacionados ficam juntos
3. **Reutilização** - Componentes compartilhados em `/components`
4. **Escalabilidade** - Estrutura que cresce de forma organizada
