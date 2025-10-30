export interface User {
  id: number;
  nome: string;
  cpf: string;
  email: string;
  telefone?: string;
  endereco?: string;
  created_at: string;
  updated_at: string;
}

export interface LoginData {
  email: string;
  senha: string;
}

export interface RegisterData {
  nome: string;
  cpf: string;
  email: string;
  telefone?: string;
  endereco?: string;
  senha: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    usuario: User;
    token: string;
  };
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  errors?: string[];
}

