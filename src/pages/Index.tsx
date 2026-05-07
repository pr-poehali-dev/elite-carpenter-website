import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

type AnyString = string;

const HERO_IMG = "https://cdn.poehali.dev/projects/3183216a-e9d1-46be-9b8c-0fe22b3effd3/files/07953faf-ac72-440c-a416-a12bf850d05c.jpg";
const MASTER_IMG = "https://cdn.poehali.dev/projects/3183216a-e9d1-46be-9b8c-0fe22b3effd3/files/5578edd8-2d2e-4156-8a33-80e30f72bdd5.jpg";
const TABLE_IMG = "https://cdn.poehali.dev/projects/3183216a-e9d1-46be-9b8c-0fe22b3effd3/files/f9946736-63c3-4c0d-b9f5-4c8322a285ea.jpg";

const CANOPY_IMG = "https://cdn.poehali.dev/projects/3183216a-e9d1-46be-9b8c-0fe22b3effd3/bucket/14e2befd-b035-44c0-a074-f5f124456534.jpg";
const SAUNA_IMG = "https://cdn.poehali.dev/projects/3183216a-e9d1-46be-9b8c-0fe22b3effd3/bucket/247e4162-1881-4ebc-b293-278037e205c8.jpg";
const CLOSED_GAZEBO_IMG = "https://cdn.poehali.dev/projects/3183216a-e9d1-46be-9b8c-0fe22b3effd3/bucket/9079f78d-5f31-4db7-9285-4d42432daee6.jpg";
const TENT_IMG = "https://cdn.poehali.dev/projects/3183216a-e9d1-46be-9b8c-0fe22b3effd3/bucket/a9d8e5b4-3014-4687-8cdc-e80cecdc64e9.jpg";
const TERRACE_IMG = "https://cdn.poehali.dev/projects/3183216a-e9d1-46be-9b8c-0fe22b3effd3/bucket/e024cf47-19f4-43b5-8b38-0caa0cf6c5d0.png";
const TIMBER_GAZEBO_IMG = "https://cdn.poehali.dev/projects/3183216a-e9d1-46be-9b8c-0fe22b3effd3/bucket/936c362d-77fe-4fe3-b788-923838f3b35e.png";
const CLADDING_IMG = "https://cdn.poehali.dev/projects/3183216a-e9d1-46be-9b8c-0fe22b3effd3/bucket/9976cacf-a28c-4b4f-8ee5-c59c05f1ef12.png";
const BARN_BATH_IMG = "https://cdn.poehali.dev/projects/3183216a-e9d1-46be-9b8c-0fe22b3effd3/bucket/b23c1256-f302-42bb-a7ef-1f8ca549a561.png";
const FLOOR_IMG = "https://cdn.poehali.dev/projects/3183216a-e9d1-46be-9b8c-0fe22b3effd3/bucket/8592e2ef-491c-43a3-b54c-99004c4a91b5.png";
const FRAME_HOUSE_IMG = "https://cdn.poehali.dev/projects/3183216a-e9d1-46be-9b8c-0fe22b3effd3/bucket/0afb45c4-4d12-4c09-a0f8-d4a5da895bc5.png";

const PORTFOLIO = [
  { title: "Навес под авто", category: "Постройки", price: "от 12 000 ₽/м²", img: CANOPY_IMG },
  { title: "Отделка парилки", category: "Отделка", price: "от 210 000 ₽", img: SAUNA_IMG },
  { title: "Беседка закрытого типа", category: "Постройки", price: "от 450 000 ₽", img: CLOSED_GAZEBO_IMG },
  { title: "Навес-шатёр под мангальную зону", category: "Постройки", price: "от 12 000 ₽/м²", img: TENT_IMG },
  { title: "Беседка из бруса", category: "Постройки", price: "от 12 000 ₽/м²", img: TIMBER_GAZEBO_IMG },
  { title: "Деревянная терраса", category: "Террасы", price: "от 320 000 ₽", img: TERRACE_IMG },
  { title: "Баня в стиле барн / Скандинавия", category: "Постройки", price: "от 25 000 ₽/м²", img: BARN_BATH_IMG },
  { title: "Дом каркасный с панорамными окнами", category: "Постройки", price: "от 50 000 ₽/м²", img: FRAME_HOUSE_IMG },

  { title: "Деревянные полы", category: "Отделка", price: "от 1 200 ₽/м²", img: FLOOR_IMG },
  { title: "Отделка", category: "Отделка", price: "от 1 200 ₽/м²", img: CLADDING_IMG },
];

