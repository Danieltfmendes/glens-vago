import pool from '../database/connection';
import { Usuario, CreateUsuarioDTO, UpdateUsuarioDTO, UsuarioResponse } from '../types/Usuario';

export class UsuarioRepository {
  async create(usuarioData: CreateUsuarioDTO): Promise<UsuarioResponse> {
    const query = `
      INSERT INTO usuarios (nome, cpf, email, telefone, endereco, senha, created_at, updated_at)
      VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW())
      RETURNING id, nome, cpf, email, telefone, endereco, created_at, updated_at
    `;
    
    const values = [
      usuarioData.nome,
      usuarioData.cpf,
      usuarioData.email,
      usuarioData.telefone || null,
      usuarioData.endereco || null,
      usuarioData.senha
    ];

    const result = await pool.query(query, values);
    return result.rows[0];
  }

  async findById(id: number): Promise<UsuarioResponse | null> {
    const query = `
      SELECT id, nome, cpf, email, telefone, endereco, created_at, updated_at
      FROM usuarios 
      WHERE id = $1 AND deleted_at IS NULL
    `;
    
    const result = await pool.query(query, [id]);
    return result.rows[0] || null;
  }

  async findByEmail(email: string): Promise<Usuario | null> {
    const query = `
      SELECT id, nome, cpf, email, telefone, endereco, senha, created_at, updated_at, deleted_at
      FROM usuarios 
      WHERE email = $1 AND deleted_at IS NULL
    `;
    
    const result = await pool.query(query, [email]);
    return result.rows[0] || null;
  }

  async findByCpf(cpf: string): Promise<UsuarioResponse | null> {
    const query = `
      SELECT id, nome, cpf, email, telefone, endereco, created_at, updated_at
      FROM usuarios 
      WHERE cpf = $1 AND deleted_at IS NULL
    `;
    
    const result = await pool.query(query, [cpf]);
    return result.rows[0] || null;
  }

  async findAll(page: number = 1, limit: number = 10): Promise<{ usuarios: UsuarioResponse[], total: number }> {
    const offset = (page - 1) * limit;
    
    const countQuery = `
      SELECT COUNT(*) as total
      FROM usuarios 
      WHERE deleted_at IS NULL
    `;
    
    const dataQuery = `
      SELECT id, nome, cpf, email, telefone, endereco, created_at, updated_at
      FROM usuarios 
      WHERE deleted_at IS NULL
      ORDER BY created_at DESC
      LIMIT $1 OFFSET $2
    `;

    const [countResult, dataResult] = await Promise.all([
      pool.query(countQuery),
      pool.query(dataQuery, [limit, offset])
    ]);

    return {
      usuarios: dataResult.rows,
      total: parseInt(countResult.rows[0].total)
    };
  }

  async update(id: number, usuarioData: UpdateUsuarioDTO): Promise<UsuarioResponse | null> {
    const fields = [];
    const values = [];
    let paramCount = 1;

    if (usuarioData.nome !== undefined) {
      fields.push(`nome = $${paramCount++}`);
      values.push(usuarioData.nome);
    }
    if (usuarioData.cpf !== undefined) {
      fields.push(`cpf = $${paramCount++}`);
      values.push(usuarioData.cpf);
    }
    if (usuarioData.email !== undefined) {
      fields.push(`email = $${paramCount++}`);
      values.push(usuarioData.email);
    }
    if (usuarioData.telefone !== undefined) {
      fields.push(`telefone = $${paramCount++}`);
      values.push(usuarioData.telefone);
    }
    if (usuarioData.endereco !== undefined) {
      fields.push(`endereco = $${paramCount++}`);
      values.push(usuarioData.endereco);
    }
    if (usuarioData.senha !== undefined) {
      fields.push(`senha = $${paramCount++}`);
      values.push(usuarioData.senha);
    }

    if (fields.length === 0) {
      return this.findById(id);
    }

    fields.push(`updated_at = NOW()`);
    values.push(id);

    const query = `
      UPDATE usuarios 
      SET ${fields.join(', ')}
      WHERE id = $${paramCount} AND deleted_at IS NULL
      RETURNING id, nome, cpf, email, telefone, endereco, created_at, updated_at
    `;

    const result = await pool.query(query, values);
    return result.rows[0] || null;
  }

  async softDelete(id: number): Promise<boolean> {
    const query = `
      UPDATE usuarios 
      SET deleted_at = NOW(), updated_at = NOW()
      WHERE id = $1 AND deleted_at IS NULL
      RETURNING id
    `;
    
    const result = await pool.query(query, [id]);
    return result.rows.length > 0;
  }

  async restore(id: number): Promise<boolean> {
    const query = `
      UPDATE usuarios 
      SET deleted_at = NULL, updated_at = NOW()
      WHERE id = $1 AND deleted_at IS NOT NULL
      RETURNING id
    `;
    
    const result = await pool.query(query, [id]);
    return result.rows.length > 0;
  }

  async hardDelete(id: number): Promise<boolean> {
    const query = `
      DELETE FROM usuarios 
      WHERE id = $1
      RETURNING id
    `;
    
    const result = await pool.query(query, [id]);
    return result.rows.length > 0;
  }

  async findDeleted(): Promise<UsuarioResponse[]> {
    const query = `
      SELECT id, nome, cpf, email, telefone, endereco, created_at, updated_at, deleted_at
      FROM usuarios 
      WHERE deleted_at IS NOT NULL
      ORDER BY deleted_at DESC
    `;
    
    const result = await pool.query(query);
    return result.rows;
  }
}

