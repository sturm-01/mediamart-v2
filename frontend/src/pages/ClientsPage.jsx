import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';

const ClientsPage = () => {
  const clientCategories = [
    {
      category: "Телекоммуникации",
      clients: ["Beeline", "Kcell", "Tele2", "Kazakhtelecom"],
      color: "bg-blue-100 text-blue-800"
    },
    {
      category: "Банки и финансы",
      clients: ["Halyk Bank", "Kaspi Bank", "ATF Bank", "БТА Банк"],
      color: "bg-green-100 text-green-800"
    },
    {
      category: "Автомобили",
      clients: ["Toyota", "Mercedes-Benz", "BMW", "Hyundai", "Nissan"],
      color: "bg-purple-100 text-purple-800"
    },
    {
      category: "Ритейл",
      clients: ["Magnum", "Small", "Rahmet", "Green Market"],
      color: "bg-orange-100 text-orange-800"
    },
    {
      category: "Недвижимость",
      clients: ["BI Group", "Absolute", "Talan Towers", "Glorax Development"],
      color: "bg-red-100 text-red-800"
    },
    {
      category: "Образование",
      clients: ["КАЗГЮУ", "КазНУ", "AITU", "Narxoz University"],
      color: "bg-indigo-100 text-indigo-800"
    },
    {
      category: "FMCG",
      clients: ["Coca-Cola", "PepsiCo", "Unilever", "P&G"],
      color: "bg-pink-100 text-pink-800"
    },
    {
      category: "Технологии",
      clients: ["Yandex", "Kaspi.kz", "Chocofood", "Galaxy"],
      color: "bg-cyan-100 text-cyan-800"
    }
  ];

  const testimonials = [
    {
      company: "Halyk Bank",
      text: "Media Mart предоставляет высококачественные услуги наружной рекламы. Профессиональная команда и отличное расположение конструкций.",
      author: "Менеджер по маркетингу"
    },
    {
      company: "Toyota Center Almaty",
      text: "Сотрудничаем уже более 5 лет. Всегда качественное выполнение работ в срок. Рекомендуем как надежного партнера.",
      author: "Директор по рекламе"
    },
    {
      company: "Kaspi.kz",
      text: "Отличное покрытие города, современные технологии и гибкая ценовая политика. Результаты кампаний превосходят ожидания.",
      author: "CMO"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-slate-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-8">Наши клиенты</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Нам доверяют ведущие бренды Казахстана. За годы работы мы реализовали 
            тысячи успешных рекламных кампаний для компаний различных сфер деятельности.
          </p>
        </div>
      </section>

      {/* Client Categories */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Сферы деятельности наших клиентов</h2>
            <p className="text-xl text-gray-600">
              Мы работаем с компаниями из различных отраслей
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {clientCategories.map((category, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-lg text-gray-900">{category.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {category.clients.map((client, idx) => (
                      <Badge key={idx} className={category.color}>
                        {client}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Отзывы клиентов</h2>
            <p className="text-xl text-gray-600">
              Что говорят о нас наши партнеры
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-gray-50 border-none">
                <CardContent className="p-6">
                  <blockquote className="text-gray-700 mb-4 italic">
                    "{testimonial.text}"
                  </blockquote>
                  <div className="border-t pt-4">
                    <div className="font-semibold text-gray-900">{testimonial.company}</div>
                    <div className="text-sm text-gray-600">{testimonial.author}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-red-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Станьте нашим клиентом</h2>
          <p className="text-xl mb-8 opacity-90">
            Присоединяйтесь к успешным брендам, которые доверяют нам свою рекламу
          </p>
          <a
            href="https://wa.me/77779200200"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-red-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Связаться с нами
          </a>
        </div>
      </section>
    </div>
  );
};

export default ClientsPage;