const SERVICES = [
  { icon: "Home", title: "Деревянные постройки", desc: "Беседки, бани, летние кухни и хозяйственные блоки из качественного бруса и бревна под ключ", price: "от 7 000 ₽/м²" },
  { icon: "Trees", title: "Террасы и веранды", desc: "Открытые и закрытые террасы из лиственницы, сосны или термодерева с долговечным покрытием", price: "от 3 500 ₽/м²" },
  { icon: "Layers", title: "Деревянные полы", desc: "Укладка половой доски, паркета и террасной доски. Шлифовка и покрытие маслом или лаком", price: "от 2 500 ₽/м²" },
  { icon: "LayoutPanelLeft", title: "Обшивка и отделка", desc: "Фасады, стены и потолки из натурального дерева: вагонка, блок-хаус, имитация бруса", price: "от 1 800 ₽/м²" },
  { icon: "DoorOpen", title: "Двери и лестницы", desc: "Массивные межкомнатные двери, входные группы и деревянные лестницы любой сложности", price: "от 45 000 ₽" },
  { icon: "Wrench", title: "Ремонт и реставрация", desc: "Замена венцов, ремонт кровли, конопатка швов и восстановление деревянных конструкций", price: "по запросу" },
  { icon: "CloudRain", title: "Кровельные работы", desc: "Монтаж и ремонт кровли: металлочерепица, профнастил, мягкая кровля, ондулин. Стропильные системы под ключ", price: "от 4 500 ₽/м²" },
  { icon: "ParkingSquare", title: "Навесы", desc: "Навесы для автомобилей, дров, техники и входных групп. Деревянный каркас, поликарбонат или металлочерепица", price: "от 12 000 ₽/м²" },
  { icon: "Sparkles", title: "Нестандартные работы", desc: "Индивидуальные проекты любой сложности — воплотим вашу идею, даже если аналогов нет. Обсуждаем задачу и называем цену после осмотра", price: "договорная" },
];

const PROCESS = [
  { num: "01", title: "Консультация", desc: "Встреча в мастерской или онлайн. Обсуждаем задачу, стиль, материалы и сроки" },
  { num: "02", title: "Проект", desc: "3D-визуализация и чертежи. Вы увидите изделие до начала работ" },
  { num: "03", title: "Договор", desc: "Фиксируем стоимость, сроки и все параметры в официальном договоре" },
  { num: "04", title: "Строительство", desc: "Выезд бригады на объект, строительство под ключ. Фото-отчёт на каждом этапе" },
];

const REVIEWS = [
  { name: "Елена Соколова", role: "Владелица загородного дома", text: "Руслан построил нам беседку и террасу. Работал чисто, в срок, без лишних вопросов. Соседи постоянно спрашивают контакты — всегда передаю с удовольствием.", rating: 5 },
  { name: "Михаил Ветров", role: "Владелец базы отдыха", text: "Заказывали несколько бань и навесов для нашей базы. Руслан справился отлично — конструкции стоят уже третий год, никаких нареканий. Будем обращаться снова.", rating: 5 },
  { name: "Наталья Крамер", role: "Дизайнер интерьера", text: "Сотрудничаем на нескольких объектах. Руслан точно воплощает задумку по проекту, аккуратен и пунктуален. Рекомендую коллегам без раздумий.", rating: 5 },
];

