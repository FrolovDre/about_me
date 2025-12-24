// Файл с данными для сайта. Замените значения на свои, чтобы обновить контент.

export interface Project {
  slug: string; // используется в URL /projects/[slug]
  title: string;
  summary: string;
  problem?: string;
  actions?: string[];
  results?: string[];
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
  summary?: string;
  achievements: string[];
  responsibilities: string[];
  tools: string[];
  highlight: string;
  tags: string[];
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
  taglineHighlight?: string;
  about: string;
  whatILookFor: string;
  valueProps: string[];
  quickFacts: { label: string; value: string }[];
  highlights?: string[];
  resumeUrl: string;
  navigation: { href: string; label: string }[];
  mapNodes: {
    id: string;
    label: string;
    href: string;
    description: string;
    badge: string;
    icon: string;
  }[];
  experienceFilters: string[];
  ui: {
    heroCta: {
      primaryLabel: string;
      secondaryLabel: string;
    };
    siteTitle: string;
    metaTitle: string;
    metaDescription: string;
    map: {
      title: string;
      subtitle: string;
      skipLabel: string;
      openLabel: string;
      closeLabel: string;
      introPrompt: string;
      controls: {
        title: string;
        items: string[];
      };
      windowLabels: {
        minimize: string;
        close: string;
        restore: string;
        minimized: string;
        description: string;
      };
    };
    accessibility: {
      themeToggleLabel: string;
      menuLabel: string;
      experienceOpenLabel: string;
      experienceCloseLabel: string;
    };
    valueCardTitle: string;
    valueCardNote: string;
    sections: {
      aboutTitle: string;
      skillsTitle: string;
      projectsTitle: string;
      projectsIntro: string;
      experienceTitle: string;
      experienceIntro: string;
      contactTitle: string;
      contactIntro: string;
    };
    projectLinkLabel: string;
    projectCase: {
      backLabel: string;
      problemTitle: string;
      actionsTitle: string;
      resultsTitle: string;
      linksTitle: string;
    };
    contactLabels: {
      location: string;
      email: string;
      phone: string;
      socials: string;
    };
    contactForm: {
      nameLabel: string;
      emailLabel: string;
      messageLabel: string;
      submitLabel: string;
    };
    footerNote: string;
  };
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
  tagline: 'Создаю цифровые продукты через данные, стратегию и заботу о пользователе',
  taglineHighlight: 'цифровые продукты',
  // Описание обо мне
  about:
    'Магистрант НИУ ВШЭ и выпускник МГУ. Создаю продукты, которые решают задачи пользователей и дают измеримую пользу бизнесу. Сильная аналитика, Agile‑опыт и понимание полного цикла продукта.',
  // Что вы ищете — тип проекта, формат работы, география
  whatILookFor:
    'Ищу стажировку или junior‑роль в цифровых продуктах. Хочу объединять аналитику и менеджерский опыт для запуска новых сервисов. Открыт к удалённому формату.',
  valueProps: [
    'Формирую продуктовую стратегию и приоритизацию через данные и метрики.',
    'Превращаю исследования в понятные решения и пользовательские сценарии.',
    'Выстраиваю процессы, чтобы команда быстро выпускала ценность.',
  ],
  quickFacts: [
    { label: 'Локация', value: 'Москва · удалённо' },
    { label: 'Английский', value: 'C1' },
    { label: 'Формат', value: 'Гибрид / удалённо' },
    { label: 'Фокус', value: 'Product · Analytics · Research' },
  ],
  highlights: ['Открыт к стажировкам и junior-ролям', 'English C1', 'Ориентируюсь на продуктовые метрики'],
  // Контактные данные
  resumeUrl: '/CV.pdf',
  navigation: [
    { href: '#about', label: 'Обо мне' },
    { href: '#skills', label: 'Навыки' },
    { href: '#projects', label: 'Проекты' },
    { href: '#experience', label: 'Опыт' },
    { href: '#contact', label: 'Контакты' },
  ],
  mapNodes: [
    {
      id: 'home',
      label: 'Home / Intro',
      href: '#about',
      description: 'Имя, роль, фокус и быстрые факты.',
      badge: 'CORE',
      icon: '✦',
    },
    {
      id: 'skills',
      label: 'Skills',
      href: '#skills',
      description: 'Кластеры навыков и ключевые инструменты.',
      badge: 'STACK',
      icon: '⚡',
    },
    {
      id: 'projects',
      label: 'Projects',
      href: '#projects',
      description: 'Кейсы с метриками и решениями.',
      badge: 'PET',
      icon: '⬡',
    },
    {
      id: 'experience',
      label: 'Experience',
      href: '#experience',
      description: 'Роли, результаты и зоны ответственности.',
      badge: 'PATH',
      icon: '◎',
    },
    {
      id: 'contact',
      label: 'Contact',
      href: '#contact',
      description: 'Связаться и обсудить сотрудничество.',
      badge: 'LINK',
      icon: '✉',
    },
  ],
  experienceFilters: ['PMO', 'Product', 'Analytics', 'Research', 'Operations'],
  ui: {
    heroCta: {
      primaryLabel: 'Скачать резюме',
      secondaryLabel: 'Связаться',
    },
    siteTitle: 'Портфолио',
    metaTitle: 'Портфолио Андрея Фролова',
    metaDescription:
      'Персональный сайт‑портфолио Андрея Фролова: проекты, опыт работы, образование и достижения.',
    map: {
      title: 'Андрей Фролов',
      subtitle: '',
      skipLabel: 'Пропустить карту',
      openLabel: 'Открыть окно',
      closeLabel: 'Закрыть карту',
      introPrompt: 'Что ищу сейчас',
      controls: {
        title: 'Map Controls',
        items: ['Click nodes', 'Drag windows', 'Esc to close', 'Minimize to return to map'],
      },
      windowLabels: {
        minimize: 'Свернуть окно',
        close: 'Закрыть окно',
        restore: 'Восстановить окно',
        minimized: 'Свернутые окна',
        description: 'Окно раздела с контентом. Используйте Tab для навигации.',
      },
    },
    accessibility: {
      themeToggleLabel: 'Сменить тему',
      menuLabel: 'Меню',
      experienceOpenLabel: 'Что делал',
      experienceCloseLabel: 'Скрыть детали',
    },
    valueCardTitle: 'Чем полезен бизнесу',
    valueCardNote: 'Открыт к junior‑ролям, стажировкам и смелым экспериментам.',
    sections: {
      aboutTitle: 'Обо мне',
      skillsTitle: 'Навыки',
      projectsTitle: 'PET PROJECTS',
      projectsIntro:
        'Кейсы с фокусом на ценность для пользователя и влияние на бизнес.',
      experienceTitle: 'Опыт',
      experienceIntro: 'Результаты, зоны ответственности и инструменты — кратко и по делу.',
      contactTitle: 'Контакты',
      contactIntro: 'Открыт к сотрудничеству и новым возможностям.',
    },
    projectLinkLabel: 'Подробнее',
    projectCase: {
      backLabel: 'К проектам',
      problemTitle: 'Задача',
      actionsTitle: 'Что сделал',
      resultsTitle: 'Результат',
      linksTitle: 'Ссылки',
    },
    contactLabels: {
      location: 'Локация',
      email: 'Email',
      phone: 'Телефон',
      socials: 'Соцсети',
    },
    contactForm: {
      nameLabel: 'Имя',
      emailLabel: 'Email',
      messageLabel: 'Сообщение',
      submitLabel: 'Отправить',
    },
    footerNote: 'Все права защищены.',
  },
  contact: {
    email: '5rolov.a9dr8y@gmail.com',
    phone: '+7 (916) 9238213',
    location: 'Москва',
    socials: [
      { label: 'GitHub', url: 'https://github.com/FrolovDre/about_me' },
      { label: 'Telegram', url: 'https://t.me/frolov_dre' },
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
      problem:
        'Рынок и конкуренты меняются слишком быстро, и командам не хватает времени на глубокие ресерчи перед запуском новых фич.',
      actions: [
        'Сформулировали ценностное предложение и ключевой use-case, описали метрики эффективности.',
        'Собрали roadmap MVP и оценку бюджета, подготовили Lean Canvas и гипотезы.',
        'Собрали прототип на базе Weaviate и LLM, протестировали запросы на релевантных данных.',
      ],
      results: [
        'Время подготовки отчётов сократилось, а качество выдачи стало воспроизводимым.',
        'MVP подтвердил применимость подхода для PM/PA команд.',
      ],
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
      problem:
        'Аудитория Gen Z быстрее переключается между форматами, и платформе нужно было понять, как удерживать внимание.',
      actions: [
        'Провели интервью, опросы и desk research для сегментации аудитории.',
        'Собрали международные бенчмарки и сформировали гипотезы контента и дистрибуции.',
        'Собрали программу запуска и оценку затрат на продакшн.',
      ],
      results: [
        'Определены ключевые боли и мотиваторы аудитории.',
        'Сформирован план запуска нового формата с KPI.',
      ],
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
      problem:
        'Платформе требовалась согласованная целевая архитектура для масштабирования сервисов и процессов.',
      actions: [
        'Проанализировали As-Is процессы и составили каталог сервисов и потоков.',
        'Построили To-Be модель с визуализацией бизнес- и ИТ-слоёв.',
        'Подготовили дорожную карту трансформации и рекомендации по внедрению.',
      ],
      results: [
        'Появилась единая архитектурная карта для команд разработки и бизнеса.',
      ],
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
      problem:
        'Существующая программа лояльности не поддерживала рост LTV и нуждалась в обновлённой механике.',
      actions: [
        'Проанализировали конкурентные программы и сегментацию клиентов.',
        'Собрали набор вознаграждений и сценариев для разных сегментов.',
        'Построили модель CPA/LTV для оценки окупаемости.',
      ],
      results: [
        'Определены механики, повышающие вовлечённость и повторные покупки.',
      ],
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
      problem:
        'Пользователи терялись в каталоге и не получали персональные рекомендации.',
      actions: [
        'Провели PTSS-анализ потребностей и сформировали JTBD гипотезы.',
        'Собрали интерактивный прототип в Figma и протестировали сценарии.',
        'Определили North Star Metric и дерево поддерживающих метрик.',
      ],
      results: [
        'Сценарии персонализации подтверждены пользовательскими тестами.',
      ],
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
      summary: 'PMO, продуктовая аналитика, операционная эффективность.',
      achievements: [
        'Автоматизировал отчётность и снизил ручные трудозатраты команды.',
        'Запустил корпоративного AI‑ассистента для поддержки сотрудников.',
        'Сформировал единый реестр рисков и календарей проектов.',
      ],
      responsibilities: [
        'Планирование ресурсов, контроль сроков и загрузки.',
        'Настройка Jira/Confluence/MS Project и интеграций.',
        'Организация коммуникаций и контроль качества исполнения.',
      ],
      tools: ['Jira', 'Confluence', 'MS Project', 'SharePoint', 'SQL'],
      highlight: '−20% времени на отчёты',
      tags: ['PMO', 'Product', 'Analytics'],
    },
    {
      company: 'Туристический комплекс «Клязьминское водохранилище»',
      position: 'Руководитель проектов / Event‑менеджер',
      period: 'май 2023 — август 2024',
      location: 'Подмосковье, Россия',
      summary: 'Крупные офлайн‑проекты и сервисный дизайн мероприятий.',
      achievements: [
        'Реализовал 2 масштабные программы для корпоративных клиентов.',
        'Выстроил контроль бюджета и подрядчиков на каждом этапе.',
      ],
      responsibilities: [
        'Координация отделов, технические задания и контракты.',
        'Бюджетирование, контроль расходов и качества сервиса.',
        'Подбор, обучение и управление персоналом.',
      ],
      tools: ['Google Sheets', 'Notion', 'Briefing', 'Event Ops'],
      highlight: '2 больших программы',
      tags: ['Operations', 'Research'],
    },
    {
      company: 'Get Experts',
      position: 'Ассистент рекрутера',
      period: 'июль 2023 — август 2023',
      location: 'Москва, Россия',
      summary: 'Подбор и скрининг кандидатов.',
      achievements: ['Сократил время поиска за счёт систематизации воронки.'],
      responsibilities: [
        'Поиск и скрининг резюме по профилям.',
        'Телефонные интервью и организация встреч.',
        'Сопровождение кандидатов до выхода.',
      ],
      tools: ['LinkedIn', 'ATS', 'Google Sheets'],
      highlight: 'Ускорил скрининг',
      tags: ['Research', 'Operations'],
    },
    {
      company: 'Норильский никель',
      position: 'Практикант в отделе HR',
      period: 'июнь 2022',
      location: 'Москва, Россия',
      summary: 'HR‑аналитика и образовательные программы.',
      achievements: ['Создал тест по корпоративной культуре и программу обучения.'],
      responsibilities: [
        'Сбор и анализ контента по корпоративной культуре.',
        'Проектирование образовательных заданий.',
        'Формирование базы вузов для найма.',
      ],
      tools: ['Padlet', 'Excel', 'Survey tools'],
      highlight: 'Запуск программы',
      tags: ['Analytics', 'Research'],
    },
    {
      company: 'Туристический комплекс «Клязьминское водохранилище»',
      position: 'Помощник менеджера по работе с VIP‑клиентами',
      period: 'сентябрь 2019 — июнь 2020',
      location: 'Подмосковье, Россия',
      summary: 'Сервис и коммуникации с VIP‑клиентами.',
      achievements: ['Улучшил внутреннюю координацию между отделами.'],
      responsibilities: [
        'Подготовка договоров и согласование условий.',
        'Коммуникации с резидентами и партнёрами.',
        'Организация внутренних процессов.',
      ],
      tools: ['CRM', 'Docs', 'Service ops'],
      highlight: 'VIP‑сервис',
      tags: ['Operations'],
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
