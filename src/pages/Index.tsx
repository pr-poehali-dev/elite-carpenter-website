import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

type AnyString = string;

const HERO_IMG = "https://cdn.poehali.dev/projects/3183216a-e9d1-46be-9b8c-0fe22b3effd3/files/07953faf-ac72-440c-a416-a12bf850d05c.jpg";
const MASTER_IMG = "https://cdn.poehali.dev/projects/3183216a-e9d1-46be-9b8c-0fe22b3effd3/files/5578edd8-2d2e-4156-8a33-80e30f72bdd5.jpg";
const TABLE_IMG = "https://cdn.poehali.dev/projects/3183216a-e9d1-46be-9b8c-0fe22b3effd3/files/f9946736-63c3-4c0d-b9f5-4c8322a285ea.jpg";

const PORTFOLIO = [
  { title: "Обеденный стол «Дуб»", category: "Мебель", price: "от 180 000 ₽", img: TABLE_IMG },
  { title: "Библиотека «Венге»", category: "Хранение", price: "от 320 000 ₽", img: HERO_IMG },
  { title: "Кухонный гарнитур", category: "Кухня", price: "от 450 000 ₽", img: TABLE_IMG },
  { title: "Журнальный стол", category: "Мебель", price: "от 90 000 ₽", img: HERO_IMG },
  { title: "Гардеробная система", category: "Хранение", price: "от 250 000 ₽", img: TABLE_IMG },
  { title: "Кровать «Массив»", category: "Спальня", price: "от 200 000 ₽", img: HERO_IMG },
];

const SERVICES = [
  { icon: "Armchair", title: "Авторская мебель", desc: "Проектирование и изготовление уникальных изделий по индивидуальным чертежам с учётом ваших предпочтений", price: "от 90 000 ₽" },
  { icon: "UtensilsCrossed", title: "Кухонные гарнитуры", desc: "Функциональные и эстетичные кухни из массива ценных пород дерева с интегрированными решениями", price: "от 350 000 ₽" },
  { icon: "Library", title: "Библиотеки и стеллажи", desc: "Встроенные системы хранения, книжные шкафы и стеллажи с деталями ручной работы", price: "от 150 000 ₽" },
  { icon: "DoorOpen", title: "Двери и панели", desc: "Массивные двери, декоративные панели и обшивка стен из натурального дерева", price: "от 60 000 ₽" },
  { icon: "Bed", title: "Спальные гарнитуры", desc: "Кровати, комоды, прикроватные тумбы — единый стиль для вашей спальни", price: "от 200 000 ₽" },
  { icon: "Star", title: "Реставрация", desc: "Бережное восстановление антикварной и старинной мебели с сохранением исторической ценности", price: "по запросу" },
];

const PROCESS = [
  { num: "01", title: "Консультация", desc: "Встреча в мастерской или онлайн. Обсуждаем задачу, стиль, материалы и сроки" },
  { num: "02", title: "Проект", desc: "3D-визуализация и чертежи. Вы увидите изделие до начала работ" },
  { num: "03", title: "Договор", desc: "Фиксируем стоимость, сроки и все параметры в официальном договоре" },
  { num: "04", title: "Производство", desc: "Создание изделия в мастерской. Фото-отчёт каждые 3–5 дней" },
  { num: "05", title: "Доставка", desc: "Доставка, профессиональная сборка и установка в вашем доме" },
];

const REVIEWS = [
  { name: "Елена Соколова", role: "Владелица частного дома", text: "Артём создал для нас библиотеку мечты. Учёл каждую мелочь — от высоты полок до формы ручек. Это произведение искусства, которое живёт в нашем доме.", rating: 5 },
  { name: "Михаил Ветров", role: "Ресторатор", text: "Заказывали мебель для ресторана. Результат превзошёл все ожидания — гости постоянно спрашивают, кто делал столы. Работаем уже на второй объект.", rating: 5 },
  { name: "Наталья Крамер", role: "Дизайнер интерьера", text: "Сотрудничаем на многих проектах. Артём всегда точно воплощает дизайнерский замысел. Рекомендую коллегам без раздумий.", rating: 5 },
];

