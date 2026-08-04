/**
 * Ролевые рекомендации по оценке навыка.
 * Навык (SFIA) общий; здесь — что именно проверять в контексте роли.
 * Если навыка нет в объекте роли — ролевой специфики нет, ориентируемся на текст SFIA.
 *
 * Формат уровня: { check: string[], artifacts: string[] }
 */
export const roleAssessment = {
  "ios-developer": {
    PROG: {
      2: {
        check: [
          "Пишет простые экраны/утилиты на Swift (optionals, коллекции, closures) по задаче",
          "Использует UIKit и/или SwiftUI на типовых задачах под менторством",
          "Не хранит секреты в коде; базово соблюдает privacy-ограничения",
          "Перед сдачей сам просматривает свой PR, правит замечания",
        ],
        artifacts: [
          "PR с простой фичей или багфиксом",
          "Скрин/запись экрана по задаче",
          "Простой unit-тест по образцу команды",
        ],
      },
      3: {
        check: [
          "Самостоятельно закрывает фичу end-to-end: сеть + состояние UI + ошибки/загрузка",
          "Уверенно применяет concurrency (GCD и/или async/await), понимает ARC / retain cycles",
          "Следует архитектурным соглашениям команды (MVC / MVVM / аналоги)",
          "Пишет/дополняет unit-тесты на новую логику; участвует в code review",
        ],
        artifacts: [
          "PR фичи с сетевым слоем и UI-состояниями",
          "Ревью с содержательными комментариями",
          "Разбор бага с root cause в тикете",
        ],
      },
      4: {
        check: [
          "Реализует сложные модули/интеграции: deep links, background, SDK, межмодульное взаимодействие",
          "Влияет на выбор подходов, зависимостей (SPM и т.п.), security-практик в команде",
          "Ведёт ревью коллег; проводит рефакторинг legacy с сохранением поведения",
          "Оценивает риски релиза (регрессии, миграции, совместимость OS/устройств)",
        ],
        artifacts: [
          "RFC/ADR по модульности или архитектуре фичи",
          "Серия ревью с планой качества",
          "Рефакторинг с метриками / постмортем инцидента",
        ],
      },
      5: {
        check: [
          "Берёт тех. ответственность за iOS-стрим: от требований до поставки и оценки качества",
          "Планирует construction, выбирает SwiftUI/UIKit/модульность/feature flags под контекст",
          "Контролирует стандарты команды, включая privacy, Keychain, supply-chain зависимостей",
          "Вносит вклад в гайдлайны iOS-разработки сообщества/организации",
        ],
        artifacts: [
          "Принятые стандарты/гайды",
          "План тех. инициативы с метриками успеха",
          "Менторство с измеримым ростом людей",
        ],
      },
    },
    SWDN: {
      2: {
        check: [
          "Описывает простой экран/компонент: ответственность, входы/выходы, базовый поток данных",
          "Применяет паттерны команды (например, простой MVVM) под контролем",
        ],
        artifacts: ["Схема/короткий design note к задаче", "Диаграмма потока данных экрана"],
      },
      3: {
        check: [
          "Проектирует умеренно сложный модуль: слои, интерфейсы, состояния, ошибки",
          "Учитывает lifecycle UIViewController/SwiftUI, навигацию, базовые non-functional",
        ],
        artifacts: ["Design doc модуля", "Интерфейсы протоколов / границы модуля в PR"],
      },
      4: {
        check: [
          "Проектирует сложные модули и интеграции с trade-off'ами (модульность, тестируемость, performance)",
          "Ведёт ревью дизайнов коллег; прототипирует спорные решения",
        ],
        artifacts: ["ADR с альтернативами", "Ревью архитектурного предложения"],
      },
      5: {
        check: [
          "Задаёт design/architecture подход для крупной зоны iOS-продукта",
          "Балансирует quality, security, поддерживаемость; влияет на стандарты дизайна",
        ],
        artifacts: ["Архитектурные принципы стрима", "Impact analysis крупного изменения"],
      },
    },
    SINT: {
      2: {
        check: [
          "Собирает проект в Xcode / по CI-инструкции команды, прогоняет заданные проверки",
          "Фиксирует падения сборки/тестов с воспроизведением",
        ],
        artifacts: ["Лог успешной/упавшей сборки", "Скрин CI job"],
      },
      3: {
        check: [
          "Настраивает зависимости модуля (SPM/CocoaPods), понимает схему targets/schemes",
          "Чинит типовые поломки CI; готовит build для TestFlight/внутренней раздачи",
        ],
        artifacts: ["PR с правкой Package.swift / CI config", "Успешный TestFlight build"],
      },
      4: {
        check: [
          "Проектирует сложные integration builds, модульную сборку, ускорение CI",
          "Согласует интеграцию с платформенной/backend-командой",
        ],
        artifacts: ["Улучшение pipeline с метрикой времени", "План интеграции крупной фичи"],
      },
      5: {
        check: [
          "Развивает CI/CD и integration capabilities iOS-направления",
          "Выбирает инструменты сборки/дистрибуции, задаёт стандарты",
        ],
        artifacts: ["Стандарт CI для мобилки", "Роллаут нового build tooling"],
      },
    },
    TEST: {
      1: {
        check: ["Прогоняет готовый чеклист по своей задаче под mentorship"],
        artifacts: ["Отмеченный чеклист в тикете"],
      },
      2: {
        check: [
          "Составляет короткий чеклист к своей фиче (happy path + базовые негативные)",
          "Заводит баги с шагами, окружением (устройство/OS), ожидаемым/фактическим",
        ],
        artifacts: ["Чеклист к PR", "Заведённый баг с полным описанием"],
      },
    },
    HCEV: {
      2: {
        check: [
          "Верстает простые экраны по макету (UIKit/SwiftUI), соблюдает отступы и системные компоненты",
        ],
        artifacts: ["PR с UI по макету", "Сравнение с дизайном"],
      },
      3: {
        check: [
          "Собирает сложные экраны, кастомные компоненты, стандартную навигацию",
          "Согласует реализуемость с дизайнером; учитывает Dynamic Type / тёмную тему где принято",
        ],
        artifacts: ["Переиспользуемый UI-компонент", "Комментарии/итерации с дизайном"],
      },
      4: {
        check: [
          "Проектирует interaction-сложные UI: кастомные transitions, сложные состояния",
          "Влияет на паттерны UI в команде / дизайн-системе",
        ],
        artifacts: ["Компонент DS", "Кастомный transition / сложная анимация"],
      },
    },
    ACIN: {
      2: {
        check: ["Прогоняет базовые VoiceOver/Dynamic Type проверки по чеклисту"],
        artifacts: ["Заметки a11y-прогона"],
      },
      3: {
        check: [
          "Делает accessibility labels/traits для своих экранов",
          "Проверяет контраст/крупный текст на типовых сценариях",
        ],
        artifacts: ["PR с a11y-правками", "Чеклист VoiceOver по фиче"],
      },
    },
    NFTS: {
      2: {
        check: [
          "Смотрит Instruments (Time Profiler / Allocations) на явные проблемы своей фичи",
          "Ловит очевидные зависания главного потока / лишние перерисовки",
        ],
        artifacts: ["Скрин/заметка Instruments", "Фикс jank/memory в PR"],
      },
      3: {
        check: [
          "Планирует простые performance/stability проверки для рискованных изменений",
          "Умеет интерпретировать базовые метрики крэшей/ANR-аналогов",
        ],
        artifacts: ["Короткий NFT-чеклист к релизу фичи", "Разбор крэша"],
      },
    },
    METL: {
      2: {
        check: ["Работает в Xcode/Git по гайдам команды; обновляет README/заметки по просьбе"],
        artifacts: ["PR по шаблону команды"],
      },
      3: {
        check: ["Настраивает линтеры/форматтеры/схемы в своём модуле; чинит типовые tool-issues"],
        artifacts: ["PR с конфигом SwiftLint/SwiftFormat и т.п."],
      },
      4: {
        check: ["Рекомендует и внедряет инструменты iOS-команды; пишет короткие гайды"],
        artifacts: ["Гайд по tool", "Adoption нового шаблона/генератора"],
      },
      5: {
        check: ["Выбирает toolchain для направления; оценивает value инструментов"],
        artifacts: ["Решение о выборе tool с критериями", "Политика использования AI/IDE в команде"],
      },
    },
    RELM: {
      2: {
        check: ["По чеклисту готовит материалы релиза (notes, сборка) под контролем"],
        artifacts: ["Заполненный release checklist"],
      },
      3: {
        check: ["Проводит типовой релиз фичи в TestFlight/store flow команды", "Ловит блокеры релиза"],
        artifacts: ["Release notes + статус раскатки"],
      },
      4: {
        check: ["Планирует релиз с зависимостями, staged rollout / feature flags"],
        artifacts: ["План релиза", "Post-release review"],
      },
    },
  },

  "frontend-developer": {
    PROG: {
      2: {
        check: [
          "Пишет простые UI-компоненты/страницы на стеке команды (JS/TS + фреймворк)",
          "Следует code style, линтерам; базовая работа с Git и PR",
          "Не хардкодит секреты; понимает базовые XSS-риски (не вставляет сырой HTML без нужды)",
        ],
        artifacts: ["PR с простым компонентом", "Скрин UI", "Прохождение линтера/CI"],
      },
      3: {
        check: [
          "Самостоятельно закрывает фичу: UI + данные (API/state) + ошибки/loading",
          "Типизация (TS), границы компонентов, базольные тесты где принято",
          "Участвует в review; предлагает практичные фиксы проблем",
        ],
        artifacts: [
          "PR фичи со state/API",
          "Unit/component тест",
          "Ревью с замечаниями по качеству",
        ],
      },
      4: {
        check: [
          "Реализует сложные клиентские модули: сложный state, микрофронт/пакеты, интеграции SDK",
          "Влияет на выбор библиотек, bundler/CI практик, security (CSP, зависимость supply-chain)",
          "Ведёт ревью; рефакторит legacy UI без регрессий",
        ],
        artifacts: ["ADR по фронтенд-архитектуре", "Сложный PR + ревью коллег", "Рефакторинг модуля"],
      },
      5: {
        check: [
          "Отвечает за construction frontend-стрима: стандарты кода, качество поставки",
          "Адаптирует методы (SSR/SPA/острова, монорепо) под продукт",
          "Вносит вклад в орг. гайдлайны фронтенда",
        ],
        artifacts: ["Стандарты фронтенда", "План тех. инициативы", "Метрики качества (бандл, ошибки)"],
      },
    },
    SWDN: {
      2: {
        check: ["Описывает простой компонент: props/state, ответственность, события"],
        artifacts: ["Короткий design note / Storybook story"],
      },
      3: {
        check: [
          "Проектирует составные UI-модули и контракты данных",
          "Учитывает accessibility и performance на уровне структуры компонентов",
        ],
        artifacts: ["Схема компонент/потока данных", "Публичный API компонента"],
      },
      4: {
        check: [
          "Проектирует сложные клиентские подсистемы (дизайн-система, routing, data layer)",
          "Сравнивает альтернативы (состояние, кэш, границы бандла)",
        ],
        artifacts: ["ADR", "Прототип спорного UX/техрешения"],
      },
      5: {
        check: ["Задаёт frontend design standards для продукта/направления"],
        artifacts: ["Архитектурные принципы фронта", "Ревью крупных дизайн-решений"],
      },
    },
    SINT: {
      2: {
        check: ["Собирает проект (npm/pnpm/yarn), гоняет локальные тесты/lint по инструкции"],
        artifacts: ["CI green на своём PR"],
      },
      3: {
        check: [
          "Настраивает env/сборку фичи, feature flags, базовые preview-деплои",
          "Чинит типовые поломки pipeline",
        ],
        artifacts: ["PR с CI/env правкой", "Preview URL фичи"],
      },
      4: {
        check: ["Улучшает integration/build: split bundles, caching CI, контракты с backend"],
        artifacts: ["Ускорение CI/бандла с метрикой", "План интеграции"],
      },
      5: {
        check: ["Развивает build/deploy capabilities фронтенд-направления"],
        artifacts: ["Стандарт pipeline", "Выбор bundler/hosting подхода"],
      },
    },
    TEST: {
      1: {
        check: ["Прогоняет готовый чеклист UI под mentorship"],
        artifacts: ["Отмеченный чеклист"],
      },
      2: {
        check: [
          "Составляет чеклист к своей UI-фиче (браузеры/адаптив по договорённости)",
          "Оформляет баги с шагами и окружением",
        ],
        artifacts: ["Чеклист к PR", "Баг-репорт"],
      },
    },
    HCEV: {
      2: {
        check: ["Верстает по макету/дизайн-системе; соблюдает spacing/типографику"],
        artifacts: ["PR + сравнение с макетом"],
      },
      3: {
        check: [
          "Делает сложные интерфейсы, адаптив, состояния компонентов",
          "Итеративно согласует с дизайном; применяет brand/visual guidelines",
        ],
        artifacts: ["Сложный UI PR", "Storybook/пример состояний"],
      },
      4: {
        check: [
          "Выбирает interaction-паттерны, прототипирует UX-спорные места",
          "Влияет на дизайн-систему и паттерны продукта",
        ],
        artifacts: ["Вклад в DS", "Прототип + обоснование trade-off"],
      },
    },
    ACIN: {
      2: {
        check: ["Прогоняет базовые a11y-проверки (клавиатура, контраст) по чеклисту"],
        artifacts: ["Заметки прогона axe/Lighthouse a11y"],
      },
      3: {
        check: [
          "Делает семантическую вёрстку, роли/имена, фокус-менеджмент на своих экранах",
          "Чинит типовые WCAG-замечания",
        ],
        artifacts: ["PR с a11y-фиксами", "Отчёт axe/ручной keyboard-прогон"],
      },
      4: {
        check: [
          "Влияет на доступность дизайна фичи; планирует a11y-тесты",
          "Оценивает риски compliance",
        ],
        artifacts: ["A11y review фичи", "Чеклист/стандарт для команды"],
      },
    },
    NFTS: {
      2: {
        check: ["Смотрит Web Vitals/Lighthouse на своей странице; ловит очевидный jank"],
        artifacts: ["Lighthouse/Web Vitals снимок", "Фикс performance в PR"],
      },
      3: {
        check: [
          "Планирует performance-проверки для рискованных UI (бандл, runtime)",
          "Понимает базовые метрики ошибок клиента",
        ],
        artifacts: ["Чеклист NFT к фиче", "Сравнение бандла до/после"],
      },
    },
    USEV: {
      2: {
        check: ["Собирает feedback по прототипу/UI у коллег или пользователей по шаблону"],
        artifacts: ["Заметки feedback"],
      },
      3: {
        check: ["Проводит лёгкую usability-проверку компонента; фиксирует findings"],
        artifacts: ["Короткий evaluation report"],
      },
    },
    METL: {
      2: {
        check: ["Работает в IDE/Git/CI по гайдам; использует Storybook/линтеры команды"],
        artifacts: ["PR по шаблону"],
      },
      3: {
        check: ["Конфигурирует eslint/prettier/test runner в зоне фичи; обновляет docs"],
        artifacts: ["PR с tool-config"],
      },
      4: {
        check: ["Рекомендует инструменты фронта; помогает с adoption"],
        artifacts: ["Гайд по tool", "Внедрение шаблона"],
      },
      5: {
        check: ["Выбирает и оценивает toolchain направления"],
        artifacts: ["Decision record по toolstack"],
      },
    },
    RELM: {
      2: {
        check: ["По чеклисту готовит релиз фронта (notes, проверка env)"],
        artifacts: ["Release checklist"],
      },
      3: {
        check: ["Проводит типовой деплой/релиз фичи по процессу команды"],
        artifacts: ["Статус раскатки / changelog"],
      },
      4: {
        check: ["Планирует релизы с feature flags, миграциями, откатом"],
        artifacts: ["План релиза", "Post-release review"],
      },
    },
  },

  "qa-engineer": {
    PROG: {
      2: {
        check: [
          "Пишет простые тестовые скрипты/хелперы на стеке автоматизации команды",
          "Поддерживает читаемые page objects / фикстуры по образцу",
          "Соблюдает секреты/тестовые данные — не коммитит credentials",
        ],
        artifacts: ["PR с простым автотестом", "Хелпер/фикстура"],
      },
      3: {
        check: [
          "Самостоятельно автоматизирует повторяемые сценарии умеренной сложности",
          "Стабилизирует flaky-тесты; понимает границы unit vs e2e",
          "Ревьюит тестовый код коллег",
        ],
        artifacts: ["Набор автотестов на фичу", "Фикс flaky с объяснением", "Ревью test PR"],
      },
    },
    TEST: {
      2: {
        check: [
          "Помогает проектировать кейсы; готовит данные; выполняет ручные и automated checks",
          "Отчитывается о findings, issues и рисках",
        ],
        artifacts: ["Набор кейсов", "Отчёт прогона", "Баги с деталями"],
      },
      3: {
        check: [
          "Самостоятельно проектирует тест-дизайн фичи: сценарии, границы, регрессия зоны",
          "Участвует в ревью требований/дизайна; ведёт exploratory testing",
          "Автоматизирует повторяемое; даёт go/no-go на уровне фичи",
        ],
        artifacts: [
          "Тест-план фичи",
          "Отчёт exploratory / регрессии",
          "Уточнённые AC в тикете",
        ],
      },
      4: {
        check: [
          "Выбирает стратегию functional testing с учётом риска и критичности",
          "Развивает automation framework; отчитывается в т.ч. по работе других",
        ],
        artifacts: ["Стратегия тестирования стрима", "Framework contribution", "Сводный quality report"],
      },
      5: {
        check: [
          "Ведёт functional testing на всех этапах продукта",
          "Задаёт методы/стандарты; улучшает покрытие и эффективность",
        ],
        artifacts: ["Политика/стандарт тестирования", "Метрики покрытия/эффективности"],
      },
    },
    NFTS: {
      1: {
        check: ["Выполняет готовые performance/security smoke-скрипты под контролем"],
        artifacts: ["Лог прогона"],
      },
      3: {
        check: [
          "Проектирует NFT-кейсы (performance, стабильность и др. по контексту)",
          "Готовит данные/окружения, близкие к prod; анализирует результаты",
        ],
        artifacts: ["NFT test plan", "Отчёт load/perf с выводами"],
      },
      4: {
        check: [
          "Выбирает NFT-подходы для критичных систем; координирует с разработкой",
          "Строит повторяемые автоматизированные NFT",
        ],
        artifacts: ["Стратегия NFT", "Автоматизированный perf suite"],
      },
      5: {
        check: ["Лидирует NFT на продукте; вносит вклад в орг. стандарты"],
        artifacts: ["Стандарт NFT", "Улучшение надёжности тестовых стендов"],
      },
    },
    QUAS: {
      2: {
        check: ["Собирает evidence по чеклистам качества; замечает очевидные non-compliance"],
        artifacts: ["Заполненный QA checklist"],
      },
      3: {
        check: [
          "Проверяет, что нужные тестовые/quality-control активности реально были",
          "Фиксирует non-compliances относительно стандартов команды",
        ],
        artifacts: ["Audit notes", "Список non-compliance с ссылками"],
      },
      4: {
        check: [
          "Планирует assessment activity; готовит compliance reports",
          "Предлагает corrective actions и консультирует по стандартам",
        ],
        artifacts: ["Formal review report", "План corrective actions"],
      },
      5: {
        check: ["Ведёт assurance сложных областей; надзирает assurance других"],
        artifacts: ["Cross-area quality assessment", "Улучшение control mechanisms"],
      },
    },
    USEV: {
      2: {
        check: ["Помогает готовить среду и собирать feedback по прототипам"],
        artifacts: ["Сырые заметки feedback"],
      },
      3: {
        check: [
          "Проводит usability/a11y evaluation компонентов",
          "Фиксирует findings и рекомендует действия",
        ],
        artifacts: ["Evaluation report", "Список UX issues с приоритетом"],
      },
      4: {
        check: [
          "Выбирает методы оценки UX; валидирует usability/a11y/security требования",
          "Приоритизирует проблемы для design/dev",
        ],
        artifacts: ["План evaluation", "Сводка для продукт/дизайн"],
      },
    },
    ACIN: {
      2: {
        check: ["Выполняет predefined a11y-тесты; документирует результаты"],
        artifacts: ["A11y test log"],
      },
      3: {
        check: [
          "Проектирует и выполняет a11y-тесты фичи (WCAG/платформенные критерии)",
          "Структурированно отчитывается и эскалирует сложное",
        ],
        artifacts: ["A11y test plan + report"],
      },
      4: {
        check: [
          "Влияет на дизайн с точки зрения accessibility; оценивает compliance-риски",
          "Планирует a11y-тестирование релиза",
        ],
        artifacts: ["A11y risk assessment", "Стандарт проверок для стрима"],
      },
    },
    METL: {
      2: {
        check: ["Работает в TMS/баг-трекере/CI тестов по гайдам команды"],
        artifacts: ["Оформленные кейсы/баги в системе"],
      },
      3: {
        check: ["Настраивает тестовые tools в известном контексте; обновляет инструкции"],
        artifacts: ["Дока по tool", "Правка CI тестов"],
      },
      4: {
        check: ["Рекомендует методы/инструменты тестирования; помогает с adoption"],
        artifacts: ["Сравнение tools", "Гайд внедрения"],
      },
      5: {
        check: ["Выбирает toolchain качества; оценивает value; влияет на политики"],
        artifacts: ["Decision record", "Политика инструментов QA"],
      },
    },
    SINT: {
      2: {
        check: ["Поднимает тестовый стенд/сборку по инструкции; гоняет integration smoke"],
        artifacts: ["Лог smoke на стенде"],
      },
      3: {
        check: ["Собирает тестовые контуры для фичи; диагностирует типовые env-проблемы"],
        artifacts: ["Описание тест-окружения", "Фикс конфигурации стенда"],
      },
    },
    RELM: {
      2: {
        check: ["Участвует в release checklist: прогон smoke, фиксация блокеров"],
        artifacts: ["Отмеченный release QA checklist"],
      },
      3: {
        check: ["Даёт quality sign-off на типовой релиз; эскалирует риски"],
        artifacts: ["Go/no-go с обоснованием"],
      },
      4: {
        check: ["Планирует quality gates релиза; координирует проверки across teams"],
        artifacts: ["Release test plan", "Post-release quality review"],
      },
    },
    SWDN: {
      3: {
        check: [
          "Участвует в дизайне тестовой стратегии модуля: что автоматизировать, какие риски",
          "Предлагает testability-улучшения дизайну/разработке",
        ],
        artifacts: ["Заметки testability review", "Схема уровней тестов"],
      },
      4: {
        check: ["Проектирует test architecture стрима (пирамида, данные, окружения)"],
        artifacts: ["Test architecture doc"],
      },
    },
  },

  "product-manager": {
    PROD: {
      2: {
        check: [
          "Помогает с product-задачами под менторством: описание фич, release notes, FAQ",
          "Собирает feedback пользователей/стейкхолдеров по шаблону",
          "Мониторит базовые метрики использования по дашборду команды",
        ],
        artifacts: [
          "Оформленная user story / feature brief",
          "Сводка feedback по фиче",
          "Скрин дашборда с комментариями",
        ],
      },
      3: {
        check: [
          "Ведёт backlog фичи/небольшого продукта: приоритизация, acceptance criteria",
          "Мониторит результаты запусков, действует по данным и feedback",
          "Координирует контент для adoption (help, onboarding, comms) с командой",
        ],
        artifacts: [
          "Приоритизированный backlog с rationale",
          "Post-launch review с метриками",
          "Короткий go/no-go по фиче",
        ],
      },
      4: {
        check: [
          "Владеет roadmap продукта/стрима; балансирует value, риски, capacity",
          "Использует research, интервью, analytics для discovery и приоритизации",
          "Организует beta/trial и launch; отслеживает product performance",
        ],
        artifacts: [
          "Roadmap на квартал с outcome-целями",
          "Discovery doc (problem → solution → metrics)",
          "Launch plan + итоги первых недель",
        ],
      },
      5: {
        check: [
          "Ведёт полный lifecycle продукта/линейки: vision, positioning, segments",
          "Выбирает product development подход (discovery/delivery cadence)",
          "Планирует retirement/transition; координирует customer testing на масштабе",
        ],
        artifacts: [
          "Product strategy / vision doc",
          "Positioning и сегментация",
          "Retirement или pivot plan с метриками",
        ],
      },
    },
    REQM: {
      2: {
        check: [
          "Elicitation простых требований по шаблону (user story, AC)",
          "Помогает вести backlog и фиксировать изменения требований",
        ],
        artifacts: ["User stories с AC", "Diff изменений в backlog"],
      },
      3: {
        check: [
          "Самостоятельно elicitation и документирование для фичи",
          "Challenge неясных требований; traceability к цели/метрике",
          "Управляет change requests в рамках политики команды",
        ],
        artifacts: [
          "PRD / feature spec",
          "Матрица traceability (goal → requirement → test/metric)",
          "Запись согласования scope change",
        ],
      },
      4: {
        check: [
          "Ведёт requirements для инициатив средней сложности; фасилитирует стейкхолдеров",
          "Effective prioritisation с trade-off'ами (scope/time/value)",
        ],
        artifacts: ["Epic breakdown", "Prioritisation workshop notes", "Signed-off backlog baseline"],
      },
      5: {
        check: [
          "Планирует requirements для крупных инициатив; negotiates competing priorities",
          "Адаптирует methods (dual-track, SAFe backlog levels и т.п.) под контекст",
        ],
        artifacts: ["Requirements approach для программы", "Conflict resolution log", "Org contribution к standards"],
      },
    },
    RLMT: {
      4: {
        check: [
          "Ведёт engagement-план для своих стейкхолдеров (biz, design, eng, support)",
          "Собирает feedback, закрывает issues, улучшает communication",
        ],
        artifacts: ["Stakeholder map", "Engagement/communications plan", "Feedback summary"],
      },
      5: {
        check: [
          "Single point of contact по product для ключевых групп",
          "Фасилитирует business decisions; переводит strategy в deliverables",
        ],
        artifacts: [
          "Decision log с alternatives",
          "Steerco/exec update deck",
          "Alignment notes cross-team",
        ],
      },
    },
    BUSA: {
      2: {
        check: [
          "Собирает данные для анализа проблемы: интервью, support tickets, метрики",
          "Помогает структурировать findings под руководством",
        ],
        artifacts: ["Research notes", "Problem statement draft"],
      },
      3: {
        check: [
          "Investigates straightforward business situations для фичи/улучшения",
          "Формулирует проблему, гипотезу, рекомендации с evidence",
        ],
        artifacts: ["Opportunity assessment", "Root cause notes (5 whys / fishbone lite)"],
      },
      4: {
        check: [
          "Анализирует ambiguous ситуации; holistic view проблем и возможностей",
          "Root cause analysis; рекомендации с учётом org constraints",
        ],
        artifacts: ["Business analysis doc", "Options comparison", "Workshop outcomes"],
      },
      5: {
        check: [
          "Ведёт complex business situation analysis для стратегических инициатив",
          "Согласует conclusions с management-level stakeholders",
        ],
        artifacts: ["Strategic opportunity brief", "Executive summary с рекомендациями"],
      },
    },
    FEAS: {
      2: {
        check: ["Собирает данные для rough feasibility (effort, dependencies, риски)"],
        artifacts: ["Checklist feasibility", "Rough t-shirt sizing notes"],
      },
      3: {
        check: [
          "Поддерживает business case: tangible costs/benefits, риски",
          "Short-list опций с eng/design",
        ],
        artifacts: ["Lightweight business case", "Option comparison table"],
      },
      4: {
        check: [
          "Готовит business case с cost/benefit, impact, risk для инициативы",
          "Engages internal/external stakeholders за информацией",
        ],
        artifacts: ["Business case document", "Risk register для инициативы"],
      },
    },
    MEAS: {
      2: {
        check: [
          "Поддерживает сбор product-метрик по шаблону (DAU, conversion, NPS и т.п.)",
          "Генерирует простые отчёты для команды",
        ],
        artifacts: ["Weekly metrics snapshot", "Dashboard setup notes"],
      },
      3: {
        check: [
          "Определяет metrics для фичи (leading/lagging); следит за data quality",
          "Интерпретирует routine analytics для product decisions",
        ],
        artifacts: ["Metric tree для фичи", "Experiment readout"],
      },
      4: {
        check: [
          "Prioritises measures для продукта/стрима; design reporting",
          "Помогает командам с measurement methods",
        ],
        artifacts: ["North star + input metrics framework", "Custom report / cohort analysis"],
      },
      5: {
        check: [
          "Measurement objectives для product area; improves measurement capability",
          "Advises по effective use of metrics; contributes to org standards",
        ],
        artifacts: ["Measurement strategy", "Org metric glossary contribution"],
      },
    },
    DEMG: {
      3: {
        check: [
          "Координирует routine delivery небольшой фичи: planning, risks, status",
          "Следует delivery process команды; tracks progress",
        ],
        artifacts: ["Sprint/release plan", "Risk/issue log", "Status report"],
      },
      4: {
        check: [
          "Ведёт delivery medium инициатив; iteration planning, incremental value",
          "Communicates progress/risks; quality of deliverables",
        ],
        artifacts: ["Delivery plan cross-team", "Increment review notes", "Retro actions"],
      },
    },
    HCEV: {
      2: {
        check: [
          "Понимает базовые UX-принципы; описывает user flow для простой фичи",
          "Согласует scope с дизайном по макетам",
        ],
        artifacts: ["User flow sketch", "Feature brief с UX-контекстом"],
      },
      3: {
        check: [
          "Формулирует UX-требования в PRD; итерирует с design на прототипах",
          "Учитывает usability/accessibility в acceptance criteria",
        ],
        artifacts: ["PRD с UX section", "Prototype review notes"],
      },
    },
    USEV: {
      2: {
        check: ["Собирает feedback по прототипу/MVP по шаблону (интервью, опрос)"],
        artifacts: ["Interview guide + notes", "Synthesis of feedback"],
      },
      3: {
        check: [
          "Проводит/организует usability evaluation; приоритизирует findings для backlog",
        ],
        artifacts: ["Usability test plan", "Findings report с recommendations"],
      },
    },
    RELM: {
      2: {
        check: ["По чеклисту готовит release comms, notes, координацию с QA/eng"],
        artifacts: ["Release checklist PM", "Release notes draft"],
      },
      3: {
        check: [
          "Координирует типовой релиз фичи: scope, comms, мониторинг post-release",
        ],
        artifacts: ["Release plan", "Post-release monitoring notes"],
      },
      4: {
        check: [
          "Планирует релизы с зависимостями, staged rollout, rollback criteria",
        ],
        artifacts: ["Cross-team release plan", "Post-release review с метриками"],
      },
    },
  },
};
