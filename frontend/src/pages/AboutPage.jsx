import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Users, Target, Award, TrendingUp } from 'lucide-react';

const AboutPage = () => {
  const achievements = [
    {
      icon: <Users className="h-8 w-8 text-red-500" />,
      title: "270+ конструкций",
      description: "Собственный инвентарь наружной рекламы"
    },
    {
      icon: <Target className="h-8 w-8 text-red-500" />,
      title: "15+ лет опыта",
      description: "Работаем на рынке с 2008 года"
    },
    {
      icon: <Award className="h-8 w-8 text-red-500" />,
      title: "Лидер рынка",
      description: "Один из крупнейших операторов в Алматы"
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-red-500" />,
      title: "1000+ клиентов",
      description: "Довольные клиенты по всему Казахстану"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-red-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-8">About Us</h1>
          <div className="max-w-4xl mx-auto text-lg leading-relaxed space-y-6">
            <p>
              ТОО «Медиа Март» - собственник конструкций наружной рекламы в 
              городе Алматы, один из крупнейших операторов по количеству 
              собственного инвентаря, имеет в своем распоряжении более 270 
              рекламных носителей, расположенных в самых оживленных районах 
              города.
            </p>
            <p>
              В арсенале компании есть различные форматы наружной рекламы: 
              Ситиборды - конструкция наружной рекламы формата 3 на 2 метра. В 
              конструкции имеется внутренняя подсветка. Наши конструкции 
              рассчитаны для размещения 1 рекламодателя в статичном режиме. 
              Адресная программа насчитывает более 250 сторон.
            </p>
            <p>
              DigitalBOARD - светодиодные уличные экраны, передающие информацию 
              визуального типа. Размер конструкций 3,5 на 2,5 и 1,8 на 2 метра.
            </p>
          </div>
        </div>
      </section>

      {/* Achievements Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Наши достижения</h2>
            <p className="text-xl text-gray-600">
              Почему нам доверяют ведущие бренды Казахстана
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <Card key={index} className="text-center group hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="flex justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    {achievement.icon}
                  </div>
                  <CardTitle className="text-xl text-gray-900">{achievement.title}</CardTitle>
                  <CardDescription>{achievement.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">Наша миссия</h2>
              <p className="text-lg text-gray-300 mb-6">
                Мы создаем эффективные рекламные решения, которые помогают нашим 
                клиентам достигать своих бизнес-целей через качественную наружную рекламу 
                в самых престижных локациях Алматы.
              </p>
              <p className="text-lg text-gray-300">
                Наша команда профессионалов обеспечивает полный цикл услуг - от 
                разработки креативной концепции до размещения и мониторинга рекламных кампаний.
              </p>
            </div>
            <div className="bg-slate-800 p-8 rounded-lg">
              <h3 className="text-2xl font-bold mb-6 text-center">Наши принципы</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-1">1</span>
                  <span>Качество превыше всего</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-1">2</span>
                  <span>Индивидуальный подход к каждому клиенту</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-1">3</span>
                  <span>Инновационные технологии</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-1">4</span>
                  <span>Прозрачность в работе</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;