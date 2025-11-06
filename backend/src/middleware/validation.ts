import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

export const validateCreateUsuario = (req: Request, res: Response, next: NextFunction): void => {
  const schema = Joi.object({
    nome: Joi.string().min(2).max(100).required().messages({
      'string.min': 'Nome deve ter pelo menos 2 caracteres',
      'string.max': 'Nome deve ter no máximo 100 caracteres',
      'any.required': 'Nome é obrigatório'
    }),
    cpf: Joi.string().length(11).pattern(/^\d{11}$/).required().messages({
      'string.length': 'CPF deve ter exatamente 11 dígitos',
      'string.pattern.base': 'CPF deve conter apenas números',
      'any.required': 'CPF é obrigatório'
    }),
    email: Joi.string().email().max(100).required().messages({
      'string.email': 'Email deve ter um formato válido',
      'string.max': 'Email deve ter no máximo 100 caracteres',
      'any.required': 'Email é obrigatório'
    }),
    telefone: Joi.string().max(15).optional().messages({
      'string.max': 'Telefone deve ter no máximo 15 caracteres'
    }),
    endereco: Joi.string().max(200).optional().messages({
      'string.max': 'Endereço deve ter no máximo 200 caracteres'
    }),
    senha: Joi.string().min(6).max(255).required().messages({
      'string.min': 'Senha deve ter pelo menos 6 caracteres',
      'string.max': 'Senha deve ter no máximo 255 caracteres',
      'any.required': 'Senha é obrigatória'
    })
  });

  const { error } = schema.validate(req.body);
  if (error) {
    res.status(400).json({
      success: false,
      message: 'Dados inválidos',
      errors: error.details.map(detail => detail.message)
    });
    return;
  }

  next();
};

export const validateUpdateUsuario = (req: Request, res: Response, next: NextFunction): void => {
  const schema = Joi.object({
    nome: Joi.string().min(2).max(100).optional().messages({
      'string.min': 'Nome deve ter pelo menos 2 caracteres',
      'string.max': 'Nome deve ter no máximo 100 caracteres'
    }),
    cpf: Joi.string().length(11).pattern(/^\d{11}$/).optional().messages({
      'string.length': 'CPF deve ter exatamente 11 dígitos',
      'string.pattern.base': 'CPF deve conter apenas números'
    }),
    email: Joi.string().email().max(100).optional().messages({
      'string.email': 'Email deve ter um formato válido',
      'string.max': 'Email deve ter no máximo 100 caracteres'
    }),
    telefone: Joi.string().max(15).optional().messages({
      'string.max': 'Telefone deve ter no máximo 15 caracteres'
    }),
    endereco: Joi.string().max(200).optional().messages({
      'string.max': 'Endereço deve ter no máximo 200 caracteres'
    }),
    senha: Joi.string().min(6).max(255).optional().messages({
      'string.min': 'Senha deve ter pelo menos 6 caracteres',
      'string.max': 'Senha deve ter no máximo 255 caracteres'
    })
  });

  const { error } = schema.validate(req.body);
  if (error) {
    res.status(400).json({
      success: false,
      message: 'Dados inválidos',
      errors: error.details.map(detail => detail.message)
    });
    return;
  }

  next();
};

export const validateLogin = (req: Request, res: Response, next: NextFunction): void => {
  const schema = Joi.object({
    email: Joi.string().email().required().messages({
      'string.email': 'Email deve ter um formato válido',
      'any.required': 'Email é obrigatório'
    }),
    senha: Joi.string().required().messages({
      'any.required': 'Senha é obrigatória'
    })
  });

  const { error } = schema.validate(req.body);
  if (error) {
    res.status(400).json({
      success: false,
      message: 'Dados inválidos',
      errors: error.details.map(detail => detail.message)
    });
    return;
  }

  next();
};

