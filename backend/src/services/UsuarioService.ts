import bcrypt from 'bcryptjs';
import jwt, { SignOptions } from 'jsonwebtoken';
import { UsuarioRepository } from '../repositories/UsuarioRepository';
import { CreateUsuarioDTO, UpdateUsuarioDTO, UsuarioResponse, LoginDTO, AuthResponse } from '../types/Usuario';

export class UsuarioService {
  private usuarioRepository: UsuarioRepository;

  constructor() {
    this.usuarioRepository = new UsuarioRepository();
  }

  async create(usuarioData: CreateUsuarioDTO): Promise<UsuarioResponse> {
    // Verificar se email já existe
    const existingUserByEmail = await this.usuarioRepository.findByEmail(usuarioData.email);
    if (existingUserByEmail) {
      throw new Error('Email já está em uso');
    }

    // Verificar se CPF já existe
    const existingUserByCpf = await this.usuarioRepository.findByCpf(usuarioData.cpf);
    if (existingUserByCpf) {
      throw new Error('CPF já está em uso');
    }

    // Validar CPF (formato básico)
    if (!this.isValidCpf(usuarioData.cpf)) {
      throw new Error('CPF inválido');
    }

    // Validar email
    if (!this.isValidEmail(usuarioData.email)) {
      throw new Error('Email inválido');
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(usuarioData.senha, 12);

    const usuarioToCreate = {
      ...usuarioData,
      senha: hashedPassword
    };

    return await this.usuarioRepository.create(usuarioToCreate);
  }

  async findById(id: number): Promise<UsuarioResponse | null> {
    return await this.usuarioRepository.findById(id);
  }

  async findAll(page: number = 1, limit: number = 10): Promise<{ usuarios: UsuarioResponse[], total: number, page: number, totalPages: number }> {
    const result = await this.usuarioRepository.findAll(page, limit);
    const totalPages = Math.ceil(result.total / limit);

    return {
      ...result,
      page,
      totalPages
    };
  }

  async update(id: number, usuarioData: UpdateUsuarioDTO): Promise<UsuarioResponse | null> {
    // Verificar se usuário existe
    const existingUser = await this.usuarioRepository.findById(id);
    if (!existingUser) {
      throw new Error('Usuário não encontrado');
    }

    // Se está alterando email, verificar se já existe
    if (usuarioData.email && usuarioData.email !== existingUser.email) {
      const userWithEmail = await this.usuarioRepository.findByEmail(usuarioData.email);
      if (userWithEmail) {
        throw new Error('Email já está em uso');
      }
      if (!this.isValidEmail(usuarioData.email)) {
        throw new Error('Email inválido');
      }
    }

    // Se está alterando CPF, verificar se já existe
    if (usuarioData.cpf && usuarioData.cpf !== existingUser.cpf) {
      const userWithCpf = await this.usuarioRepository.findByCpf(usuarioData.cpf);
      if (userWithCpf) {
        throw new Error('CPF já está em uso');
      }
      if (!this.isValidCpf(usuarioData.cpf)) {
        throw new Error('CPF inválido');
      }
    }

    // Se está alterando senha, fazer hash
    if (usuarioData.senha) {
      usuarioData.senha = await bcrypt.hash(usuarioData.senha, 12);
    }

    return await this.usuarioRepository.update(id, usuarioData);
  }

  async softDelete(id: number): Promise<boolean> {
    const existingUser = await this.usuarioRepository.findById(id);
    if (!existingUser) {
      throw new Error('Usuário não encontrado');
    }

    return await this.usuarioRepository.softDelete(id);
  }

  async restore(id: number): Promise<boolean> {
    return await this.usuarioRepository.restore(id);
  }

  async hardDelete(id: number): Promise<boolean> {
    return await this.usuarioRepository.hardDelete(id);
  }

  async findDeleted(): Promise<UsuarioResponse[]> {
    return await this.usuarioRepository.findDeleted();
  }

  async login(loginData: LoginDTO): Promise<AuthResponse> {
    const user = await this.usuarioRepository.findByEmail(loginData.email);
    if (!user) {
      throw new Error('Credenciais inválidas');
    }

    const isPasswordValid = await bcrypt.compare(loginData.senha, user.senha);
    if (!isPasswordValid) {
      throw new Error('Credenciais inválidas');
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret || typeof jwtSecret !== 'string') {
      throw new Error('JWT_SECRET não configurado');
    }

    const signOptions: SignOptions = {
      expiresIn: process.env.JWT_EXPIRES_IN || '7d'
    };

    const token = jwt.sign(
      { 
        id: user.id, 
        email: user.email 
      },
      jwtSecret,
      signOptions
    );

    const { senha, deleted_at, ...rest } = user;
    
    // Garantir que created_at e updated_at existam
    const usuarioResponse: UsuarioResponse = {
      id: user.id,
      nome: user.nome,
      cpf: user.cpf,
      email: user.email,
      telefone: user.telefone,
      endereco: user.endereco,
      created_at: user.created_at || new Date(),
      updated_at: user.updated_at || new Date()
    };

    return {
      usuario: usuarioResponse,
      token
    };
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private isValidCpf(cpf: string): boolean {
    // Remove caracteres não numéricos
    const cleanCpf = cpf.replace(/\D/g, '');
    
    // Verifica se tem 11 dígitos
    if (cleanCpf.length !== 11) return false;
    
    // Verifica se todos os dígitos são iguais
    if (/^(\d)\1{10}$/.test(cleanCpf)) return false;
    
    // Validação do CPF
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cleanCpf.charAt(i)) * (10 - i);
    }
    let remainder = 11 - (sum % 11);
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cleanCpf.charAt(9))) return false;
    
    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cleanCpf.charAt(i)) * (11 - i);
    }
    remainder = 11 - (sum % 11);
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cleanCpf.charAt(10))) return false;
    
    return true;
  }
}

