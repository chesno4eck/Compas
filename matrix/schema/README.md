# Schema

JSON Schema для валидации frontmatter и будущего API сайта ассессмента.

| Файл | Сущность |
| --- | --- |
| [skill.schema.json](skill.schema.json) | Навык |
| [role.schema.json](role.schema.json) | Роль |
| [grade-profile.schema.json](grade-profile.schema.json) | Грейд роли + requirements |

Контент сейчас хранится в Markdown. Сайт сможет:

1. прочитать YAML frontmatter из `skills/` и `roles/`;
2. провалидировать по этим схемам;
3. отдать каталог в UI самооценки / асессора.

Инвариант для валидатора сайта: `min_level` ∈ `Skill.levels` для соответствующего `skill_id`.
