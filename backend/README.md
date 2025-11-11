# API CRUD de Usuários com Soft Delete

API RESTful completa para gerenciamento de usuários com soft delete, autenticação JWT e validações robustas.

## 🚀 Funcionalidades

- ✅ CRUD completo de usuários
- ✅ Soft Delete (exclusão lógica)
- ✅ Autenticação JWT
- ✅ Validação de CPF e Email
- ✅ Hash de senhas com bcrypt
- ✅ Rate limiting
- ✅ Middleware de segurança
- ✅ Paginação
- ✅ Restauração de usuários excluídos

## 📋 Pré-requisitos

- Node.js 18+
- PostgreSQL
- npm ou yarn

## 🛠️ Instalação

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
# Database
DATABASE_URL=postgresql://username:password@localhost:5432/database_name
DB_HOST=localhost
DB_PORT=5432
DB_NAME=your_database
DB_USER=your_username
DB_PASSWORD=your_password

# JWT
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRES_IN=7d

# Server
PORT=3000
NODE_ENV=development
```

4. **Executar migração para adicionar soft delete:**
```sql
-- Execute o arquivo database/migrations/add_soft_delete.sql no seu banco
```

5. **Executar a aplicação:**
```bash
# Desenvolvimento
npm run dev

# Produção
npm run build
npm start
```

## 📚 Endpoints da API

### 🔐 Autenticação
- `POST /api/usuarios/login` - Login do usuário

### 👥 Usuários
- `POST /api/usuarios` - Criar usuário (público)
- `GET /api/usuarios` - Listar usuários (com paginação)
- `GET /api/usuarios/:id` - Buscar usuário por ID
- `PUT /api/usuarios/:id` - Atualizar usuário (autenticado)
- `DELETE /api/usuarios/:id` - Excluir usuário (soft delete, autenticado)
- `PATCH /api/usuarios/:id/restore` - Restaurar usuário excluído (autenticado)
- `DELETE /api/usuarios/:id/hard` - Exclusão permanente (autenticado)
- `GET /api/usuarios/deleted` - Listar usuários excluídos (autenticado)

### 🏥 Health Check
- `GET /health` - Status da API

## 📝 Exemplos de Uso

### Criar Usuário
```bash
curl -X POST http://localhost:3000/api/usuarios \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "João Silva",
    "cpf": "12345678901",
    "email": "joao@email.com",
    "telefone": "11999999999",
    "endereco": "Rua das Flores, 123",
    "senha": "123456"
  }'
```

### Login
```bash
curl -X POST http://localhost:3000/api/usuarios/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "joao@email.com",
    "senha": "123456"
  }'
```

### Listar Usuários (com paginação)
```bash
curl -X GET "http://localhost:3000/api/usuarios?page=1&limit=10"
```

### Atualizar Usuário (autenticado)
```bash
curl -X PUT http://localhost:3000/api/usuarios/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_JWT_TOKEN" \
  -d '{
    "nome": "João Silva Santos",
    "telefone": "11888888888"
  }'
```

### Excluir Usuário (soft delete)
```bash
curl -X DELETE http://localhost:3000/api/usuarios/1 \
  -H "Authorization: Bearer SEU_JWT_TOKEN"
```

### Restaurar Usuário
```bash
curl -X PATCH http://localhost:3000/api/usuarios/1/restore \
  -H "Authorization: Bearer SEU_JWT_TOKEN"
```

## 🔒 Segurança

- **Rate Limiting**: 100 requests/15min (geral), 5 tentativas de login/15min
- **Helmet**: Headers de segurança
- **CORS**: Configurado para frontend específico
- **JWT**: Autenticação com token expirável
- **Bcrypt**: Hash de senhas com salt rounds 12
- **Validação**: Validação robusta de dados com Joi

## 🗄️ Estrutura do Banco

A tabela `usuarios` deve ter as seguintes colunas:
- `id` (integer, primary key, auto increment)
- `nome` (varchar(100), not null)
- `cpf` (char(11), not null, unique)
- `email` (varchar(100), not null, unique)
- `telefone` (varchar(15), nullable)
- `endereco` (varchar(200), nullable)
- `senha` (varchar(255), not null)
- `created_at` (timestamp, default now())
- `updated_at` (timestamp, default now())
- `deleted_at` (timestamp, nullable) - para soft delete

## 🧪 Validações

- **CPF**: Validação completa com dígitos verificadores
- **Email**: Formato válido de email
- **Senha**: Mínimo 6 caracteres
- **Nome**: 2-100 caracteres
- **Telefone**: Máximo 15 caracteres
- **Endereço**: Máximo 200 caracteres

## 📊 Respostas da API

### Sucesso
```json
{
  "success": true,
  "message": "Operação realizada com sucesso",
  "data": { ... }
}
```

### Erro
```json
{
  "success": false,
  "message": "Descrição do erro",
  "errors": ["Lista de erros de validação"]
}
```

## 🚀 Scripts Disponíveis

- `npm run dev` - Executar em modo desenvolvimento
- `npm run build` - Compilar TypeScript
- `npm start` - Executar em produção
- `npm test` - Executar testes

## 📁 Estrutura do Projeto

```
backend/
├── src/
│   ├── controllers/     # Controladores da API
│   ├── services/        # Lógica de negócio
│   ├── repositories/    # Acesso aos dados
│   ├── middleware/      # Middlewares (auth, validation)
│   ├── routes/          # Definição das rotas
│   ├── types/           # Interfaces TypeScript
│   ├── database/        # Conexão com banco
│   ├── app.ts           # Configuração da aplicação
│   └── index.ts         # Ponto de entrada
├── database/
│   └── migrations/      # Scripts de migração
├── package.json
├── tsconfig.json
└── README.md
```




