# Compas

Матрица компетенций команды разработки на базе **SFIA 9**.

Сайт: роли (iOS, Frontend, QA), грейды, навыки и рекомендации по оценке в контексте роли.

## GitHub Pages

Сайт публикуется из корня ветки `main`:

**https://chesno4eck.github.io/Compas/**

## Локально

```bash
# из корня репозитория
python3 -m http.server 4173
# http://localhost:4173
```

## Пересборка данных

```bash
node matrix/scripts/build-matrix.mjs
```

Обновит `data/matrix.json` и markdown в `matrix/skills`, `matrix/roles`.

## Структура

```
├── index.html, app.js, styles.css   # сайт
├── data/matrix.json                 # данные для UI
└── matrix/                          # источник правды (навыки, роли, скрипты)
```
