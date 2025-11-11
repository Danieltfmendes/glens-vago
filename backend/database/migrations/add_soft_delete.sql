-- Adicionar coluna deleted_at para soft delete
ALTER TABLE usuarios ADD COLUMN deleted_at TIMESTAMP NULL;

-- Adicionar colunas de auditoria se não existirem
ALTER TABLE usuarios ADD COLUMN created_at TIMESTAMP DEFAULT NOW();
ALTER TABLE usuarios ADD COLUMN updated_at TIMESTAMP DEFAULT NOW();

-- Criar índice para melhor performance nas consultas com soft delete
CREATE INDEX idx_usuarios_deleted_at ON usuarios(deleted_at);
CREATE INDEX idx_usuarios_email_active ON usuarios(email) WHERE deleted_at IS NULL;
CREATE INDEX idx_usuarios_cpf_active ON usuarios(cpf) WHERE deleted_at IS NULL;




