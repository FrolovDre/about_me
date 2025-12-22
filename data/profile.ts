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
  name: 'Андрей Фролов',
  role: 'Product / Project Manager',
  // Короткий слоган, который кратко описывает вашу ценность
  tagline:
    'Помогаю бизнесу создавать цифровые продукты, совмещая данные, стратегию и заботу о пользователях',
  // Описание обо мне
  about:
    'Магистрант НИУ ВШЭ и выпускник МГУ, увлечён созданием продуктов, которые решают реальные задачи пользователей и приносят измеримую пользу бизнесу. Обладаю сильными аналитическими навыками, опытом работы в Agile‑среде и пониманием полного жизненного цикла продукта. Стремлюсь присоединиться к продуктовой команде, чтобы применять и развивать свои навыки.',
  // Что вы ищете — тип проекта, формат работы, география
  whatILookFor:
    'Ищу стажировку или позицию Junior Product Manager в сфере цифровых продуктов, где смогу объединить аналитические компетенции и менеджерский опыт для создания новых сервисов. Рассматриваю удалённый формат работы.',
  // Контактные данные
  contact: {
    email: '5rolov.a9dr8y@gmail.com',
    phone: '+7 (916) 9238213',
    location: 'Москва (Планерная), Россия',
    socials: [
      { label: 'LinkedIn', url: 'https://linkedin.com/in/andreifrolov' },
      { label: 'GitHub', url: 'https://github.com/FrolovDre' },
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
        'Lean Canvas',
        'MVP design',
        'Go‑to‑market strategy',
      ],
    },
    {
      category: 'Аналитика',
      items: [
        'SQL (базовый)',
        'A/B‑testing',
        'KPI design',
        'Customer segmentation',
        'Financial & strategic analysis',
      ],
    },
    {
      category: 'Менеджмент',
      items: [
        'Agile/Scrum',
        'Kanban',
        'Jira & Confluence',
        'MS Project',
        'PMO & риск‑менеджмент',
      ],
    },
    {
      category: 'Технологии',
      items: [
        'Python',
        'Figma',
        'Miro',
        'ArchiMate',
        'LLM & Weaviate',
      ],
    },
    {
      category: 'Языки',
      items: ['Русский (родной)', 'Английский C1', 'Немецкий A2', 'Французский A1'],
    },
  ],
  // Проекты — реальные кейсы на основе резюме
  projects: [
    {
      slug: 'ai-assistant-research',
      title: 'AI‑ассистент для продуктовых исследований',
      summary:
        'Разработка концепта и прототипа ассистента, который ускоряет конкурентные и рыночные исследования для PM/PA, используя LLM и векторные базы.',
      role: 'Product Analyst / PM',
      stack: ['LLM', 'Weaviate', 'Python', 'Hugging Face', 'GitHub'],
      metrics: [
        'Сокращение времени подготовки аналитических отчётов на 50%',
        'Покрытие 90% релевантных источников данных',
        'MVP реализован за 3 месяца',
      ],
      links: [
        { label: 'Презентация', url: '#' },
      ],
      details:
        'В проекте мы сформулировали гипотезу продукта и ценностное предложение, определили ключевой use‑case, систему метрик (Time‑to‑Report, Evidence Coverage, Adoption Rate) и Lean Canvas. Построили roadmap для MVP с оценкой бюджета и ресурсов. Реализовали прототип на базе векторной БД Weaviate и LLM‑моделей, который позволил получать отчёты по запросу за минуты.',
      image: '/images/project-ai-report.png',
    },
    {
      slug: 'mini-dramas-genz',
      title: 'Стратегия мини‑драм для поколения Z',
      summary:
        'Консультационный проект для онлайн‑кинотеатра: анализ привычек Gen Z, разработка стратегии вертикальных мини‑драм и план запуска нового формата.',
      role: 'Product Researcher / Consultant',
      stack: ['Market research', 'Customer insights', 'Benchmarking', 'Go‑to‑market'],
      metrics: [
        'Проведено 25+ интервью и опросов',
        'Выявлены ключевые боли и мотиваторы Gen Z',
        'Сформирована программа запуска «мини‑драм» с прогнозом затрат',
      ],
      links: [
        { label: 'Презентация', url: '#' },
      ],
      details:
        'Команда проанализировала рынок и восприятие формата Gen Z, сформировала портрет и привычки аудитории, изучила международные аналоги. На основе customer insights и бенчмарков разработали контентную стратегию и список growth‑гипотез. Итогом стал комплексный план запуска мини‑драм с KPI и прогнозом окупаемости.',
      image: '/images/project-genz.png',
    },
    {
      slug: 'education-platform-architecture',
      title: 'Архитектура образовательной платформы',
      summary:
        'Проектирование целевой архитектуры масштабируемой онлайн‑платформы: моделирование бизнес-, приложенческого и технического слоёв с использованием ArchiMate.',
      role: 'Enterprise Architect',
      stack: ['ArchiMate', 'Business Architecture'],
      metrics: [
        'Визуализированы и описаны 20+ бизнес‑процессов',
        'Сформирована To‑Be архитектура и roadmap трансформации',
      ],
      links: [
        { label: 'Документация', url: '#' },
      ],
      details:
        'Проведен анализ As‑Is состояния, составлен каталог сервисов и информационных потоков, описана целевая модель To‑Be. Предложены варианты оптимизации и последовательность внедрения изменений в краткосрочной и среднесрочной перспективе.',
      image: '/images/project-architecture.png',
    },
    {
      slug: 'loyalty-program-aviasales',
      title: 'Программа лояльности для Aviasales',
      summary:
        'Разработка концепции новой программы лояльности: анализ конкурентных программ, сегментация клиентов, дизайн вознаграждений и расчёт ключевых метрик.',
      role: 'Product Analyst / Consultant',
      stack: ['Customer Segmentation', 'Benchmarking', 'KPI design', 'Unit Economics'],
      metrics: [
        'Проанализировано 25+ loyalty‑программ',
        'Построена модель сегментации клиентов и LTV',
        'Разработаны денежные и неденежные механики вознаграждения',
      ],
      links: [
        { label: 'Презентация', url: '#' },
      ],
      details:
        'Проект включал исследование лучших практик лояльности, анализ программы Aviasales и конкурентной среды, сегментацию базы клиентов. На основе исследований предложены новые привилегии, скидки и геймификация. Для оценки окупаемости построена модель CPA и LTV.',
      image: '/images/project-loyalty-aviasales.png',
    },
    {
      slug: 'movie-recommendation-mvp',
      title: 'MVP сервиса рекомендаций фильмов',
      summary:
        'Концепт и интерактивный прототип мобильного приложения для персональных рекомендаций, основанный на анализе поведения и предпочтений пользователей.',
      role: 'Product Designer / Analyst',
      stack: ['Figma', 'PTSS analysis', 'Jobs To Be Done', 'Business Model Canvas'],
      metrics: [
        'Разработан и протестирован прототип в Figma',
        'Определены North Star Metric и метрики удержания',
        'Построено дерево метрик и Business Model Canvas',
      ],
      links: [
        { label: 'Прототип', url: '#' },
      ],
      details:
        'Результатом исследования стала концепция сервиса, который помогает подбирать фильмы по настроению и предпочтениям. Были проведены PTSS‑анализ потребностей, разработан Tinder‑подобный интерфейс в Figma, определены ключевые и поддерживающие метрики, составлен Business Model Canvas.',
      image: '/images/project-movie-recommendation.png',
    },
  ],
  // Опыт работы — перечислите компании, должности и основные задачи
  experience: [
    {
      company: 'IBS',
      position: 'Руководитель проектов / Product Analyst',
      period: 'сентябрь 2024 — настоящее время',
      location: 'Москва, Россия',
      summary:
        'Руководство проектами и работа в PMO: планирование ресурсов и календарей, ведение реестра рисков, онбординг и поддержка участников команды, анализ трудозатрат. Настройка и автоматизация процессов в Jira, Confluence, MS Project и SharePoint, включая интеграцию систем и создание отчётных шаблонов. Разработка корпоративного AI‑ассистента, создание отчётов и дашбордов, организация коммуникаций и контроль качества.',
    },
    {
      company: 'Туристический комплекс «Клязьминское водохранилище»',
      position: 'Руководитель проектов / Event‑менеджер',
      period: 'май 2023 — август 2024',
      location: 'Подмосковье, Россия',
      summary:
        'Организация и контроль проведения крупных корпоративных и развлекательных мероприятий: координация отделов, подготовка контрактов и технических заданий, бюджетирование и управление расходами, подбор и обучение персонала. Успешно реализованы две масштабные программы для клиентов.',
    },
    {
      company: 'Get Experts',
      position: 'Ассистент рекрутера',
      period: 'июль 2023 — август 2023',
      location: 'Москва, Россия',
      summary:
        'Участие в подборе персонала: поиск и скрининг резюме, телефонные интервью с кандидатами, организация встреч и сопровождение кандидатов на всех этапах.',
    },
    {
      company: 'Норильский никель',
      position: 'Практикант в отделе HR',
      period: 'июнь 2022',
      location: 'Москва, Россия',
      summary:
        'Разработка теста по корпоративной культуре, подготовка программы обучения «Покорители Севера» совместно с Changellenge: создание заданий на Padlet и составление базы образовательных учреждений для набора сотрудников.',
    },
    {
      company: 'Туристический комплекс «Клязьминское водохранилище»',
      position: 'Помощник менеджера по работе с VIP‑клиентами',
      period: 'сентябрь 2019 — июнь 2020',
      location: 'Подмосковье, Россия',
      summary:
        'Подготовка и согласование договоров, взаимодействие с резидентами комплекса, координация работы отделов и решение организационных вопросов.',
    },
  ],
  // Образование — учебные заведения, степени и годы
  education: [
    {
      institution: 'НИУ «Высшая школа экономики», Высшая школа бизнеса',
      degree: 'Магистратура, направление «Бизнес‑информатика и цифровые инновации»',
      period: '2024 — 2026',
      description: 'Изучаю цифровую трансформацию бизнеса, управление продуктами, аналитику данных и инновационные технологии.',
    },
    {
      institution: 'МГУ имени М. В. Ломоносова, Факультет государственного управления',
      degree: 'Бакалавриат, направление «Управление персоналом»',
      period: '2020 — 2024',
      description: 'Освоил дисциплины по управлению персоналом, экономике, праву и менеджменту, участвовал в проектных работах и исследованиях.',
    },
  ],
  // Сертификаты и достижения — укажите, если есть
  certificates: [
    {
      title: 'Process Communication Model',
      issuer: 'IBS',
      year: '2025',
      description: 'Сертификат подтверждает владение методикой коммуникаций PCM для эффективной командной работы и управления конфликтами.',
    },
  ],
};

export default profile;