const MATERIALS = [
  { id: "pine", name: "Сосна", coeff: 1.0, desc: "Бюджетно, доступно, популярно" },
  { id: "larch", name: "Лиственница", coeff: 1.4, desc: "Влагостойкая, долговечная" },
  { id: "profiled_timber", name: "Профилированный брус", coeff: 1.3, desc: "Точный профиль, плотные стыки" },
  { id: "glued_timber", name: "Клееный брус", coeff: 1.9, desc: "Не трескается, премиум" },
  { id: "log", name: "Оцилиндрованное бревно", coeff: 1.5, desc: "Классика, эстетика сруба" },
  { id: "oak", name: "Дуб", coeff: 2.2, desc: "Для полов и лестниц, элита" },
  { id: "thermowood", name: "Термодерево", coeff: 2.5, desc: "Для террас и фасадов, не гниёт" },
];

const COMPLEXITY = [
  { id: "simple", name: "Простое", coeff: 1.0, desc: "Прямые линии, минимум деталей" },
  { id: "medium", name: "Среднее", coeff: 1.5, desc: "Изгибы, резьба, фасоны" },
  { id: "complex", name: "Сложное", coeff: 2.2, desc: "Ручная резьба, инкрустация" },
];

// Цена за м²
const BASE_PRICES: Record<string, number> = {
  gazebo: 7000,
  bath: 7000,
  terrace: 3500,
  canopy: 12000,
  floor: 2500,
  cladding: 1800,
  stairs: 45000,
  roofing: 4500,
  custom: 7000,
};

