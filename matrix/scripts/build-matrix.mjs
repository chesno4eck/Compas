#!/usr/bin/env node
/**
 * Builds matrix.json + skill/role markdown from a single source definition.
 * Skills use official SFIA 9 codes only.
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { roleAssessment } from "./role-assessment.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const LEVEL_TITLES = {
  1: "Follow",
  2: "Assist",
  3: "Apply",
  4: "Enable",
  5: "Ensure, advise",
  6: "Initiate, influence",
  7: "Set strategy, inspire, mobilise",
};

const skills = [
  {
    id: "PROG",
    name: "Programming / software development",
    name_ru: "Программирование / разработка ПО",
    summary:
      "Developing software components to deliver value to stakeholders.",
    summary_ru:
      "Создание программных компонентов, балансирующих функциональность, безопасность и сопровождаемость.",
    category: "development",
    sfia_url:
      "https://sfia-online.org/en/sfia-9/skills/programming-software-development",
    levels: [2, 3, 4, 5, 6],
    level_text: {
      2: "Проектирует, пишет, проверяет, тестирует, документирует и рефакторит простые программы/скрипты. Применяет согласованные стандарты, инструменты и базовые практики безопасности. Ревьюит свою работу.",
      3: "Работает с умеренно сложным кодом. Применяет стандарты, инструменты и меры безопасности. Отслеживает прогресс, выявляет проблемы, предлагает решения. Участвует в совместных ревью.",
      4: "Реализует сложный код и интеграционные сервисы. Вносит вклад в выбор методов, инструментов и security-практик. Ведёт ревью коллег, участвует в ревью своей работы.",
      5: "Берёт техническую ответственность на всех этапах разработки. Планирует construction-активности, адаптирует методы и инструменты. Контролирует стандарты команды, включая security. Вносит вклад в орг. политики разработки.",
      6: "Разрабатывает орг. политики и стандарты construction/рефакторинга. Ведёт стратегические крупные проекты. Развивает методы и capabilities, обеспечивает adoption стандартов.",
    },
  },
  {
    id: "SWDN",
    name: "Software design",
    name_ru: "Проектирование ПО",
    summary:
      "Architecting and designing software to meet specified requirements, ensuring adherence to established standards and principles.",
    summary_ru:
      "Проектирование ПО и компонентов под требования: архитектура, паттерны, trade-off'ы, включая security и non-functional.",
    category: "development",
    sfia_url: "https://sfia-online.org/en/sfia-9/skills/software-design",
    levels: [2, 3, 4, 5, 6],
    level_text: {
      2: "Создаёт и документирует детальные дизайны простых приложений/компонентов. Применяет согласованные техники моделирования, стандарты и паттерны. Вносит вклад в дизайн частей крупных систем. Ревьюит свою работу.",
      3: "Выполняет полный дизайн умеренно сложных приложений/компонентов. Специфицирует user/system interfaces. Создаёт несколько design views под функциональные и non-functional требования, включая security.",
      4: "Проектирует сложные приложения, компоненты и модули. Коммуницирует design views стейкхолдерам. Оценивает альтернативы и trade-off'ы, прототипирует поведение. Ведёт ревью чужих дизайнов.",
      5: "Проектирует крупные/сложные приложения. Адаптирует методы дизайна, проводит impact analysis, управляет рисками. Обеспечивает баланс функциональных, quality и security требований. Вносит вклад в орг. стандарты software design.",
      6: "Выбирает и развивает методы software design/architecture. Задаёт архитектурные принципы, паттерны и фреймворки для организации. Обеспечивает соответствие техническим стратегиям и security.",
    },
  },
  {
    id: "SINT",
    name: "Systems integration and build",
    name_ru: "Интеграция систем и сборка",
    summary:
      "Planning, implementing and controlling activities to integrate system elements, subsystems and interfaces to create operational systems, products or services.",
    summary_ru:
      "Интеграция компонентов, CI/сборки, окружения и интеграционное тестирование — включая automation и continuous integration.",
    category: "development",
    sfia_url:
      "https://sfia-online.org/en/sfia-9/skills/systems-integration-and-build",
    levels: [2, 3, 4, 5, 6],
    level_text: {
      2: "Собирает builds из компонентов с помощью согласованных automation-инструментов. Выполняет интеграционные тесты по спецификации, фиксирует отказы, сообщает о рисках.",
      3: "Определяет модули, зависимости и build definition. Принимает компоненты по критериям, настраивает окружение, проводит интеграционные тесты, диагностирует дефекты, готовит отчёты.",
      4: "Обеспечивает конфигурацию компонентов для системного тестирования. Согласует integration plans, проектирует сложные builds, улучшает процессы и инструменты интеграции.",
      5: "Планирует развитие орг. capabilities интеграции и CI/automation. Выбирает инструменты и процессы, даёт authoritative advice, мониторит стандарты, вносит вклад в политики.",
      6: "Возглавляет развитие орг. capabilities systems integration and build. Задаёт политики и стандарты, обеспечивает ресурсы и adoption.",
    },
  },
  {
    id: "TEST",
    name: "Functional testing",
    name_ru: "Функциональное тестирование",
    summary:
      "Assessing specified or unspecified functional requirements and characteristics of products, systems and services through investigation and testing.",
    summary_ru:
      "Проверка функциональности продуктов и интерфейсов: тест-дизайн, выполнение, дефекты, риск-ориентированное покрытие (включая automation).",
    category: "quality",
    sfia_url: "https://sfia-online.org/en/sfia-9/skills/functional-testing",
    levels: [1, 2, 3, 4, 5, 6],
    level_text: {
      1: "Выполняет готовые ручные functional test scripts под контролем. Настраивает окружение, использует базовые automated tools, фиксирует результаты и дефекты.",
      2: "Помогает проектировать тест-кейсы и скрипты. Готовит тестовые данные, настраивает окружения. Выполняет ручные и automated functional tests, анализирует результаты и риски.",
      3: "Проектирует детальные тест-кейсы (сценарии, границы). Участвует в ревью требований/дизайна, проводит exploratory testing, автоматизирует повторяемые проверки, логирует дефекты.",
      4: "Выбирает подходы к functional testing с учётом риска и сложности. Развивает и выполняет комплексные test plans, управляет scalable automation frameworks, отчитывается в том числе по работе других.",
      5: "Ведёт functional testing на всех этапах разработки. Даёт authoritative advice по методам и фреймворкам, улучшает покрытие и эффективность, вносит вклад в орг. политики тестирования.",
      6: "Разрабатывает орг. политики и стандарты functional testing. Ведёт стратегические testing initiatives, координирует с другими видами тестирования, развивает культуру качества.",
    },
  },
  {
    id: "NFTS",
    name: "Non-functional testing",
    name_ru: "Нефункциональное тестирование",
    summary:
      "Assessing systems and services to evaluate performance, security, scalability and other non-functional qualities against requirements or expected standards.",
    summary_ru:
      "Оценка performance, security, scalability, reliability и других non-functional качеств системы.",
    category: "quality",
    sfia_url: "https://sfia-online.org/en/sfia-9/skills/non-functional-testing",
    levels: [1, 2, 3, 4, 5, 6],
    level_text: {
      1: "Выполняет заданные non-functional test scripts под контролем (например, performance). Настраивает базовое окружение, записывает результаты.",
      2: "Помогает проектировать non-functional кейсы и скрипты. Готовит данные, конфигурирует окружения, выполняет ручные и automated NFT, отчитывается о рисках.",
      3: "Проектирует NFT-кейсы по критериям качеств системы. Готовит реалистичные данные/окружения, автоматизирует повторяемые тесты, анализирует coverage non-functional атрибутов.",
      4: "Выбирает NFT-подходы с учётом критичности. Развивает end-to-end планы, сложные окружения, risk-based приоритизацию и отчётность, включая работу других.",
      5: "Планирует NFT на всех этапах. Даёт экспертные рекомендации по методам и фреймворкам, улучшает надёжность тестирования, вносит вклад в орг. стандарты.",
      6: "Задаёт орг. политики NFT, ведёт стратегические активности, развивает capabilities и культуру качества non-functional проверок.",
    },
  },
  {
    id: "HCEV",
    name: "User experience design",
    name_ru: "Проектирование пользовательского опыта",
    summary:
      "Producing design concepts and prototypes for user interactions and experiences of a product, system or service.",
    summary_ru:
      "Проектирование взаимодействий и интерфейсов: usability, accessibility, прототипы, визуальные и interaction-паттерны.",
    category: "ux",
    sfia_url: "https://sfia-online.org/en/sfia-9/skills/user-experience-design",
    levels: [2, 3, 4, 5, 6],
    level_text: {
      2: "Помогает создавать UX-элементы под контролем. Следует процедурам и гайдлайнам, поддерживает документацию.",
      3: "Применяет стандартные техники дизайна взаимодействий для компонентов. Учитывает usability/accessibility/security требования, создаёт design artefacts, вносит вклад в общий UX как часть команды.",
      4: "Выбирает инструменты, методы и паттерны для UX продукта/сервиса. Переводит концепции в прототипы, оценивает альтернативы с учётом performance, security, usability и a11y.",
      5: "Планирует и ведёт UX design activities. Задаёт подходы, итеративно встраивает feedback, обеспечивает интеграцию visual/branding элементов.",
      6: "Обеспечивает орг. commitment к UX/usability/accessibility стратегиям. Задаёт политики и стандарты UX design, ведёт крупные программы.",
    },
  },
  {
    id: "USEV",
    name: "User experience evaluation",
    name_ru: "Оценка пользовательского опыта",
    summary:
      "Validating systems, products or services against user experience goals, metrics and targets.",
    summary_ru:
      "Валидация UX: usability/accessibility проверки, сбор feedback, интерпретация результатов и рекомендации.",
    category: "ux",
    sfia_url:
      "https://sfia-online.org/en/sfia-9/skills/user-experience-evaluation",
    levels: [2, 3, 4, 5, 6],
    level_text: {
      2: "Помогает готовить окружение и инструменты для оценки. Участвует в сборе feedback по прототипам и дизайнам.",
      3: "Оценивает варианты дизайна и прототипы, тестирует usability/accessibility компонентов, администрирует evaluations, анализирует данные и рекомендует действия.",
      4: "Выбирает инструменты и техники оценки UX. Валидирует security/usability/a11y требования, интерпретирует результаты, приоритизирует проблемы.",
      5: "Управляет UX evaluation. Гарантирует соблюдение практик, консультирует по типу оценки и вовлечению пользователей, итеративно работает с design-командами.",
      6: "Задаёт высокие стандарты user interaction, определяет методы usability/a11y/security evaluation, развивает capabilities и сообщества пользователей для оценки.",
    },
  },
  {
    id: "ACIN",
    name: "Accessibility and inclusion",
    name_ru: "Доступность и инклюзивность",
    summary:
      "Providing advice, assurance and delivery practices so products and services are accessible and inclusive.",
    summary_ru:
      "Обеспечение доступности и инклюзивности продуктов: тестирование, аудиты, влияние на дизайн и compliance.",
    category: "ux",
    sfia_url:
      "https://sfia-online.org/en/sfia-9/skills/accessibility-and-inclusion",
    levels: [2, 3, 4, 5, 6],
    level_text: {
      2: "Помогает с базовым accessibility testing и сбором информации для reviews. Поддерживает выполнение predefined a11y-тестов, документирует результаты.",
      3: "Анализирует accessibility requirements. Проектирует и выполняет a11y-тесты под руководством, структурированно отчитывается, поддерживает аудиты.",
      4: "Объясняет accessibility-факторы стейкхолдерам, влияет на дизайн. Планирует a11y-тестирование, оценивает compliance и риски.",
      5: "Ведёт accessibility governance. Даёт экспертные рекомендации, задаёт орг. подходы к a11y-тестированию, продвигает культуру shared responsibility.",
      6: "Задаёт стратегическое направление accessibility and inclusion. Определяет политики и governance, обеспечивает ресурсы и навыки для assurance.",
    },
  },
  {
    id: "METL",
    name: "Methods and tools",
    name_ru: "Методы и инструменты",
    summary:
      "Leads the adoption, management and optimisation of methods and tools, ensuring effective use and alignment with organisational objectives.",
    summary_ru:
      "Выбор, настройка, поддержка и улучшение методов и инструментов разработки/тестирования/доставки.",
    category: "platform",
    sfia_url: "https://sfia-online.org/en/sfia-9/skills/methods-and-tools",
    levels: [2, 3, 4, 5, 6],
    level_text: {
      2: "Оказывает рутинную поддержку по использованию согласованных методов и инструментов. Помогает конфигурировать/поддерживать tools, обновлять документацию.",
      3: "Поддерживает использование существующих методов и инструментов. Конфигурирует и сопровождает их в известном контексте, обновляет документацию, решает базовые проблемы.",
      4: "Рекомендует решения стейкхолдерам. Консультирует по adoption методов/инструментов, адаптирует процессы под нужды, улучшает применение tools.",
      5: "Даёт authoritative advice и лидирует adoption. Выбирает методы/инструменты, внедряет на уровне программ/команд, оценивает value, вносит вклад в орг. политики.",
      6: "Разрабатывает орг. политики methods and tools. Задаёт направление внедрения техник и методологий, развивает орг. capabilities, обеспечивает commitment и continuous improvement.",
    },
  },
  {
    id: "QUAS",
    name: "Quality assurance",
    name_ru: "Обеспечение качества",
    summary:
      "Providing confidence to internal and external stakeholders that quality requirements will be fulfilled.",
    summary_ru:
      "Оценка процессов и продуктов на соответствие стандартам качества: аудиты, non-compliance, corrective actions.",
    category: "quality",
    sfia_url: "https://sfia-online.org/en/sfia-9/skills/quality-assurance",
    levels: [2, 3, 4, 5, 6],
    level_text: {
      2: "Помогает с QA-задачами под контролем: сбор evidence, проверка записей на compliance, выявление и сообщение о quality issues.",
      3: "Участвует в сборе evidence и формальных audits/reviews. Проверяет, что тестирование и quality control выполнялись. Выявляет non-compliances и аномалии.",
      4: "Планирует и проводит assessment activity. Готовит compliance reports, оценивает риски non-compliance, предлагает corrective actions, консультирует по стандартам.",
      5: "Ведёт формальные reviews сложных/кросс-функциональных областей. Выявляет причины non-compliance, назначает владельцев corrective actions, надзирает assurance других.",
      6: "Отвечает за орг. подход к quality assurance. Обеспечивает robust процессы, планирует ресурсы, учитывает emerging technology и regulation, мониторит compliance.",
    },
  },
  {
    id: "RELM",
    name: "Release management",
    name_ru: "Управление релизами",
    summary:
      "Managing the release of new and updated services into production, ensuring alignment with business objectives and compliance standards.",
    summary_ru:
      "Планирование и проведение релизов в production: расписание, качество, коммуникация, compliance.",
    category: "delivery",
    sfia_url: "https://sfia-online.org/en/sfia-9/skills/release-and-deployment",
    levels: [2, 3, 4, 5, 6],
    level_text: {
      2: "Помогает с задачами release management под контролем. Собирает данные для планирования, готовит материалы релиза, ведёт записи, участвует в базовых проверках качества и разборе issues.",
      3: "Поддерживает планирование и расписание релизов. Координирует активности с командами, следует определённым процессам, участвует в QA релиза, выявляет и устраняет проблемы процесса, отчитывается о outcomes.",
      4: "Планирует и составляет расписание релизов в соответствии с бизнес-целями. Координирует несколько команд/стейкхолдеров, ведёт lifecycle релиза, обеспечивает quality/security/compliance, проводит post-release reviews.",
      5: "Развивает release approaches, процессы и automation. Надзирает сложные large-scale релизы и координацию across programmes, обеспечивает возможность rollback, ведёт continuous improvement.",
      6: "Определяет орг. стратегии, политики и стандарты release management. Выравнивает релизы со стратегией бизнеса, обеспечивает ресурсы/tools, продвигает adoption новых техник.",
    },
  },
  {
    id: "PROD",
    name: "Product management",
    name_ru: "Управление продуктом",
    summary:
      "Managing and developing products or services throughout their full lifecycle.",
    summary_ru:
      "Управление продуктом на всём жизненном цикле: видение, roadmap, backlog, запуск, метрики, развитие и вывод.",
    category: "product",
    sfia_url: "https://sfia-online.org/en/sfia-9/skills/product-management",
    levels: [2, 3, 4, 5, 6],
    level_text: {
      2: "Помогает с задачами product management под контролем. Создаёт и поддерживает контент для использования продукта. Мониторит результаты и feedback. Собирает и отчитывается по данным использования.",
      3: "Создаёт контент для adoption продукта. Мониторит результаты кампаний/запусков. Применяет стандартные методы анализа и мониторинга продукта. Разрешает issues и действует по feedback.",
      4: "Управляет одним или несколькими продуктами меньшей ценности. Приоритизирует требования, ведёт roadmap и backlog. Управляет lifecycle под потребности пользователей и цели. Использует research/feedback/data. Организует trials и launches.",
      5: "Ведёт полный product lifecycle. Выбирает и адаптирует методы разработки продукта. Формирует propositions, positioning, сегменты. Координирует customer testing и launches. Планирует retirement/transition.",
      6: "Курирует портфель продуктов и сервисов. Создаёт framework lifecycle management. Выравнивает product management с бизнес-целями. Инициирует новые продукты и возможности.",
    },
  },
  {
    id: "REQM",
    name: "Requirements definition and management",
    name_ru: "Определение и управление требованиями",
    summary:
      "Eliciting, analysing, prioritising and validating requirements for systems, processes, products or services.",
    summary_ru:
      "Сбор, анализ, приоритизация и валидация требований: backlog, user stories, acceptance criteria, traceability, change management.",
    category: "product",
    sfia_url:
      "https://sfia-online.org/en/sfia-9/skills/requirements-definition-and-management",
    levels: [2, 3, 4, 5, 6],
    level_text: {
      2: "Elicitation и документирование требований для простых областей с чёткими границами. Помогает в управлении требованиями, создании baseline/backlog, применении изменений.",
      3: "Определяет scope, elicitation и prioritisation для небольших изменений. Применяет стандарты и техники. Challenge стейкхолдеров. Приоритизирует, обеспечивает traceability. Управляет change requests.",
      4: "Ведёт scoping и requirements для инициатив средней сложности. Фасилитирует input стейкхолдеров, effective prioritisation. Устанавливает baselines/backlogs, согласует требования.",
      5: "Планирует и ведёт requirements для крупных сложных инициатив. Выбирает методы и tools. Согласует input разных стейкхолдеров, управляет конфликтами приоритетов.",
      6: "Продвигает ценность requirements management. Разрабатывает орг. политики и стандарты. Планирует scoping/prioritisation для стратегических программ.",
    },
  },
  {
    id: "RLMT",
    name: "Stakeholder relationship management",
    name_ru: "Управление отношениями со стейкхолдерами",
    summary:
      "Systematically identifying, analysing and managing stakeholder relationships to achieve mutually beneficial outcomes.",
    summary_ru:
      "Системный подход к стейкхолдерам: анализ, согласование outcomes, engagement-планы, эскалации, мониторинг отношений.",
    category: "stakeholder",
    sfia_url:
      "https://sfia-online.org/en/sfia-9/skills/stakeholder-relationship-management",
    levels: [4, 5, 6, 7],
    level_text: {
      4: "Решает проблемы и issues, управляет resolutions и lessons learned. Реализует stakeholder engagement/communications plans. Собирает feedback для оценки эффективности. Развивает отношения с клиентами и стейкхолдерами.",
      5: "Определяет communications/relationship needs групп стейкхолдеров. Переводит engagement-стратегии в активности. Single point of contact по engagement-планам. Фасилитирует business decision-making.",
      6: "Ведёт comprehensive stakeholder management strategies. Строит долгосрочные стратегические отношения. Principal point of contact, negotiation. Мониторит relationships, улучшает communication.",
      7: "Определяет стратегический подход к stakeholder objectives. Устанавливает vision и org roles. Активно управляет senior stakeholders, ultimate escalation point.",
    },
  },
  {
    id: "BUSA",
    name: "Business situation analysis",
    name_ru: "Анализ бизнес-ситуации",
    summary:
      "Investigating business situations to identify and analyse problems, opportunities and root causes.",
    summary_ru:
      "Исследование бизнес-контекста: проблемы, возможности, root cause analysis, рекомендации для изменений.",
    category: "business",
    sfia_url:
      "https://sfia-online.org/en/sfia-9/skills/business-situation-analysis",
    levels: [2, 3, 4, 5, 6],
    level_text: {
      2: "Помогает исследовать бизнес-ситуации, выявлять проблемы и возможности. Собирает и организует данные для рекомендаций.",
      3: "Исследует straightforward ситуации, анализирует проблемы и возможности. Следует стандартам investigation. Взаимодействует со стейкхолдерами под руководством.",
      4: "Исследует ситуации со сложностью и неоднозначностью. Holistic view, root cause analysis. Выбирает подход и техники. Взаимодействует с operational stakeholders.",
      5: "Планирует и ведёт analysis при значительной ambiguity. Advises по подходам. Holistic view широкого спектра проблем. Согласует conclusions с management-level stakeholders.",
      6: "Инициирует analysis при extensive ambiguity и org impact. Продвигает holistic analysis до change programmes. Engages executive level. Определяет org policies для analysis.",
    },
  },
  {
    id: "FEAS",
    name: "Feasibility assessment",
    name_ru: "Оценка осуществимости",
    summary:
      "Generating and evaluating options for change against financial, technical and business feasibility.",
    summary_ru:
      "Генерация и оценка опций изменений: feasibility, business case, cost/benefit, риски.",
    category: "business",
    sfia_url: "https://sfia-online.org/en/sfia-9/skills/feasibility-assessment",
    levels: [2, 3, 4, 5, 6],
    level_text: {
      2: "Помогает с feasibility tasks. Собирает информацию для assessments. Поддерживает identification и документирование опций.",
      3: "Поддерживает identification опций и feasibility. Применяет стандартные техники. Поддерживает cost/benefit и business cases.",
      4: "Выбирает подходы feasibility. Identifies options, short-listing, assessment. Взаимодействует со стейкхолдерами. Готовит business cases с cost/benefit, impact, risk.",
      5: "Управляет investigative work для feasibility. Advises по подходам. Готовит business cases для опций, включая cost/benefit, impact, risk analysis.",
      6: "Устанавливает org framework для feasibility и business cases. Ведёт assessments для initiatives с significant org impact. Presentations senior stakeholders.",
    },
  },
  {
    id: "MEAS",
    name: "Measurement",
    name_ru: "Измерение и метрики",
    summary:
      "Planning and implementing measurement of processes, products and services to assess performance and progress.",
    summary_ru:
      "Метрики продукта и процессов: выбор measures, сбор данных, отчётность, интерпретация для решений.",
    category: "analytics",
    sfia_url: "https://sfia-online.org/en/sfia-9/skills/measurement",
    levels: [2, 3, 4, 5, 6],
    level_text: {
      2: "Помогает собирать и поддерживать данные для measurement. Применяет стандартные процедуры измерения. Генерирует и распространяет отчёты.",
      3: "Поддерживает specification measures, сбор и maintenance данных. Генерирует отчёты. Использует tools для routine analysis. Улучшает data collection.",
      4: "Identifies и prioritises measures, scales, targets. Разрабатывает measurement methods. Specified base/derived measures, data collection, reporting formats.",
      5: "Устанавливает measurement objectives и scope. Планирует improvements capability. Advises по effective use of measures. Вносит вклад в org policies measurement.",
      6: "Ведёт развитие org capabilities measurement. Создаёт measurement framework, aligns с business objectives. Policies, standards, resources для adoption.",
    },
  },
  {
    id: "DEMG",
    name: "Delivery management",
    name_ru: "Управление поставкой",
    summary:
      "Managing collaborative delivery of products or services through effective processes, planning and stakeholder coordination.",
    summary_ru:
      "Управление delivery-командой: планирование, приоритизация, риски, progress reporting, continuous improvement.",
    category: "delivery",
    sfia_url: "https://sfia-online.org/en/sfia-9/skills/delivery-management",
    levels: [3, 4, 5, 6],
    level_text: {
      3: "Управляет routine delivery небольших продуктов/частей сервиса. Следует методологиям и quality processes. Координирует planning, tracks progress/risks/issues. Поддерживает collaborative environment.",
      4: "Управляет delivery для small-to-medium инициатив. Применяет delivery methodologies, ведёт teams. Prioritisation, iteration planning, incremental value. Communicates progress/risks/issues.",
      5: "Лидирует delivery крупных/complex инициатив. Адаптирует подходы. Leadership нескольким teams. Proactive risk/dependency/change management. Drives continuous improvement.",
      6: "Определяет delivery strategy для multiple products/services. Aligns с org goals. Monitors performance, mitigates systemic risks. Sets direction и standards delivery management.",
    },
  },
];

const req = (skill_id, min_level, priority = "required", notes = "") => ({
  skill_id,
  min_level,
  priority,
  notes,
});

const roles = [
  {
    id: "ios-developer",
    name: "iOS Developer",
    name_ru: "iOS-разработчик",
    description:
      "Разрабатывает и сопровождает нативные приложения на платформе Apple (iOS/iPadOS), применяя навыки software engineering из SFIA в мобильном контексте.",
    status: "active",
    grades: {
      junior: {
        label: "Junior iOS Developer",
        summary: "Простые задачи под менторством; базовый construction и самопроверка.",
        requirements: [
          req("PROG", 2),
          req("SWDN", 2),
          req("TEST", 1),
          req("METL", 2),
          req("HCEV", 2, "optional", "Реализация UI по макетам/гайдлайнам"),
          req("ACIN", 2, "optional"),
          req("SINT", 2, "optional"),
        ],
      },
      middle: {
        label: "Middle iOS Developer",
        summary:
          "Самостоятельные фичи умеренной сложности; самопроверка на уровне Assist (ниже, чем у Middle QA).",
        requirements: [
          req("PROG", 3),
          req("SWDN", 3),
          req("SINT", 3),
          req("TEST", 2, "required", "Самопроверка фичи; у Middle QA порог TEST = 3"),
          req("METL", 3),
          req("HCEV", 3),
          req("ACIN", 2),
          req("NFTS", 2, "optional", "Базовые performance/stability проверки"),
          req("RELM", 2, "optional"),
        ],
      },
      senior: {
        label: "Senior iOS Developer",
        summary: "Сложный дизайн и интеграции, вклад в методы/инструменты, менторство.",
        requirements: [
          req("PROG", 4),
          req("SWDN", 4),
          req("SINT", 4),
          req("TEST", 2),
          req("METL", 4),
          req("HCEV", 3),
          req("ACIN", 3),
          req("NFTS", 2),
          req("RELM", 3),
          req("USEV", 2, "optional"),
        ],
      },
      lead: {
        label: "Lead iOS Developer",
        summary: "Техлидерство: стандарты construction, design и integration на стриме/направлении.",
        requirements: [
          req("PROG", 5),
          req("SWDN", 5),
          req("SINT", 5),
          req("METL", 5),
          req("RELM", 4),
          req("ACIN", 3, "optional"),
          req("TEST", 2, "optional"),
          req("NFTS", 3, "optional"),
          req("HCEV", 3, "optional"),
        ],
      },
    },
  },
  {
    id: "frontend-developer",
    name: "Frontend Developer",
    name_ru: "Frontend-разработчик",
    description:
      "Разрабатывает пользовательские веб/клиентские интерфейсы. Тот же набор SFIA software engineering skills, с акцентом на UX design и accessibility.",
    status: "active",
    grades: {
      junior: {
        label: "Junior Frontend Developer",
        summary: "Простые UI-задачи под менторством; следование дизайн-системе и базовой a11y.",
        requirements: [
          req("PROG", 2),
          req("SWDN", 2),
          req("HCEV", 2),
          req("ACIN", 2),
          req("TEST", 1),
          req("METL", 2),
          req("SINT", 2, "optional"),
        ],
      },
      middle: {
        label: "Middle Frontend Developer",
        summary: "Фичи end-to-end в UI-слое; accessibility Apply; TEST Assist (как у Middle iOS).",
        requirements: [
          req("PROG", 3),
          req("SWDN", 3),
          req("HCEV", 3),
          req("ACIN", 3, "required", "Выше акцент на a11y, чем у Middle iOS"),
          req("SINT", 3),
          req("TEST", 2),
          req("METL", 3),
          req("NFTS", 2, "optional", "Web vitals / performance smoke"),
          req("USEV", 2, "optional"),
          req("RELM", 2, "optional"),
        ],
      },
      senior: {
        label: "Senior Frontend Developer",
        summary: "Сложный UI/UX design и архитектура фронтенда, сильная a11y, влияние на инструменты.",
        requirements: [
          req("PROG", 4),
          req("SWDN", 4),
          req("HCEV", 4),
          req("ACIN", 4),
          req("SINT", 4),
          req("TEST", 2),
          req("METL", 4),
          req("NFTS", 3),
          req("USEV", 3),
          req("RELM", 3),
        ],
      },
      lead: {
        label: "Lead Frontend Developer",
        summary: "Техлидерство frontend-направления: design/standards, methods & tools, integration.",
        requirements: [
          req("PROG", 5),
          req("SWDN", 5),
          req("HCEV", 4),
          req("ACIN", 4),
          req("SINT", 5),
          req("METL", 5),
          req("RELM", 4),
          req("USEV", 3, "optional"),
          req("TEST", 2, "optional"),
          req("NFTS", 3, "optional"),
        ],
      },
    },
  },
  {
    id: "qa-engineer",
    name: "QA Engineer",
    name_ru: "QA-инженер",
    description:
      "Обеспечивает качество продукта через functional/non-functional testing, quality assurance и оценку UX. Делит навыки SFIA с разработчиками, но с более высокими порогами по TEST/NFTS/QUAS.",
    status: "active",
    grades: {
      junior: {
        label: "Junior QA Engineer",
        summary: "Выполнение тестов и сбор evidence под контролем.",
        requirements: [
          req("TEST", 2),
          req("NFTS", 1),
          req("QUAS", 2),
          req("ACIN", 2),
          req("METL", 2),
          req("USEV", 2, "optional"),
          req("PROG", 2, "optional", "Базовые скрипты/automation helpers"),
        ],
      },
      middle: {
        label: "Middle QA Engineer",
        summary:
          "Самостоятельный тест-дизайн фич. TEST = 3 (выше, чем Middle iOS/Frontend = 2).",
        requirements: [
          req("TEST", 3, "required", "У Middle iOS/Frontend порог TEST = 2"),
          req("NFTS", 3),
          req("QUAS", 3),
          req("USEV", 3),
          req("ACIN", 3),
          req("METL", 3),
          req("PROG", 2, "required", "Automation / тестовые утилиты"),
          req("SINT", 2, "optional"),
          req("RELM", 2, "optional"),
        ],
      },
      senior: {
        label: "Senior QA Engineer",
        summary: "Стратегия тестирования стрима, frameworks, quality assurance Enable.",
        requirements: [
          req("TEST", 4),
          req("NFTS", 4),
          req("QUAS", 4),
          req("USEV", 4),
          req("ACIN", 3),
          req("METL", 4),
          req("PROG", 3),
          req("SINT", 3),
          req("RELM", 3),
        ],
      },
      lead: {
        label: "Lead QA Engineer",
        summary: "Орг./продуктовое лидерство качества: политики тестирования и assurance.",
        requirements: [
          req("TEST", 5),
          req("NFTS", 5),
          req("QUAS", 5),
          req("METL", 5),
          req("USEV", 4),
          req("ACIN", 4),
          req("RELM", 4),
          req("PROG", 3, "optional"),
          req("SINT", 3, "optional"),
        ],
      },
    },
  },
  {
    id: "product-manager",
    name: "Product Manager",
    name_ru: "Продакт-менеджер",
    description:
      "Управляет продуктом на всём жизненном цикле: discovery, приоритизация, roadmap, delivery и метрики. Навыки SFIA product/business/delivery с акцентом на ценность для пользователя и бизнеса.",
    status: "active",
    grades: {
      junior: {
        label: "Junior Product Manager",
        summary:
          "Помощь в product-активностях под менторством: сбор требований, контент, базовые метрики.",
        requirements: [
          req("PROD", 2),
          req("REQM", 2),
          req("BUSA", 2),
          req("MEAS", 2),
          req("HCEV", 2, "optional", "Понимание UX при описании фич"),
          req("FEAS", 2, "optional"),
        ],
      },
      middle: {
        label: "Middle Product Manager",
        summary:
          "Самостоятельное ведение фич/небольшого продукта: backlog, приоритизация, запуск, метрики.",
        requirements: [
          req("PROD", 3),
          req("REQM", 3),
          req("BUSA", 3),
          req("MEAS", 3),
          req("HCEV", 3),
          req("USEV", 2, "optional"),
          req("FEAS", 3, "optional"),
          req("RELM", 2, "optional", "Координация релизов с командой"),
        ],
      },
      senior: {
        label: "Senior Product Manager",
        summary:
          "Владение продуктом/стримом: roadmap, стейкхолдеры, сложные trade-off'ы, outcome-метрики.",
        requirements: [
          req("PROD", 4),
          req("REQM", 4),
          req("RLMT", 4),
          req("BUSA", 4),
          req("MEAS", 4),
          req("HCEV", 3),
          req("USEV", 3),
          req("RELM", 3),
          req("FEAS", 4, "optional"),
          req("DEMG", 3, "optional"),
        ],
      },
      lead: {
        label: "Lead Product Manager",
        summary:
          "Лидерство product-направления: lifecycle, portfolio thinking, стандарты discovery/delivery.",
        requirements: [
          req("PROD", 5),
          req("REQM", 5),
          req("RLMT", 5),
          req("MEAS", 5),
          req("RELM", 4),
          req("DEMG", 4),
          req("BUSA", 5, "optional"),
          req("FEAS", 5, "optional"),
          req("HCEV", 3, "optional"),
          req("USEV", 3, "optional"),
        ],
      },
    },
  },
];

const assessmentGuide = {
  title: "Как проводить оценку",
  sections: [
    {
      id: "overview",
      title: "Зачем матрица",
      body: "Матрица фиксирует требования роли на каждом грейде как набор навыков SFIA с минимальными уровнями. Один навык (например, TEST) может требовать разные уровни в разных ролях: Middle iOS/Frontend — 2, Middle QA — 3.",
    },
    {
      id: "steps",
      title: "Шаги ассессмента",
      body: "1) Кандидат выбирает целевую роль и грейд.\n2) В требованиях открывает навык и смотрит SFIA-уровень + рекомендации по оценке для этой роли.\n3) Проходит самооценку и прикладывает артефакты из рекомендаций.\n4) Асессор подтверждает целевой уровень (прирост). Грейд подтверждён, если все required ≥ min_level.",
    },
    {
      id: "artifacts",
      title: "Зачем нужны артефакты",
      body: "Артефакты — доказательства реального уровня. В рекомендациях по роли для каждого уровня навыка указаны примеры (PR, тест-планы, ADR, a11y-отчёты и т.д.). Без артефактов уровень обычно не подтверждается; на встрече можно дать практическое задание.",
    },
    {
      id: "role-hints",
      title: "Рекомендации по роли",
      body: "Навык SFIA общий (например, PROG). Рядом с уровнями в карточке роли — рекомендации: что именно проверять для iOS, Frontend или QA. Если рекомендаций нет — ориентируйтесь на универсальный текст SFIA: для этого навыка ролевой специфики нет.",
    },
    {
      id: "rules",
      title: "Правила",
      body: "• Оценивается целевой уровень навыка (прирост).\n• Optional не блокирует грейд.\n• Подтверждённый уровень навыка переносится между ролями; меняется порог и ролевые рекомендации.\n• Редкие активности не обязательны при наличии эквивалента.\n• Только навыки SFIA 9.",
    },
    {
      id: "sfia",
      title: "Про SFIA",
      body: "SFIA 9 задаёт общий смысл навыка и уровней. Контекст направления (iOS / web / QA) — в порогах грейда и в рекомендациях по оценке, привязанных к роли.",
    },
  ],
};

function attachRoleAssessment(role) {
  const guidance = roleAssessment[role.id] || {};
  return {
    id: role.id,
    name: role.name,
    name_ru: role.name_ru,
    description: role.description,
    status: role.status,
    assessment: guidance,
    grades: Object.entries(role.grades).map(([grade, g]) => ({
      grade,
      label: g.label,
      summary: g.summary,
      requirements: g.requirements,
    })),
  };
}

const matrix = {
  version: "0.4.0",
  sfia_version: "9",
  updated: new Date().toISOString().slice(0, 10),
  title: "Матрица компетенций команды разработки",
  skills: skills.map(({ level_text, ...s }) => ({
    ...s,
    status: "active",
    levels_detail: Object.entries(level_text).map(([level, text]) => ({
      level: Number(level),
      title: LEVEL_TITLES[level],
      text,
    })),
  })),
  roles: roles.map(attachRoleAssessment),
  assessment_guide: assessmentGuide,
};

// ---- write JSON for site ----
const repoRoot = join(root, "..");
mkdirSync(join(repoRoot, "data"), { recursive: true });
writeFileSync(
  join(repoRoot, "data/matrix.json"),
  JSON.stringify(matrix, null, 2) + "\n"
);

// ---- write skills markdown ----
const skillsDir = join(root, "skills");
mkdirSync(skillsDir, { recursive: true });
for (const s of skills) {
  const lines = [
    "---",
    `id: ${s.id}`,
    `name: "${s.name}"`,
    `name_ru: "${s.name_ru}"`,
    `summary: "${s.summary_ru.replace(/"/g, '\\"')}"`,
    `category: ${s.category}`,
    `sfia_base: ${s.id}`,
    `sfia_version: "9"`,
    `sfia_url: ${s.sfia_url}`,
    `levels: [${s.levels.join(", ")}]`,
    "status: active",
    "---",
    "",
    `# ${s.id} — ${s.name_ru}`,
    "",
    `> SFIA 9: [${s.name}](${s.sfia_url})`,
    "",
    s.summary_ru,
    "",
    "## Уровни",
    "",
  ];
  for (const level of s.levels) {
    lines.push(`### Уровень ${level} — ${LEVEL_TITLES[level]}`, "");
    lines.push(s.level_text[level], "");
  }
  lines.push(
    "## Источник",
    "",
    `- Официальное описание: ${s.sfia_url}`,
    "- Локальный текст — сжатый перевод/адаптация для ассессмента; при расхождении приоритет у SFIA.",
    ""
  );
  writeFileSync(join(skillsDir, `${s.id.toLowerCase()}.md`), lines.join("\n"));
}

writeFileSync(
  join(skillsDir, "_catalog.md"),
  [
    "# Каталог навыков (SFIA 9)",
    "",
    "Используются **только** навыки из SFIA 9. Платформенный контекст задаётся ролью и порогами грейдов.",
    "",
    "| id | Название | Категория | Уровни | Файл |",
    "| --- | --- | --- | --- | --- |",
    ...skills.map(
      (s) =>
        `| ${s.id} | ${s.name_ru} | ${s.category} | ${s.levels[0]}–${s.levels.at(-1)} | [${s.id.toLowerCase()}.md](${s.id.toLowerCase()}.md) |`
    ),
    "",
  ].join("\n")
);

// ---- write roles markdown ----
for (const role of roles) {
  const roleDir = join(root, "roles", role.id);
  const gradesDir = join(roleDir, "grades");
  mkdirSync(gradesDir, { recursive: true });
  writeFileSync(
    join(roleDir, "role.md"),
    [
      "---",
      `id: ${role.id}`,
      `name: ${role.name}`,
      `name_ru: ${role.name_ru}`,
      `description: "${role.description.replace(/"/g, '\\"')}"`,
      `grades: [${Object.keys(role.grades).join(", ")}]`,
      `status: ${role.status}`,
      "---",
      "",
      `# Роль: ${role.name_ru}`,
      "",
      role.description,
      "",
      "## Грейды",
      "",
      "| Грейд | Файл |",
      "| --- | --- |",
      ...Object.keys(role.grades).map(
        (g) => `| ${g} | [grades/${g}.md](grades/${g}.md) |`
      ),
      "",
      "Навыки — из каталога SFIA: [skills/_catalog.md](../../skills/_catalog.md).",
      "",
      "Рекомендации по оценке в контексте роли: [assessment.md](assessment.md).",
      "",
    ].join("\n")
  );

  // Role-specific assessment guidance markdown
  const roleGuide = roleAssessment[role.id] || {};
  const assessLines = [
    `# Рекомендации по оценке: ${role.name_ru}`,
    "",
    "Навык SFIA общий. Ниже — что проверять **в контексте этой роли**. Если навыка нет в списке — используйте универсальный текст SFIA.",
    "",
  ];
  for (const [skillId, levels] of Object.entries(roleGuide)) {
    const skill = skills.find((s) => s.id === skillId);
    assessLines.push(`## ${skillId} — ${skill?.name_ru || skillId}`, "");
    for (const level of Object.keys(levels).sort((a, b) => Number(a) - Number(b))) {
      const item = levels[level];
      assessLines.push(`### Уровень ${level}`, "", "**Проверять:**", "");
      for (const c of item.check || []) assessLines.push(`- ${c}`);
      assessLines.push("", "**Артефакты:**", "");
      for (const a of item.artifacts || []) assessLines.push(`- ${a}`);
      assessLines.push("");
    }
  }
  writeFileSync(join(roleDir, "assessment.md"), assessLines.join("\n"));

  for (const [grade, g] of Object.entries(role.grades)) {
    const fmReqs = g.requirements
      .map((r) => {
        const notes = r.notes ? `\n    notes: "${r.notes.replace(/"/g, '\\"')}"` : "";
        return `  - skill_id: ${r.skill_id}\n    min_level: ${r.min_level}\n    priority: ${r.priority}${notes}`;
      })
      .join("\n");
    const table = g.requirements
      .map(
        (r) =>
          `| ${r.skill_id} | [skills/${r.skill_id.toLowerCase()}.md](../../../skills/${r.skill_id.toLowerCase()}.md) | **${r.min_level}** | ${r.priority} | ${r.notes || "—"} |`
      )
      .join("\n");
    writeFileSync(
      join(gradesDir, `${grade}.md`),
      [
        "---",
        `role_id: ${role.id}`,
        `grade: ${grade}`,
        `label: ${g.label}`,
        "status: active",
        "requirements:",
        fmReqs,
        "---",
        "",
        `# ${g.label}`,
        "",
        g.summary,
        "",
        "## Требования к навыкам",
        "",
        "| skill_id | Навык | min_level | priority | notes |",
        "| --- | --- | --- | --- | --- |",
        table,
        "",
        "## Критерий",
        "",
        "Все навыки с `priority: required` подтверждены на уровне ≥ `min_level`.",
        "",
      ].join("\n")
    );
  }
}

writeFileSync(
  join(root, "roles/_catalog.md"),
  [
    "# Каталог ролей",
    "",
    "| id | Роль | Грейды | Файл |",
    "| --- | --- | --- | --- |",
    ...roles.map(
      (r) =>
        `| ${r.id} | ${r.name_ru} | ${Object.keys(r.grades).join(" · ")} | [${r.id}/role.md](${r.id}/role.md) |`
    ),
    "",
    "## Пример переиспользования навыка",
    "",
    "| Навык | iOS / Middle | Frontend / Middle | QA / Middle | PM / Middle |",
    "| --- | --- | --- | --- | --- |",
    "| TEST | ≥ 2 | ≥ 2 | ≥ 3 | — |",
    "| ACIN | ≥ 2 | ≥ 3 | ≥ 3 | — |",
    "| HCEV | ≥ 3 | ≥ 3 | — | ≥ 3 |",
    "",
  ].join("\n")
);

console.log(
  `Built matrix: ${skills.length} skills, ${roles.length} roles → data/matrix.json`
);