const MATERIALS = [
  { id: "oak", name: "Дуб", coeff: 1.0, desc: "Прочный, с выразительной текстурой" },
  { id: "walnut", name: "Орех", coeff: 1.6, desc: "Благородный, тёмный оттенок" },
  { id: "ash", name: "Ясень", coeff: 1.2, desc: "Светлый, эластичный" },
  { id: "wenge", name: "Венге", coeff: 2.1, desc: "Экзотический, премиум-класс" },
  { id: "cherry", name: "Вишня", coeff: 1.8, desc: "Красивый цвет, редкость" },
];

const COMPLEXITY = [
  { id: "simple", name: "Простое", coeff: 1.0, desc: "Прямые линии, минимум деталей" },
  { id: "medium", name: "Среднее", coeff: 1.5, desc: "Изгибы, резьба, фасоны" },
  { id: "complex", name: "Сложное", coeff: 2.2, desc: "Ручная резьба, инкрустация" },
];

const BASE_PRICES: Record<string, number> = {
  table: 85000,
  wardrobe: 160000,
  kitchen: 280000,
  bed: 120000,
  shelving: 95000,
};

const PRODUCT_NAMES: Record<string, string> = {
  table: "Стол",
  wardrobe: "Гардероб",
  kitchen: "Кухня",
  bed: "Кровать",
  shelving: "Стеллаж",
};

function useIntersection(ref: React.RefObject<Element>, threshold = 0.12) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref, threshold]);
  return visible;
}

function AnimatedSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null!);
  const visible = useIntersection(ref);
  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}
    >
      {children}
    </div>
  );
}

