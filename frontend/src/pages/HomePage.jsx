import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { ArrowRight, MapPin, Monitor, Palette, Phone, Mail, Clock } from 'lucide-react';
import RequestModal from '../components/RequestModal';

const HomePage = () => {
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);

  const services = [
    {
      icon: <MapPin className="h-12 w-12 text-red-500" />,
      title: "Outdoor",
      description: "Наружная реклама по всему городу. Более 270 рекламных носителей в самых оживленных районах Алматы.",
      features: ["Ситиборды 3х2 метра", "Медиаборды с подсветкой", "Стратегические локации", "Высокая видимость"]
    },
    {
      icon: <Monitor className="h-12 w-12 text-red-500" />,
      title: "Digital",
      description: "Цифровые LED-экраны с динамическим контентом. Современные технологии для максимального воздействия.",
      features: ["LED-экраны высокого разрешения", "Динамический контент", "Программируемое расписание", "Аналитика показов"]
    },
    {
      icon: <Palette className="h-12 w-12 text-red-500" />,
      title: "Creative Production",
      description: "Полный цикл креативного производства от концепции до реализации рекламных кампаний.",
      features: ["Дизайн и концепция", "Производство материалов", "Монтаж и установка", "Сопровождение кампаний"]
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Media Mart
          </h1>
          <p className="text-xl md:text-2xl mb-4 text-gray-300">
            Наружная реклама нового поколения
          </p>
          <p className="text-lg mb-8 text-gray-400 max-w-3xl mx-auto">
            Крупнейший собственник конструкций наружной рекламы в Алматы. 
            Более 270 рекламных носителей в самых престижных районах города.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/construction">
              <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white px-8 py-3">
                Смотреть конструкции
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-black px-8 py-3"
              onClick={() => setIsRequestModalOpen(true)}
            >
              Оставить заявку
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Наши услуги</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Полный спектр услуг наружной рекламы - от традиционных конструкций до современных цифровых решений
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-gray-200 hover:border-red-200">
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>
                  <CardTitle className="text-2xl mb-2 text-gray-900">{service.title}</CardTitle>
                  <CardDescription className="text-gray-600">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-gray-700">
                        <ArrowRight className="h-4 w-4 text-red-500 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-red-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="group">
              <div className="text-4xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300">270+</div>
              <div className="text-lg opacity-90">Рекламных конструкций</div>
            </div>
            <div className="group">
              <div className="text-4xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300">50+</div>
              <div className="text-lg opacity-90">LED-экранов</div>
            </div>
            <div className="group">
              <div className="text-4xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300">15+</div>
              <div className="text-lg opacity-90">Лет опыта</div>
            </div>
            <div className="group">
              <div className="text-4xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300">1000+</div>
              <div className="text-lg opacity-90">Довольных клиентов</div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Свяжитесь с нами</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Готовы обсудить ваш проект? Наши специалисты помогут выбрать оптимальные решения для вашей рекламной кампании.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="bg-slate-800 border-slate-700 text-white">
              <CardHeader className="text-center">
                <Phone className="h-8 w-8 text-red-500 mx-auto mb-4" />
                <CardTitle>Телефон</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <a href="tel:+77779200200" className="text-lg hover:text-red-500 transition-colors">
                  +7 777 9 200 200
                </a>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700 text-white">
              <CardHeader className="text-center">
                <Mail className="h-8 w-8 text-red-500 mx-auto mb-4" />
                <CardTitle>Email</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <a href="mailto:info@mediamart.kz" className="text-lg hover:text-red-500 transition-colors">
                  info@mediamart.kz
                </a>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700 text-white">
              <CardHeader className="text-center">
                <Clock className="h-8 w-8 text-red-500 mx-auto mb-4" />
                <CardTitle>Время работы</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-lg">
                  <div>Пн-Пт: 9:00-18:00</div>
                  <div>Сб: 10:00-15:00</div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Button
              size="lg"
              onClick={() => setIsRequestModalOpen(true)}
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-3"
            >
              Оставить заявку
            </Button>
          </div>
        </div>
      </section>

      <RequestModal 
        isOpen={isRequestModalOpen} 
        onClose={() => setIsRequestModalOpen(false)} 
      />
    </div>
  );
};

export default HomePage;