# Hotel Glen's Vago - Frontend

Frontend moderno e responsivo para o sistema de login e cadastro do Hotel Glen's Vago.

## 🚀 Funcionalidades

- ✅ **Página de Login** - Autenticação segura com JWT
- ✅ **Página de Cadastro** - Formulário completo com validações
- ✅ **Dashboard** - Área do usuário logado
- ✅ **Design Responsivo** - Funciona em todos os dispositivos
- ✅ **Validações em Tempo Real** - Feedback imediato ao usuário
- ✅ **Notificações** - Toast messages para feedback
- ✅ **Proteção de Rotas** - Redirecionamento automático
- ✅ **Tema Moderno** - Design elegante e profissional

## 🛠️ Tecnologias

- **React 18** - Biblioteca principal
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Framework de estilos
- **React Router** - Roteamento
- **React Hook Form** - Gerenciamento de formulários
- **Axios** - Cliente HTTP
- **Lucide React** - Ícones
- **React Hot Toast** - Notificações

## 📋 Pré-requisitos

- Node.js 18+
- npm ou yarn
- Backend da API rodando

## 🚀 Instalação

1. **Instalar dependências:**
```bash
npm install
```

2. **Configurar variáveis de ambiente:**
```bash
cp env.example .env
```

3. **Configurar o arquivo .env:**
```env
# API Configuration
REACT_APP_API_URL=http://localhost:3000

# Environment
REACT_APP_ENV=development
```

4. **Executar a aplicação:**
```bash
npm start
```

A aplicação estará disponível em `http://localhost:3000`

## 📱 Páginas

### 🏠 **Home**
- Página inicial com apresentação do hotel
- Call-to-actions para login e cadastro
- Design responsivo e atrativo

### 🔐 **Login**
- Formulário de autenticação
- Validação de email e senha
- Lembrar de mim
- Link para cadastro

### 📝 **Cadastro**
- Formulário completo de registro
- Validações em tempo real
- Formatação automática de CPF e telefone
- Campos opcionais

### 👤 **Dashboard**
- Área do usuário logado
- Informações do perfil
- Ações rápidas
- Status da conta

## 🎨 Design System

### **Cores**
- **Primary**: Azul elegante (#0ea5e9)
- **Secondary**: Cinza neutro (#64748b)
- **Accent**: Laranja quente (#f2760a)

### **Componentes**
- **Button**: Múltiplas variantes e tamanhos
- **Input**: Com ícones e validação
- **Card**: Container elegante
- **Header**: Navegação responsiva

### **Animações**
- Fade in suave
- Slide up para elementos
- Loading states
- Hover effects

## 🔒 Segurança

- **Autenticação JWT** - Tokens seguros
- **Proteção de Rotas** - Redirecionamento automático
- **Validação de Dados** - Client e server-side
- **Sanitização** - Prevenção de XSS
- **Rate Limiting** - Proteção contra spam

## 📱 Responsividade

- **Mobile First** - Design otimizado para mobile
- **Breakpoints** - sm, md, lg, xl
- **Flexbox/Grid** - Layouts flexíveis
- **Touch Friendly** - Botões e inputs otimizados

## 🧪 Validações

### **Login**
- Email obrigatório e válido
- Senha obrigatória (mín. 6 caracteres)

### **Cadastro**
- Nome: 2-100 caracteres
- CPF: Formato brasileiro válido
- Email: Formato válido e único
- Telefone: Formato brasileiro
- Endereço: Máximo 200 caracteres
- Senha: Mínimo 6 caracteres

## 🚀 Scripts Disponíveis

- `npm start` - Executar em desenvolvimento
- `npm run build` - Build para produção
- `npm test` - Executar testes
- `npm run eject` - Ejetar configurações

## 📁 Estrutura do Projeto

```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── ui/           # Componentes base
│   │   └── Header.tsx    # Cabeçalho
│   ├── contexts/
│   │   └── AuthContext.tsx # Contexto de autenticação
│   ├── pages/
│   │   ├── Home.tsx      # Página inicial
│   │   ├── Login.tsx    # Página de login
│   │   ├── Register.tsx # Página de cadastro
│   │   └── Dashboard.tsx # Dashboard do usuário
│   ├── services/
│   │   └── api.ts        # Cliente HTTP
│   ├── types/
│   │   └── auth.ts       # Tipos TypeScript
│   ├── utils/
│   │   └── cn.ts         # Utilitários
│   ├── App.tsx           # Componente principal
│   ├── index.tsx         # Ponto de entrada
│   └── index.css         # Estilos globais
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── README.md
```

## 🔧 Configuração do Backend

Certifique-se de que o backend está rodando na porta 3000:

```bash
cd ../backend
npm install
npm run dev
```

## 🎯 Funcionalidades Futuras

- [ ] Edição de perfil
- [ ] Recuperação de senha
- [ ] Verificação de email
- [ ] Sistema de reservas
- [ ] Notificações push
- [ ] Tema escuro
- [ ] PWA (Progressive Web App)

## 📞 Suporte

Para dúvidas ou problemas, entre em contato com a equipe de desenvolvimento.

---

**Hotel Glen's Vago** - Sua experiência de hospitalidade começa aqui! 🏨✨



