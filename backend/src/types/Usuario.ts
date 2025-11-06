export interface Usuario {
  id: number;
  nome: string;
  cpf: string;
  email: string;
  telefone?: string;
  endereco?: string;
  senha: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

export interface CreateUsuarioDTO {
  nome: string;
  cpf: string;
  email: string;
  telefone?: string;
  endereco?: string;
  senha: string;
}

export interface UpdateUsuarioDTO {
  nome?: string;
  cpf?: string;
  email?: string;
  telefone?: string;
  endereco?: string;
  senha?: string;
}

export interface UsuarioResponse {
  id: number;
  nome: string;
  cpf: string;
  email: string;
  telefone?: string;
  endereco?: string;
  created_at: Date;
  updated_at: Date;
}

export interface LoginDTO {
  email: string;
  senha: string;
}

export interface AuthResponse {
  usuario: UsuarioResponse;
  token: string;
}