const PRODUCT_NAMES: Record<string, string> = {
  gazebo: "Беседка",
  bath: "Баня",
  terrace: "Терраса / веранда",
  canopy: "Навес",
  floor: "Деревянные полы",
  cladding: "Обшивка и отделка",
  stairs: "Лестница",
  roofing: "Кровельные работы",
  custom: "Нестандартный проект",
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
  const [selectedProduct, setSelectedProduct] = useState("gazebo");
  const [selectedMaterial, setSelectedMaterial] = useState("pine");
  const [selectedComplexity, setSelectedComplexity] = useState("simple");
  const [size, setSize] = useState(20);
  const [scrolled, setScrolled] = useState(false);

  const [formName, setFormName] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formMessage, setFormMessage] = useState("");
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formPhone.trim()) return;
    setFormStatus("sending");
    try {
      const res = await fetch("https://functions.poehali.dev/62865867-06c8-4ef9-b0ac-472511fb5ce5", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: formName, phone: formPhone, message: formMessage })
      });
      if (res.ok) {
        setFormStatus("success");
        setFormName(""); setFormPhone(""); setFormMessage("");
      } else {
        setFormStatus("error");
      }
    } catch {
      setFormStatus("error");
    }
  };

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const calcPrice = () => {
    const pricePerSqm = BASE_PRICES[selectedProduct] || 7000;
    const mat = MATERIALS.find(m => m.id === selectedMaterial)?.coeff || 1;
    const comp = COMPLEXITY.find(c => c.id === selectedComplexity)?.coeff || 1;
    return Math.round(pricePerSqm * size * mat * comp / 1000) * 1000;
  };

  const portfolioCategories = ["Все", "Постройки", "Террасы", "Отделка"];
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
            <span className="font-cormorant text-xl font-light tracking-widest" style={{ color: "var(--cream)" }}>РУСЛАН СВЕТЛЫЙ</span>
            <span className="section-label" style={{ fontSize: "0.55rem", letterSpacing: "0.25em" }}>МАСТЕР ПЛОТНИЦКОГО ДЕЛА</span>
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
              <p className="section-label mb-6">Авторская плотницкая мастерская · Москва</p>
            </div>
            <h1 className="font-cormorant animate-fade-in-up opacity-0 delay-200 mb-6"
              style={{ fontSize: "clamp(3rem, 7vw, 6rem)", lineHeight: "1.05", fontWeight: 300, animationFillMode: "forwards", color: "var(--cream)" }}>
              Дерево,<br />
              <em style={{ color: "var(--gold-light)" }}>обретающее</em><br />
              форму
            </h1>
            <p className="font-montserrat font-light mb-10 animate-fade-in-up opacity-0 delay-400 leading-relaxed"
              style={{ color: "var(--cream-muted)", fontSize: "1rem", maxWidth: "480px", animationFillMode: "forwards" }}>
              Плотницкие работы любой сложности — от беседки до бани. Каждый объект возводится
              с душой, из качественного дерева, с гарантией на результат.
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
              { num: "15+", label: "Лет мастерства" },
              { num: "420", label: "Реализованных объектов" },
              { num: "100%", label: "Натуральная древесина" },
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
                  <div className="font-cormorant text-5xl font-light" style={{ color: "var(--gold)" }}>15</div>
                  <div className="font-montserrat text-xs tracking-widest uppercase mt-1" style={{ color: "var(--cream-muted)" }}>лет опыта</div>
                </div>
                <div className="absolute top-6 -left-4 w-16 h-16 border" style={{ borderColor: "var(--gold)", borderWidth: "1px" }} />
              </div>
            </AnimatedSection>

            <AnimatedSection className="lg:pl-8">
              <p className="section-label mb-4">О мастере</p>
              <h2 className="font-cormorant mb-6" style={{ fontSize: "clamp(2.5rem, 4vw, 3.8rem)", lineHeight: 1.1, fontWeight: 300, color: "var(--cream)" }}>
                Руслан Светлый —<br />
                <em style={{ color: "var(--gold-light)" }}>философия дерева</em>
              </h2>
              <div className="gold-divider mb-8" />
              <p className="font-montserrat font-light leading-loose mb-6" style={{ color: "var(--cream-muted)", fontSize: "0.9rem" }}>
                Более пятнадцати лет я занимаюсь плотницким делом — строю бани, беседки, террасы
                и деревянные дома. Для меня дерево — это живой материал, который требует уважения,
                точного расчёта и опытных рук.
              </p>
              <p className="font-montserrat font-light leading-loose mb-10" style={{ color: "var(--cream-muted)", fontSize: "0.9rem" }}>
                Начинал с малых форм, сейчас берусь за объекты любой сложности. Работаю сам
                и со своей проверенной бригадой — никаких субподрядчиков. Качество контролирую
                лично на каждом этапе.
              </p>
              <div className="grid grid-cols-2 gap-6">
                {[
                  { icon: "Award", text: "15+ лет плотницкого опыта" },
                  { icon: "Users", text: "Своя проверенная бригада" },
                  { icon: "Hammer", text: "Ручная работа без субподрядчиков" },
                  { icon: "Leaf", text: "Только сертифицированная древесина" },
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

          <div className="grid md:grid-cols-4 gap-0 max-w-4xl mx-auto">
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
                      <label className="section-label">Площадь</label>
                      <span className="font-cormorant text-xl" style={{ color: "var(--gold)" }}>{size} м²</span>
                    </div>
                    <input type="range" min={5} max={200} step={1} value={size}
                      onChange={e => setSize(Number(e.target.value))}
                      className="w-full" style={{ accentColor: "var(--gold)" }} />
                    <div className="flex justify-between mt-2 font-montserrat text-xs" style={{ color: "var(--cream-muted)" }}>
                      <span>5 м²</span><span>100 м²</span><span>200 м²</span>
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
                    <button
                      onClick={() => {
                        const productName = PRODUCT_NAMES[selectedProduct] || selectedProduct;
                        const mat = MATERIALS.find(m => m.id === selectedMaterial)?.name || selectedMaterial;
                        const comp = COMPLEXITY.find(c => c.id === selectedComplexity)?.name || selectedComplexity;
                        setFormMessage(`Тип: ${productName}\nПлощадь: ${size} м²\nМатериал: ${mat}\nСложность: ${comp}\nПредварительная стоимость: ${calcPrice().toLocaleString("ru")} ₽`);
                        document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="btn-gold px-8 py-4 text-xs tracking-widest uppercase font-montserrat w-full text-center"
                    >
                      Обсудить проект
                    </button>
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
                  { icon: "Phone", label: "Телефон", value: "+7 905-710-8890" },
                  { icon: "Phone", label: "Менеджер", value: "+7 977-634-1129" },
                  { icon: "Mail", label: "Email", value: "pruddzen@gmail.com" },
                  { icon: "MapPin", label: "Адрес", value: "МО, Кубинка, Наро-Фоминское шоссе, 4" },
                  { icon: "Clock", label: "Время работы", value: "Пн–Сб, 9:00–19:00" },
                  { icon: "FileText", label: "ИНН / ОГРН", value: "644111764152 / 322508100238472" },
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

              <div id="contact-form" className="lg:col-span-3 border p-8" style={{ borderColor: "rgba(201,168,76,0.2)" }}>
                {formStatus === "success" ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center gap-6">
                    <div className="w-16 h-16 border-2 flex items-center justify-center" style={{ borderColor: "var(--gold)", borderRadius: "50%" }}>
                      <Icon name="Check" size={28} style={{ color: "var(--gold)" }} />
                    </div>
                    <div>
                      <h3 className="font-cormorant text-2xl mb-2" style={{ color: "var(--cream)" }}>Заявка отправлена</h3>
                      <p className="font-montserrat text-sm" style={{ color: "var(--cream-muted)" }}>
                        Я свяжусь с вами в ближайшее время
                      </p>
                    </div>
                    <button onClick={() => setFormStatus("idle")} className="btn-outline-gold px-8 py-3 text-xs tracking-widest uppercase font-montserrat">
                      Отправить ещё
                    </button>
                  </div>
                ) : (
                  <form className="space-y-5" onSubmit={handleFormSubmit}>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="section-label block mb-2">Имя *</label>
                        <input type="text" placeholder="Ваше имя" value={formName} onChange={e => setFormName(e.target.value)} required
                          className="w-full border bg-transparent px-4 py-3 font-montserrat text-sm outline-none transition-colors duration-300 focus:border-gold"
                          style={{ borderColor: "rgba(201,168,76,0.2)", color: "var(--cream)" }} />
                      </div>
                      <div>
                        <label className="section-label block mb-2">Телефон *</label>
                        <input type="tel" placeholder="+7 (___) ___-__-__" value={formPhone} onChange={e => setFormPhone(e.target.value)} required
                          className="w-full border bg-transparent px-4 py-3 font-montserrat text-sm outline-none transition-colors duration-300 focus:border-gold"
                          style={{ borderColor: "rgba(201,168,76,0.2)", color: "var(--cream)" }} />
                      </div>
                    </div>
                    <div>
                      <label className="section-label block mb-2">Расскажите о проекте</label>
                      <textarea rows={5} placeholder="Что хотите создать? Размеры, материалы, пожелания..." value={formMessage} onChange={e => setFormMessage(e.target.value)}
                        className="w-full border bg-transparent px-4 py-3 font-montserrat text-sm outline-none transition-colors duration-300 focus:border-gold resize-none"
                        style={{ borderColor: "rgba(201,168,76,0.2)", color: "var(--cream)" }} />
                    </div>
                    {formStatus === "error" && (
                      <p className="font-montserrat text-xs" style={{ color: "#e57373" }}>
                        Не удалось отправить заявку. Попробуйте ещё раз.
                      </p>
                    )}
                    <button type="submit" disabled={formStatus === "sending"}
                      className="btn-gold w-full py-4 text-xs tracking-widest uppercase font-montserrat disabled:opacity-60">
                      {formStatus === "sending" ? "Отправляю..." : "Отправить запрос"}
                    </button>
                    <p className="font-montserrat text-xs text-center" style={{ color: "var(--cream-muted)" }}>
                      Нажимая кнопку, вы соглашаетесь с политикой обработки персональных данных
                    </p>
                  </form>
                )}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 border-t" style={{ borderColor: "rgba(201,168,76,0.15)", backgroundColor: "var(--wenge)" }}>
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <div className="font-cormorant text-lg font-light tracking-widest" style={{ color: "var(--cream)" }}>РУСЛАН СВЕТЛЫЙ</div>
            <div className="section-label mt-0.5" style={{ fontSize: "0.55rem" }}>МАСТЕР ПЛОТНИЦКОГО ДЕЛА</div>
          </div>
          <div className="font-montserrat text-xs" style={{ color: "var(--cream-muted)" }}>
            © 2026 Авторская мастерская Руслана Светлого
          </div>

        </div>
      </footer>
    </div>
  );
}