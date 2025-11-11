import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { User, Mail, Phone, MapPin, Calendar, Settings } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-secondary-900 mb-4">
            Usuário não encontrado
          </h2>
          <p className="text-secondary-600">
            Faça login novamente para acessar sua conta.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-secondary-900 mb-2">
            Bem-vindo, {user.nome}! 👋
          </h1>
          <p className="text-secondary-600">
            Gerencie sua conta e aproveite nossos serviços.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-2">
            <Card className="p-8">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xl">
                    {user.nome.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-secondary-900">
                    {user.nome}
                  </h2>
                  <p className="text-secondary-600">
                    Membro desde {new Date(user.created_at).toLocaleDateString('pt-BR')}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-primary-600" />
                  <div>
                    <p className="text-sm text-secondary-500">Email</p>
                    <p className="text-secondary-900">{user.email}</p>
                  </div>
                </div>

                {user.telefone && (
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-primary-600" />
                    <div>
                      <p className="text-sm text-secondary-500">Telefone</p>
                      <p className="text-secondary-900">{user.telefone}</p>
                    </div>
                  </div>
                )}

                {user.endereco && (
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-primary-600" />
                    <div>
                      <p className="text-sm text-secondary-500">Endereço</p>
                      <p className="text-secondary-900">{user.endereco}</p>
                    </div>
                  </div>
                )}

                <div className="flex items-center space-x-3">
                  <User className="w-5 h-5 text-primary-600" />
                  <div>
                    <p className="text-sm text-secondary-500">CPF</p>
                    <p className="text-secondary-900">{user.cpf}</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Actions Card */}
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-secondary-900 mb-4">
                Ações Rápidas
              </h3>
              <div className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                  <Settings className="w-4 h-4 mr-2" />
                  Editar Perfil
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Calendar className="w-4 h-4 mr-2" />
                  Minhas Reservas
                </Button>
                <Button 
                  className="w-full justify-start" 
                  variant="outline"
                  onClick={logout}
                >
                  Sair da Conta
                </Button>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold text-secondary-900 mb-4">
                Informações da Conta
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-secondary-500">Status:</span>
                  <span className="text-green-600 font-medium">Ativo</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary-500">Última atualização:</span>
                  <span className="text-secondary-900">
                    {new Date(user.updated_at).toLocaleDateString('pt-BR')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary-500">ID do usuário:</span>
                  <span className="text-secondary-900 font-mono text-xs">
                    #{user.id}
                  </span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;