export default function Index() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activePortfolioFilter, setActivePortfolioFilter] = useState("Все");
  const [selectedProduct, setSelectedProduct] = useState("table");
  const [selectedMaterial, setSelectedMaterial] = useState("oak");
  const [selectedComplexity, setSelectedComplexity] = useState("simple");
  const [size, setSize] = useState(4);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const calcPrice = () => {
    const base = BASE_PRICES[selectedProduct] || 85000;
    const mat = MATERIALS.find(m => m.id === selectedMaterial)?.coeff || 1;
    const comp = COMPLEXITY.find(c => c.id === selectedComplexity)?.coeff || 1;
    const sizeCoeff = 0.5 + size * 0.15;
    return Math.round(base * mat * comp * sizeCoeff / 1000) * 1000;
  };

  const portfolioCategories = ["Все", "Мебель", "Хранение", "Кухня", "Спальня"];
  const filteredPortfolio = activePortfolioFilter === "Все"
    ? PORTFOLIO
    : PORTFOLIO.filter(p => p.category === activePortfolioFilter);

  const navLinks = [
    { href: "#about", label: "О мастере" },
    { href: "#portfolio", label: "Портфолио" },
    { href: "#services", label: "Услуги" },
    { href: "#process", label: "Процесс" },
    { href: "#calculator", label: "Калькулятор" },
    { href: "#reviews", label: "Отзывы" },
    { href: "#contacts", label: "Контакты" },
  ];

  return (
    <div className="grain-overlay min-h-screen" style={{ backgroundColor: "var(--wenge)", color: "var(--cream)" }}>

      {/* NAV */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "py-3 border-b" : "py-6"}`}
        style={{
          backgroundColor: scrolled ? "rgba(18,15,10,0.97)" : "transparent",
          borderColor: scrolled ? "rgba(201,168,76,0.2)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none"
        }}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <a href="#" className="flex flex-col leading-tight">
            <span className="font-cormorant text-xl font-light tracking-widest" style={{ color: "var(--cream)" }}>АРТЁМ ЛЕСНОЙ</span>
            <span className="section-label" style={{ fontSize: "0.55rem", letterSpacing: "0.25em" }}>МАСТЕР СТОЛЯРНОГО ДЕЛА</span>
          </a>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map(link => (
              <a key={link.href} href={link.href}
                className="font-montserrat text-xs tracking-widest uppercase transition-colors duration-300 hover:text-gold"
                style={{ color: "var(--cream-muted)" }}>
                {link.label}
              </a>
            ))}
          </div>

          <a href="#contacts" className="hidden lg:block btn-gold px-6 py-2.5 text-xs tracking-widest uppercase font-montserrat cursor-pointer">
            Связаться
          </a>

          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden p-2" style={{ color: "var(--cream)" }}>
            <Icon name={mobileMenuOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden border-t" style={{ backgroundColor: "rgba(18,15,10,0.98)", borderColor: "rgba(201,168,76,0.2)" }}>
            <div className="px-6 py-6 flex flex-col gap-5">
              {navLinks.map(link => (
                <a key={link.href} href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-montserrat text-xs tracking-widest uppercase"
                  style={{ color: "var(--cream-muted)" }}>
                  {link.label}
                </a>
              ))}
              <a href="#contacts" onClick={() => setMobileMenuOpen(false)}
                className="btn-gold px-6 py-3 text-xs tracking-widest uppercase font-montserrat text-center mt-2">
                Связаться
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section className="relative min-h-screen flex items-end pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="Мастерская" className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(18,15,10,0.3) 0%, rgba(18,15,10,0.5) 40%, rgba(18,15,10,0.93) 100%)" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(18,15,10,0.6) 0%, transparent 60%)" }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 w-full">
          <div className="max-w-2xl">
            <div className="animate-fade-in-up opacity-0" style={{ animationFillMode: "forwards" }}>
              <p className="section-label mb-6">Авторская столярная мастерская · Москва</p>
            </div>
            <h1 className="font-cormorant animate-fade-in-up opacity-0 delay-200 mb-6"
              style={{ fontSize: "clamp(3rem, 7vw, 6rem)", lineHeight: "1.05", fontWeight: 300, animationFillMode: "forwards", color: "var(--cream)" }}>
              Дерево,<br />
              <em style={{ color: "var(--gold-light)" }}>обретающее</em><br />
              форму
            </h1>
            <p className="font-montserrat font-light mb-10 animate-fade-in-up opacity-0 delay-400 leading-relaxed"
              style={{ color: "var(--cream-muted)", fontSize: "1rem", maxWidth: "480px", animationFillMode: "forwards" }}>
              Изделия из массива ценных пород дерева. Каждый предмет — единственный в своём роде,
              созданный под конкретного человека и пространство.
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-in-up opacity-0 delay-600" style={{ animationFillMode: "forwards" }}>
              <a href="#portfolio" className="btn-gold px-8 py-4 text-xs tracking-widest uppercase font-montserrat inline-block">
                Посмотреть работы
              </a>
              <a href="#calculator" className="btn-outline-gold px-8 py-4 text-xs tracking-widest uppercase font-montserrat inline-block">
                Рассчитать стоимость
              </a>
            </div>
          </div>

          <div className="flex flex-wrap gap-12 mt-16 pt-10 border-t" style={{ borderColor: "rgba(201,168,76,0.2)" }}>
            {[
              { num: "12+", label: "Лет мастерства" },
              { num: "340", label: "Реализованных проектов" },
              { num: "100%", label: "Натуральные материалы" },
            ].map((stat, i) => (
              <div key={i} className="animate-fade-in-up opacity-0" style={{ animationDelay: `${0.7 + i * 0.1}s`, animationFillMode: "forwards" }}>
                <div className="font-cormorant text-4xl font-light" style={{ color: "var(--gold)" }}>{stat.num}</div>
                <div className="font-montserrat text-xs tracking-widest uppercase mt-1" style={{ color: "var(--cream-muted)" }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-8 right-8 flex flex-col items-center gap-2 animate-fade-in opacity-0 delay-700" style={{ animationFillMode: "forwards" }}>
          <div className="w-px h-12" style={{ background: "linear-gradient(180deg, var(--gold), transparent)" }} />
          <span className="font-montserrat text-xs tracking-widest" style={{ color: "var(--gold)", writingMode: "vertical-rl" }}>SCROLL</span>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <AnimatedSection>
              <div className="relative">
                <img src={MASTER_IMG} alt="Мастер" className="w-full aspect-[3/4] object-cover" style={{ filter: "grayscale(20%)" }} />
                <div className="absolute -bottom-6 -right-6 p-8 border"
                  style={{ backgroundColor: "var(--wenge-light)", borderColor: "rgba(201,168,76,0.3)" }}>
                  <div className="font-cormorant text-5xl font-light" style={{ color: "var(--gold)" }}>12</div>
                  <div className="font-montserrat text-xs tracking-widest uppercase mt-1" style={{ color: "var(--cream-muted)" }}>лет опыта</div>
                </div>
                <div className="absolute top-6 -left-4 w-16 h-16 border" style={{ borderColor: "var(--gold)", borderWidth: "1px" }} />
              </div>
            </AnimatedSection>

            <AnimatedSection className="lg:pl-8">
              <p className="section-label mb-4">О мастере</p>
              <h2 className="font-cormorant mb-6" style={{ fontSize: "clamp(2.5rem, 4vw, 3.8rem)", lineHeight: 1.1, fontWeight: 300, color: "var(--cream)" }}>
                Артём Лесной —<br />
                <em style={{ color: "var(--gold-light)" }}>философия дерева</em>
              </h2>
              <div className="gold-divider mb-8" />
              <p className="font-montserrat font-light leading-loose mb-6" style={{ color: "var(--cream-muted)", fontSize: "0.9rem" }}>
                Более двенадцати лет я работаю с деревом — не просто как с материалом, а как с живым
                носителем истории. Каждая порода имеет свой характер, и моя задача — услышать его и
                воплотить в изделии, которое прослужит поколениям.
              </p>
              <p className="font-montserrat font-light leading-loose mb-10" style={{ color: "var(--cream-muted)", fontSize: "0.9rem" }}>
                Окончил Строгановское училище, прошёл стажировку в мастерских Флоренции. Использую
                исключительно ручной инструмент там, где это важно — чтобы каждая деталь была
                прикосновением человека, а не машины.
              </p>
              <div className="grid grid-cols-2 gap-6">
                {[
                  { icon: "Award", text: "Диплом Строгановского училища" },
                  { icon: "Globe", text: "Стажировка во Флоренции" },
                  { icon: "Hammer", text: "Ручная работа в ключевых деталях" },
                  { icon: "Leaf", text: "Только сертифицированное дерево" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Icon name={item.icon} size={16} className="mt-0.5 flex-shrink-0" style={{ color: "var(--gold)" }} />
                    <span className="font-montserrat text-xs leading-relaxed" style={{ color: "var(--cream-muted)" }}>{item.text}</span>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <div className="gold-divider" />

      {/* PORTFOLIO */}
      <section id="portfolio" className="py-28">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <p className="section-label mb-4">Избранные работы</p>
            <h2 className="font-cormorant" style={{ fontSize: "clamp(2.5rem, 4vw, 3.5rem)", fontWeight: 300, color: "var(--cream)" }}>
              Портфолио
            </h2>
          </AnimatedSection>

          <AnimatedSection className="flex flex-wrap justify-center gap-3 mb-12">
            {portfolioCategories.map(cat => (
              <button key={cat} onClick={() => setActivePortfolioFilter(cat)}
                className="font-montserrat text-xs tracking-widest uppercase px-5 py-2.5 border transition-all duration-300"
                style={{
                  borderColor: activePortfolioFilter === cat ? "var(--gold)" : "rgba(201,168,76,0.2)",
                  color: activePortfolioFilter === cat ? "var(--gold)" : "var(--cream-muted)",
                  backgroundColor: activePortfolioFilter === cat ? "rgba(201,168,76,0.08)" : "transparent"
                }}>
                {cat}
              </button>
            ))}
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPortfolio.map((item, i) => (
              <AnimatedSection key={i}>
                <div className="portfolio-item cursor-pointer group" style={{ aspectRatio: "4/3" }}>
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 flex flex-col justify-end p-6 z-10">
                    <span className="section-label mb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">{item.category}</span>
                    <h3 className="font-cormorant text-xl font-light" style={{ color: "var(--cream)" }}>{item.title}</h3>
                    <span className="font-montserrat text-xs mt-1" style={{ color: "var(--gold)" }}>{item.price}</span>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <div className="gold-divider" />

      {/* SERVICES */}
      <section id="services" className="py-28" style={{ backgroundColor: "var(--wenge-mid)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <p className="section-label mb-4">Что я создаю</p>
            <h2 className="font-cormorant" style={{ fontSize: "clamp(2.5rem, 4vw, 3.5rem)", fontWeight: 300, color: "var(--cream)" }}>
              Услуги
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((service, i) => (
              <AnimatedSection key={i}>
                <div className="border p-8 h-full transition-all duration-300 hover:border-gold group cursor-pointer"
                  style={{ borderColor: "rgba(201,168,76,0.15)", backgroundColor: "rgba(18,15,10,0.5)" }}>
                  <div className="w-12 h-12 flex items-center justify-center border mb-6 group-hover:border-gold transition-colors duration-300"
                    style={{ borderColor: "rgba(201,168,76,0.3)" }}>
                    <Icon name={service.icon} size={20} style={{ color: "var(--gold)" }} />
                  </div>
                  <h3 className="font-cormorant text-xl mb-3" style={{ color: "var(--cream)" }}>{service.title}</h3>
                  <p className="font-montserrat text-xs leading-relaxed mb-6" style={{ color: "var(--cream-muted)" }}>{service.desc}</p>
                  <div className="font-cormorant text-lg" style={{ color: "var(--gold)" }}>{service.price}</div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <div className="gold-divider" />

      {/* PROCESS */}
      <section id="process" className="py-28">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="text-center mb-20">
            <p className="section-label mb-4">Как мы работаем</p>
            <h2 className="font-cormorant" style={{ fontSize: "clamp(2.5rem, 4vw, 3.5rem)", fontWeight: 300, color: "var(--cream)" }}>
              Процесс создания
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-5 gap-0">
            {PROCESS.map((step, i) => (
              <AnimatedSection key={i}>
                <div className="relative p-6 text-center group">
                  {i < PROCESS.length - 1 && (
                    <div className="hidden md:block absolute top-10 left-1/2 w-full h-px"
                      style={{ background: "linear-gradient(90deg, rgba(201,168,76,0.4), rgba(201,168,76,0.1))" }} />
                  )}
                  <div className="relative z-10 w-20 h-20 mx-auto mb-6 flex items-center justify-center border-2 transition-all duration-300 group-hover:border-gold"
                    style={{ borderColor: "rgba(201,168,76,0.3)", borderRadius: "50%" }}>
                    <span className="font-cormorant text-2xl font-light" style={{ color: "var(--gold)" }}>{step.num}</span>
                  </div>
                  <h3 className="font-cormorant text-lg mb-2" style={{ color: "var(--cream)" }}>{step.title}</h3>
                  <p className="font-montserrat text-xs leading-relaxed" style={{ color: "var(--cream-muted)" }}>{step.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <div className="gold-divider" />

      {/* CALCULATOR */}
      <section id="calculator" className="py-28" style={{ backgroundColor: "var(--wenge-mid)" }}>
        <div className="max-w-5xl mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <p className="section-label mb-4">Предварительный расчёт</p>
            <h2 className="font-cormorant mb-4" style={{ fontSize: "clamp(2.5rem, 4vw, 3.5rem)", fontWeight: 300, color: "var(--cream)" }}>
              Калькулятор стоимости
            </h2>
            <p className="font-montserrat text-sm font-light" style={{ color: "var(--cream-muted)" }}>
              Укажите параметры изделия — получите предварительную оценку
            </p>
          </AnimatedSection>

          <AnimatedSection>
            <div className="border p-10 lg:p-14" style={{ borderColor: "rgba(201,168,76,0.2)", backgroundColor: "rgba(18,15,10,0.6)" }}>
              <div className="grid lg:grid-cols-2 gap-14">
                <div className="space-y-10">
                  <div>
                    <label className="section-label block mb-4">Тип изделия</label>
                    <div className="grid grid-cols-2 gap-2">
                      {Object.entries(PRODUCT_NAMES).map(([id, name]) => (
                        <button key={id} onClick={() => setSelectedProduct(id)}
                          className="py-3 px-4 border text-left font-montserrat text-xs tracking-wider transition-all duration-300"
                          style={{
                            borderColor: selectedProduct === id ? "var(--gold)" : "rgba(201,168,76,0.2)",
                            color: selectedProduct === id ? "var(--gold)" : "var(--cream-muted)",
                            backgroundColor: selectedProduct === id ? "rgba(201,168,76,0.08)" : "transparent"
                          }}>
                          {name}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="section-label block mb-4">Материал</label>
                    <div className="space-y-2">
                      {MATERIALS.map(mat => (
                        <button key={mat.id} onClick={() => setSelectedMaterial(mat.id)}
                          className="w-full py-3 px-4 border flex items-center justify-between font-montserrat text-xs tracking-wider transition-all duration-300"
                          style={{
                            borderColor: selectedMaterial === mat.id ? "var(--gold)" : "rgba(201,168,76,0.2)",
                            color: selectedMaterial === mat.id ? "var(--gold)" : "var(--cream-muted)",
                            backgroundColor: selectedMaterial === mat.id ? "rgba(201,168,76,0.08)" : "transparent"
                          }}>
                          <span>{mat.name}</span>
                          <span className="opacity-60">{mat.desc}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-10">
                  <div>
                    <label className="section-label block mb-4">Сложность изготовления</label>
                    <div className="space-y-2">
                      {COMPLEXITY.map(comp => (
                        <button key={comp.id} onClick={() => setSelectedComplexity(comp.id)}
                          className="w-full py-3 px-4 border flex items-center justify-between font-montserrat text-xs tracking-wider transition-all duration-300"
                          style={{
                            borderColor: selectedComplexity === comp.id ? "var(--gold)" : "rgba(201,168,76,0.2)",
                            color: selectedComplexity === comp.id ? "var(--gold)" : "var(--cream-muted)",
                            backgroundColor: selectedComplexity === comp.id ? "rgba(201,168,76,0.08)" : "transparent"
                          }}>
                          <span>{comp.name}</span>
                          <span className="opacity-60">{comp.desc}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <label className="section-label">Размер / объём</label>
                      <span className="font-cormorant text-xl" style={{ color: "var(--gold)" }}>{size} / 10</span>
                    </div>
                    <input type="range" min={1} max={10} value={size}
                      onChange={e => setSize(Number(e.target.value))}
                      className="w-full" style={{ accentColor: "var(--gold)" }} />
                    <div className="flex justify-between mt-2 font-montserrat text-xs" style={{ color: "var(--cream-muted)" }}>
                      <span>Малое</span><span>Среднее</span><span>Большое</span>
                    </div>
                  </div>

                  <div className="border-t pt-10" style={{ borderColor: "rgba(201,168,76,0.2)" }}>
                    <p className="section-label mb-2">Предварительная стоимость</p>
                    <div className="font-cormorant mb-4" style={{ fontSize: "3rem", lineHeight: 1, color: "var(--gold)", fontWeight: 300 }}>
                      {calcPrice().toLocaleString("ru")} ₽
                    </div>
                    <p className="font-montserrat text-xs leading-relaxed mb-8" style={{ color: "var(--cream-muted)" }}>
                      Итоговая стоимость определяется после консультации и зависит от точных размеров, конструкции и дополнительных деталей.
                    </p>
                    <a href="#contacts" className="btn-gold px-8 py-4 text-xs tracking-widest uppercase font-montserrat inline-block w-full text-center">
                      Обсудить проект
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <div className="gold-divider" />

      {/* REVIEWS */}
      <section id="reviews" className="py-28">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <p className="section-label mb-4">Мнения клиентов</p>
            <h2 className="font-cormorant" style={{ fontSize: "clamp(2.5rem, 4vw, 3.5rem)", fontWeight: 300, color: "var(--cream)" }}>
              Отзывы
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-6">
            {REVIEWS.map((review, i) => (
              <AnimatedSection key={i}>
                <div className="border p-8 h-full flex flex-col"
                  style={{ borderColor: "rgba(201,168,76,0.15)", backgroundColor: "rgba(28,23,16,0.5)" }}>
                  <div className="flex gap-1 mb-6">
                    {Array.from({ length: review.rating }).map((_, j) => (
                      <span key={j} style={{ color: "var(--gold)", fontSize: "0.75rem" }}>★</span>
                    ))}
                  </div>
                  <p className="font-cormorant text-lg italic flex-1 mb-8" style={{ color: "var(--cream)", lineHeight: 1.7 }}>
                    «{review.text}»
                  </p>
                  <div className="border-t pt-6" style={{ borderColor: "rgba(201,168,76,0.15)" }}>
                    <div className="font-montserrat text-sm font-medium" style={{ color: "var(--cream)" }}>{review.name}</div>
                    <div className="font-montserrat text-xs mt-1" style={{ color: "var(--cream-muted)" }}>{review.role}</div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <div className="gold-divider" />

      {/* CONTACTS */}
      <section id="contacts" className="py-28" style={{ backgroundColor: "var(--wenge-mid)" }}>
        <div className="max-w-5xl mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <p className="section-label mb-4">Начать проект</p>
            <h2 className="font-cormorant mb-4" style={{ fontSize: "clamp(2.5rem, 4vw, 3.5rem)", fontWeight: 300, color: "var(--cream)" }}>
              Свяжитесь со мной
            </h2>
            <p className="font-montserrat text-sm font-light" style={{ color: "var(--cream-muted)" }}>
              Расскажите о вашей идее — я отвечу в течение нескольких часов
            </p>
          </AnimatedSection>

          <AnimatedSection>
            <div className="grid lg:grid-cols-5 gap-12 items-start">
              <div className="lg:col-span-2 space-y-8">
                {[
                  { icon: "Phone", label: "Телефон", value: "+7 (999) 123-45-67" },
                  { icon: "Mail", label: "Email", value: "artem@lesnoj.ru" },
                  { icon: "MapPin", label: "Мастерская", value: "Москва, ул. Столярная, 12" },
                  { icon: "Clock", label: "Часы работы", value: "Пн–Пт: 10:00 – 19:00" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-10 h-10 border flex items-center justify-center flex-shrink-0"
                      style={{ borderColor: "rgba(201,168,76,0.3)" }}>
                      <Icon name={item.icon} size={16} style={{ color: "var(--gold)" }} />
                    </div>
                    <div>
                      <div className="section-label mb-0.5">{item.label}</div>
                      <div className="font-montserrat text-sm" style={{ color: "var(--cream)" }}>{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="lg:col-span-3 border p-8" style={{ borderColor: "rgba(201,168,76,0.2)" }}>
                <form className="space-y-5" onSubmit={e => e.preventDefault()}>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="section-label block mb-2">Имя</label>
                      <input type="text" placeholder="Ваше имя"
                        className="w-full border bg-transparent px-4 py-3 font-montserrat text-sm outline-none transition-colors duration-300 focus:border-gold"
                        style={{ borderColor: "rgba(201,168,76,0.2)", color: "var(--cream)" }} />
                    </div>
                    <div>
                      <label className="section-label block mb-2">Телефон</label>
                      <input type="tel" placeholder="+7 (___) ___-__-__"
                        className="w-full border bg-transparent px-4 py-3 font-montserrat text-sm outline-none transition-colors duration-300 focus:border-gold"
                        style={{ borderColor: "rgba(201,168,76,0.2)", color: "var(--cream)" }} />
                    </div>
                  </div>
                  <div>
                    <label className="section-label block mb-2">Расскажите о проекте</label>
                    <textarea rows={5} placeholder="Что хотите создать? Размеры, материалы, пожелания..."
                      className="w-full border bg-transparent px-4 py-3 font-montserrat text-sm outline-none transition-colors duration-300 focus:border-gold resize-none"
                      style={{ borderColor: "rgba(201,168,76,0.2)", color: "var(--cream)" }} />
                  </div>
                  <button type="submit" className="btn-gold w-full py-4 text-xs tracking-widest uppercase font-montserrat">
                    Отправить запрос
                  </button>
                  <p className="font-montserrat text-xs text-center" style={{ color: "var(--cream-muted)" }}>
                    Нажимая кнопку, вы соглашаетесь с политикой обработки персональных данных
                  </p>
                </form>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 border-t" style={{ borderColor: "rgba(201,168,76,0.15)", backgroundColor: "var(--wenge)" }}>
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <div className="font-cormorant text-lg font-light tracking-widest" style={{ color: "var(--cream)" }}>АРТЁМ ЛЕСНОЙ</div>
            <div className="section-label mt-0.5" style={{ fontSize: "0.55rem" }}>МАСТЕР СТОЛЯРНОГО ДЕЛА</div>
          </div>
          <div className="font-montserrat text-xs" style={{ color: "var(--cream-muted)" }}>
            © 2026 Авторская мастерская Артёма Лесного
          </div>
          <div className="flex gap-4">
            {["Instagram", "MessageCircle"].map((icon, i) => (
              <a key={i} href="#" className="w-9 h-9 border flex items-center justify-center transition-colors duration-300 hover:border-gold"
                style={{ borderColor: "rgba(201,168,76,0.2)" }}>
                <Icon name={icon} size={14} style={{ color: "var(--gold)" }} />
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}