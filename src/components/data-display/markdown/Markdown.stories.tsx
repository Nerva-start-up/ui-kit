import type { Story } from "@ladle/react";
import { Markdown } from "./Markdown";

export default { title: "Components / Data Display / Markdown" };

const reportMd = `\
# Отчёт по пентесту: ksi-lab-03

Обнаружена **SQL-инъекция** в параметре \`id\` эндпоинта \`/api/users\`.

## Шаги воспроизведения

1. Отправить запрос с payload \`' OR '1'='1\`
2. Убедиться, что возвращается полный список пользователей
3. Эскалировать через \`UNION SELECT\`

Уязвимый запрос:

\`\`\`sql
SELECT * FROM users WHERE id = '$id';
\`\`\`

> Рекомендация: использовать параметризованные запросы и валидацию входных данных.

## Найденные учётные данные

\`sk-ksi-prod-a1b2c3d4e5f6g7h8i9j0\`

| Severity | CVE | Статус |
|---|---|---|
| Critical | CVE-2024-1234 | Открыто |
| Medium | CVE-2023-5678 | Исправлено |

- [x] Проверить авторизацию
- [ ] Проверить rate-limiting
- [ ] Написать регресс-тест

Подробнее: [OWASP Top 10](https://owasp.org/www-project-top-ten/)
`;

export const Report: Story = () => (
  <div className="max-w-2xl">
    <Markdown content={reportMd} />
  </div>
);

const shortMd = `\
Запусти сканирование портов через \`nmap -sV 192.168.1.1\` перед тем как продолжить.

Дальше — просто *обычный* текст с **выделением** и ~~зачёркиванием~~.
`;

export const InlineCode: Story = () => (
  <div className="max-w-2xl">
    <Markdown content={shortMd} />
  </div>
);

const noLangMd = `\
Одна строка — просто значение для копирования:

\`usr_8f3a92bc1d4e\`

\`\`\`
plain fenced block without a language tag
still renders through CodeBlock
\`\`\`
`;

export const StandaloneValue: Story = () => (
  <div className="max-w-2xl">
    <Markdown content={noLangMd} />
  </div>
);
