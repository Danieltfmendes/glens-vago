import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Calendar, MapPin, Star, Users, Shield, Clock } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const Home: React.FC = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600/10 to-secondary-600/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-secondary-900 mb-6">
              Bem-vindo ao{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-800">
                Glen's Vago
              </span>
            </h1>
            <p className="text-xl text-secondary-600 mb-8 max-w-3xl mx-auto">
              Descubra o conforto e elegância que você merece. 
              Uma experiência única de hospitalidade no coração da cidade.
            </p>
            
            {isAuthenticated ? (
              <div className="space-y-4">
                <p className="text-lg text-primary-600 font-medium">
                  Olá, {user?.nome}! 👋
                </p>
                <Link to="/dashboard">
                  <Button size="lg" className="text-lg px-8 py-4">
                    Acessar Dashboard
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/register">
                  <Button size="lg" className="text-lg px-8 py-4">
                    Criar Conta
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="outline" size="lg" className="text-lg px-8 py-4">
                    Fazer Login
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
              Por que escolher o Glen's Vago?
            </h2>
            <p className="text-xl text-secondary-600 max-w-2xl mx-auto">
              Oferecemos uma experiência única com serviços de qualidade e atendimento personalizado.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-8 text-center hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Star className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-secondary-900 mb-4">
                Excelência em Serviços
              </h3>
              <p className="text-secondary-600">
                Nossa equipe está comprometida em oferecer o melhor atendimento e conforto para nossos hóspedes.
              </p>
            </Card>

            <Card className="p-8 text-center hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-secondary-900 mb-4">
                Segurança Garantida
              </h3>
              <p className="text-secondary-600">
                Seus dados e informações estão protegidos com os mais altos padrões de segurança.
              </p>
            </Card>

            <Card className="p-8 text-center hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-secondary-900 mb-4">
                Disponibilidade 24/7
              </h3>
              <p className="text-secondary-600">
                Nossa equipe está sempre disponível para atender suas necessidades a qualquer momento.
              </p>
            </Card>

            <Card className="p-8 text-center hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-secondary-900 mb-4">
                Atendimento Personalizado
              </h3>
              <p className="text-secondary-600">
                Cada hóspede recebe um atendimento único e personalizado de acordo com suas preferências.
              </p>
            </Card>

            <Card className="p-8 text-center hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <MapPin className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-secondary-900 mb-4">
                Localização Privilegiada
              </h3>
              <p className="text-secondary-600">
                Situado em uma localização estratégica, próximo aos principais pontos da cidade.
              </p>
            </Card>

            <Card className="p-8 text-center hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Calendar className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-secondary-900 mb-4">
                Reservas Flexíveis
              </h3>
              <p className="text-secondary-600">
                Sistema de reservas moderno e flexível, adaptado às suas necessidades.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Pronto para uma experiência única?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Cadastre-se agora e tenha acesso a todos os nossos serviços exclusivos.
          </p>
          
          {!isAuthenticated && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button variant="secondary" size="lg" className="text-lg px-8 py-4">
                  Criar Conta Grátis
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" size="lg" className="text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-primary-600">
                  Já tenho conta
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">G</span>
              </div>
              <span className="text-xl font-bold">Glen's Vago</span>
            </div>
            <p className="text-secondary-400 mb-4">
              Sua experiência de hospitalidade começa aqui.
            </p>
            <p className="text-sm text-secondary-500">
              © 2024 Hotel Glen's Vago. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;




