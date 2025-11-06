import { Request, Response } from 'express';
import { UsuarioService } from '../services/UsuarioService';
import { CreateUsuarioDTO, UpdateUsuarioDTO, LoginDTO } from '../types/Usuario';

export class UsuarioController {
  private usuarioService: UsuarioService;

  constructor() {
    this.usuarioService = new UsuarioService();
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const usuarioData: CreateUsuarioDTO = req.body;
      const usuario = await this.usuarioService.create(usuarioData);
      
      res.status(201).json({
        success: true,
        message: 'Usuário criado com sucesso',
        data: usuario
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error instanceof Error ? error.message : 'Erro interno do servidor'
      });
    }
  }

  async findById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const usuario = await this.usuarioService.findById(parseInt(id));
      
      if (!usuario) {
        res.status(404).json({
          success: false,
          message: 'Usuário não encontrado'
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: usuario
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor'
      });
    }
  }

  async findAll(req: Request, res: Response): Promise<void> {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      
      const result = await this.usuarioService.findAll(page, limit);
      
      res.status(200).json({
        success: true,
        data: result
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor'
      });
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const usuarioData: UpdateUsuarioDTO = req.body;
      
      const usuario = await this.usuarioService.update(parseInt(id), usuarioData);
      
      if (!usuario) {
        res.status(404).json({
          success: false,
          message: 'Usuário não encontrado'
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: 'Usuário atualizado com sucesso',
        data: usuario
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error instanceof Error ? error.message : 'Erro interno do servidor'
      });
    }
  }

  async softDelete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const deleted = await this.usuarioService.softDelete(parseInt(id));
      
      if (!deleted) {
        res.status(404).json({
          success: false,
          message: 'Usuário não encontrado'
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: 'Usuário excluído com sucesso'
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error instanceof Error ? error.message : 'Erro interno do servidor'
      });
    }
  }

  async restore(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const restored = await this.usuarioService.restore(parseInt(id));
      
      if (!restored) {
        res.status(404).json({
          success: false,
          message: 'Usuário não encontrado ou não estava excluído'
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: 'Usuário restaurado com sucesso'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor'
      });
    }
  }

  async hardDelete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const deleted = await this.usuarioService.hardDelete(parseInt(id));
      
      if (!deleted) {
        res.status(404).json({
          success: false,
          message: 'Usuário não encontrado'
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: 'Usuário excluído permanentemente'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor'
      });
    }
  }

  async findDeleted(req: Request, res: Response): Promise<void> {
    try {
      const usuarios = await this.usuarioService.findDeleted();
      
      res.status(200).json({
        success: true,
        data: usuarios
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor'
      });
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const loginData: LoginDTO = req.body;
      const result = await this.usuarioService.login(loginData);
      
      res.status(200).json({
        success: true,
        message: 'Login realizado com sucesso',
        data: result
      });
    } catch (error) {
      res.status(401).json({
        success: false,
        message: error instanceof Error ? error.message : 'Erro interno do servidor'
      });
    }
  }
}

