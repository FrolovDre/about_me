// Файл с данными для сайта. Замените значения на свои, чтобы обновить контент.

export interface Project {
  slug: string; // используется в URL /projects/[slug]
  title: string;
  summary: string;
  role: string;
  stack: string[];
  metrics: string[];
  links: { label: string; url: string }[];
  details: string;
  image: string; // путь в папке public
}

export interface Experience {
  company: string;
  position: string;
  period: string;
  location?: string;
  summary: string;
}

export interface Education {
  institution: string;
  degree: string;
  period: string;
  description?: string;
}

export interface Certificate {
  title: string;
  issuer: string;
  year: string;
  description?: string;
}

export interface ProfileData {
  name: string;
  role: string;
  tagline: string;
  about: string;
  whatILookFor: string;
  contact: {
    email: string;
    phone?: string;
    location?: string;
    socials: { label: string; url: string }[];
  };
  skills: {
    category: string;
    items: string[];
  }[];
  projects: Project[];
  experience: Experience[];
  education: Education[];
  certificates: Certificate[];
}

const profile: ProfileData = {
  // Имя и основная роль
  name: '<<МОЁ_ИМЯ>>',
  role: 'Product / Analytics / PM',
  // Короткий слоган, который кратко описывает вашу ценность
  tagline: 'Создаю цифровые продукты с акцентом на данные и пользовательский опыт',
  // Описание обо мне
  about:
    'Краткое описание вашего профессионального опыта и ключевых компетенций. Здесь можно рассказать о том, какие задачи вы решаете, какие методологии применяете и что вас вдохновляет. Этот текст отображается в разделе «Обо мне» на главной странице.',
  // Что вы ищете — тип проекта, формат работы, география
  whatILookFor:
    'Ищу возможности в продуктовой аналитике и управлении проектами, где могу объединить данные и стратегию для достижения бизнес‑целей. Рассматриваю удалённый формат работы.',
  // Контактные данные
  contact: {
    email: 'you@example.com',
    phone: '+7 (000) 000‑00‑00',
    location: 'Москва, Россия',
    socials: [
      { label: 'LinkedIn', url: 'https://linkedin.com/in/your-profile' },
      { label: 'GitHub', url: 'https://github.com/your-username' },
      { label: 'Telegram', url: 'https://t.me/yourusername' },
    ],
  },
  // Навыки сгруппированы по категориям. Добавьте нужные и удалите лишние.
  skills: [
    {
      category: 'Продукт',
      items: [
        'Product discovery',
        'Benchmarking',
        'User research',
        'Lean Canvas',
        'MVP design',
      ],
    },
    {
      category: 'Аналитика',
      items: [
        'SQL',
        'A/B testing',
        'KPI design',
        'Data visualization',
        'Customer segmentation',
      ],
    },
    {
      category: 'Менеджмент',
      items: ['Agile/Scrum', 'Kanban', 'Jira', 'Confluence', 'MS Project'],
    },
    {
      category: 'Технологии',
      items: ['Python', 'Figma', 'Miro', 'API', 'LLM workflows'],
    },
  ],
  // Проекты — ключевой раздел. Заполняйте реальные проекты на основе резюме.
  projects: [
    {
      slug: 'ai-reporting-tool',
      title: 'AI‑платформа для аналитических отчётов',
      summary:
        'Разработка MVP платформы для генерации отчётов на основе искусственного интеллекта. Проект включал построение пайплайна сбора данных, использование LLM для поиска и подготовку дашбордов.',
      role: 'Product Analyst / PM',
      stack: ['Python', 'LLM', 'Weaviate', 'Hugging Face', 'GitHub'],
      metrics: [
        'Сокращение времени подготовки отчётов на 50%',
        'Увеличение охвата источников данных до 90%',
        'Разработан и протестирован MVP за 3 месяца',
      ],
      links: [
        { label: 'GitHub', url: '#' },
        { label: 'Презентация', url: '#' },
      ],
      details:
        'В рамках проекта была проведена глубокая проработка use‑case: сформированы ключевые метрики (Time‑to‑Report, Evidence Coverage, Adoption Rate), проведён конкурентный анализ, спроектирован Lean Canvas. На базе векторной БД и LLM был реализован прототип, который позволил пользователям получать отчёты в несколько кликов.',
      image: '/images/project-ai-report.png',
    },
    {
      slug: 'genz-platform',
      title: 'Платформа для поиска мероприятий для поколения Z',
      summary:
        'Исследование и разработка концепции мобильного сервиса по подбору мероприятий для молодых пользователей. Проведён анализ болей целевой аудитории и разработан прототип в Figma.',
      role: 'Product Researcher',
      stack: ['Figma', 'User research', 'JTBD', 'Market analysis'],
      metrics: [
        'Проведено 25+ глубинных интервью',
        'Определены ключевые сценарии и мотиваторы Gen Z',
        'Сформирован roadmap MVP и North Star Metric',
      ],
      links: [
        { label: 'Прототип', url: '#' },
      ],
      details:
        'В ходе работы была изучена конкурентная среда, проведены CJM и Jobs‑To‑Be‑Done интервью. На их основе создан интерактивный прототип сервиса в Figma и разработан бизнес‑план с ключевыми KPI (CPA, retention).',
      image: '/images/project-genz.png',
    },
    {
      slug: 'enterprise-architecture',
      title: 'Проектирование корпоративной архитектуры',
      summary:
        'Описание текущей архитектуры предприятия и формирование целевой модели (To‑Be) с использованием ArchiMate. Подготовка дорожной карты внедрения.',
      role: 'Enterprise Architect',
      stack: ['ArchiMate', 'Business Architecture'],
      metrics: [
        'Визуализированы 20+ бизнес‑процессов',
        'Сформирована целевая архитектура и дорожная карта',
      ],
      links: [
        { label: 'Документация', url: '#' },
      ],
      details:
        'Проведён анализ текущего состояния (As‑Is) с последующим моделированием целевой архитектуры. Итоговый документ содержит описание бизнес‑функций, информационных потоков и предложений по их оптимизации.',
      image: '/images/project-architecture.png',
    },
  ],
  // Опыт работы — перечислите компании, должности и основные задачи
  experience: [
    {
      company: 'IBS',
      position: 'Product Analyst / PMO',
      period: '2024 – н.в.',
      location: 'Москва, Россия',
      summary:
        'Управление портфелем проектов: анализ требований, настройка процессов в Jira и Confluence, подготовка отчётности для руководства, внедрение AI‑инструментов для автоматизации процессов.',
    },
    {
      company: 'Pirogovo Resort',
      position: 'Организатор мероприятий',
      period: '2023 – 2024',
      location: 'Подмосковье, Россия',
      summary:
        'Планирование и реализация корпоративных и частных мероприятий «под ключ»: от разработки концепции до управления командой и пост‑аналитики.',
    },
    {
      company: 'GetExperts',
      position: 'HR Assistant',
      period: '2023',
      summary:
        'Поддержка процессов подбора персонала, управление базой кандидатов, участие в организации обучающих мероприятий.',
    },
  ],
  // Образование — учебные заведения, степени и годы
  education: [
    {
      institution: '<<МОЙ ВУЗ>>',
      degree: 'Бакалавриат, направление «Бизнес‑информатика»',
      period: '2022 – 2026',
      description: 'Курс включает менеджмент, программирование, экономику и аналитические дисциплины.',
    },
  ],
  // Сертификаты и достижения — укажите, если есть
  certificates: [
    {
      title: 'Process Communication Model',
      issuer: 'IBS',
      year: '2025',
      description: 'Сертификация по коммуникационным моделям для эффективной работы в команде.',
    },
  ],
};

export default profile;