
import { Link2, Clock, Shield, FileSearch } from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: <Link2 className="w-12 h-12 mb-6 text-[#5201fe]" />,
      title: "Управление ссылками",
      description: "Создавайте, отслеживайте и оптимизируйте все ваши рекламные ссылки в одном удобном интерфейсе."
    },
    {
      icon: <Clock className="w-12 h-12 mb-6 text-[#2a4b8d]" />,
      title: "Отслеживание в реальном времени",
      description: "Получайте данные о производительности рекламных кампаний сразу же после их запуска."
    },
    {
      icon: <Shield className="w-12 h-12 mb-6 text-[#5201fe]" />,
      title: "Защита от накруток",
      description: "Наша система автоматически определяет и фильтрует ненастоящий трафик."
    },
    {
      icon: <FileSearch className="w-12 h-12 mb-6 text-[#2a4b8d]" />,
      title: "Полный контроль",
      description: "Вся история ваших рекламных кампаний всегда под рукой."
    },
  ];

  return (
    <section id="features" className="py-20 bg-gradient-to-b from-white via-[#f8f9fe] to-[#f4f7ff]">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-5xl mx-auto text-center mb-16">
          <div className="flex justify-center mb-12">
            <div className="text-center w-full">
              <div className="font-montserrat text-xl md:text-2xl font-medium max-w-3xl mx-auto mb-6">
                <span className="text-[#5201fe] font-semibold whitespace-normal inline-block text-center w-full">
                  Сервис для тех, кто покупает рекламу у блогеров и хочет видеть результат
                </span>
              </div>
              <div className="flex justify-center">
                <div className="w-16 h-1 bg-gradient-to-r from-[#5201fe] to-[#78e29e] my-2"></div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="p-8 text-center rounded-lg bg-white shadow-md hover:shadow-xl transition-shadow duration-300 border-t-4 border-t-[#78e29e] hover:border-t-[#5201fe] group"
            >
              <div className="flex justify-center transform transition-transform duration-300 group-hover:scale-110">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">{feature.title}</h3>
              <p className="text-[#8a8a8a]">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
