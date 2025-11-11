import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../contexts/AuthContext';
import { RegisterData } from '../types/auth';
import { Eye, EyeOff, Mail, Lock, User, Phone, MapPin, CreditCard, ArrowLeft } from 'lucide-react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card from '../components/ui/Card';

const Register: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { register: registerUser, loading } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegisterData>();

  const password = watch('senha');

  const onSubmit = async (data: RegisterData) => {
    const success = await registerUser(data);
    if (success) {
      navigate('/login');
    }
  };

  const formatCPF = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1');
  };

  const formatPhone = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{4})(\d)/, '$1-$2')
      .replace(/(\d{4})-(\d)(\d{4})/, '$1$2-$3')
      .replace(/(-\d{4})\d+?$/, '$1');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <Link to="/" className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 mb-6">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Voltar ao início</span>
          </Link>
          
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-2xl">G</span>
            </div>
          </div>
          
          <h2 className="text-3xl font-bold text-secondary-900 mb-2">
            Criar conta
          </h2>
          <p className="text-secondary-600">
            Cadastre-se no Hotel Glen's Vago e aproveite nossos serviços
          </p>
        </div>

        {/* Register Form */}
        <Card className="p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Input
              label="Nome completo"
              type="text"
              placeholder="Seu nome completo"
              icon={<User className="w-5 h-5" />}
              error={errors.nome?.message}
              {...register('nome', {
                required: 'Nome é obrigatório',
                minLength: {
                  value: 2,
                  message: 'Nome deve ter pelo menos 2 caracteres',
                },
                maxLength: {
                  value: 100,
                  message: 'Nome deve ter no máximo 100 caracteres',
                },
              })}
            />

            <Input
              label="CPF"
              type="text"
              placeholder="000.000.000-00"
              icon={<CreditCard className="w-5 h-5" />}
              error={errors.cpf?.message}
              {...register('cpf', {
                required: 'CPF é obrigatório',
                pattern: {
                  value: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
                  message: 'CPF deve estar no formato 000.000.000-00',
                },
                onChange: (e) => {
                  e.target.value = formatCPF(e.target.value);
                },
              })}
            />

            <Input
              label="Email"
              type="email"
              placeholder="seu@email.com"
              icon={<Mail className="w-5 h-5" />}
              error={errors.email?.message}
              {...register('email', {
                required: 'Email é obrigatório',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Email inválido',
                },
              })}
            />

            <Input
              label="Telefone"
              type="tel"
              placeholder="(11) 99999-9999"
              icon={<Phone className="w-5 h-5" />}
              error={errors.telefone?.message}
              {...register('telefone', {
                pattern: {
                  value: /^\(\d{2}\) \d{4,5}-\d{4}$/,
                  message: 'Telefone deve estar no formato (11) 99999-9999',
                },
                onChange: (e) => {
                  e.target.value = formatPhone(e.target.value);
                },
              })}
            />

            <Input
              label="Endereço"
              type="text"
              placeholder="Rua, número, bairro, cidade"
              icon={<MapPin className="w-5 h-5" />}
              error={errors.endereco?.message}
              {...register('endereco', {
                maxLength: {
                  value: 200,
                  message: 'Endereço deve ter no máximo 200 caracteres',
                },
              })}
            />

            <div className="relative">
              <Input
                label="Senha"
                type={showPassword ? 'text' : 'password'}
                placeholder="Mínimo 6 caracteres"
                icon={<Lock className="w-5 h-5" />}
                error={errors.senha?.message}
                {...register('senha', {
                  required: 'Senha é obrigatória',
                  minLength: {
                    value: 6,
                    message: 'Senha deve ter pelo menos 6 caracteres',
                  },
                  maxLength: {
                    value: 255,
                    message: 'Senha deve ter no máximo 255 caracteres',
                  },
                })}
              />
              <button
                type="button"
                className="absolute right-3 top-9 text-secondary-400 hover:text-secondary-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>

            <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
              <h4 className="text-sm font-medium text-primary-800 mb-2">
                Informações importantes:
              </h4>
              <ul className="text-xs text-primary-700 space-y-1">
                <li>• Seus dados estão seguros e protegidos</li>
                <li>• Você pode atualizar suas informações a qualquer momento</li>
                <li>• Campos opcionais podem ser preenchidos depois</li>
              </ul>
            </div>

            <Button
              type="submit"
              className="w-full"
              loading={loading}
              disabled={loading}
            >
              {loading ? 'Criando conta...' : 'Criar conta'}
            </Button>

            <div className="text-center">
              <p className="text-sm text-secondary-600">
                Já tem uma conta?{' '}
                <Link
                  to="/login"
                  className="font-medium text-primary-600 hover:text-primary-500"
                >
                  Faça login aqui
                </Link>
              </p>
            </div>
          </form>
        </Card>

        {/* Footer */}
        <div className="text-center">
          <p className="text-xs text-secondary-500">
            © 2024 Hotel Glen's Vago. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;



