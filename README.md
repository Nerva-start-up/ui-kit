# @nerva-start-up/ui

UI-kit платформы KSI. React-компоненты, токены и утилиты.

[![GitHub Packages](https://img.shields.io/badge/GitHub%20Packages-@ksi--platform%2Fui-orange)](https://github.com/Nerva-start-up/ui-kit/pkgs/npm/ui)

## Установка

```sh
npm install @nerva-start-up/ui
```

> Пакет публикуется в GitHub Packages. Для установки нужен `.npmrc` в корне проекта:
>
> ```
> @nerva-start-up:registry=https://npm.pkg.github.com
> //npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN
> ```

> **Требуется Tailwind CSS v4** (объявлен как `peerDependency`). Пакет собирает свои классы через Tailwind в приложении-потребителе, поэтому без настроенного Tailwind верстка компонентов не отрендерится.
>
> ```sh
> npm install tailwindcss @tailwindcss/vite
> ```
>
> В `vite.config.ts`:
> ```ts
> import tailwindcss from '@tailwindcss/vite';
>
> export default defineConfig({
>   plugins: [tailwindcss(), /* ... */],
> });
> ```
>
> В `globals.css` (или другом файле, подключённом в приложение):
> ```css
> @import 'tailwindcss';
> @import '@nerva-start-up/ui/base';
> ```
>
> `@source` для сканирования классов пакета добавлять не нужно — он уже зашит в `@nerva-start-up/ui/base` и резолвится относительно самого пакета, так что классы компонентов подхватываются автоматически.

## Использование

```tsx
import { Button, Badge } from "@nerva-start-up/ui";
import "@nerva-start-up/ui/tokens";
import "@nerva-start-up/ui/base";
```

---

## CI/CD

### Secrets и переменные окружения

**Дополнительных секретов не нужно.** Все workflows используют встроенный `GITHUB_TOKEN`, который GitHub предоставляет автоматически при каждом запуске Actions. Он же прокидывается в шаг `bun install`, так как коммитнутый `.npmrc` резолвит токен авторизации из переменной окружения `GITHUB_TOKEN`.

Единственное что нужно настроить вручную — **один раз**:

```
Репо → Settings → Actions → General → Workflow permissions
→ выбрать "Read and write permissions"
→ сохранить
```

Без этого `semantic-release` не сможет запушить коммит с обновлённой версией обратно в репо.

### Как устроены workflows

| Workflow | Триггер | Что делает |
|---|---|---|
| `ci.yml` | Любой push / PR в main | `bun install` → Biome lint → typecheck → build |
| `publish.yml` | Push в main | CI-шаги (на bun) + авто-релиз через semantic-release |

Установка зависимостей в CI выполняется через `bun install --frozen-lockfile` — версии фиксируются в закоммиченном `bun.lock`, поэтому локальный `bun install` и CI всегда ставят одно и то же.

---

## Как добавлять изменения

Версия бампается **автоматически** на основе типа коммита. Нужно соблюдать формат [Conventional Commits](https://www.conventionalcommits.org/).

### Формат коммита

```
<тип>(<область>): <описание>

Примеры:
fix(button): исправить focus ring на клавиатуре
feat(badge): добавить компонент Badge
feat: переименовать токены цветов

BREAKING CHANGE: токены цветов переименованы, см. миграцию в CHANGELOG
```

### Типы и их эффект на версию

| Тип коммита | Пример | Версия |
|---|---|---|
| `fix:` | `fix: button border` | `0.1.0` → `0.1.1` |
| `feat:` | `feat: add Tooltip` | `0.1.0` → `0.2.0` |
| `BREAKING CHANGE:` в футере тела коммита | `feat: rename tokens` + футер `BREAKING CHANGE: ...` | `0.1.0` → `1.0.0` |
| `chore:`, `docs:`, `style:`, `refactor:`, `test:` | `chore: update deps` | без релиза |

> ⚠️ Короткий синтаксис `feat!:`/`fix!:` (bang без футера) **не работает** — commit-analyzer в этом проекте использует Angular-пресет, а его парсер не распознаёт `!` в заголовке коммита: коммит будет просто проигнорирован (не даст релиза вообще), даже с типом `feat`/`fix`. Для breaking change обязательно нужен футер `BREAKING CHANGE: <описание>` в теле коммита.

> Если в пуше нет ни одного `fix:` или `feat:` коммита — релиза не будет, workflow просто завершится без ошибки.

### Типичный флоу

```sh
# 1. Создать ветку
git checkout -b feat/badge-component

# 2. Внести изменения и закоммитить
git add src/components/Badge.tsx
git commit -m "feat(badge): add Badge component with variants"

# 3. Смержить в main (через PR или напрямую)
git checkout main
git merge feat/badge-component

# 4. Запушить — релиз произойдёт автоматически
git push origin main
```

После пуша в main `semantic-release`:
1. Определяет новую версию по коммитам
2. Публикует пакет в GitHub Packages
3. Коммитит `package.json` с новой версией (`chore(release): 0.2.0 [skip ci]`)
4. Создаёт GitHub Release с автоматическим changelog

---

## Локальная разработка

Проект использует [bun](https://bun.sh) как пакетный менеджер и раннер скриптов.

Репозиторий содержит собственный `.npmrc` (нужен для установки зависимостей из `@nerva-start-up` и локальной публикации через `bun publish`). Он ссылается на переменную окружения `GITHUB_TOKEN`, поэтому её нужно один раз подготовить:

```sh
cp .env.example .env
# вписать в .env личный GitHub PAT со scope packages:read/write

export $(grep -v '^#' .env | xargs)   # прокинуть переменные из .env в шелл
```

> bun не читает `.env` автоматически — переменную `GITHUB_TOKEN` нужно экспортировать в окружение перед командами `bun install`/`bun publish`. `.env` в `.gitignore`, коммитить его не нужно.

```sh
bun install
bun run dev          # сборка в watch-режиме
bun run typecheck    # проверка типов
bun run lint         # Biome lint
bun run lint:fix     # Biome lint + автоисправление
bun run storybook    # запустить Ladle для просмотра компонентов
```

## Структура

```
src/
├── components/   # React-компоненты
├── hooks/        # хуки
├── lib/          # утилиты (cn, и т.д.)
├── motion/       # варианты анимаций
├── styles/       # base.css
├── tokens/       # CSS-токены
└── index.ts      # главный экспорт
```
