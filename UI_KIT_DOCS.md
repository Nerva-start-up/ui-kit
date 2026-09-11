# @nerva-start-up/ui — Component Reference

Design system for KSI platform. Dark theme, orange accent (`#f97316`).

CSS-экспорты: `@nerva-start-up/ui/base` (base + reset + tokens) · `@nerva-start-up/ui/tokens` (только CSS-переменные)  
Motion variants: `@nerva-start-up/ui/motion`

---

## Setup

### globals.css (consumer app)
```css
@import 'tailwindcss';
@import '@nerva-start-up/ui/base';            /* resets + body + scrollbar + focus + tokens */

#root {
  height: 100%;                    /* только то, что специфично для этого app */
}
```

> Свой `@source` на `node_modules/@nerva-start-up/ui` добавлять не нужно: `@nerva-start-up/ui/base` уже содержит `@source '../../dist'` (Tailwind v4 резолвит путь относительно самого CSS-файла пакета), поэтому классы компонентов сканируются автоматически при обычном `@import`.

### App root (React)
```tsx
import { Toaster, TooltipProvider } from '@nerva-start-up/ui';

<TooltipProvider>
  <App />
  <Toaster />
</TooltipProvider>
```

### Импорты и размер бандла

Пакет собирается с `"sideEffects": false` (кроме CSS) и все реальные зависимости (`@radix-ui/*`, `@xyflow/react`, `react-markdown`/`remark-gfm`, `prism-react-renderer`, `sonner`, `lucide-react` и т.д.) не вшиты в `dist`, а резолвятся из `node_modules` consumer-приложения. Это работает только если бандлер consumer'а видит именно **named imports** — приоритет такой:

```tsx
// ✅ правильно — бандлер видит конкретные символы и может выкинуть остальное
import { Button, Input } from '@nerva-start-up/ui';

// ❌ так нельзя — namespace-импорт делает весь пакет "используемым" целиком
import * as UI from '@nerva-start-up/ui';
```

Тяжёлые компоненты — `KnowledgeGraph*` (`@xyflow/react`), `Markdown*` (`react-markdown` + `remark-gfm`), `CodeBlockContent` (`prism-react-renderer`), `PdfViewer` (`pdfjs-dist`), `DocxViewer` (`docx-preview`) — тянут свой vendor-код в клиентский бандл, только если реально импортированы. Не импортируй их "про запас" в общих barrel-файлах приложения (`export * from '...'` на уровне фичи) — это форсирует их попадание в тот же чанк, что и всё остальное, и ломает tree-shaking независимо от того, как их импортировали здесь.

> Работает только в production-сборке бандлера (`vite build`, `next build` и т.п.) — dev-режим обычно не тришейкает.

`PdfViewer` дополнительно грузит `pdfjs-dist` через `dynamic import()` изнутри хука загрузки документа (а не статическим top-level импортом) — библиотека на уровне модуля обращается к `DOMMatrix`, чего нет в SSR-окружениях без DOM (Cloudflare Workers/workerd, Node SSR без jsdom). Поэтому импорт `@nerva-start-up/ui` целиком безопасен в SSR, даже если `PdfViewer` нигде не используется — вендор-код и обращение к браузерным глобалам подгружаются только при реальном рендере компонента в браузере.

---

### Что входит в `@nerva-start-up/ui/base`
| | |
|---|---|
| `@nerva-start-up/ui/tokens` | все CSS-переменные `--*` |
| `@font-face` (Nunito) | variable font, `src/styles/fonts/*.woff2` (~125KB, OFL 1.1) — см. [Font Tokens](#font-tokens) |
| CSS reset | `box-sizing`, `margin: 0`, `padding: 0` |
| `html, body` | `height: 100%` |
| `body` | `background: var(--bg)`, `color: var(--text)`, `font-family: var(--font-sans)` (Nunito → системный fallback), antialiasing |
| `a` | `color: inherit`, `text-decoration: none` |
| `:focus-visible` | `outline: 2px solid var(--primary)` |
| `::-webkit-scrollbar*` | 6px, цвета из токенов |

> Если нужны только токены без reset/base-стилей — `@import '@nerva-start-up/ui/tokens'`.

---

## Layout

Все примитивы (`Box`, `Flex`, `Grid`, `Stack`, `HStack`, `Center`, `Position`, `AspectRatio`) дополнительно принимают общий набор `ItemProps` — свойства элемента как *ребёнка* родительского flex/grid-контейнера:

| prop | type | default | description |
|---|---|---|---|
| `self` | `'auto' \| 'start' \| 'center' \| 'end' \| 'stretch' \| 'baseline'` | — | align-self — своё выравнивание внутри родительского flex/grid |
| `justifySelf` | `'auto' \| 'start' \| 'center' \| 'end' \| 'stretch'` | — | justify-self — своё выравнивание внутри родительского grid |
| `shrink` | `boolean` | — | `false` → `flex-shrink: 0`, запрещает сжатие элемента |
| `basis` | `number \| string` | — | flex-basis — число → px, строка → как есть (`"20%"`) |

### Box
Generic container с полиморфным `as` prop.

| prop | type | default | description |
|---|---|---|---|
| `as` | `React.ElementType` | `'div'` | HTML-тег или компонент |
| `className` | `string` | — | Tailwind-классы |
| + `ItemProps` | | | `self` / `justifySelf` / `shrink` / `basis` |

```tsx
<Box as="section" className="p-4">content</Box>
<Box as="main">content</Box>

// self — ребёнок внутри Flex/Grid родителя выравнивает себя сам
<Flex>
  <Box self="end">прижат к низу</Box>
</Flex>
```

---

### Flex
Flexbox-контейнер.

| prop | type | default | description |
|---|---|---|---|
| `direction` | `'row' \| 'col' \| 'row-reverse' \| 'col-reverse'` | `'row'` | flex-direction |
| `align` | `'start' \| 'center' \| 'end' \| 'stretch' \| 'baseline'` | — | align-items |
| `justify` | `'start' \| 'center' \| 'end' \| 'between' \| 'around' \| 'evenly'` | — | justify-content |
| `wrap` | `'wrap' \| 'nowrap' \| 'wrap-reverse'` | — | flex-wrap |
| `gap` | `GapValue` (`number \| string`) | — | шкала Tailwind (0.5, 1, 1.5, 2…24) через класс; произвольное число → px, строка → как есть (`"1.5rem"`) через inline-style |
| `inline` | `boolean` | `false` | inline-flex |
| `grow` | `boolean` | `false` | flex-1 |
| `asChild` | `boolean` | `false` | пробрасывает стили в дочерний элемент вместо рендера `<div>` |
| + `ItemProps` | | | `self` / `justifySelf` / `shrink` / `basis` |

```tsx
<Flex align="center" justify="between" gap={4}>
  <Text as="span">Left</Text>
  <Text as="span">Right</Text>
</Flex>

<Flex direction="col" gap={2}>
  <Item />
  <Item />
</Flex>

// Дробный / произвольный gap
<Flex gap={1.5}>...</Flex>
<Flex gap="6px">...</Flex>

// asChild — стили уходят на <nav>, лишнего <div> в DOM нет
<Flex asChild gap={3}>
  <nav aria-label="main">
    <NavLink />
    <NavLink />
  </nav>
</Flex>
```

---

### Grid
CSS Grid контейнер.

| prop | type | default | description |
|---|---|---|---|
| `cols` | `number \| string` | — | 1–12 через класс; произвольное число → `repeat(N, minmax(0, 1fr))`, строка → как есть (`"200px 1fr"`) через inline-style |
| `rows` | `number \| string` | — | 1–6 через класс; произвольное значение аналогично `cols` |
| `gap` | `GapValue` (`number \| string`) | — | шкала Tailwind (0.5, 1, 1.5, 2…24) или произвольное значение |
| `colGap` | `GapValue` | — | column-gap, та же шкала |
| `rowGap` | `GapValue` | — | row-gap, та же шкала |
| `asChild` | `boolean` | `false` | пробрасывает стили в дочерний элемент вместо рендера `<div>` |
| + `ItemProps` | | | `self` / `justifySelf` / `shrink` / `basis` |

```tsx
<Grid cols={3} gap={4}>
  <Card />
  <Card />
  <Card />
</Grid>

<Grid cols={4} colGap={6} rowGap={2}>
  {items.map(i => <Cell key={i.id} />)}
</Grid>

// Произвольная колоночная сетка (сайдбар + контент)
<Grid cols="240px 1fr" gap={4}>
  <Sidebar />
  <Content />
</Grid>
```

---

### Stack
Вертикальный flex-col стек.

| prop | type | default | description |
|---|---|---|---|
| `gap` | `GapValue` (`number \| string`) | `4` | gap между элементами — шкала Tailwind или произвольное значение |
| `align` | `'start' \| 'center' \| 'end' \| 'stretch'` | — | align-items |
| `justify` | `'start' \| 'center' \| 'end' \| 'between' \| 'around' \| 'evenly'` | — | justify-content |
| `asChild` | `boolean` | `false` | пробрасывает стили в дочерний элемент вместо рендера `<div>` |
| + `ItemProps` | | | `self` / `justifySelf` / `shrink` / `basis` |

```tsx
<Stack gap={3}>
  <Input label="Email" />
  <Input label="Password" />
  <Button>Login</Button>
</Stack>

<Stack asChild gap={2}>
  <ul>
    <li>Пункт 1</li>
    <li>Пункт 2</li>
  </ul>
</Stack>

// self — сообщение прижимается к правому краю чат-ленты
<Stack self="end" align="end">
  <ChatBubble />
</Stack>
```

---

### HStack
Горизонтальный flex-row стек. `align` по умолчанию `center`.

| prop | type | default | description |
|---|---|---|---|
| `gap` | `GapValue` (`number \| string`) | `2` | gap — шкала Tailwind или произвольное значение |
| `align` | `'start' \| 'center' \| 'end' \| 'stretch' \| 'baseline'` | `'center'` | align-items |
| `justify` | `'start' \| 'center' \| 'end' \| 'between' \| 'around'` | — | justify-content |
| `wrap` | `boolean` | `false` | flex-wrap |
| `asChild` | `boolean` | `false` | пробрасывает стили в дочерний элемент вместо рендера `<div>` |
| + `ItemProps` | | | `self` / `justifySelf` / `shrink` / `basis` |

```tsx
<HStack gap={3} justify="between">
  <Logo />
  <Nav />
  <UserMenu />
</HStack>
```

---

### Center
Центрирует содержимое по обеим осям (flex + items-center + justify-center).

| prop | type | default | description |
|---|---|---|---|
| `inline` | `boolean` | `false` | inline-flex |
| `asChild` | `boolean` | `false` | пробрасывает стили в дочерний элемент вместо рендера `<div>` |
| + `ItemProps` | | | `self` / `justifySelf` / `shrink` / `basis` |

```tsx
<Center className="h-screen">
  <Spinner />
</Center>

<Center className="w-10 h-10">
  <Icon />
</Center>
```

---

### Container
Max-width центрированная обёртка.

| prop | type | default | description |
|---|---|---|---|
| `as` | `React.ElementType` | `'div'` | HTML-тег |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl' \| 'full'` | `'xl'` | max-width |
| `centered` | `boolean` | `true` | mx-auto |
| `padded` | `boolean` | `true` | px-4 sm:px-6 lg:px-8 |

```tsx
<Container as="main" size="lg">
  <PageContent />
</Container>
```

---

### Spacer
Гибкий разделитель в flex-контейнере.

| prop | type | default | description |
|---|---|---|---|
| `axis` | `'horizontal' \| 'vertical' \| 'both'` | `'both'` | направление |
| `size` | `number \| string` | — | без size → flex-1 (растягивается). Шкала Tailwind (1, 2, 3…24) через класс, либо произвольное значение |

```tsx
// flex-1 — раздвигает соседей
<HStack>
  <Logo />
  <Spacer />
  <Button>Login</Button>
</HStack>

// Фиксированный отступ
<Stack>
  <Section />
  <Spacer size={8} axis="vertical" />
  <Section />
</Stack>
```

---

### Position
Позиционирующая обёртка. Принимает произвольные значения через inline-стили.

| prop | type | default | description |
|---|---|---|---|
| `position` | `'static' \| 'relative' \| 'absolute' \| 'fixed' \| 'sticky'` | `'relative'` | position |
| `top` | `string \| number` | — | number → px |
| `right` | `string \| number` | — | |
| `bottom` | `string \| number` | — | |
| `left` | `string \| number` | — | |
| `inset` | `string \| number` | — | |
| `zIndex` | `number` | — | z-index |
| `asChild` | `boolean` | `false` | пробрасывает стили в дочерний элемент вместо рендера `<div>` |
| + `ItemProps` | | | `self` / `justifySelf` / `shrink` / `basis` |

```tsx
// Overlay поверх родителя
<Position position="relative">
  <Image />
  <Position position="absolute" top={8} right={8}>
    <Badge>New</Badge>
  </Position>
</Position>

// Sticky header
<Position position="sticky" top={0} zIndex={100}>
  <Navbar />
</Position>
```

---

### AspectRatio
Контейнер с фиксированным соотношением сторон.

| prop | type | default | description |
|---|---|---|---|
| `ratio` | `number` | `16/9` | width / height |
| + `ItemProps` | | | `self` / `justifySelf` / `shrink` / `basis` |

> Без `asChild` — `children` здесь означает контент внутри рамки соотношения сторон (картинка/видео), а не тег-обёртку, поэтому у `AspectRatio` нет `asChild`.

```tsx
<AspectRatio ratio={16 / 9}>
  <video src="..." className="w-full h-full object-cover" />
</AspectRatio>

<AspectRatio ratio={1} className="w-32">
  <img src={avatar} className="w-full h-full object-cover rounded-full" />
</AspectRatio>
```

---

## Typography

### Font Tokens
Система шрифтов — CSS-переменные в `src/tokens/index.css`, единые для тёмной и светлой темы (шрифты не зависят от темы). `Heading` и `Text` собраны на этих токенах — не хардкодят `text-*`/`font-*` классы напрямую.

**Nunito** — основной UI-шрифт, подключён как variable font (вес 200–1000 одним файлом на диапазон Unicode). Файлы лежат в `src/styles/fonts/*.woff2` (~125KB суммарно: latin, latin-ext, cyrillic, cyrillic-ext — без vietnamese), `@font-face` объявлены в `src/styles/fonts.css` и импортируются из `base.css`. Лицензия — [SIL Open Font License 1.1](https://scripts.sil.org/OFL) (свободная, коммерческое использование разрешено), полный текст в `src/styles/fonts/OFL.txt`. При недоступности шрифта (SSR/старые окружения) падает на системный стек через fallback-цепочку в `--font-sans`.

| токен | значение | назначение |
|---|---|---|
| `--font-sans` | `"Nunito", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif` | основной UI-шрифт (`body`, `Text`, `Heading`) |
| `--font-mono` | `ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace` | код, токены, API-ключи (`Text mono`, `KbdKey`, code-block) |
| `--font-size-xs` | `0.75rem` (12px) | метки, подписи |
| `--font-size-sm` | `0.875rem` (14px) | вспомогательный текст |
| `--font-size-md` | `1rem` (16px) | базовый размер (`body`) |
| `--font-size-lg` | `1.125rem` (18px) | крупный текст |
| `--font-size-xl` | `1.25rem` (20px) | h3 |
| `--font-size-2xl` | `1.5rem` (24px) | h2 |
| `--font-size-3xl` | `1.875rem` (30px) | h1 |
| `--font-weight-normal` | `400` | обычный текст |
| `--font-weight-medium` | `500` | лёгкий акцент |
| `--font-weight-semibold` | `600` | заголовки h3–h6, акценты |
| `--font-weight-bold` | `700` | заголовки h1–h2 |
| `--line-height-tight` | `1.2` | крупные заголовки (h1–h3) |
| `--line-height-normal` | `1.5` | основной текст, h4–h6 |
| `--line-height-relaxed` | `1.75` | длинные абзацы |
| `--tracking-tight` | `-0.02em` | h1 |
| `--tracking-normal` | `0em` | по умолчанию |
| `--tracking-wide` | `0.02em` | капс, лейблы |

Токены — обычные CSS-переменные, подключаются в Tailwind-классах через arbitrary values с type-хинтом (обязателен для `text-`/`font-`, т.к. префикс неоднозначен между цветом/размером/семейством/весом):

```tsx
// шрифт
<div className="font-[family-name:var(--font-mono)]">код</div>

// размер (обязателен хинт length: иначе Tailwind примет var() за цвет)
<p className="text-[length:var(--font-size-lg)]">текст</p>

// вес (хинт number:)
<p className="font-[number:var(--font-weight-bold)]">текст</p>

// line-height / letter-spacing — префикс однозначный, хинт не нужен
<p className="leading-[var(--line-height-normal)] tracking-[var(--tracking-tight)]">текст</p>
```

На практике эти классы напрямую почти не пишут — реальный текст должен идти через `Text`, `Heading`, `Link`, `Code`, `Blockquote` или `Label`: они уже собраны на этих токенах (см. ниже). Пример выше — только для случаев, когда нужен собственный компонент поверх системы шрифтов.

---

### Heading
Заголовки `h1`–`h6`. Уровень задаёт одновременно семантический тег и размер шрифта.

| prop | type | default | description |
|---|---|---|---|
| `level` | `1 \| 2 \| 3 \| 4 \| 5 \| 6` | `1` | тег + размер |
| `as` | `React.ElementType` | — | override тега (напр. `as="div"` если h1 уже есть) |
| `color` | `'default' \| 'sub' \| 'muted' \| 'primary'` | `'default'` | |
| `truncate` | `boolean` | `false` | обрезает с `…` |
| + все `HTMLAttributes` | | | |

**Размеры по уровням** (через [Font Tokens](#typography)):

| level | size | weight | line-height | px |
|---|---|---|---|---|
| 1 | `--font-size-3xl` | bold + `tracking-tight` | tight | 30 |
| 2 | `--font-size-2xl` | bold | tight | 24 |
| 3 | `--font-size-xl` | semibold | tight | 20 |
| 4 | `--font-size-lg` | semibold | normal | 18 |
| 5 | `--font-size-md` | semibold | normal | 16 |
| 6 | `--font-size-sm` | semibold | normal | 14 |

```tsx
import { Heading } from '@nerva-start-up/ui';

<Heading level={1}>Управление пользователями</Heading>
<Heading level={2}>Группы</Heading>
<Heading level={3} color="muted">Дополнительно</Heading>

// Визуальный стиль h2, но тег div (нет дубль h1 на странице)
<Heading level={2} as="div">Секция настроек</Heading>

// Оранжевый акцент
<Heading level={4} color="primary">+150 очков</Heading>

// Страница — типичный шаблон
<Stack gap={1}>
  <Heading level={1}>Студенты</Heading>
  <Text variant="muted">Всего 42 студента в 3 группах</Text>
</Stack>
```

---

### Text
Универсальный текстовый компонент: параграфы, inline-метки, подписи, статусы.

| prop | type | default | description |
|---|---|---|---|
| `as` | `'p' \| 'span' \| 'div' \| 'label' \| 'small'` | `'p'` | HTML-тег |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg'` | `'md'` | размер (xs=12px, sm=14px, md=16px, lg=18px) |
| `variant` | `'default' \| 'sub' \| 'muted' \| 'primary' \| 'success' \| 'error' \| 'info'` | `'default'` | цвет |
| `weight` | `'normal' \| 'medium' \| 'semibold' \| 'bold'` | `'normal'` | жирность |
| `align` | `'left' \| 'center' \| 'right'` | — | выравнивание |
| `mono` | `boolean` | `false` | моноширинный шрифт |
| `truncate` | `boolean` | `false` | обрезает с `…` |
| + все `HTMLAttributes` | | | |

```tsx
import { Text } from '@nerva-start-up/ui';

// Основной текст
<Text>Описание группы K320-24</Text>

// Подпись / timestamp
<Text size="sm" variant="muted">Создано 25.06.2026</Text>

// Инлайн-метка рядом с данными
<HStack gap={2}>
  <Text as="span" size="xs" variant="muted">ID:</Text>
  <Text as="span" size="xs" weight="medium">42</Text>
</HStack>

// Статусы
<Text variant="success" weight="medium">Сохранено</Text>
<Text variant="error">Ошибка: поле обязательно</Text>
<Text variant="primary" weight="semibold">+10 очков</Text>

// Моноширинный (API ключ, код, SQL)
<Text mono size="sm" variant="muted">eyJhbGci...xZ3Q</Text>

// В карточке — пара label + value
<Stack gap={1}>
  <Text size="xs" variant="muted">Группа</Text>
  <Text weight="semibold">{student.group_name}</Text>
</Stack>

// Центрированный текст
<Text align="center" variant="muted">Данных пока нет</Text>
```

---

### Link
Стилизованная ссылка на токенах шрифта и цвета. С `asChild` рендерится как переданный роутер-компонент вместо `<a>` — так подключаются `<Link>` из React Router (`to="..."`) или Next.js (`href="..."`).

| prop | type | default | description |
|---|---|---|---|
| `variant` | `'default' \| 'primary' \| 'muted'` | `'default'` | цвет |
| `underline` | `'always' \| 'hover' \| 'none'` | `'hover'` | когда показывать подчёркивание |
| `external` | `boolean` | `false` | открывает в новой вкладке, добавляет `rel="noopener noreferrer"` и иконку (игнорируется при `asChild`) |
| `asChild` | `boolean` | `false` | пробрасывает стили в дочерний элемент вместо рендера `<a>` |
| + все `AnchorHTMLAttributes` | | | |

```tsx
import { Link } from '@nerva-start-up/ui';

<Link href="/courses">Все курсы</Link>
<Link href="/docs" variant="primary" underline="always">Документация</Link>
<Link href="https://example.com" external>Внешний ресурс</Link>

// React Router
import { Link } from 'react-router-dom';
<Link asChild variant="primary">
  <Link to="/dashboard">Личный кабинет</Link>
</Link>

// Next.js
import NextLink from 'next/link';
<Link asChild>
  <NextLink href="/dashboard">Личный кабинет</NextLink>
</Link>
```

---

### Code
Инлайн-код `<code>`: моноширинный токен шрифта (`--font-mono`) + фон-«пилюля». Для блоков кода используй `CodeBlock`.

| prop | type | default | description |
|---|---|---|---|
| + все `HTMLAttributes` | | | |

```tsx
import { Code } from '@nerva-start-up/ui';

<Text>
  Токен передаётся через <Code>Authorization: Bearer &lt;token&gt;</Code> заголовок.
</Text>
```

---

### Blockquote
Цитата `<blockquote>` с акцентной левой границей (`--primary`).

| prop | type | default | description |
|---|---|---|---|
| + все `BlockquoteHTMLAttributes` | | | |

```tsx
import { Blockquote } from '@nerva-start-up/ui';

<Blockquote>
  Нора помогает студентам не бояться кибербезопасности.
</Blockquote>
```

---

### Label
Подпись `<label>` для полей форм: `--font-size-sm` + `--font-weight-medium`.

| prop | type | default | description |
|---|---|---|---|
| `required` | `boolean` | `false` | добавляет красную звёздочку (обязательное поле) |
| + все `LabelHTMLAttributes` | | | |

```tsx
import { Label, Input } from '@nerva-start-up/ui';

<Stack gap={1}>
  <Label htmlFor="email" required>Email</Label>
  <Input id="email" type="email" />
</Stack>
```

---

### List / ListItem
Список `<ul>`/`<ol>` на токенах шрифта. `ListItem` — элемент списка.

**List**

| prop | type | default | description |
|---|---|---|---|
| `as` | `'ul' \| 'ol'` | `'ul'` | неупорядоченный или нумерованный |
| `marker` | `'disc' \| 'decimal' \| 'none'` | `'disc'` | стиль маркера |
| + все `HTMLAttributes` | | | |

**ListItem**

| prop | type | default | description |
|---|---|---|---|
| + все `LiHTMLAttributes` | | | |

```tsx
import { List, ListItem } from '@nerva-start-up/ui';

<List>
  <ListItem>Создать группу</ListItem>
  <ListItem>Добавить студентов</ListItem>
</List>

<List as="ol" marker="decimal">
  <ListItem>Регистрация</ListItem>
  <ListItem>Подтверждение почты</ListItem>
</List>
```

---

## UI Components

### Button

| prop | type | default | description |
|---|---|---|---|
| `variant` | `'primary' \| 'ghost' \| 'danger' \| 'outline'` | `'primary'` | визуальный стиль |
| `size` | `'sm' \| 'md' \| 'lg' \| 'icon'` | `'md'` | размер |
| `loading` | `boolean` | `false` | показывает спиннер, блокирует |
| `disabled` | `boolean` | `false` | |
| + все `ButtonHTMLAttributes` | | | |

```tsx
<Button>Сохранить</Button>
<Button variant="ghost" size="sm">Отмена</Button>
<Button variant="danger" onClick={handleDelete}>Удалить</Button>
<Button loading={isPending}>Отправить</Button>
<Button variant="outline" size="icon"><PlusIcon /></Button>
```

---

### Input
Базовое поле ввода с label, error, hint и слотами для иконок.

| prop | type | default | description |
|---|---|---|---|
| `label` | `string` | — | подпись над полем |
| `error` | `string` | — | красный текст под полем |
| `hint` | `string` | — | серый текст (скрывается при error) |
| `leftIcon` | `ReactNode` | — | иконка слева (не интерактивная) |
| `rightIcon` | `ReactNode` | — | элемент справа (может быть кнопкой) |
| + все `InputHTMLAttributes` | | | |

```tsx
import { Input } from '@nerva-start-up/ui';
import { Search } from 'lucide-react';

<Input label="Поиск" leftIcon={<Search size={15} />} placeholder="Введите запрос..." />
<Input label="Имя" {...register('name')} error={errors.name?.message} />
<Input label="Группа" hint="Например: K320-24" />
```

---

### PasswordInput
Поле пароля с кнопкой показать/скрыть (Eye/EyeOff).

| prop | type | default |
|---|---|---|
| `label` | `string` | — |
| `error` | `string` | — |
| `hint` | `string` | — |
| + все `InputHTMLAttributes` (кроме `type`, `rightIcon`) | | |

```tsx
import { PasswordInput } from '@nerva-start-up/ui';

<PasswordInput label="Пароль" placeholder="••••••••" />
<PasswordInput label="Пароль" error={errors.password?.message} {...register('password')} />
```

---

### EmailInput
Поле email с иконкой конверта слева. `type="email"` проставлен автоматически.

| prop | type | default |
|---|---|---|
| `label` | `string` | — |
| `error` | `string` | — |
| `placeholder` | `string` | `'user@example.com'` |
| + все `InputHTMLAttributes` (кроме `type`, `leftIcon`) | | |

```tsx
import { EmailInput } from '@nerva-start-up/ui';

<EmailInput label="Email" />
<EmailInput label="Email" error={errors.email?.message} {...register('email')} />
```

---

### PhoneInput
Поле телефона с отдельным блоком префикса. `type="tel"` проставлен автоматически.

| prop | type | default | description |
|---|---|---|---|
| `prefix` | `string` | `'+998'` | Код страны слева |
| `label` | `string` | — | |
| `error` | `string` | — | |
| `hint` | `string` | — | |
| + все `InputHTMLAttributes` (кроме `type`) | | | |

```tsx
import { PhoneInput } from '@nerva-start-up/ui';

<PhoneInput label="Телефон" placeholder="90 123 45 67" />
<PhoneInput prefix="+7" label="Телефон" error={errors.phone?.message} {...register('phone')} />
```

---

### OtpInput
Поле ввода OTP/PIN — отдельные boxes для каждого символа.  
Поддерживает автофокус на следующий box, Backspace на предыдущий, вставку из буфера.

| prop | type | default | description |
|---|---|---|---|
| `value` | `string` | — | **required** — текущее значение |
| `onChange` | `(value: string) => void` | — | **required** |
| `length` | `number` | `6` | Количество boxes |
| `numeric` | `boolean` | `true` | Только цифры (inputMode=numeric) |
| `label` | `string` | — | |
| `error` | `string` | — | |
| `disabled` | `boolean` | `false` | |

```tsx
import { OtpInput } from '@nerva-start-up/ui';

const [otp, setOtp] = useState('');

// 6-значный цифровой OTP
<OtpInput value={otp} onChange={setOtp} label="Код подтверждения" />

// 4-значный PIN
<OtpInput value={pin} onChange={setPin} length={4} />

// Буквенно-цифровой (например, invite-code)
<OtpInput value={code} onChange={setCode} length={8} numeric={false} />

// С ошибкой
<OtpInput
  value={otp}
  onChange={setOtp}
  error={otpError}
/>
```

---

### TimeInput
Поле ввода времени (`HH:MM`, 24ч). Значение можно напечатать напрямую (авто-маска `--:--`) или выбрать через выпадающий пикер (иконка `Clock` справа) с двумя прокручиваемыми колонками — часы и минуты.

| prop | type | default | description |
|---|---|---|---|
| `value` | `string` | — | контролируемое значение `"HH:MM"` |
| `defaultValue` | `string` | — | неконтролируемое начальное значение |
| `onChange` | `(value: string) => void` | — | вызывается при вводе (валидном, на blur) и при выборе в пикере |
| `minuteStep` | `number` | `5` | шаг списка минут в пикере (`00, 05, 10 …`) |
| `label` | `string` | — | |
| `error` | `string` | — | |
| `hint` | `string` | — | |
| `disabled` | `boolean` | — | |
| `placeholder` | `string` | `'--:--'` | |

```tsx
import { TimeInput } from '@nerva-start-up/ui';

const [value, setValue] = useState('14:30');

<TimeInput label="Начало занятия" value={value} onChange={setValue} />
<TimeInput label="Шаг 15 минут" defaultValue="09:00" minuteStep={15} />
<TimeInput label="С ошибкой" defaultValue="25:99" error="Некорректное время" />
```

---

### DateInput
Поле выбора даты — кнопка в стиле input, по клику открывает попап с [`Calendar`](#calendar). В отличие от `TimeInput`, свободный ввод текста не поддерживается — только выбор в календаре (парсинг произвольного текста даты ненадёжен из-за локалей/форматов).

| prop | type | default | description |
|---|---|---|---|
| `value` | `Date \| null` | — | контролируемое значение |
| `defaultValue` | `Date \| null` | `null` | неконтролируемое начальное значение |
| `onChange` | `(date: Date) => void` | — | вызывается при выборе даты в календаре, попап закрывается |
| `minDate` / `maxDate` | `Date` | — | пробрасываются в `Calendar` |
| `formatDate` | `(date: Date) => string` | `ru-RU` (`26.06.2026`) | форматирование значения в поле |
| `label` | `string` | — | |
| `error` | `string` | — | |
| `hint` | `string` | — | |
| `disabled` | `boolean` | — | |
| `placeholder` | `string` | `'Выберите дату'` | |

```tsx
import { DateInput } from '@nerva-start-up/ui';

const [date, setDate] = useState<Date | null>(null);

<DateInput label="Дата рождения" value={date} onChange={setDate} />

// Ограничение диапазона (например, дедлайн — ближайшие 14 дней)
<DateInput label="Дедлайн" minDate={today} maxDate={maxDate} />
```

---

### Textarea
Многострочное поле. API идентичен `Input`.

| prop | type | default |
|---|---|---|
| `label` | `string` | — |
| `error` | `string` | — |
| `hint` | `string` | — |
| + все `TextareaHTMLAttributes` | | |

```tsx
<Textarea label="Описание" rows={4} placeholder="Введите текст..." />
<Textarea label="Решение" error={errors.solution?.message} {...register('solution')} />
```

---

### Mentions
Textarea с автодополнением упоминаний (`@username`) — список подсказок под полем, фильтруется по вводу. Триггер должен стоять в начале строки или после пробела; запрос не может содержать пробелов (иначе упоминание считается «закрытым»).

| prop | type | default | description |
|---|---|---|---|
| `options` | `MentionOption[]` | — | **required** — `{ id, label, value, avatar? }[]` |
| `value` / `defaultValue` / `onChange` | | | controlled/uncontrolled текст |
| `onMention` | `(option: MentionOption) => void` | — | вызывается при вставке упоминания |
| `trigger` | `string` | `'@'` | символ-триггер |
| `placeholder` | `string` | — | |
| `rows` | `number` | `3` | количество видимых строк |
| `disabled` | `boolean` | `false` | |

Клавиатура в списке подсказок: `↑`/`↓` — навигация, `Enter`/`Tab` — вставить, `Escape` — закрыть.

```tsx
import { Mentions } from '@nerva-start-up/ui';

const students = [
  { id: '1', label: 'Иванов Иван', value: 'ivanov' },
  { id: '2', label: 'Петров Пётр', value: 'petrov' },
];

<Mentions
  options={students}
  value={comment}
  onChange={setComment}
  placeholder="Комментарий — @ для упоминания"
/>
```

---

### Card
Карточка — surface bg + border + border-radius.

| prop | type | default | description |
|---|---|---|---|
| `glow` | `boolean` | `false` | orange glow на hover |
| `padding` | `'none' \| 'sm' \| 'md' \| 'lg'` | `'md'` | внутренний отступ |
| + все `HTMLAttributes<div>` | | | |

```tsx
<Card>Контент</Card>
<Card glow padding="lg">Highlighted</Card>
<Card padding="none" className="overflow-hidden">
  <img src="..." className="w-full" />
  <div className="p-4">Caption</div>
</Card>
```

---

### Avatar
Аватар пользователя с fallback на инициалы.

| prop | type | default | description |
|---|---|---|---|
| `name` | `string` | — | **required** — для инициалов и alt |
| `src` | `string` | — | URL изображения |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | sm=28px, md=36px, lg=48px |

```tsx
<Avatar name="Алибек Мусаев" />
<Avatar name="Нора ИИ" src="/nora.png" size="lg" />
<HStack gap={2}>
  <Avatar name={user.full_name} src={user.avatar} size="sm" />
  <Text as="span">{user.full_name}</Text>
</HStack>
```

---

### AvatarGroup
Стопка перекрывающихся `Avatar` с "+N" для скрытого остатка — дети, не items-массив (semantic composition, как `Carousel`/`CarouselItem`).

| prop | type | default | description |
|---|---|---|---|
| `children` | `ReactNode` | — | **required** — `Avatar` |
| `max` | `number` | `5` | сколько аватаров показать до сворачивания в "+N" |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | должен совпадать с `size` дочерних `Avatar` |

```tsx
<AvatarGroup max={4}>
  {students.map((s) => (
    <Avatar key={s.id} name={s.name} src={s.avatar} />
  ))}
</AvatarGroup>
```

---

### Badge
Цветной бейдж для статусов и меток.

| prop | type | default | description |
|---|---|---|---|
| `variant` | `'default' \| 'success' \| 'error' \| 'info' \| 'warning' \| 'orange'` | `'default'` | |

```tsx
<Badge variant="success">Одобрено</Badge>
<Badge variant="error">Отклонено</Badge>
<Badge variant="info">На проверке</Badge>
<Badge variant="orange">+10 очков</Badge>
```

---

### RoleBadge
Бейдж роли пользователя. Цвет и текст задаются автоматически.

| prop | type | description |
|---|---|---|
| `role` | `'student' \| 'teacher' \| 'admin'` | student→info, teacher→orange, admin→error |

```tsx
<RoleBadge role="student" />   // → "Студент" (синий)
<RoleBadge role="teacher" />   // → "Преподаватель" (оранжевый)
<RoleBadge role="admin" />     // → "Администратор" (красный)
```

---

### Dialog
Модальное окно с Motion-анимацией (scale + fade).

| prop | type | default | description |
|---|---|---|---|
| `open` | `boolean` | — | **required** |
| `onOpenChange` | `(open: boolean) => void` | — | **required** |
| `title` | `string` | — | **required** — заголовок |
| `description` | `string` | — | подзаголовок |
| `footer` | `ReactNode` | — | кнопки внизу |
| `children` | `ReactNode` | — | тело диалога |

```tsx
const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>Открыть</Button>

<Dialog
  open={open}
  onOpenChange={setOpen}
  title="Редактировать группу"
  footer={
    <>
      <Button variant="ghost" onClick={() => setOpen(false)}>Отмена</Button>
      <Button onClick={handleSave} loading={isPending}>Сохранить</Button>
    </>
  }
>
  <Stack gap={3}>
    <Input label="Название" {...register('name')} />
    <Input label="Специальность" {...register('specialty')} />
  </Stack>
</Dialog>
```

**`Dialog` и вложенный `Select`.** У Radix `Select` физически нет пропа `modal` (в отличие от Dialog/Popover/DropdownMenu) — он не умеет не быть модальным. Это ломает вложенность двумя независимыми способами, оба нейтрализованы внутри `Dialog`/`AlertDialog`:

1. Клик по опции в открытом `Select` — попап рендерится порталом в `document.body`, вне DOM-дерева `Dialog.Content`, и Radix посчитал бы это "outside"-кликом, закрывающим диалог. `Dialog.Content`/`AlertDialog.Content` игнорируют outside-клики/фокус, попадающие в портал любого вложенного Radix-попапа (`Select`, `Combobox`, `DropdownMenu`, `ContextMenu`, `Popover`, `HoverCard`, `Tooltip`) — см. `src/components/overlay/dialog/preventNestedPopperClose.ts`.
2. Повторный клик по триггеру `Select`, чтобы закрыть уже открытый попап — пока `Select` открыт, он навешивает `aria-hidden` на диалог как на "постороннего соседа" по DOM (свой `hideOthers()`, т.к. не умеет не быть модальным), а Motion в ответ на `aria-hidden` сам проставляет `pointer-events: none` на анимируемый `motion.div` диалога. Клик по триггеру проваливается сквозь отключённый контент на оверлей — и тот закрывает диалог штатным образом. Контент диалога держит `!pointer-events-auto`, перебивающий это инлайн-стилем `!important`.

---

### AlertDialog
Диалог подтверждения (деструктивные действия).

| prop | type | default | description |
|---|---|---|---|
| `open` | `boolean` | — | **required** |
| `onOpenChange` | `(open: boolean) => void` | — | **required** |
| `title` | `string` | — | **required** |
| `description` | `string` | — | **required** |
| `onConfirm` | `() => void` | — | **required** |
| `confirmLabel` | `string` | `'Подтвердить'` | |
| `cancelLabel` | `string` | `'Отмена'` | |
| `destructive` | `boolean` | `false` | красная кнопка confirm |
| `loading` | `boolean` | `false` | |

```tsx
<AlertDialog
  open={deleteOpen}
  onOpenChange={setDeleteOpen}
  title="Удалить группу?"
  description="Это действие нельзя отменить. Все студенты группы будут откреплены."
  confirmLabel="Удалить"
  destructive
  loading={isDeleting}
  onConfirm={handleDelete}
/>
```

---

### Select
Dropdown-селект на Radix UI.

| prop | type | default | description |
|---|---|---|---|
| `options` | `SelectOption[]` | — | **required** — `{ value, label, disabled?, icon?, swatch? }[]` |
| `value` | `string` | — | controlled value |
| `onValueChange` | `(value: string) => void` | — | |
| `placeholder` | `string` | `'Выбрать...'` | |
| `label` | `string` | — | подпись |
| `error` | `string` | — | |
| `disabled` | `boolean` | `false` | |

```tsx
const groups = [
  { value: '1', label: 'K320-24' },
  { value: '2', label: 'K321-24' },
];

<Select
  label="Группа"
  options={groups}
  value={selectedGroup}
  onValueChange={setSelectedGroup}
  placeholder="Выберите группу..."
/>

// Внутри Dialog — работает "из коробки", выбор опции не закрывает диалог
// (Dialog игнорирует outside-клики, попадающие в порталы вложенных Radix-попапов)
<Dialog open={open} onOpenChange={setOpen} title="Настройки">
  <Select label="Группа" options={groups} value={value} onValueChange={setValue} />
</Dialog>
```

Каждой опции можно задать `icon` (`React.ElementType`, например компонент из `lucide-react`) — иконка отрисуется и в списке, и в самом триггере рядом с выбранным значением:

```tsx
import { Globe, Key, Shield } from 'lucide-react';

const categories = [
  { value: 'network', label: 'Сети', icon: Globe },
  { value: 'crypto', label: 'Криптография', icon: Key },
  { value: 'web', label: 'Веб-безопасность', icon: Shield },
];

<Select label="Категория" options={categories} value={value} onValueChange={setValue} />
```

Если иконки не нужны, но опции представляют цвета — задайте `swatch` (любой CSS-цвет: hex/rgb/var), он рисует небольшой цветной кружок перед лейблом. Если у опции задан и `icon`, и `swatch` — приоритет у `icon`:

```tsx
const colors = [
  { value: '#60a5fa', label: 'Синий', swatch: '#60a5fa' },
  { value: '#f97316', label: 'Оранжевый', swatch: '#f97316' },
];

<Select label="Цвет" options={colors} value={value} onValueChange={setValue} />
```

---

### Combobox
Dropdown-селект с поиском по опциям (typeahead). Как `Select`, но для длинных списков — триггер открывает попап с полем поиска, список фильтруется на лету.

| prop | type | default | description |
|---|---|---|---|
| `options` | `ComboboxOption[]` | — | **required** — `{ value, label, disabled? }[]` |
| `value` | `string` | — | controlled value |
| `onValueChange` | `(value: string) => void` | — | |
| `placeholder` | `string` | `'Выбрать...'` | текст на триггере, когда ничего не выбрано |
| `searchPlaceholder` | `string` | `'Поиск...'` | placeholder поля поиска в попапе |
| `emptyText` | `string` | `'Ничего не найдено'` | текст, когда поиск не дал результатов |
| `label` | `string` | — | подпись |
| `error` | `string` | — | |
| `disabled` | `boolean` | `false` | |

```tsx
const countries = [
  { value: 'ru', label: 'Россия' },
  { value: 'kz', label: 'Казахстан' },
  { value: 'by', label: 'Беларусь' },
];

<Combobox
  label="Страна"
  options={countries}
  value={country}
  onValueChange={setCountry}
  placeholder="Выберите страну..."
/>
```

Клавиатура внутри попапа: `↑`/`↓` — навигация, `Enter` — выбрать, `Escape` — закрыть.

---

### Tree
Иерархический список с раскрытием узлов и опциональным каскадным множественным выделением (чекбоксы) — для структур курса/модулей, факультет→группа→студент, дерева прав доступа и т.п.

| prop | type | default | description |
|---|---|---|---|
| `data` | `TreeNode[]` | — | **required** — `{ key, label, icon?, disabled?, children? }[]` |
| `checkable` | `boolean` | `false` | показывать чекбоксы — каскадное множественное выделение (потомки/предки синхронизируются) |
| `selectable` | `boolean` | `true` | клик по подписи подсвечивает узел (одиночное выделение) |
| `selectedKeys` / `defaultSelectedKeys` / `onSelect` | | | controlled/uncontrolled одиночное выделение |
| `checkedKeys` / `defaultCheckedKeys` / `onCheck` | | | controlled/uncontrolled отмеченные ключи (при `checkable`) |
| `expandedKeys` / `defaultExpandedKeys` / `onExpand` | | | controlled/uncontrolled развёрнутые узлы |

Отметка родителя каскадно отмечает всех потомков; родитель получает `indeterminate`, пока отмечена только часть детей, и полностью отмечается, когда отмечены все.

```tsx
import { Tree } from '@nerva-start-up/ui';
import { Folder, BookOpen } from 'lucide-react';

const courseTree = [
  {
    key: 'module-1',
    label: 'Модуль 1 — Основы криптографии',
    icon: Folder,
    children: [
      { key: 'lesson-1-1', label: 'Симметричное шифрование', icon: BookOpen },
      { key: 'lesson-1-2', label: 'Асимметричное шифрование', icon: BookOpen },
    ],
  },
];

// Одиночное выделение
<Tree data={courseTree} selectedKeys={selected} onSelect={(keys) => setSelected(keys)} />

// Каскадное множественное выделение
<Tree data={courseTree} checkable selectable={false} checkedKeys={checked} onCheck={setChecked} />
```

---

### TreeSelect
Выбор значения(й) из иерархического списка — `Tree` в попапе (`Popover`) с триггером в стиле select.

| prop | type | default | description |
|---|---|---|---|
| `data` | `TreeNode[]` | — | **required** — те же данные, что у `Tree` |
| `multiple` | `boolean` | `false` | множественный выбор через чекбоксы (иначе — одиночный клик, закрывает попап) |
| `value` / `defaultValue` / `onChange` | | | controlled/uncontrolled выбранные ключи |
| `placeholder` | `string` | `'Выберите значение'` | текст при пустом выборе |
| `disabled` | `boolean` | `false` | |

```tsx
import { TreeSelect } from '@nerva-start-up/ui';

<TreeSelect
  data={[
    { key: 'faculty-it', label: 'Факультет ИТ', children: [
      { key: 'group-ib-101', label: 'Группа ИБ-101' },
    ]},
  ]}
  value={value}
  onChange={setValue}
  placeholder="Выберите группу"
/>

// Множественный выбор
<TreeSelect data={orgTree} multiple value={values} onChange={setValues} />
```

---

### Cascader
Каскадный выбор из вложенной иерархии по колонкам (факультет → группа → студент и т.п.) — данные в том же формате `TreeNode`, что у `Tree`. Клик по узлу с детьми открывает следующую колонку; клик по листу коммитит путь и закрывает попап.

| prop | type | default | description |
|---|---|---|---|
| `data` | `TreeNode[]` | — | **required** — те же данные, что у `Tree` |
| `value` / `defaultValue` / `onChange` | | | controlled/uncontrolled путь ключей от корня до листа; `onChange(path, leaf)` |
| `separator` | `string` | `' / '` | разделитель в подписи триггера |
| `placeholder` | `string` | `'Выберите значение'` | текст при пустом выборе |
| `disabled` | `boolean` | `false` | |

```tsx
import { Cascader } from '@nerva-start-up/ui';

<Cascader
  data={[
    { key: 'faculty-it', label: 'Факультет ИТ', children: [
      { key: 'group-ib-101', label: 'Группа ИБ-101', children: [
        { key: 'student-1', label: 'Иванов Иван' },
      ]},
    ]},
  ]}
  value={path}
  onChange={(path, leaf) => setPath(path)}
  placeholder="Выберите студента"
/>
```

---

### Tooltip
Всплывающая подсказка. Требует `TooltipProvider` в корне.

| prop | type | default | description |
|---|---|---|---|
| `content` | `ReactNode` | — | **required** — текст тултипа |
| `children` | `ReactNode` | — | **required** — trigger-элемент |
| `side` | `'top' \| 'right' \| 'bottom' \| 'left'` | `'top'` | |

```tsx
// В корне приложения:
<TooltipProvider>...</TooltipProvider>

// Использование:
<Tooltip content="Удалить навсегда">
  <Button variant="danger" size="icon"><TrashIcon /></Button>
</Tooltip>
```

---

### HoverCard
Всплывающая карточка по наведению (без radix-ui — задержки открытия/закрытия на таймерах). В отличие от `Tooltip` — может содержать богатый интерактивный контент (аватар, бейджи, кнопки); в отличие от `Popover` — открывается по hover/focus, а не клику. Контент рендерится в `Card`.

**Составные части:** `HoverCard` (корень, контекст), `HoverCardTrigger` (оборачивает `children` через `cloneElement`), `HoverCardContent` (портал, позиционируется у триггера).

| prop (`HoverCard`) | type | default | description |
|---|---|---|---|
| `openDelay` | `number` | `300` | задержка перед открытием при наведении, мс |
| `closeDelay` | `number` | `200` | задержка перед закрытием после ухода курсора, мс |

| prop (`HoverCardContent`) | type | default | description |
|---|---|---|---|
| `side` | `'top' \| 'bottom'` | `'bottom'` | сторона появления относительно триггера |
| `sideOffset` | `number` | `8` | отступ от триггера, px |
| `className` | `string` | — | Tailwind-классы (передаются в `Card`) |

Наведение на сам контент отменяет запланированное закрытие — можно навести курсор с триггера на карточку без мерцания.

```tsx
import { HoverCard, HoverCardTrigger, HoverCardContent, Avatar, Badge, Text } from '@nerva-start-up/ui';

<HoverCard>
  <HoverCardTrigger>
    <Text as="span" className="underline decoration-dotted">Иванов Иван</Text>
  </HoverCardTrigger>
  <HoverCardContent>
    <div className="flex items-start gap-3">
      <Avatar name="Иванов Иван" size="lg" />
      <div className="flex flex-col gap-1">
        <Text as="span" size="sm" weight="semibold">Иванов Иван</Text>
        <Text as="span" size="xs" variant="muted">Группа ИБ-101</Text>
        <Badge variant="orange">KSI Score: 1420</Badge>
      </div>
    </div>
  </HoverCardContent>
</HoverCard>
```

---

### Progress
Линейный прогресс-бар. `ProgressCircle` — круговой (SVG) вариант с той же цветовой/статусной моделью.

| prop | type | default | description |
|---|---|---|---|
| `value` | `number` | — | **required** — 0–100 |
| `label` | `string` | — | текст слева |
| `showValue` | `boolean` | `false` | процент справа |
| `color` | `'primary' \| 'success' \| 'info'` | `'primary'` | цвет заливки (перекрывается `status="success"/"error"`) |
| `status` | `'normal' \| 'active' \| 'success' \| 'error'` | `'normal'` | `active` — бегущая световая полоса поверх заливки; `success`/`error` — цвет и иконка вместо процента |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | высота полосы |
| `format` | `(value: number) => ReactNode` | — | кастомный рендер значения справа, по умолчанию `` `${value}%` `` |

```tsx
<Progress value={72} label="KSI Score" showValue />
<Progress value={score.academic * 100} color="info" label="Академический" showValue />
<Progress value={40} />

// Загрузка в процессе — бегущая полоса
<Progress value={uploadPercent} status="active" label="Загрузка файла..." showValue />

// Завершено / ошибка — иконка вместо процента
<Progress value={100} status="success" label="Задание сдано" showValue />
<Progress value={syncPercent} status="error" label="Ошибка синхронизации" showValue />

// Кастомный формат значения
<Progress value={70} label="Уроки" showValue format={() => '7 / 10'} />
```

`ProgressCircle` — `value`, `size?` (96), `strokeWidth?` (8), `color?`, `status?` (`'normal' | 'active' | 'success' | 'error'`), `showValue?` (`true`), `format?`, `className?`. `status="active"` рисует яркий сегмент (12% длины кольца), бегущий по окружности поверх заливки — круговой аналог бегущей полосы линейного варианта.

```tsx
import { ProgressCircle } from '@nerva-start-up/ui';

<ProgressCircle value={72} />
<ProgressCircle value={45} color="info" size={72} strokeWidth={6} />
<ProgressCircle value={60} status="active" />
<ProgressCircle value={100} status="success" />
```

---

### Spinner
Анимированный индикатор загрузки.

| prop | type | default | description |
|---|---|---|---|
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | sm=12px, md=16px, lg=24px |

```tsx
<Spinner />
<Spinner size="lg" />
<Center className="h-40"><Spinner size="lg" /></Center>
```

---

### BrandMark / BrandLoader / BrandSplash
Брендированные индикаторы загрузки на основе глифа KSI (три полоски, прорезанные насквозь в скруглённом квадрате `--primary`). `BrandMark` — сам глиф (статичный или анимированный, полоски прорисовываются по очереди в цикле); `BrandLoader` — инлайн-замена `Spinner`, когда важен брендинг; `BrandSplash` — полноэкранный splash поверх всего (portal) для загрузки приложения при старте.

| Компонент | Назначение |
|---|---|
| `BrandMark` | `size?` (48), `animated?` (`false`), `className?` |
| `BrandLoader` | `size?` (`'sm' \| 'md' \| 'lg'`, `'md'`), `label?`, `className?` |
| `BrandSplash` | `open` (обязателен), `label?`, `className?` |

```tsx
// Статичный глиф (например, в шапке)
<BrandMark size={32} />

// Инлайн-лоадер вместо Spinner
<BrandLoader size="sm" />
<BrandLoader label="Загрузка данных..." />

// Полноэкранный splash при старте приложения
<BrandSplash open={!appReady} label="Загрузка KSI..." />
```

---

### Skeleton
Анимированный placeholder загрузки (pulse).

| prop | type | default | description |
|---|---|---|---|
| `width` | `string \| number` | — | CSS width |
| `height` | `string \| number` | — | CSS height |
| `rounded` | `'sm' \| 'md' \| 'lg' \| 'full'` | `'md'` | border-radius |
| `className` | `string` | — | |

```tsx
// Список скелетонов
<Stack gap={3}>
  <Skeleton height={20} width="60%" />
  <Skeleton height={16} width="40%" />
  <Skeleton height={120} />
</Stack>

// Круглый аватар
<Skeleton width={36} height={36} rounded="full" />
```

---

### ScrollArea
Кастомизированная scrollable-область (Radix ScrollArea).

| prop | type | default | description |
|---|---|---|---|
| `maxHeight` | `string` | — | CSS max-height |
| `children` | `ReactNode` | — | |

```tsx
<ScrollArea maxHeight="400px">
  {messages.map(m => <MessageBubble key={m.id} {...m} />)}
</ScrollArea>
```

---

### Separator
Горизонтальный или вертикальный разделитель.

| prop | type | default |
|---|---|---|
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` |

```tsx
<Separator />
<HStack><Text as="span">A</Text><Separator orientation="vertical" className="h-4" /><Text as="span">B</Text></HStack>
```

---

### Toaster + toast
`Toaster` монтируется один раз в корне. `toast()` вызывается из любого места.

```tsx
// Монтаж (один раз)
<Toaster />

// Использование
import { toast } from '@nerva-start-up/ui';

toast.success('Группа создана');
toast.error('Ошибка сервера');
toast.info('Изменения сохранены');
toast('Нейтральное сообщение');
toast.promise(saveGroup(), {
  loading: 'Сохранение...',
  success: 'Сохранено',
  error:   'Ошибка',
});
```

---

### Message + message

Компактное всплывающее сообщение (antd-style `message`) — по центру сверху экрана, без заголовка/описания, в отличие от `Toaster` (углы экрана, поддерживает title+description+action). `Message` монтируется один раз в корне; `message.*` вызывается из любого места (не хук — обычная функция, можно из обработчика вне React-дерева).

| prop (`Message`) | type | default | description |
|---|---|---|---|
| `max` | `number` | `5` | максимум одновременно видимых сообщений — старые скрываются первыми |

`message.success/error/warning/info(content, duration?)` — `duration` в мс, по умолчанию `3000`, возвращает `id`. `message.loading(content, duration?)` — по умолчанию не скрывается (`duration=0`), возвращает `id` для последующего `message.dismiss(id)`.

```tsx
// Монтаж (один раз)
<Message />

// Использование
import { message } from '@nerva-start-up/ui';

message.success('Задание сохранено');
message.error('Не удалось сохранить');

// loading → dismiss → success
const id = message.loading('Проверка задания…');
await checkAssignment();
message.dismiss(id);
message.success('Задание проверено');
```

---

## Transfer

Двухпанельный перенос элементов между "доступно" и "выбрано" — список с чекбоксами, поиск, select-all и кнопки-стрелки для переноса. Не компаунд-компонент — принимает `dataSource` целиком и сам делит его на панели по `targetKeys`.

| prop | type | default | description |
|---|---|---|---|
| `dataSource` | `{ key: string; title: string; description?: string; disabled?: boolean }[]` | — | **required** — полный список всех элементов |
| `targetKeys` | `string[]` | — | controlled ключи элементов в правой панели |
| `defaultTargetKeys` | `string[]` | `[]` | uncontrolled начальные ключи в правой панели |
| `onChange` | `(targetKeys: string[], direction: 'left' \| 'right', movedKeys: string[]) => void` | — | callback при переносе |
| `titles` | `[string, string]` | `['Доступно', 'Выбрано']` | заголовки левой/правой панели |
| `searchable` | `boolean` | `true` | показывать поле поиска в каждой панели |
| `height` | `number \| string` | `320` | высота каждой панели |
| `disabled` | `boolean` | `false` | блокирует весь контрол |
| `className` | `string` | — | Tailwind-классы |

`onToggleAll` (select-all) переключает только элементы, видимые после текущего поиска — отмеченные, но скрытые поиском элементы не сбрасываются.

```tsx
import { Transfer } from '@nerva-start-up/ui';
import { useState } from 'react';

const students = [
  { key: '1', title: 'Иванов Иван', description: 'ИБ-101' },
  { key: '2', title: 'Петров Пётр', description: 'ИБ-101' },
  // ...
];

const [targetKeys, setTargetKeys] = useState<string[]>([]);
<Transfer
  dataSource={students}
  targetKeys={targetKeys}
  onChange={setTargetKeys}
  titles={['Студенты', 'Участники группы']}
/>
```

---

## Carousel

Карусель на CSS scroll-snap (без внешних зависимостей) — свайп, стрелки, точки-индикаторы, автопрокрутка с паузой при наведении. Слайды — `CarouselItem`.

### Компоненты

| Компонент | Props | Description |
|---|---|---|
| `Carousel` | `children`, `activeIndex?`, `defaultActiveIndex?` (0), `onChange?`, `autoplay?` (false), `autoplayInterval?` (4000), `pauseOnHover?` (true), `loop?` (true), `showArrows?` (true), `showDots?` (true), `className?` | Корень — трек scroll-snap, стрелки, точки |
| `CarouselItem` | `children`, `className?` | Один слайд — ширина 100% трека, точка привязки snap |

`onChange` вызывается при смене активного слайда любым способом (свайп, стрелки, точки, автопрокрутка). Стрелки/точки автоматически скрываются, если слайд один.

```tsx
import { Carousel, CarouselItem } from '@nerva-start-up/ui';

<div className="max-w-lg overflow-hidden rounded-[var(--radius-lg)]">
  <Carousel autoplay autoplayInterval={5000}>
    <CarouselItem>
      <img src="/banner-1.jpg" alt="Набор в группу ИБ-101" className="h-56 w-full object-cover" />
    </CarouselItem>
    <CarouselItem>
      <img src="/banner-2.jpg" alt="Хакатон KSI 2026" className="h-56 w-full object-cover" />
    </CarouselItem>
    <CarouselItem>
      <img src="/banner-3.jpg" alt="Открытая лекция" className="h-56 w-full object-cover" />
    </CarouselItem>
  </Carousel>
</div>
```

---

## Slider

Ползунок значения (без radix-ui — pointer/touch-драг + клавиатура реализованы вручную). Один thumb или диапазон (`range`, два thumb), шаг, подписанные отметки, всплывающая подсказка со значением при перетаскивании.

| prop | type | default | description |
|---|---|---|---|
| `value` | `number \| [number, number]` | — | controlled значение — число или `[from, to]` для диапазона |
| `defaultValue` | `number \| [number, number]` | `min` / `[min, max]` | uncontrolled начальное значение |
| `onChange` | `(value: number \| [number, number]) => void` | — | callback при каждом изменении (во время перетаскивания) |
| `onChangeEnd` | `(value: number \| [number, number]) => void` | — | callback по завершении перетаскивания/клика/клавиши |
| `range` | `boolean` | `false` | диапазонный режим — два ползунка вместо одного |
| `min` / `max` | `number` | `0` / `100` | границы значения |
| `step` | `number` | `1` | шаг изменения |
| `marks` | `Record<number, string>` | — | подписанные отметки на треке, например `{ 0: '0%', 50: '50%', 100: '100%' }` |
| `disabled` | `boolean` | `false` | блокирует взаимодействие |
| `label` | `string` | — | подпись над слайдером |
| `showTooltip` | `boolean` | `true` | показывать значение во всплывающей подсказке при перетаскивании |
| `className` | `string` | — | Tailwind-классы |

Клавиатура на активном thumb: `←/→`, `↑/↓` — шаг; `PageUp/PageDown` — 10 шагов; `Home/End` — min/max.

```tsx
import { Slider } from '@nerva-start-up/ui';
import { useState } from 'react';

// Одно значение
const [volume, setVolume] = useState(70);
<Slider label="Громкость" value={volume} onChange={(v) => setVolume(v as number)} />

// Диапазон с отметками
<Slider
  label="Цена курса, тыс. сум"
  range
  defaultValue={[200, 800]}
  min={0}
  max={1000}
  step={50}
  marks={{ 0: '0', 500: '500', 1000: '1000' }}
/>
```

---

## Motion Variants
Импорт: `import { fadeIn, slideUp, ... } from '@nerva-start-up/ui/motion'`

| Вариант | Эффект |
|---|---|
| `fadeIn` | opacity 0→1 |
| `slideUp` | opacity + translateY(12px→0) |
| `slideDown` | opacity + translateY(-12px→0) |
| `scaleIn` | opacity + scale(0.95→1) |
| `dialogContent` | scale + translate(-50%,-50%) — для модалок поверх overlay |
| `overlayBg` | opacity 0→1 — для backdrop |
| `defaultTransition` | `{ duration: 0.15, ease: 'easeOut' }` |
| `springTransition` | `{ type: 'spring', stiffness: 400, damping: 30 }` |

```tsx
import { motion, AnimatePresence } from 'motion/react';
import { slideUp, defaultTransition } from '@nerva-start-up/ui/motion';

<AnimatePresence>
  {visible && (
    <motion.div {...slideUp} transition={defaultTransition}>
      <Notification />
    </motion.div>
  )}
</AnimatePresence>
```

---

### Table
Таблица данных. Состоит из 6 sub-компонентов: `Table`, `Thead`, `Tbody`, `Tr`, `Th`, `Td`.

| Компонент | Эквивалент | Особые props |
|---|---|---|
| `Table` | `<table>` | `className` |
| `Thead` | `<thead>` | `className` |
| `Tbody` | `<tbody>` | `className` |
| `Tr` | `<tr>` | `hoverable?: boolean` (default `true`), `selected?: boolean` — подсветка выбранной строки |
| `Th` | `<th>` | `className` — uppercase, muted |
| `Td` | `<td>` | `className` |

```tsx
import { Table, Thead, Tbody, Tr, Th, Td } from '@nerva-start-up/ui';

<Table>
  <Thead>
    <Tr hoverable={false}>
      <Th>Имя</Th>
      <Th>Email</Th>
      <Th>Роль</Th>
      <Th />
    </Tr>
  </Thead>
  <Tbody>
    {users.map(u => (
      <Tr key={u.id}>
        <Td>{u.full_name}</Td>
        <Td>{u.email}</Td>
        <Td><RoleBadge role={u.role} /></Td>
        <Td className="text-right">
          <Button variant="ghost" size="icon"><Pencil size={14} /></Button>
        </Td>
      </Tr>
    ))}
  </Tbody>
</Table>

// Пустая таблица
{users.length === 0 && <EmptyState title="Студентов нет" icon={Users} />}
```

#### TdCopy — ячейка с копированием
`<td>`-обёртка над [`CopyText`](#copytext), которая позволяет скопировать значение конкретной ячейки в буфер обмена (ID, API-ключ, ссылка и т.д.).

| prop | type | default | description |
|---|---|---|---|
| `text` | `string` | — | **required** — значение для копирования |
| `truncate` | `boolean` | — | обрезать длинный текст (см. `CopyTextValue`) |
| `mask` | `boolean` | — | маскировать значение точками (см. `CopyTextValue`) |
| `copiedText` | `string` | `'Скопировано!'` | текст оверлея при копировании |
| `onCopied` | `() => void` | — | колбэк после успешного копирования |
| `copyClassName` | `string` | — | className для внутреннего `CopyText` (не для `<td>`) |
| `className` | `string` | — | className для самого `<td>` |

```tsx
import { Table, Thead, Tbody, Tr, Th, Td, TdCopy } from '@nerva-start-up/ui';

<Table>
  <Thead>
    <Tr hoverable={false}>
      <Th>Название</Th>
      <Th>ID пользователя</Th>
      <Th>API-ключ</Th>
    </Tr>
  </Thead>
  <Tbody>
    {apiKeys.map(row => (
      <Tr key={row.id} hoverable={false}>
        <Td>{row.name}</Td>
        <TdCopy text={row.id} />
        <TdCopy text={row.key} mask truncate />
      </Tr>
    ))}
  </Tbody>
</Table>
```

#### TdCheckbox / ThCheckbox — выбор строк (row selection)
`ThCheckbox` — чекбокс "выбрать всё" в шапке, `TdCheckbox` — чекбокс строки в теле. Визуальное выделение выбранной строки делает `<Tr selected>`.

| prop | type | default | description |
|---|---|---|---|
| `checked` | `boolean` | — | состояние чекбокса |
| `indeterminate` | `boolean` | — | только у `ThCheckbox` — часть строк выбрана ("-" вместо галочки) |
| `onChange` | `(checked: boolean) => void` | — | колбэк изменения |
| `disabled` | `boolean` | — | — |
| `aria-label` | `string` | `'Выбрать строку'` / `'Выбрать все строки'` | доступное имя (визуального label у чекбокса нет) |

```tsx
import { Table, Thead, Tbody, Tr, Th, Td, ThCheckbox, TdCheckbox } from '@nerva-start-up/ui';

const [selected, setSelected] = useState<string[]>([]);
const allSelected = selected.length === students.length;
const someSelected = selected.length > 0 && !allSelected;

<Table>
  <Thead>
    <Tr hoverable={false}>
      <ThCheckbox
        checked={allSelected}
        indeterminate={someSelected}
        onChange={checked => setSelected(checked ? students.map(s => s.id) : [])}
      />
      <Th>Студент</Th>
    </Tr>
  </Thead>
  <Tbody>
    {students.map(s => (
      <Tr key={s.id} hoverable={false} selected={selected.includes(s.id)}>
        <TdCheckbox
          checked={selected.includes(s.id)}
          onChange={() => toggleRow(s.id)}
          aria-label={`Выбрать ${s.name}`}
        />
        <Td>{s.name}</Td>
      </Tr>
    ))}
  </Tbody>
</Table>
```

---

### Pagination
Пагинация. Скрывается автоматически при `totalPages <= 1`.

| prop | type | default | description |
|---|---|---|---|
| `page` | `number` | — | **required** — текущая страница (1-indexed) |
| `totalPages` | `number` | — | **required** |
| `onPageChange` | `(page: number) => void` | — | **required** |
| `total` | `number` | — | Всего записей — показывает диапазон "1–20 из 87" |
| `pageSize` | `number` | — | Нужен вместе с `total` |

```tsx
import { Pagination } from '@nerva-start-up/ui';

const [page, setPage] = useState(1);
const PAGE_SIZE = 20;

<Pagination
  page={page}
  totalPages={Math.ceil(total / PAGE_SIZE)}
  onPageChange={setPage}
  total={total}
  pageSize={PAGE_SIZE}
/>
```

---

### Tabs
Вкладки на Radix UI. Экспортирует 4 компонента:
- `Tabs` — root (Radix `Tabs.Root`)
- `TabsList` — строка с вкладками (нижняя граница)
- `TabsTrigger` — кнопка вкладки (активная — оранжевая подчёркивание)
- `TabsContent` — контент вкладки (Radix `Tabs.Content`)

```tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@nerva-start-up/ui';

const [tab, setTab] = useState('all');

<Tabs value={tab} onValueChange={setTab}>
  <TabsList>
    <TabsTrigger value="all">Все недели</TabsTrigger>
    <TabsTrigger value="odd">Нечётные</TabsTrigger>
    <TabsTrigger value="even">Чётные</TabsTrigger>
  </TabsList>

  <TabsContent value="all" className="pt-4">
    <ScheduleTable weekType="all" />
  </TabsContent>
  <TabsContent value="odd" className="pt-4">
    <ScheduleTable weekType="odd" />
  </TabsContent>
  <TabsContent value="even" className="pt-4">
    <ScheduleTable weekType="even" />
  </TabsContent>
</Tabs>
```

---

### EmptyState
Заглушка для пустых списков / страниц без данных.

| prop | type | default | description |
|---|---|---|---|
| `title` | `string` | — | **required** |
| `description` | `string` | — | Дополнительный текст |
| `icon` | `React.ElementType` | — | Lucide-иконка (оранжевый фон) |
| `action` | `ReactNode` | — | Кнопка или ссылка |

```tsx
import { EmptyState } from '@nerva-start-up/ui';
import { Users } from 'lucide-react';

// Минимальный
<EmptyState title="Студентов нет" />

// Полный
<EmptyState
  icon={Users}
  title="Студенты не найдены"
  description="Попробуйте изменить фильтры или добавьте первого студента."
  action={
    <Button onClick={() => setCreateOpen(true)}>
      Добавить студента
    </Button>
  }
/>
```

---

### Result
Страница-итог действия (success/error/403/404/500…). В отличие от `EmptyState` ("данных пока нет ещё") — сообщает исход операции.

| prop | type | default | description |
|---|---|---|---|
| `status` | `'success' \| 'error' \| 'warning' \| 'info' \| '403' \| '404' \| '500'` | `'info'` | задаёт иконку, цвет и заголовок по умолчанию |
| `title` | `string` | заголовок для `status` | перекрывает заголовок по умолчанию |
| `subtitle` | `string` | — | пояснение под заголовком |
| `icon` | `React.ElementType` | — | кастомная иконка вместо стандартной для `status` |
| `extra` | `ReactNode` | — | кнопки действий под текстом |

```tsx
import { Result, Button } from '@nerva-start-up/ui';

<Result
  status="success"
  title="Задание отправлено"
  subtitle="Преподаватель проверит его в течение 3 рабочих дней."
  extra={<Button>К списку заданий</Button>}
/>

<Result
  status="403"
  subtitle="У вас нет доступа к этой группе. Обратитесь к куратору."
  extra={<Button variant="outline">На главную</Button>}
/>
```

---

## Utility

### cn
`clsx` + `tailwind-merge`. Безопасное объединение классов.

```tsx
import { cn } from '@nerva-start-up/ui';

cn('px-4 py-2', isActive && 'bg-orange-500', className)
// → 'px-4 py-2 bg-orange-500 ...'
```

---

## Design Tokens (CSS custom properties)

```css
/* Backgrounds */  --bg · --surface · --surface-2 · --border
/* Text */         --text · --text-sub · --text-muted
/* Accent */       --primary · --primary-h · --primary-d · --primary-dim
/* Semantic */     --success · --error · --info · --holiday
/* Fonts */        --font-sans · --font-mono
/* Font sizes */   --font-size-xs(12px) · -sm(14px) · -md(16px) · -lg(18px) · -xl(20px) · -2xl(24px) · -3xl(30px)
/* Font weights */ --font-weight-normal(400) · -medium(500) · -semibold(600) · -bold(700)
/* Line heights */ --line-height-tight(1.2) · -normal(1.5) · -relaxed(1.75)
/* Tracking */     --tracking-tight(-0.02em) · -normal(0em) · -wide(0.02em)
/* Radii */        --radius-sm(6px) · --radius-md(10px) · --radius-lg(14px) · --radius-xl(20px)
/* Shadows */      --shadow · --shadow-sm · --shadow-glow
```

Шрифтовые токены (`--font-*`, `--line-height-*`, `--tracking-*`) не зависят от темы — определены один раз в `:root`, без override в `[data-theme="light"]` (как и `--radius-*`). См. подробное описание в [Font Tokens](#font-tokens).

Все токены автоматически переключаются при смене темы через `ThemeProvider`.

```tsx
// Токены доступны в inline-стилях и Tailwind arbitrary values
<div style={{ background: 'var(--surface)' }} />
<div className="bg-[var(--primary)] text-[var(--text)]" />
```

---

## Calendar

Автономный календарь без внешних зависимостей. Неделя начинается с понедельника (русская локаль).

| prop | type | default | description |
|---|---|---|---|
| `value` | `Date \| null` | — | выбранная дата |
| `onChange` | `(date: Date) => void` | — | callback при выборе |
| `minDate` | `Date` | — | минимальная дата |
| `maxDate` | `Date` | — | максимальная дата |
| `defaultMonth` | `Date` | value или сегодня | начальный месяц |
| `rangeValue` | `[Date \| null, Date \| null]` | — | `[от, до]` — подсвечивает непрерывную полосу диапазона (использует `DateRangePicker`) |
| `hoverDate` | `Date \| null` | — | дата под курсором — превью диапазона до выбора второй даты |
| `onDayHover` | `(date: Date \| null) => void` | — | наведение на день — для превью диапазона |
| `className` | `string` | — | |

```tsx
import { Calendar } from '@nerva-start-up/ui';

const [date, setDate] = useState<Date | null>(null);

<Calendar value={date} onChange={setDate} />

// С ограничением дат
<Calendar
  value={date}
  onChange={setDate}
  minDate={new Date()}
  maxDate={new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)}
/>
```

`rangeValue`/`hoverDate`/`onDayHover` — низкоуровневые пропы для построения диапазонных пикеров поверх `Calendar`; для готового решения используй `DateRangePicker`.

---

### DateRangePicker

Выбор диапазона дат — два `Calendar` в попапе (`Popover`), непрерывная подсветка диапазона и hover-превью второй даты до выбора.

| prop | type | default | description |
|---|---|---|---|
| `value` | `[Date \| null, Date \| null]` | — | controlled диапазон `[от, до]` |
| `defaultValue` | `[Date \| null, Date \| null]` | `[null, null]` | uncontrolled начальный диапазон |
| `onChange` | `(range: [Date \| null, Date \| null]) => void` | — | вызывается при выборе каждой из дат |
| `minDate` / `maxDate` | `Date` | — | границы выбираемых дат |
| `placeholder` | `string` | `'Выберите период'` | текст при пустом диапазоне |
| `disabled` | `boolean` | `false` | |
| `className` | `string` | — | Tailwind-классы триггера |

Первый клик задаёт начало диапазона; второй клик после начала — конец (клик раньше текущего начала сбрасывает его на новую дату). Кнопка «Сбросить» в попапе очищает диапазон.

```tsx
import { DateRangePicker } from '@nerva-start-up/ui';
import { useState } from 'react';

const [range, setRange] = useState<[Date | null, Date | null]>([null, null]);
<DateRangePicker value={range} onChange={setRange} placeholder="Период отчёта" />
```

---

### Tour

Пошаговый онбординг-тур с подсветкой элементов интерфейса — аналог `Tour` из antd. Composable API в духе shadcn (как `StepIndicator`): шаги — дочерние `TourStep`, содержимое каждого собирается из `TourTitle` / `TourDescription` / `TourCover` (или произвольного JSX). Рендерится в портал (`document.body`): маска с прямоугольным вырезом вокруг `target` активного шага (4 полосы — не SVG-маска и не `clip-path`, поэтому клики сквозь вырез проходят гарантированно в любом браузере) + позиционированная у него карточка со стрелкой.

Полностью controlled по `open` — компонент никогда не закрывает себя сам, решение остаётся за потребителем в `onOpenChange`/`onFinish`.

**Составные части:** `Tour` (корень, контекст + портал), `TourStep` (карточка шага: стрелка, крестик закрытия, индикаторы, кнопки Назад/Далее/Готово), `TourTitle`, `TourDescription`, `TourCover` (контент внутри `TourStep`).

| prop (`Tour`) | type | default | description |
|---|---|---|---|
| `open` | `boolean` | — | показывать тур (controlled) |
| `onOpenChange` | `(open: boolean) => void` | — | крестик на карточке или Escape вызывают с `false` |
| `current` / `defaultCurrent` | `number` | — / `0` | controlled/uncontrolled индекс активного шага |
| `onChange` | `(current: number) => void` | — | смена шага (кнопки Назад/Далее) |
| `onFinish` | `() => void` | — | кнопка «Готово» на последнем шаге |
| `mask` | `boolean` | `true` | затемнять фон вокруг target |
| `gap` | `number` | `6` | отступ между target и рамкой отверстия/карточкой, px |
| `type` | `'default' \| 'primary'` | `'default'` | визуальный стиль карточек шагов |
| `scrollIntoViewOptions` | `boolean \| ScrollIntoViewOptions` | `{ block: 'center', behavior: 'smooth' }` | `false` — не скроллить к target при переходе на шаг |

| prop (`TourStep`) | type | default | description |
|---|---|---|---|
| `target` | `RefObject<HTMLElement \| null> \| (() => HTMLElement \| null)` | — | готовый `ref` или геттер-функция (для случаев, когда элемент ещё не существует при монтировании `Tour`, либо резолвится динамически — например `document.querySelector`). Без `target`/`null` — карточка по центру экрана |
| `placement` | `'top' \| 'topLeft' \| 'topRight' \| 'bottom' \| 'bottomLeft' \| 'bottomRight' \| 'left' \| 'leftTop' \| 'leftBottom' \| 'right' \| 'rightTop' \| 'rightBottom' \| 'center'` | `'bottom'` | расположение карточки относительно `target` |
| `mask` | `boolean` | наследует `Tour.mask` | переопределяет маску для конкретного шага |

```tsx
import { Tour, TourStep, TourTitle, TourDescription, Button } from '@nerva-start-up/ui';
import { useRef, useState } from 'react';

const [open, setOpen] = useState(false);
const bellRef = useRef<HTMLButtonElement>(null);
const settingsRef = useRef<HTMLButtonElement>(null);

<Button onClick={() => setOpen(true)}>Начать тур</Button>

<Tour open={open} onOpenChange={setOpen}>
  <TourStep target={bellRef} placement="bottom">
    <TourTitle>Уведомления</TourTitle>
    <TourDescription>Здесь появляются напоминания о дедлайнах.</TourDescription>
  </TourStep>
  <TourStep target={settingsRef} placement="bottom">
    <TourTitle>Настройки</TourTitle>
    <TourDescription>Тема оформления и параметры аккаунта.</TourDescription>
  </TourStep>
</Tour>
```

---

## ThemeProvider / useTheme / ThemeToggle

Тема хранится в `localStorage` (`ui-theme`) и применяется через `data-theme` на `<html>`.  
По умолчанию: `prefers-color-scheme` системы, fallback → `dark`.

### Подключение (App root)

```tsx
import { ThemeProvider } from '@nerva-start-up/ui';

// Обернуть всё приложение — снаружи QueryClientProvider тоже ок
<ThemeProvider>
  <App />
</ThemeProvider>
```

### useTheme

```tsx
import { useTheme } from '@nerva-start-up/ui';

function MyComponent() {
  const { theme, setTheme, toggleTheme } = useTheme();
  // theme: 'dark' | 'light'
  return <button onClick={toggleTheme}>Toggle</button>;
}
```

### ThemeToggle

Готовая кнопка Sun/Moon.

| prop | type | default | description |
|---|---|---|---|
| `size` | `'sm' \| 'md'` | `'sm'` | размер кнопки |
| `className` | `string` | — | |

```tsx
import { ThemeToggle } from '@nerva-start-up/ui';

// В TopBar, Sidebar, Header
<ThemeToggle />
<ThemeToggle size="md" />
```

### Токены тёмной и светлой темы

| Token | Dark | Light |
|---|---|---|
| `--bg` | `#0d1117` | `#f6f8fa` |
| `--surface` | `#161b22` | `#ffffff` |
| `--surface-2` | `#1c2128` | `#f0f2f5` |
| `--border` | `#21262d` | `#d0d7de` |
| `--text` | `#f0f6fc` | `#1f2328` |
| `--text-sub` | `#b0bec5` | `#57606a` |
| `--text-muted` | `#8b9cb0` | `#8c959f` |
| `--primary` | `#f97316` | `#ea6a0a` |
| `--success` | `#4ade80` | `#1a7f37` |
| `--error` | `#f87171` | `#d1242f` |
| `--info` | `#60a5fa` | `#0550ae` |

---

## Chip / ChipGroup

Кликабельные pill-теги для фильтров, suggestion-подсказок, выбранных значений.

### Chip

| prop | type | default | description |
|---|---|---|---|
| `label` | `string` | — | **required** |
| `selected` | `boolean` | `false` | оранжевый акцент |
| `onClick` | `() => void` | — | делает chip кнопкой |
| `onRemove` | `() => void` | — | добавляет × кнопку |
| `disabled` | `boolean` | `false` | |
| `icon` | `ReactNode` | — | иконка слева от текста |

```tsx
import { Chip, ChipGroup } from '@nerva-start-up/ui';

// Suggestion chips (AI подсказки)
<ChipGroup scroll>
  <Chip label="Что такое XSS?" onClick={() => ask('Что такое XSS?')} />
  <Chip label="Объясни JWT" onClick={() => ask('Объясни JWT')} />
  <Chip label="Расскажи про VPN" onClick={() => ask('Расскажи про VPN')} />
</ChipGroup>

// Filter chips
<ChipGroup>
  <Chip label="Все"      selected={filter === 'all'}    onClick={() => setFilter('all')} />
  <Chip label="Студенты" selected={filter === 'student'} onClick={() => setFilter('student')} />
  <Chip label="Учителя"  selected={filter === 'teacher'} onClick={() => setFilter('teacher')} />
</ChipGroup>

// Removable tags
<ChipGroup>
  {tags.map(t => (
    <Chip key={t} label={t} onRemove={() => removeTag(t)} />
  ))}
</ChipGroup>
```

### ChipGroup

| prop | type | default | description |
|---|---|---|---|
| `scroll` | `boolean` | `false` | горизонтальный скролл вместо wrap |

---

## Dropzone

Зона drag-and-drop загрузки файлов. Управляет состоянием dragging/selected внутри себя. Вызывает `onFiles` с массивом `File[]`.

| prop | type | default | description |
|---|---|---|---|
| `onFiles` | `(files: File[]) => void` | — | **required** |
| `accept` | `string` | — | `".pdf,.docx"` — фильтр типов |
| `multiple` | `boolean` | `false` | несколько файлов |
| `maxSizeMB` | `number` | — | лимит размера, показывает ошибку |
| `label` | `string` | `'Перетащите файл...'` | текст в idle-состоянии |
| `hint` | `string` | — | подсказка под label |
| `disabled` | `boolean` | `false` | |

```tsx
import { Dropzone } from '@nerva-start-up/ui';

<Dropzone
  accept=".pdf,.docx,.txt,.md"
  maxSizeMB={20}
  onFiles={(files) => setFile(files[0])}
  label="Перетащите материал или нажмите"
  hint="PDF, DOCX, TXT, MD — до 20 МБ"
/>

// Несколько файлов
<Dropzone
  multiple
  onFiles={(files) => setFiles(files)}
/>
```

---

## Upload

Загрузка файлов с очередью, прогресс-баром на файл и повтором при ошибке. В отличие от `Dropzone` (просто отдаёт `File[]` и всё) сам управляет процессом: вызывает переданную `uploadFn` на каждый файл, отслеживает прогресс/успех/ошибку, рендерит список через `FileCard` + `Progress`.

| prop | type | default | description |
|---|---|---|---|
| `uploadFn` | `(file: File, onProgress: (percent: number) => void) => Promise<void>` | — | **required** — загружает один файл, сообщает прогресс через колбэк |
| `accept` | `string` | — | `".pdf,.docx"` — фильтр типов |
| `multiple` | `boolean` | `true` | несколько файлов за раз |
| `maxSizeMB` | `number` | — | лимит размера одного файла |
| `maxFiles` | `number` | — | максимум файлов в очереди |
| `disabled` | `boolean` | `false` | |
| `label` | `string` | — | текст в зоне загрузки |
| `hint` | `string` | — | подсказка под label |
| `onFilesAdded` | `(files: File[]) => void` | — | файлы добавлены в очередь (до начала загрузки) |
| `onFileSuccess` | `(file: File) => void` | — | файл успешно загружен |
| `onFileError` | `(file: File, error: unknown) => void` | — | ошибка загрузки файла |
| `className` | `string` | — | Tailwind-классы |

Реализацию самой загрузки (fetch/XHR/presigned URL) предоставляет потребитель через `uploadFn` — компонент не делает сетевых запросов сам.

```tsx
import { Upload } from '@nerva-start-up/ui';

async function uploadToServer(file: File, onProgress: (percent: number) => void) {
  const xhr = new XMLHttpRequest();
  return new Promise<void>((resolve, reject) => {
    xhr.upload.onprogress = (e) => onProgress(Math.round((e.loaded / e.total) * 100));
    xhr.onload = () => (xhr.status < 300 ? resolve() : reject(new Error(xhr.statusText)));
    xhr.onerror = () => reject(new Error('Сеть недоступна'));
    xhr.open('POST', '/api/submissions');
    const form = new FormData();
    form.append('file', file);
    xhr.send(form);
  });
}

<Upload
  uploadFn={uploadToServer}
  accept=".pdf,.docx"
  maxSizeMB={10}
  label="Загрузите решение задания"
  hint="PDF, DOCX до 10 МБ"
/>
```

---

## Drawer

Compound-компонент (shadcn-стиль). Backdrop с `backdrop-blur-sm`, закрытие по Escape и клику. Анимация через Motion.

**Составные части:**

| Компонент | Назначение |
|---|---|
| `Drawer` | Root — управляет open/close, рендерит backdrop |
| `DrawerPanel` | Панель (`side="left"/"right"/"bottom"`) |
| `DrawerHandle` | Drag-handle (полоска) — рекомендуется для `bottom` |
| `DrawerHeader` | Шапка с кнопкой × (использует `useDrawerContext`) |
| `DrawerTitle` | Заголовок внутри `Header` |
| `DrawerBody` | Скроллируемое тело (`overscroll-contain`) |
| `DrawerFooter` | Прилипающий подвал |

### Drawer (root)

| prop | type | default | description |
|---|---|---|---|
| `open` | `boolean` | — | **required** |
| `onClose` | `() => void` | — | **required** |
| `onExitComplete` | `() => void` | — | вызывается один раз, когда анимации закрытия backdrop'а и панели полностью завершены — единственный надёжный момент снять внешнюю блокировку UI (не гадать таймером) |
| `children` | `ReactNode` | — | |

### DrawerPanel

| prop | type | default | description |
|---|---|---|---|
| `side` | `'left' \| 'right' \| 'bottom'` | `'right'` | откуда выезжает |
| `width` | `string` | `'340px'` | CSS ширина — `left`/`right` |
| `maxHeight` | `string` | `'85vh'` | CSS max-height — `bottom` |

```tsx
import {
  Drawer, DrawerPanel, DrawerHandle,
  DrawerHeader, DrawerTitle,
  DrawerBody, DrawerFooter,
} from '@nerva-start-up/ui';

const [open, setOpen] = useState(false);

// Боковая панель (фильтры, детали)
<Drawer open={open} onClose={() => setOpen(false)}>
  <DrawerPanel side="right">
    <DrawerHeader>
      <DrawerTitle>Фильтры</DrawerTitle>
    </DrawerHeader>
    <DrawerBody>
      <Stack gap={4}>
        <Select label="Роль" options={roleOptions} ... />
        <Select label="Группа" options={groupOptions} ... />
      </Stack>
    </DrawerBody>
    <DrawerFooter>
      <Button className="w-full">Применить</Button>
    </DrawerFooter>
  </DrawerPanel>
</Drawer>

// Bottom sheet — мобильное меню действий
<Drawer open={open} onClose={() => setOpen(false)}>
  <DrawerPanel side="bottom">
    <DrawerHandle />
    <DrawerHeader>
      <DrawerTitle>Действия</DrawerTitle>
    </DrawerHeader>
    <DrawerBody>
      <button className="...">Редактировать</button>
      <button className="...">Удалить</button>
    </DrawerBody>
  </DrawerPanel>
</Drawer>

// Bottom sheet — подтверждение (только Body + Footer)
<Drawer open={open} onClose={() => setOpen(false)}>
  <DrawerPanel side="bottom" maxHeight="50vh">
    <DrawerHandle />
    <DrawerBody>
      <Text size="sm" weight="semibold" className="mb-2">Отправить задание?</Text>
    </DrawerBody>
    <DrawerFooter>
      <Button className="w-full" onClick={handleSubmit}>Отправить</Button>
    </DrawerFooter>
  </DrawerPanel>
</Drawer>
```

---

## StatCard

Карточка метрики: label + большое значение + опциональные trend и sub-текст.

| prop | type | default | description |
|---|---|---|---|
| `label` | `string` | — | **required** — подпись |
| `value` | `string \| number` | — | **required** — главное число/текст |
| `sub` | `string` | — | мелкий текст под значением |
| `icon` | `React.ElementType` | — | Lucide-иконка (оранжевый фон) |
| `trend` | `number` | — | `+12` → зелёный ↑, `-5` → красный ↓, `0` → серый |

```tsx
import { StatCard } from '@nerva-start-up/ui';
import { Users, BookOpen, Star } from 'lucide-react';

<Grid cols={3} gap={4}>
  <StatCard label="Студентов" value={142}  icon={Users}    trend={+5} />
  <StatCard label="Материалов" value={38}  icon={BookOpen} sub="за всё время" />
  <StatCard label="Средний KSI" value="74%" icon={Star}   trend={-2} />
</Grid>
```

---

## Sparkline

Компактный inline-график тренда без осей/легенды/тултипа — для `StatCard` и подобных метрик. По умолчанию линия приглушённого (de-emphasis) цвета, последняя точка — акцентная (по методике stat-tile: значение + delta + sparkline).

| prop | type | default | description |
|---|---|---|---|
| `data` | `number[]` | — | **required** — значения тренда, слева направо |
| `width` | `number` | `120` | ширина SVG, px |
| `height` | `number` | `32` | высота SVG, px |
| `color` | `string` | `var(--text-muted)` | цвет линии |
| `showEndpoint` | `boolean` | `true` | акцентная точка на последнем значении |
| `endpointColor` | `string` | `var(--primary)` | цвет точки |
| `fill` | `boolean` | `false` | полупрозрачная заливка (~10%) под линией |
| `className` | `string` | — | Tailwind-классы |

```tsx
import { Sparkline, Card, Text } from '@nerva-start-up/ui';

// Отдельно
<Sparkline data={[1180, 1210, 1195, 1240, 1280, 1310, 1350, 1420]} />

// В карточке метрики — значение + delta + sparkline
<Card className="flex items-end justify-between">
  <div>
    <Text as="span" weight="bold" className="text-[2rem]">1 420</Text>
    <Text as="span" size="xs" weight="semibold" variant="success">+12% за месяц</Text>
  </div>
  <Sparkline
    data={scoreHistory}
    width={80}
    height={28}
    color="var(--success)"
    endpointColor="var(--success)"
    fill
  />
</Card>
```

---

## ChatBubble

Сообщение в чате — пользователь или AI. Разные стили и выравнивание.

| prop | type | default | description |
|---|---|---|---|
| `role` | `'user' \| 'ai'` | — | **required** — user=правый оранжевый, ai=левый серый |
| `content` | `string` | — | **required** — текст сообщения |
| `name` | `string` | — | имя над пузырём |
| `timestamp` | `string` | — | время под пузырём |

```tsx
import { ChatBubble } from '@nerva-start-up/ui';

<div className="flex flex-col gap-3 p-4">
  <ChatBubble role="user" content="Что такое XSS атака?" timestamp="14:32" />
  <ChatBubble
    role="ai"
    name="Нора"
    content="XSS (Cross-Site Scripting) — это уязвимость, при которой злоумышленник..."
    timestamp="14:32"
  />
</div>
```

---

## TypingIndicator

Анимированные три точки «AI печатает». Визуально совпадает со стилем `ChatBubble role="ai"`.

| prop | type | default | description |
|---|---|---|---|
| `name` | `string` | — | подпись над индикатором, например `"Нора печатает..."` |

```tsx
import { TypingIndicator } from '@nerva-start-up/ui';

// В списке сообщений чата
{isStreaming && <TypingIndicator name="Нора" />}

// Без имени
{isLoading && <TypingIndicator />}
```

---

## BottomNav

Мобильная нижняя навигация. Фиксированная (`bottom-0`), safe-area-inset, поддержка badge. Composable API в стиле shadcn ui: `BottomNav` — контейнер, `BottomNavItem` — вкладка.

### Компоненты

| Компонент | Props | Description |
|---|---|---|
| `BottomNav` | `className?`, `children` | Фиксированный (`bottom-0`) контейнер-`<nav>` |
| `BottomNavItem` | `icon`, `badge?`, `active?`, `onClick?`, `className?`, `children` | Вкладка. `badge` — число в красном кружке (скрыт при `0`) |

### Использование

```tsx
import { BottomNav, BottomNavItem } from '@nerva-start-up/ui';
import { Home, Bot, BookOpen } from 'lucide-react';

<BottomNav>
  <BottomNavItem icon={Home} active={tab === 'home'} onClick={() => setTab('home')}>
    Главная
  </BottomNavItem>
  <BottomNavItem icon={Bot} active={tab === 'ai'} onClick={() => setTab('ai')}>
    Нора
  </BottomNavItem>
  <BottomNavItem icon={BookOpen} badge={3} active={tab === 'library'} onClick={() => setTab('library')}>
    База
  </BottomNavItem>
</BottomNav>
```

---

## TopNav

Верхняя навигационная панель (desktop). Composable API в стиле shadcn ui: `TopNav` — контейнер, `TopNavBrand`/`TopNavList`/`TopNavActions` — слоты layout'а (левый / центр / правый, каждый занимает `flex-1` по краям, так что `List` остаётся по центру), `TopNavItem` — вкладка.

### Компоненты

| Компонент | Props | Description |
|---|---|---|
| `TopNav` | `className?`, `children` | Sticky (`top-0`) контейнер-`<header>` |
| `TopNavBrand` | `className?`, `children` | Левый слот (логотип/бренд) |
| `TopNavList` | `className?`, `children` | Центральный `<nav>` со вкладками |
| `TopNavItem` | `active?`, `icon?`, `href?`, `onClick?`, `className?`, `children` | Вкладка. Если задан `href` — рендерится как `<a>`, иначе `<button>` |
| `TopNavActions` | `className?`, `children` | Правый слот (кнопки, аватар и т.д.) |

Каждый слот необязателен — можно оставить только `TopNavList`, если бренд и actions не нужны.

### Использование

```tsx
import {
  TopNav,
  TopNavBrand,
  TopNavList,
  TopNavItem,
  TopNavActions,
  Button,
  Avatar,
  Text,
} from '@nerva-start-up/ui';
import { Home, BookOpen, Trophy, Bell } from 'lucide-react';

<TopNav>
  <TopNavBrand>
    <Text as="span" weight="bold">KSI</Text>
  </TopNavBrand>

  <TopNavList>
    <TopNavItem icon={Home} active={tab === 'home'} onClick={() => setTab('home')}>
      Главная
    </TopNavItem>
    <TopNavItem icon={BookOpen} active={tab === 'tasks'} onClick={() => setTab('tasks')}>
      Задания
    </TopNavItem>
    <TopNavItem icon={Trophy} active={tab === 'rating'} onClick={() => setTab('rating')}>
      Рейтинг
    </TopNavItem>
  </TopNavList>

  <TopNavActions>
    <Button variant="ghost" size="sm"><Bell size={16} /></Button>
    <Avatar name={user.name} size="sm" />
  </TopNavActions>
</TopNav>
```

---

## CodeBlock

Compound-компонент для отображения кода с подсветкой синтаксиса (prism-react-renderer, тема `oneDark`), кнопкой копирования и номерами строк.

**Составные части:**

| Компонент | Назначение |
|---|---|
| `CodeBlock` | Root — контейнер, хранит `code`/`lang`, управляет состоянием copied |
| `CodeBlockHeader` | Шапка: язык + имя файла + кнопка копирования |
| `CodeBlockContent` | Подсвеченный код (`Highlight` из prism-react-renderer) |
| `CodeBlockCopyButton` | Standalone кнопка копирования (используется внутри Header) |

### CodeBlock (root)

| prop | type | default | description |
|---|---|---|---|
| `code` | `string` | — | **required** — исходный код |
| `lang` | `string` | `'text'` | язык для подсветки (`python`, `sql`, `bash`, `json`, `typescript` и др.) |

### CodeBlockHeader

| prop | type | default | description |
|---|---|---|---|
| `title` | `string` | — | имя файла рядом с языком |

### CodeBlockContent

| prop | type | default | description |
|---|---|---|---|
| `showLineNumbers` | `boolean` | `false` | показывать номера строк |

```tsx
import {
  CodeBlock,
  CodeBlockHeader,
  CodeBlockContent,
} from '@nerva-start-up/ui';

// С заголовком и номерами строк
<CodeBlock code={sqlCode} lang="sql">
  <CodeBlockHeader title="injection.sql" />
  <CodeBlockContent showLineNumbers />
</CodeBlock>

// Без заголовка (только код)
<CodeBlock code={snippet} lang="python">
  <CodeBlockContent />
</CodeBlock>
```

**Поддерживаемые языки** (PrismJS): `python`, `javascript`, `typescript`, `sql`, `bash`, `json`, `yaml`, `css`, `html`, `markup`, `text` и другие.

---

## Kbd

Compound-компонент для отображения клавиатурных сокращений. `Kbd` — обёртка для комбинации, `KbdKey` — отдельная клавиша. Между клавишами автоматически вставляется разделитель.

| Компонент | Назначение |
|---|---|
| `Kbd` | Контейнер комбинации, вставляет разделители между `KbdKey` |
| `KbdKey` | Одна клавиша в стиле физической кнопки |

### Kbd

| prop | type | default | description |
|---|---|---|---|
| `size` | `'sm' \| 'md'` | `'md'` | размер — пробрасывается в дочерние `KbdKey` через контекст |
| `separator` | `ReactNode` | `'+'` | символ между клавишами |

### KbdKey

| prop | type | default | description |
|---|---|---|---|
| `size` | `'sm' \| 'md'` | из контекста | переопределяет размер для конкретной клавиши |

```tsx
import { Kbd, KbdKey, Text } from '@nerva-start-up/ui';

// Комбинация
<Kbd>
  <KbdKey>⌘</KbdKey>
  <KbdKey>K</KbdKey>
</Kbd>

// Одиночная клавиша
<KbdKey>Esc</KbdKey>

// Маленький размер (в UI-подсказках)
<Kbd size="sm">
  <KbdKey>Ctrl</KbdKey>
  <KbdKey>S</KbdKey>
</Kbd>

// В строке меню
<div className="flex items-center justify-between">
  <Text as="span">Поиск</Text>
  <Kbd size="sm">
    <KbdKey>⌘</KbdKey>
    <KbdKey>K</KbdKey>
  </Kbd>
</div>
```

---

## Hooks — Keyboard

Все хуки экспортируются из `@nerva-start-up/ui`. Подписки очищаются автоматически при размонтировании.

---

### useKeyPress

Вызывает `handler` при нажатии указанной клавиши (или одной из списка).

```ts
useKeyPress(key: string | string[], handler: (e: KeyboardEvent) => void, options?)
```

| option | type | default | description |
|---|---|---|---|
| `enabled` | `boolean` | `true` | включить/выключить подписку |
| `event` | `'keydown' \| 'keyup' \| 'keypress'` | `'keydown'` | тип события |
| `target` | `RefObject<HTMLElement>` | `document` | элемент-слушатель |

```tsx
import { useKeyPress } from '@nerva-start-up/ui';

// Одна клавиша
useKeyPress('Escape', () => close());

// Несколько клавиш
useKeyPress(['ArrowUp', 'ArrowDown'], (e) => move(e.key));

// Только когда форма готова
useKeyPress('Enter', submit, { enabled: isFormReady });
```

---

### useHotkey

Глобальные клавиатурные сокращения. Формат: `'ctrl+k'`, `'meta+shift+p'`, `'alt+arrowleft'`.  
По умолчанию игнорирует события внутри `input` / `textarea` / `[contenteditable]`.

```ts
useHotkey(combo: string | string[], handler: (e: KeyboardEvent) => void, options?)
```

| option | type | default | description |
|---|---|---|---|
| `enabled` | `boolean` | `true` | |
| `ignoreInput` | `boolean` | `true` | не срабатывать внутри полей ввода |
| `preventDefault` | `boolean` | `true` | блокировать браузерное действие |
| `target` | `RefObject<HTMLElement>` | `document` | |

```tsx
import { useHotkey } from '@nerva-start-up/ui';

// Кросс-платформенный поиск
useHotkey(['ctrl+k', 'meta+k'], openSearch);

// Сохранение с preventDefault
useHotkey(['ctrl+s', 'meta+s'], save, { preventDefault: true });

// Три модификатора
useHotkey('ctrl+shift+p', openCommandPalette);
```

---

### useKeyboardNav

Стрелочная навигация по списку элементов с поддержкой `Home`/`End`, `Enter` (выбор), `Escape`.  
Возвращает пропсы для контейнера и каждого элемента (aria-совместимо).

```ts
useKeyboardNav(options): UseKeyboardNavReturn
```

| option | type | default | description |
|---|---|---|---|
| `count` | `number` | — | **required** — число элементов |
| `initialIndex` | `number` | `-1` | начальный индекс (-1 = ничего не выбрано) |
| `orientation` | `'vertical' \| 'horizontal' \| 'both'` | `'vertical'` | направление стрелок |
| `loop` | `boolean` | `true` | зациклить при выходе за границы |
| `enabled` | `boolean` | `true` | |
| `onSelect` | `(index: number) => void` | — | колбэк на Enter/Space |
| `onEscape` | `() => void` | — | колбэк на Escape |

```tsx
import { useKeyboardNav } from '@nerva-start-up/ui';

const { activeIndex, getItemProps, containerProps } = useKeyboardNav({
  count: items.length,
  onSelect: (i) => selectItem(items[i]),
  onEscape: () => close(),
});

<ul {...containerProps}>
  {items.map((item, i) => (
    <li
      key={item.id}
      {...getItemProps(i)}
      className={activeIndex === i ? 'bg-accent' : ''}
    >
      {item.label}
    </li>
  ))}
</ul>
```

---

### useFocusTrap

Запирает Tab-навигацию внутри контейнера. При активации фокусируется на первый интерактивный элемент, при деактивации возвращает фокус на предыдущий.

```ts
useFocusTrap(containerRef: RefObject<HTMLElement>, active: boolean): void
```

```tsx
import { useFocusTrap } from '@nerva-start-up/ui';

const ref = useRef<HTMLDivElement>(null);
useFocusTrap(ref, isOpen);

<div ref={ref}>
  <input placeholder="Поле" />
  <button onClick={close}>Закрыть</button>
  {/* Tab циклится только здесь пока isOpen = true */}
</div>
```

---

### useEscapeKey

Обёртка над `useKeyPress` для клавиши Escape. Удобна для закрытия модалов, дравера, тултипа.

```ts
useEscapeKey(handler: (e: KeyboardEvent) => void, enabled?: boolean): void
```

```tsx
import { useEscapeKey } from '@nerva-start-up/ui';

useEscapeKey(() => setOpen(false), isOpen);
```

---

## Alert

Статусный баннер встроенный в поток страницы (не всплывает, в отличие от Toast). Compound-компонент.

| Компонент | Назначение |
|---|---|
| `Alert` | Root — вариант + `role="alert"` + опциональный `onDismiss` |
| `AlertIcon` | Иконка (авто по варианту или кастомная) |
| `AlertContent` | Flex-колонка для Title + Description |
| `AlertTitle` | Заголовок |
| `AlertDescription` | Описание |
| `AlertDismiss` | Кнопка × (рендерится только если передан `onDismiss`) |

### Варианты

| variant | цвет |
|---|---|
| `info` | синий `#60a5fa` |
| `success` | зелёный `#4ade80` |
| `warning` | жёлтый `#fbbf24` |
| `error` | красный `#f87171` |

### Alert (root)

| prop | type | default | description |
|---|---|---|---|
| `variant` | `'info' \| 'success' \| 'warning' \| 'error'` | `'info'` | |
| `onDismiss` | `() => void` | — | если передан — `AlertDismiss` показывает кнопку × |

### AlertIcon

| prop | type | default | description |
|---|---|---|---|
| `icon` | `React.ElementType` | авто | переопределить иконку (любой Lucide-компонент) |
| `size` | `number` | `18` | размер иконки |

```tsx
import {
  Alert, AlertIcon, AlertContent,
  AlertTitle, AlertDescription, AlertDismiss,
} from '@nerva-start-up/ui';

// Базовый
<Alert variant="success">
  <AlertIcon />
  <AlertContent>
    <AlertTitle>Задание отправлено</AlertTitle>
    <AlertDescription>Преподаватель проверит в течение 48 часов.</AlertDescription>
  </AlertContent>
</Alert>

// С dismiss + анимацией
const [visible, setVisible] = useState(true);

<AnimatePresence>
  {visible && (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.2 }}
    >
      <Alert variant="warning" onDismiss={() => setVisible(false)}>
        <AlertIcon />
        <AlertContent>
          <AlertTitle>Дедлайн через 2 часа</AlertTitle>
        </AlertContent>
        <AlertDismiss />
      </Alert>
    </motion.div>
  )}
</AnimatePresence>

// Кастомная иконка
import { ShieldAlert } from 'lucide-react';

<Alert variant="error">
  <AlertIcon icon={ShieldAlert} size={20} />
  <AlertContent>
    <AlertTitle>Угроза безопасности</AlertTitle>
    <AlertDescription>Запрос заблокирован автоматически.</AlertDescription>
  </AlertContent>
</Alert>
```

---

## CopyText

Инлайн-поле с копированием по клику на весь компонент. При нажатии — оверлей с `backdrop-blur` и accent-цветом, через 1.5 с сбрасывается. Compound-компонент.

| Компонент | Назначение |
|---|---|
| `CopyText` | Root — кликабельный контейнер, анимированный оверлей |
| `CopyTextValue` | Текст (моно, `truncate` / `mask`) |
| `CopyTextTrigger` | Иконка Copy → Check, абсолютно позиционирована справа по центру |

### CopyText (root)

| prop | type | default | description |
|---|---|---|---|
| `text` | `string` | — | **required** |
| `copiedText` | `string` | `'Скопировано!'` | текст оверлея |
| `onCopied` | `() => void` | — | колбэк после копирования |

### CopyTextValue

| prop | type | default | description |
|---|---|---|---|
| `truncate` | `boolean` | `false` | обрезать с `…` |
| `mask` | `boolean` | `false` | заменить на `••••` (токены, пароли) |

```tsx
import { CopyText, CopyTextValue, CopyTextTrigger } from '@nerva-start-up/ui';

// URL
<CopyText text="https://ksi-production.up.railway.app/api/v1">
  <CopyTextValue truncate />
  <CopyTextTrigger />
</CopyText>

// API-ключ — скрытый
<CopyText text="sk-prod-a1b2c3d4e5f6">
  <CopyTextValue mask />
  <CopyTextTrigger />
</CopyText>

// Кастомный текст оверлея
<CopyText text="usr_8f3a92bc" copiedText="ID скопирован ✓">
  <CopyTextValue />
  <CopyTextTrigger />
</CopyText>

// С колбэком
<CopyText text="bun add @nerva-start-up/ui" onCopied={() => toast.success('Скопировано!')}>
  <CopyTextValue />
  <CopyTextTrigger />
</CopyText>
```

---

## Markdown

Рендерит markdown-текст (отчёты, описания заданий, ответы AI и т.д.) через `react-markdown` + `remark-gfm` (таблицы, зачёркивание, чекбоксы). Не самостоятельно реализует подсветку кода и копирование — переиспользует существующие компоненты:

| Markdown | Рендерится через |
|---|---|
| ` ```lang ` fenced code block | `CodeBlock` + `CodeBlockHeader` (бейдж языка + кнопка копирования) + `CodeBlockContent` (подсветка синтаксиса) |
| Абзац, состоящий ровно из одного `` `inline code` `` (значение на отдельной строке — хэш, ключ, команда) | `CopyText` + `CopyTextValue` + `CopyTextTrigger` |
| `` `inline code` `` внутри обычного текста | обычный стилизованный `<code>` (без копирования) |

Остальные элементы (заголовки, списки, таблицы, ссылки, цитаты, `hr`, изображения, `strong`/`em`/`del`) стилизуются токенами `--*` напрямую.

### Markdown (root)

| prop | type | default | description |
|---|---|---|---|
| `content` | `string` | — | **required** — исходный markdown |
| `onHeadingsChange` | `(headings: MarkdownHeading[]) => void` | — | список заголовков документа (`{ id, level, text }`), вызывается заново при каждой смене `content` — для оглавления/навигации |
| `className` | `string` | — | классы на внешний `div` |

Ссылки открываются в новой вкладке (`target="_blank" rel="noopener noreferrer"`), сырой HTML в markdown не выполняется (`react-markdown` не рендерит теги по умолчанию) — безопасно для недоверенного контента.

Заголовки (`h1`-`h6`) получают стабильный `id`-якорь — GitHub-подобный slug (сохраняет кириллицу, дедуплицирует повторы через `-1`/`-2`), к нему можно проскроллить (`element.scrollIntoView()`) или перейти по `#hash`-ссылке.

```tsx
import { Markdown } from '@nerva-start-up/ui';

const report = `
# Отчёт по пентесту

Обнаружена **SQL-инъекция** в параметре \`id\`.

\`\`\`sql
SELECT * FROM users WHERE id = '$id';
\`\`\`

\`sk-ksi-prod-a1b2c3d4e5f6\`

| Severity | Статус |
|---|---|
| Critical | Открыто |
`;

<Markdown content={report} className="max-w-2xl" />
```

---

## MarkdownViewer

Просмотр `.md`-файла: в отличие от `Markdown` (принимает готовую строку контента), сам загружает содержимое — по ссылке или из локального `File`/`Blob` — и рендерит его через тот же `Markdown`. Тот же паттерн `src`, что и у `PdfViewer`/`DocxViewer`, но без внешней библиотеки — переиспользует уже установленные `react-markdown`/`remark-gfm`.

Скроллируемая область фиксированной высоты (тот же паттерн, что у `PdfViewer`/`DocxViewer`) с тонкой полосой прогресса чтения вверху. Тулбар: кнопка «Оглавление» (появляется при 2+ заголовках) со списком заголовков документа — клик скроллит к якорю нужного заголовка; A-/A+ регулируют размер текста (реальный reflow через CSS `zoom`, а не визуальное увеличение).

| prop | type | default | description |
|---|---|---|---|
| `src` | `string \| File \| Blob` | — | **required** — ссылка на `.md`-файл или локальный файл |
| `scale` / `defaultScale` | `number` | — / `1` | controlled/uncontrolled размер текста (`1` = 100%), зажат в `[0.85, 1.5]` |
| `onScaleChange` | `(scale: number) => void` | — | смена размера текста (кнопки A-/A+) |
| `toolbar` | `boolean` | `true` | встроенная панель (оглавление + размер текста) |
| `height` | `number \| string` | `600` | высота видимой области — документ скроллится внутри неё |
| `onLoad` / `onError` | `() => void` / `(error: Error) => void` | — | колбэки загрузки |
| `className` | `string` | — | Tailwind-классы (передаются в `Markdown`) |

```tsx
import { MarkdownViewer } from '@nerva-start-up/ui';

// Файл с сервера
<MarkdownViewer src="/docs/changelog.md" />

// Локальный File сразу после выбора, до отправки на сервер
function ReadmePreview({ file }: { file: File }) {
  return <MarkdownViewer src={file} />;
}
```

---

## Kanban

Доска с перетаскиваемыми карточками (Jira-подобный канбан) — на `motion.div` (`drag` + `layout`), без сторонней DnD-библиотеки: `framer-motion` уже используется в ките, а его `Reorder.Group` не поддерживает перенос между разными списками (только реордер внутри одного), поэтому здесь — свой pointer-based хит-тест через `document.elementFromPoint`.

Composable API в духе `Tour`: компонент **не хранит данные** — только отслеживает жест перетаскивания и вызывает `onCardMove`. Порядок карточек и состав колонок целиком определяются структурой `children`, которую строит потребитель из своего state. Управление колонками (добавить/удалить/переименовать) не реализовано — это выходит за рамки drag-and-drop и остаётся на стороне потребителя.

**Составные части:** `Kanban` (root — контекст + горизонтальный скролл колонок), `KanbanColumn` (заголовок + вертикально скроллируемый список карточек через `ScrollArea`), `KanbanCard` (перетаскиваемая карточка поверх `Card`, содержимое — произвольный JSX).

| prop (`Kanban`) | type | default | description |
|---|---|---|---|
| `onCardMove` | `(event: KanbanMoveEvent) => void` | — | **required** — вызывается по завершении перетаскивания; обновите свои данные и переrender детей в новом порядке/колонке |
| `className` | `string` | — | Tailwind-классы контейнера |

```ts
type KanbanMoveEvent = {
  cardId: string;
  fromColumnId: string;
  toColumnId: string;
  toIndex: number; // индекс среди карточек колонки-назначения, без учёта самой перетаскиваемой карточки
};
```

| prop (`KanbanColumn`) | type | default | description |
|---|---|---|---|
| `id` | `string` | — | **required** — id колонки, используется в `KanbanMoveEvent` |
| `title` | `React.ReactNode` | — | заголовок колонки |

| prop (`KanbanCard`) | type | default | description |
|---|---|---|---|
| `id` | `string` | — | **required** — id карточки, используется в `KanbanMoveEvent` |
| `disabled` | `boolean` | `false` | запрещает перетаскивание конкретной карточки |

Ограничение v1: перетаскивание только указателем (мышь/тач/перо через Pointer Events в `framer-motion`) — клавиатурного fallback для drag-and-drop нет.

```tsx
import { Kanban, KanbanColumn, KanbanCard, Badge, Text } from '@nerva-start-up/ui';
import { useState } from 'react';

const [columns, setColumns] = useState([
  { id: 'todo', title: 'To Do', tasks: [{ id: '1', title: 'Задача' }] },
  { id: 'done', title: 'Done', tasks: [] },
]);

function moveTask(columns, event) {
  const from = columns.find((c) => c.id === event.fromColumnId);
  const task = from?.tasks.find((t) => t.id === event.cardId);
  if (!task) return columns;
  return columns.map((c) => {
    if (c.id === event.fromColumnId && c.id !== event.toColumnId) {
      return { ...c, tasks: c.tasks.filter((t) => t.id !== event.cardId) };
    }
    if (c.id === event.toColumnId) {
      const tasks = c.id === event.fromColumnId ? c.tasks.filter((t) => t.id !== event.cardId) : [...c.tasks];
      tasks.splice(event.toIndex, 0, task);
      return { ...c, tasks };
    }
    return c;
  });
}

<Kanban onCardMove={(e) => setColumns((prev) => moveTask(prev, e))}>
  {columns.map((column) => (
    <KanbanColumn key={column.id} id={column.id} title={column.title}>
      {column.tasks.map((task) => (
        <KanbanCard key={task.id} id={task.id}>
          <Text size="sm" weight="medium">{task.title}</Text>
        </KanbanCard>
      ))}
    </KanbanColumn>
  ))}
</Kanban>
```

---

## CommandMenu

Spotlight-меню (⌘K) с поиском по командам (`/`) и страницам (`@`). Открывается хоткеем `⌘K` / `Ctrl+K` (запасной биндинг — `⌘/` / `Ctrl+/`, на случай конфликта с браузером/ОС), рендерится в portal поверх всего.

| Компонент | Назначение |
|---|---|
| `CommandMenu` | Root — portal, backdrop, фильтрация, клавиатурная навигация |
| `CommandMenuContent` | Стилизованная панель |
| `CommandMenuInput` | Поле поиска с автофокусом и кнопкой «очистить» |
| `CommandMenuList` | Скроллируемый контейнер результатов |
| `CommandMenuGroup` | Секция с заголовком, авто-скрывается если нет результатов |
| `CommandMenuItem` | Элемент — `<button>` для команды, `<a>` для ссылки |
| `CommandMenuEmpty` | Пустое состояние (рендерится только при поиске без результатов) |
| `CommandMenuFooter` | Подсказки по клавишам |

### Типы items

```ts
type CommandItem = {
  id:           string;
  type:         'command' | 'link';
  label:        string;
  description?: string;
  icon?:        React.ElementType;
  // только для type='command'
  trigger?:     string;        // '/toggleTheme'
  onSelect?:    () => void;
  // только для type='link'
  alias?:       string;        // '@dashboard'
  href?:        string;
};
```

### Логика поиска

| Запрос | Поведение |
|---|---|
| `/tog` | Только команды, по `trigger` и `label` |
| `@dash` | Только ссылки, по `alias` и `label` |
| `тема` | Все элементы по `label`, `description`, `trigger`, `alias` |
| _(пусто)_ | Все элементы |

### CommandMenu (root)

| prop | type | description |
|---|---|---|
| `items` | `CommandItem[]` | **required** — все команды и ссылки |
| `open` | `boolean` | **required** |
| `onOpenChange` | `(open: boolean) => void` | **required** |

### CommandMenuGroup

| prop | type | description |
|---|---|---|
| `heading` | `string` | заголовок секции |
| `filter` | `'command' \| 'link' \| (item) => boolean` | какие элементы показывать |

```tsx
import {
  CommandMenu, CommandMenuContent, CommandMenuInput,
  CommandMenuList, CommandMenuGroup, CommandMenuEmpty,
  CommandMenuFooter, type CommandItem,
} from '@nerva-start-up/ui';
import { Home, Moon, LogOut } from 'lucide-react';

const COMMANDS: CommandItem[] = [
  { id: 'toggle-theme', type: 'command', trigger: '/toggleTheme', label: 'Переключить тему', icon: Moon, onSelect: toggleTheme },
  { id: 'logout',       type: 'command', trigger: '/logout',       label: 'Выйти',           icon: LogOut, onSelect: logout },
];

const LINKS: CommandItem[] = [
  { id: 'dashboard', type: 'link', alias: '@dashboard', label: 'Дашборд', icon: Home, href: '/dashboard' },
];

const [open, setOpen] = useState(false);

// Кнопка-триггер (стилизуй сам)
<button onClick={() => setOpen(true)}>
  Поиск... <Kbd size="sm"><KbdKey>⌘</KbdKey><KbdKey>K</KbdKey></Kbd>
</button>

// Само меню (⌘K тоже открывает автоматически)
<CommandMenu items={[...COMMANDS, ...LINKS]} open={open} onOpenChange={setOpen}>
  <CommandMenuContent>
    <CommandMenuInput />
    <CommandMenuList>
      <CommandMenuGroup heading="Команды" filter="command" />
      <CommandMenuGroup heading="Навигация" filter="link" />
      <CommandMenuEmpty />
    </CommandMenuList>
    <CommandMenuFooter />
  </CommandMenuContent>
</CommandMenu>
```

---

## Search

Модальный поиск по списку сущностей (уроки, группы, студенты). Визуально идентичен `CommandMenu`, но работает с данными — без команд и маршрутов.

**Отличия от CommandMenu:**

| | CommandMenu | Search |
|---|---|---|
| Цель | Выполнить команду / перейти | Найти сущность |
| Items | `type: command \| link` | Универсальный `SearchItem` |
| Фильтрация | `/команды` `@страницы` | Кастомный `filterFn` |
| Открытие | ⌘K автоматически | Управляется вручную |
| Элемент | button / `<a>` | div + avatar / icon + meta + tags |

### Компоненты

| Компонент | Назначение |
|---|---|
| `Search` | Root — portal, фильтрация, nav |
| `SearchContent` | Панель (border + shadow) |
| `SearchInput` | Поиск + счётчик результатов |
| `SearchList` | Скроллируемый список |
| `SearchGroup` | Секция с заголовком и счётчиком |
| `SearchResultItem` | Элемент: avatar/icon + label + description + tags + meta |
| `SearchEmpty` | Пустое состояние |
| `SearchFooter` | Подсказки клавиш |

### SearchItem

```ts
type SearchItem = {
  id:           string;
  label:        string;
  description?: string;
  meta?:        string;        // правый угол: "ИБ-101", "24 студ.", "#3"
  icon?:        React.ElementType;
  avatar?:      string;        // URL — приоритет над icon
  group?:       string;        // ключ для SearchGroup filter
  tags?:        string[];      // показываются как мелкие бейджи
  href?:        string;
  onSelect?:    () => void;
};
```

### Search (root)

| prop | type | default | description |
|---|---|---|---|
| `items` | `SearchItem[]` | — | **required** |
| `open` | `boolean` | — | **required** |
| `onOpenChange` | `(open: boolean) => void` | — | **required** |
| `onSelect` | `(item) => void` | — | переопределяет `item.onSelect` / `item.href` |
| `filterFn` | `(item, query) => boolean` | label+desc+meta+tags | кастомная фильтрация |

### SearchGroup

| prop | type | description |
|---|---|---|
| `heading` | `string` | Заголовок секции (+ счётчик авто) |
| `filter` | `string \| (item) => boolean` | строка → сравнивает `item.group`; функция — кастомно |

```tsx
import {
  Search, SearchContent, SearchInput,
  SearchList, SearchGroup, SearchEmpty, SearchFooter,
  type SearchItem,
} from '@nerva-start-up/ui';

const STUDENTS: SearchItem[] = [
  { id: 's1', group: 'student', label: 'Алишер Навоий', description: 'alisher@ksi.uz', avatar: '/avatars/1.jpg', meta: 'ИБ-101 · #3' },
  { id: 's2', group: 'student', label: 'Камола Юсупова', description: 'kamola@ksi.uz', meta: 'ИБ-101 · #1' },
];

const GROUPS: SearchItem[] = [
  { id: 'g1', group: 'group', label: 'ИБ-101', icon: Users, meta: '24 студ.' },
];

const [open, setOpen] = useState(false);

<button onClick={() => setOpen(true)}>Найти...</button>

<Search
  items={[...STUDENTS, ...GROUPS]}
  open={open}
  onOpenChange={setOpen}
  onSelect={(item) => navigate(item.href!)}
>
  <SearchContent>
    <SearchInput placeholder="Студент или группа..." />
    <SearchList>
      <SearchGroup heading="Студенты" filter="student" />
      <SearchGroup heading="Группы"   filter="group" />
      <SearchEmpty />
    </SearchList>
    <SearchFooter />
  </SearchContent>
</Search>

// Кастомная фильтрация
<Search
  items={lessons}
  filterFn={(item, q) =>
    item.tags?.includes('атаки') &&
    item.label.toLowerCase().includes(q)
  }
  ...
>
```

---

## Timeline

Лента событий с иконками/аватарами, коннектором и цветовыми вариантами. Compound-компонент.

Коннектор между элементами автоматически скрывается у последнего `TimelineItem` через `group-last:hidden`.

| Компонент | Назначение |
|---|---|
| `Timeline` | Root — flex-col контейнер |
| `TimelineItem` | Одно событие, задаёт `variant` через контекст |
| `TimelineIcon` | Точка / иконка / аватар + коннектор вниз |
| `TimelineContent` | Правая колонка (title + description + meta) |
| `TimelineTitle` | Заголовок события |
| `TimelineDescription` | Подзаголовок / детали |
| `TimelineMeta` | Строка с датой, бейджами, счётчиками |

### Варианты (variant)

| variant | цвет |
|---|---|
| `default` | серый |
| `success` | зелёный |
| `error` | красный |
| `warning` | жёлтый |
| `info` | синий |
| `primary` | оранжевый (KSI accent) |

### TimelineIcon

| prop | type | description |
|---|---|---|
| `icon` | `React.ElementType` | Lucide-иконка в цветном квадрате |
| `avatar` | `string` | URL — приоритет над icon; рендерится как круглый аватар |
| _(ничего)_ | — | просто цветная точка |

```tsx
import {
  Timeline, TimelineItem, TimelineIcon,
  TimelineContent, TimelineTitle,
  TimelineDescription, TimelineMeta,
} from '@nerva-start-up/ui';
import { CheckCircle2, Upload, AlertTriangle } from 'lucide-react';
import { Badge } from '@nerva-start-up/ui';

// История оценок
<Timeline>
  <TimelineItem variant="success">
    <TimelineIcon icon={CheckCircle2} />
    <TimelineContent>
      <TimelineTitle>Лабораторная №3 принята</TimelineTitle>
      <TimelineDescription>Преподаватель выставил оценку</TimelineDescription>
      <TimelineMeta>
        2 часа назад
        <Badge variant="success">85 / 100</Badge>
      </TimelineMeta>
    </TimelineContent>
  </TimelineItem>

  <TimelineItem variant="warning">
    <TimelineIcon icon={AlertTriangle} />
    <TimelineContent>
      <TimelineTitle>Пропущено занятие</TimelineTitle>
      <TimelineMeta>вчера · 14:00</TimelineMeta>
    </TimelineContent>
  </TimelineItem>
</Timeline>

// С аватаром
<TimelineItem variant="info">
  <TimelineIcon avatar="/avatars/teacher.jpg" />
  <TimelineContent>
    <TimelineTitle>Преподаватель оставил комментарий</TimelineTitle>
    <TimelineMeta>3 часа назад</TimelineMeta>
  </TimelineContent>
</TimelineItem>

// Только точки (без icon/avatar)
<TimelineItem variant="primary">
  <TimelineIcon />
  <TimelineContent>
    <TimelineTitle>Вошёл в топ-10</TimelineTitle>
  </TimelineContent>
</TimelineItem>
```

---

## StepIndicator

Шаги wizard'а / онбординга / квиза. Горизонтальная и вертикальная ориентации. Коннекторы между шагами инжектируются автоматически.

### Компоненты

| Компонент | Описание |
|-----------|----------|
| `StepIndicator` | Корень. Хранит `current`, `orientation`, `size` в контексте. |
| `Step` | Один шаг. Вычисляет статус из `current` и позиции. |
| `StepIcon` | Иконка (число / чек / X / кастомная). |
| `StepConnector` | Линия между шагами. Инжектируется автоматически, не нужна явно. |
| `StepContent` | Обёртка текста (flex-col). |
| `StepLabel` | Название шага. Меняет цвет по статусу. |
| `StepDescription` | Подзаголовок шага (muted). |

### Props

**`StepIndicator`**
| Prop | Тип | Default | Описание |
|------|-----|---------|----------|
| `current` | `number` | — | Текущий шаг (0-based, обязателен) |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Ориентация |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Размер иконок |
| `className` | `string` | — | |

**`Step`**
| Prop | Тип | Описание |
|------|-----|----------|
| `status` | `'error'` | Переопределить статус (только `error`) |
| `onClick` | `() => void` | Клик по шагу (навигация) |
| `className` | `string` | |

**`StepIcon`**
| Prop | Тип | Описание |
|------|-----|----------|
| `icon` | `ElementType` | Кастомная иконка вместо числа/чека |

### Статусы

| Статус | Условие | Визуал |
|--------|---------|--------|
| `completed` | `index < current` | Оранжевый фон, белая галочка |
| `active` | `index === current` | Оранжевый ринг, оранжевый текст |
| `upcoming` | `index > current` | Серый фон, muted текст |
| `error` | Переопределён через `status="error"` | Красный фон, ×-иконка |

### Использование

```tsx
// Горизонтальный онбординг (управляемый)
const [step, setStep] = useState(0);

<StepIndicator current={step}>
  <Step>
    <StepIcon />
    <StepContent>
      <StepLabel>Профиль</StepLabel>
      <StepDescription>Заполни данные</StepDescription>
    </StepContent>
  </Step>
  <Step>
    <StepIcon />
    <StepContent>
      <StepLabel>Группа</StepLabel>
    </StepContent>
  </Step>
  <Step>
    <StepIcon />
    <StepContent>
      <StepLabel>Готово</StepLabel>
    </StepContent>
  </Step>
</StepIndicator>

// Вертикальный учебный путь Норы с кастомными иконками
<StepIndicator current={2} orientation="vertical" size="lg">
  <Step>
    <StepIcon icon={BookOpen} />
    <StepContent>
      <StepLabel>Основы ИБ</StepLabel>
      <StepDescription>CIA-триада, угрозы</StepDescription>
    </StepContent>
  </Step>
  <Step>
    <StepIcon icon={Shield} />
    <StepContent>
      <StepLabel>Модели доступа</StepLabel>
      <StepDescription>DAC, MAC, Bell-LaPadula</StepDescription>
    </StepContent>
  </Step>
</StepIndicator>

// Error на конкретном шаге
<StepIndicator current={2}>
  <Step><StepIcon /><StepContent><StepLabel>Данные</StepLabel></StepContent></Step>
  <Step status="error">
    <StepIcon />
    <StepContent>
      <StepLabel>Проверка</StepLabel>
      <StepDescription>Ошибка валидации</StepDescription>
    </StepContent>
  </Step>
  <Step><StepIcon /><StepContent><StepLabel>Отправка</StepLabel></StepContent></Step>
</StepIndicator>
```

---

## FileCard

Карточка загруженного файла. Автоматически определяет иконку по расширению, отображает статус модерации (approved / pending / rejected). Поддерживает кнопки действий и режим ссылки.

### Компоненты

| Компонент | Описание |
|-----------|----------|
| `FileCard` | Корень. Хранит `status` и `fileType` в контексте. |
| `FileCardIcon` | Иконка файла (цвет + фон по расширению). |
| `FileCardInfo` | Flex-колонка для `Name` + `Meta`. |
| `FileCardName` | Имя файла (truncate, меняет цвет при hover). |
| `FileCardMeta` | Вторичная строка (размер, дата, автор). |
| `FileCardStatus` | Бейдж статуса. `iconOnly` — только иконка. |
| `FileCardActions` | Слот для кнопок; клики не всплывают на карточку. |

### Props

**`FileCard`**
| Prop | Тип | Default | Описание |
|------|-----|---------|----------|
| `fileType` | `string` | — | Расширение (pdf, docx, png, py…) |
| `status` | `'approved' \| 'rejected' \| 'pending'` | `'pending'` | Статус модерации |
| `href` | `string` | — | Оборачивает в `<a target="_blank">` |
| `onClick` | `() => void` | — | Обработчик клика |

**`FileCardStatus`**
| Prop | Тип | Описание |
|------|-----|----------|
| `status` | `FileStatus` | Переопределить статус из контекста |
| `iconOnly` | `boolean` | Показывать только иконку (без текста) |

### Иконки по расширению

| Тип | Расширения | Цвет |
|-----|-----------|------|
| Документ | pdf | Красный |
| Документ | doc, docx | Синий |
| Текст | txt | Серый |
| Разметка | md | Фиолетовый |
| Изображение | png, jpg, jpeg, gif, webp | Зелёный |
| Видео | mp4 | Оранжевый |
| Аудио | mp3 | Жёлтый |
| Код | py | Зелёный; js — Жёлтый; ts — Синий |

### Использование

```tsx
// Базовый (student upload)
<FileCard fileType="pdf" status="pending">
  <FileCardIcon />
  <FileCardInfo>
    <FileCardName>Лекция_01_Основы_ИБ.pdf</FileCardName>
    <FileCardMeta>2.4 MB · 12 июня 2026</FileCardMeta>
  </FileCardInfo>
  <FileCardStatus />
</FileCard>

// Кликабельный (библиотека)
<FileCard fileType="pdf" status="approved" href="/files/lecture.pdf">
  <FileCardIcon />
  <FileCardInfo>
    <FileCardName>Материал_Модуль_1.pdf</FileCardName>
    <FileCardMeta>1.2 MB · Оценка Норы: 92/100</FileCardMeta>
  </FileCardInfo>
  <FileCardStatus />
</FileCard>

// Список учителя с кнопками действий
<FileCard fileType="docx" status="pending">
  <FileCardIcon />
  <FileCardInfo>
    <FileCardName>Отчёт_практика.docx</FileCardName>
    <FileCardMeta>890 KB · student_42 · 20 июня 2026</FileCardMeta>
  </FileCardInfo>
  <FileCardStatus />
  <FileCardActions>
    <Button variant="ghost" size="icon"><Eye size={14} /></Button>
    <Button variant="ghost" size="icon"><Download size={14} /></Button>
  </FileCardActions>
</FileCard>
```

---

## Sidebar

Вертикальный sidebar с поддержкой collapse-анимации, секций навигации и произвольного header/footer. Управление коллапсом — uncontrolled (`defaultCollapsed`) или controlled (`collapsed` + `onCollapsedChange`).

### Компоненты

| Компонент | Назначение |
|---|---|
| `Sidebar` | Root — `<motion.aside>` с анимацией ширины, хранит контекст |
| `SidebarHeader` | Верхняя зона высотой 56px. **Context-aware**: при collapse переключается в `justify-center px-2` |
| `SidebarBody` | Прокручиваемая средняя зона (`flex-1 overflow-y-auto`) |
| `SidebarFooter` | Нижняя зона с `border-t` |
| `SidebarNav` | Группа пунктов с опциональным `label` (скрывается при collapse) |
| `SidebarNavItem` | Кнопка-пункт: иконка + анимированный лейбл + badge |
| `SidebarToggle` | Кнопка свернуть/развернуть (читает `useSidebarContext`) |

### Sidebar

| prop | type | default | description |
|---|---|---|---|
| `defaultCollapsed` | `boolean` | `false` | Начальное состояние (uncontrolled) |
| `collapsed` | `boolean` | — | Controlled-режим |
| `onCollapsedChange` | `(v: boolean) => void` | — | Callback для controlled |
| `width` | `string` | `'240px'` | Ширина в развёрнутом виде |
| `collapsedWidth` | `string` | `'64px'` | Ширина в свёрнутом виде |
| `className` | `string` | — | |

### SidebarNavItem

Расширяет `ButtonHTMLAttributes<HTMLButtonElement>` — все стандартные button-пропсы (`disabled`, `onClick`, `aria-*` и т.д.) поддерживаются. Компонент `forwardRef`.

| prop | type | default | description |
|---|---|---|---|
| `icon` | `ReactNode` | — | Иконка 16×16 |
| `badge` | `string \| number` | — | Бейдж (скрывается при collapse) |
| `active` | `boolean` | `false` | Активный пункт (оранжевый фон) |
| `tooltip` | `boolean` | `true` | Нативный `title` при collapse. `false` — если нужен `Tooltip` |
| `title` | `string` | — | Переопределяет авто-generated title (приоритет над `tooltip`) |
| + все `ButtonHTMLAttributes` | | | |

### SidebarNav

| prop | type | default | description |
|---|---|---|---|
| `label` | `string` | — | Заголовок группы (скрывается при collapse) |

### Header с логотипом — правильный паттерн

`SidebarHeader` при collapse переключается в `justify-center`. Чтобы логотип не вытеснял кнопку за границу, используй `useSidebarContext` для условного рендера:

```tsx
import { useSidebarContext, Text } from '@nerva-start-up/ui';

function SidebarBrand() {
  const { collapsed } = useSidebarContext();
  return (
    <>
      {!collapsed && (
        <Text as="span" size="lg" weight="bold" variant="primary">KSI</Text>
      )}
      <SidebarToggle className={collapsed ? '' : 'ml-auto'} />
    </>
  );
}
```

### Использование

```tsx
import {
  Sidebar, SidebarHeader, SidebarBody, SidebarFooter,
  SidebarNav, SidebarNavItem, SidebarToggle,
} from '@nerva-start-up/ui';

// Uncontrolled
<Sidebar>
  <SidebarHeader>
    <SidebarBrand />   {/* см. паттерн выше */}
  </SidebarHeader>

  <SidebarBody>
    <SidebarNav label="Главное">
      <SidebarNavItem icon={<HomeIcon />} active onClick={() => {}}>Дашборд</SidebarNavItem>
      <SidebarNavItem icon={<ChartIcon />} badge={3} onClick={() => {}}>Рейтинг</SidebarNavItem>
    </SidebarNav>

    <SidebarNav label="Обучение">
      <SidebarNavItem icon={<BookIcon />} onClick={() => {}}>Материалы</SidebarNavItem>
      <SidebarNavItem icon={<BotIcon />} onClick={() => {}}>Нора AI</SidebarNavItem>
    </SidebarNav>
  </SidebarBody>

  <SidebarFooter>
    <SidebarNavItem icon={<SettingsIcon />}>Настройки</SidebarNavItem>
  </SidebarFooter>
</Sidebar>

// Controlled
const [collapsed, setCollapsed] = useState(false);
<Sidebar collapsed={collapsed} onCollapsedChange={setCollapsed}>
  ...
</Sidebar>

// Начать в свёрнутом виде (uncontrolled)
<Sidebar defaultCollapsed>
  ...
</Sidebar>
```

---

## RadioGroup

Группа radio-кнопок на нативном `<input type="radio">`. Поддерживает controlled/uncontrolled режимы, вертикальную и горизонтальную ориентацию, подсказки на каждом пункте, ошибку, полную и частичную блокировку.

### Компоненты

| Компонент | Назначение |
|---|---|
| `RadioGroup` | Корень — задаёт `name`, значение, ориентацию |
| `RadioItem` | Один пункт с кастомным кружком и label |

### RadioGroup

| prop | type | default | description |
|---|---|---|---|
| `name` | `string` | — | **Обязателен.** HTML `name` для всех input внутри |
| `value` | `string` | — | Controlled значение |
| `defaultValue` | `string` | — | Uncontrolled начальное значение |
| `onChange` | `(value: string) => void` | — | |
| `label` | `string` | — | Заголовок группы |
| `hint` | `string` | — | Подсказка под группой |
| `error` | `string` | — | Текст ошибки (красный) |
| `variant` | `"default" \| "card"` | `"default"` | Стиль отображения пунктов |
| `orientation` | `"vertical" \| "horizontal"` | `"vertical"` | Направление пунктов |
| `disabled` | `boolean` | `false` | Блокирует все пункты |

### RadioItem

| prop | type | default | description |
|---|---|---|---|
| `value` | `string` | — | **Обязателен.** Значение пункта |
| `label` | `string` | — | **Обязателен.** Текст пункта |
| `hint` | `string` | — | Подсказка под label пункта |
| `icon` | `ReactNode` | — | Иконка (особенно полезна в `variant="card"`) |
| `disabled` | `boolean` | `false` | Блокирует конкретный пункт |

### Использование

```tsx
import { RadioGroup, RadioItem } from '@nerva-start-up/ui';

// Controlled
const [value, setValue] = useState('student');
<RadioGroup name="role" value={value} onChange={setValue} label="Роль">
  <RadioItem value="student" label="Студент" />
  <RadioItem value="teacher" label="Преподаватель" hint="Доступ к панели учителя" />
  <RadioItem value="admin" label="Администратор" disabled />
</RadioGroup>

// Uncontrolled
<RadioGroup name="view" defaultValue="list" orientation="horizontal">
  <RadioItem value="list" label="Список" />
  <RadioItem value="grid" label="Сетка" />
</RadioGroup>

// С валидацией
<RadioGroup name="group" value={value} onChange={setValue} error="Выберите группу">
  <RadioItem value="2a" label="2-А" />
  <RadioItem value="2b" label="2-Б" />
</RadioGroup>

// Card variant
<RadioGroup name="role" value={value} onChange={setValue} variant="card" label="Роль">
  <RadioItem value="student" icon={<User size={16} />} label="Студент" hint="Доступ к курсам" />
  <RadioItem value="teacher" icon={<Shield size={16} />} label="Преподаватель" hint="Панель учителя" />
</RadioGroup>
```

---

## Breadcrumb

Навигационная цепочка. Нативный HTML (`<nav>` + `<ol>`), без зависимостей. Разделитель — кастомный или `<ChevronRight>` по умолчанию. Поддерживает `asChild` на ссылках (для router-интеграции) и `BreadcrumbEllipsis` для свёрнутых промежуточных шагов.

### Компоненты

| Компонент | Назначение |
|---|---|
| `Breadcrumb` | `<nav aria-label="breadcrumb">` — корневой контейнер |
| `BreadcrumbList` | `<ol>` — список шагов |
| `BreadcrumbItem` | `<li>` — один шаг |
| `BreadcrumbLink` | `<a>` — кликабельная ссылка |
| `BreadcrumbPage` | `<span aria-current="page">` — текущая страница (не ссылка) |
| `BreadcrumbSeparator` | Разделитель (по умолчанию `ChevronRight`) |
| `BreadcrumbEllipsis` | `···` для скрытых промежуточных шагов |

### BreadcrumbLink

| prop | type | description |
|---|---|---|
| `asChild` | `boolean` | Пробрасывает стили в дочерний элемент (для `<Link>` из React Router) |

### Использование

```tsx
import {
  Breadcrumb, BreadcrumbList, BreadcrumbItem,
  BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from '@nerva-start-up/ui';

// Базовый
<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Главная</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink href="/library">Библиотека</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Лекция 01</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>

// Кастомный разделитель
<BreadcrumbSeparator>/</BreadcrumbSeparator>
<BreadcrumbSeparator><Slash size={12} /></BreadcrumbSeparator>

// Со свёрнутыми шагами
<BreadcrumbItem>
  <BreadcrumbEllipsis />
</BreadcrumbItem>

// asChild — интеграция с React Router
<BreadcrumbLink asChild>
  <Link to="/library">Библиотека</Link>
</BreadcrumbLink>
```

---

## Accordion

Сворачиваемые секции. Поддерживает два режима: `single` (только одна открыта) и `multiple` (несколько одновременно). Триггер опционально принимает иконку слева.

### Компоненты

| Компонент | Назначение |
|---|---|
| `Accordion` | Корень — устанавливает `type` и общее состояние |
| `AccordionItem` | Одна секция (требует `value`) |
| `AccordionTrigger` | Кнопка-заголовок с анимированной стрелкой |
| `AccordionContent` | Содержимое секции |

### Accordion

| prop | type | default | description |
|---|---|---|---|
| `type` | `"single" \| "multiple"` | — | **Обязателен.** Режим открытия |
| `collapsible` | `boolean` | `false` | Только для `type="single"` — разрешает закрыть открытую |
| `defaultValue` | `string \| string[]` | — | Uncontrolled начальное состояние |
| `value` | `string \| string[]` | — | Controlled состояние |
| `onValueChange` | `(value) => void` | — | |

### AccordionTrigger

| prop | type | default | description |
|---|---|---|---|
| `icon` | `ReactNode` | — | Иконка 14×14 перед заголовком (оранжевая) |

### Использование

```tsx
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@nerva-start-up/ui';

// Single — только одна секция открыта
<Accordion type="single" collapsible defaultValue="q1">
  <AccordionItem value="q1">
    <AccordionTrigger>Что такое KSI Score?</AccordionTrigger>
    <AccordionContent>40% академика, 25% активность...</AccordionContent>
  </AccordionItem>
  <AccordionItem value="q2">
    <AccordionTrigger icon={<Shield size={14} />}>RBAC</AccordionTrigger>
    <AccordionContent>Role-Based Access Control...</AccordionContent>
  </AccordionItem>
</Accordion>

// Multiple — несколько открытых одновременно
<Accordion type="multiple" defaultValue={["q1", "q2"]}>
  ...
</Accordion>
```

---

## DropdownMenu

Выпадающее меню по клику на триггер. В отличие от `ContextMenu` (правый клик) — открывается кнопкой. Поддерживает вложенные подменю, группы, разделители, checkbox и radio-пункты.

### Компоненты

| Компонент | Назначение |
|---|---|
| `DropdownMenu` | Корневой контейнер |
| `DropdownMenuTrigger` | Триггер (оборачивает `asChild`) |
| `DropdownMenuContent` | Контент меню |
| `DropdownMenuItem` | Пункт меню |
| `DropdownMenuLabel` | Нестерактивный заголовок группы |
| `DropdownMenuSeparator` | Разделитель |
| `DropdownMenuShortcut` | Горячая клавиша справа |
| `DropdownMenuGroup` | Семантическая группировка пунктов |
| `DropdownMenuSub` | Подменю-контейнер |
| `DropdownMenuSubTrigger` | Триггер подменю (со стрелкой) |
| `DropdownMenuSubContent` | Контент подменю |
| `DropdownMenuCheckboxItem` | Пункт с чекбоксом |
| `DropdownMenuRadioGroup` | Группа radio-пунктов |
| `DropdownMenuRadioItem` | Radio-пункт |

### DropdownMenuContent

| prop | type | default | description |
|---|---|---|---|
| `side` | `"top" \| "right" \| "bottom" \| "left"` | `"bottom"` | Направление открытия |
| `align` | `"start" \| "center" \| "end"` | `"center"` | Выравнивание относительно триггера |
| `sideOffset` | `number` | `6` | Отступ от триггера (px) |
| `className` | `string` | — | |

### DropdownMenuItem

| prop | type | default | description |
|---|---|---|---|
| `icon` | `ReactNode` | — | Иконка 14×14 слева |
| `destructive` | `boolean` | `false` | Красный цвет (удаление) |
| `inset` | `boolean` | `false` | Отступ слева (для выравнивания без иконки) |
| `disabled` | `boolean` | `false` | |
| `onSelect` | `() => void` | — | Вызывается при выборе пункта |

### Использование

```tsx
import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent,
  DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator,
  DropdownMenuShortcut, DropdownMenuGroup,
  DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuSubContent,
  DropdownMenuCheckboxItem, DropdownMenuRadioGroup, DropdownMenuRadioItem,
} from '@nerva-start-up/ui';

// Базовое меню
<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">Меню <ChevronDown size={14} /></Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem icon={<Edit2 size={14} />} onSelect={() => {}}>
      Редактировать
      <DropdownMenuShortcut>⌘E</DropdownMenuShortcut>
    </DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem icon={<Trash2 size={14} />} destructive>Удалить</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>

// С подменю
<DropdownMenuSub>
  <DropdownMenuSubTrigger>
    <Share2 size={14} /> Поделиться
  </DropdownMenuSubTrigger>
  <DropdownMenuSubContent>
    <DropdownMenuItem>Telegram</DropdownMenuItem>
    <DropdownMenuItem>Скопировать ссылку</DropdownMenuItem>
  </DropdownMenuSubContent>
</DropdownMenuSub>

// Radio
const [view, setView] = useState('list');
<DropdownMenuRadioGroup value={view} onValueChange={setView}>
  <DropdownMenuRadioItem value="list">Список</DropdownMenuRadioItem>
  <DropdownMenuRadioItem value="grid">Сетка</DropdownMenuRadioItem>
</DropdownMenuRadioGroup>

// Checkbox
const [starred, setStarred] = useState(false);
<DropdownMenuCheckboxItem checked={starred} onCheckedChange={(v) => setStarred(v === true)}>
  Только избранные
</DropdownMenuCheckboxItem>
```

---

## ContextMenu

Контекстное меню (правый клик / long-press). API зеркально повторяет `DropdownMenu`, но триггер — `onContextMenu`. Поддерживает подменю, разделители, checkbox и radio-пункты.

### Компоненты

| Компонент | Назначение |
|---|---|
| `ContextMenu` | Корневой контейнер |
| `ContextMenuTrigger` | Оборачиваемый элемент-триггер |
| `ContextMenuContent` | Контент (portal) |
| `ContextMenuItem` | Пункт меню |
| `ContextMenuLabel` | Нестерактивный заголовок группы |
| `ContextMenuSeparator` | Разделитель |
| `ContextMenuShortcut` | Горячая клавиша справа |
| `ContextMenuGroup` | Семантическая группировка |
| `ContextMenuSub` | Подменю-контейнер |
| `ContextMenuSubTrigger` | Триггер подменю (со стрелкой) |
| `ContextMenuSubContent` | Контент подменю |
| `ContextMenuCheckboxItem` | Пункт с чекбоксом |
| `ContextMenuRadioGroup` | Группа radio-пунктов |
| `ContextMenuRadioItem` | Radio-пункт |

### ContextMenuItem

| prop | type | default | description |
|---|---|---|---|
| `icon` | `ReactNode` | — | Иконка 14×14 слева |
| `destructive` | `boolean` | `false` | Красный цвет (удаление) |
| `inset` | `boolean` | `false` | Отступ слева (выравнивание без иконки) |
| `disabled` | `boolean` | `false` | |

```tsx
import {
  ContextMenu, ContextMenuTrigger, ContextMenuContent,
  ContextMenuItem, ContextMenuLabel, ContextMenuSeparator,
  ContextMenuShortcut, ContextMenuSub,
  ContextMenuSubTrigger, ContextMenuSubContent,
} from '@nerva-start-up/ui';
import { Pencil, Trash2, Copy, Share2 } from 'lucide-react';

// Базовый (таблица студентов, карточка файла)
<ContextMenu>
  <ContextMenuTrigger asChild>
    <tr className="...">...</tr>
  </ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuLabel>Действия</ContextMenuLabel>
    <ContextMenuItem icon={<Pencil size={14} />} onSelect={() => openEdit()}>
      Редактировать
      <ContextMenuShortcut>⌘E</ContextMenuShortcut>
    </ContextMenuItem>
    <ContextMenuItem icon={<Copy size={14} />}>Скопировать ID</ContextMenuItem>
    <ContextMenuSeparator />
    <ContextMenuItem icon={<Trash2 size={14} />} destructive>Удалить</ContextMenuItem>
  </ContextMenuContent>
</ContextMenu>

// С подменю
<ContextMenuSub>
  <ContextMenuSubTrigger>
    <Share2 size={14} /> Поделиться
  </ContextMenuSubTrigger>
  <ContextMenuSubContent>
    <ContextMenuItem>Telegram</ContextMenuItem>
    <ContextMenuItem>Скопировать ссылку</ContextMenuItem>
  </ContextMenuSubContent>
</ContextMenuSub>
```

---

## Switch

iOS-стиль переключатель. Нативный `<input type="checkbox" role="switch">` с кастомным треком и большим. Поддерживает `label`, `description`, `hint`, `error`, два размера. Совместим с `FormControl`.

### Props

| prop | type | default | description |
|---|---|---|---|
| `checked` | `boolean` | — | Controlled состояние |
| `defaultChecked` | `boolean` | `false` | Uncontrolled начальное состояние |
| `onChange` | `(checked: boolean) => void` | — | Callback изменения |
| `label` | `string` | — | Текст метки |
| `description` | `string` | — | Второстепенное описание |
| `hint` | `string` | — | Подсказка (скрывается при `error`) |
| `error` | `string` | — | Текст ошибки (трек краснеет) |
| `size` | `"sm" \| "md"` | `"md"` | Размер: md = 44×24px, sm = 32×18px |
| `disabled` | `boolean` | `false` | |
| `id` | `string` | — | id для `<input>` (по умолчанию — из label) |
| `aria-invalid` | `boolean \| "true" \| "false"` | — | Для интеграции с FormControl |
| `aria-describedby` | `string` | — | |
| `className` | `string` | — | |

### Использование

```tsx
import { Switch, Text } from '@nerva-start-up/ui';

// Базовый
const [on, setOn] = useState(false);
<Switch label="Тёмная тема" checked={on} onChange={setOn} />

// С описанием
<Switch
  label="Push-уведомления"
  description="Получать оповещения об оценках"
  checked={on}
  onChange={setOn}
/>

// Маленький — для плотных панелей настроек
<div className="flex items-center justify-between">
  <Text as="span">Wi-Fi</Text>
  <Switch size="sm" checked={wifi} onChange={setWifi} />
</div>

// С ошибкой
<Switch
  label="Принимаю условия"
  checked={agreed}
  onChange={setAgreed}
  error={!agreed ? "Обязательно для продолжения" : undefined}
/>

// С FormControl (для react-hook-form)
<FormField name="darkMode" error={errors.darkMode?.message}>
  <FormControl>
    <Switch label="Тёмная тема" checked={field.value} onChange={field.onChange} />
  </FormControl>
  <FormMessage />
</FormField>
```

---

## Collapsible

Одиночный сворачиваемый блок. В отличие от `Accordion` — автономный, не является частью списка. Нативный React, без Radix. Анимация через CSS `grid-rows` — нет JS-измерений высоты.

### Компоненты

| Компонент | Описание |
|---|---|
| `Collapsible` | Корень: контекст состояния, controlled / uncontrolled |
| `CollapsibleTrigger` | `<button>` — переключает открытие. Проставляет `aria-expanded` и `aria-controls` |
| `CollapsibleContent` | Анимированная `<section>`. `aria-labelledby` ссылается на триггер |

### Collapsible Props

| prop | type | default | description |
|---|---|---|---|
| `open` | `boolean` | — | Controlled состояние |
| `defaultOpen` | `boolean` | `false` | Uncontrolled начальное состояние |
| `onOpenChange` | `(open: boolean) => void` | — | Callback изменения |
| `disabled` | `boolean` | `false` | Блокирует триггер |
| `id` | `string` | — | Базовый id для aria-связей (по умолчанию `useId()`) |
| `className` | `string` | — | |

### CollapsibleTrigger Props

Наследует все `React.ButtonHTMLAttributes<HTMLButtonElement>`, плюс:

| prop | type | default | description |
|---|---|---|---|
| `showChevron` | `boolean` | `false` | Показывает вращающийся шеврон справа |

### Использование

```tsx
import { Collapsible, CollapsibleTrigger, CollapsibleContent, Text } from '@nerva-start-up/ui';

// Базовый (uncontrolled)
<Collapsible defaultOpen>
  <CollapsibleTrigger
    showChevron
    className="px-4 py-3 bg-[var(--surface-2)] border border-[var(--border)] rounded-md w-full"
  >
    <Text as="span" size="sm" weight="medium">Дополнительные сведения</Text>
  </CollapsibleTrigger>
  <CollapsibleContent className="pt-3">
    <Text size="sm" variant="muted">Содержимое...</Text>
  </CollapsibleContent>
</Collapsible>

// Controlled
const [open, setOpen] = useState(false);
<Collapsible open={open} onOpenChange={setOpen}>
  ...
</Collapsible>

// Встроенный триггер (без рамки, как ссылка)
<Collapsible>
  <CollapsibleTrigger className="text-sm text-[var(--primary)] hover:underline">
    Как рассчитывается рейтинг?
  </CollapsibleTrigger>
  <CollapsibleContent className="pt-2">
    <Text size="sm">...</Text>
  </CollapsibleContent>
</Collapsible>

// Card-стиль (с рамкой снаружи)
<div className="rounded-md border border-[var(--border)] overflow-hidden">
  <Collapsible>
    <CollapsibleTrigger showChevron className="px-4 py-3 bg-[var(--surface-2)] w-full">
      <Text as="span" size="sm" weight="medium">Заголовок</Text>
    </CollapsibleTrigger>
    <Separator />
    <CollapsibleContent>
      <div className="px-4 py-3">Содержимое</div>
    </CollapsibleContent>
  </Collapsible>
</div>
```

---

## Popover

Всплывающий контейнер привязанный к триггеру. В отличие от `Tooltip` — интерактивный (можно кликать внутри). Используется для dropdown-меню, фильтров, карточек пользователя, кнопок «ещё».

### Компоненты

| Компонент | Назначение |
|---|---|
| `Popover` | Корневой контейнер (состояние open/close) |
| `PopoverTrigger` | Элемент-триггер (оборачивает `asChild`) |
| `PopoverContent` | Всплывающий контент |
| `PopoverClose` | Кнопка закрытия внутри контента |

### Popover

| prop | type | default | description |
|---|---|---|---|
| `open` | `boolean` | — | Controlled состояние |
| `defaultOpen` | `boolean` | `false` | Uncontrolled начальное состояние |
| `onOpenChange` | `(open: boolean) => void` | — | Callback изменения состояния |

### PopoverContent

| prop | type | default | description |
|---|---|---|---|
| `side` | `"top" \| "right" \| "bottom" \| "left"` | `"bottom"` | Сторона появления |
| `align` | `"start" \| "center" \| "end"` | `"start"` | Выравнивание относительно триггера |
| `sideOffset` | `number` | `6` | Отступ от триггера (px) |
| `className` | `string` | — | |

### Использование

```tsx
import { Popover, PopoverTrigger, PopoverContent, PopoverClose, Text } from '@nerva-start-up/ui';

// Базовый
<Popover>
  <PopoverTrigger>
    <Button variant="outline">Открыть</Button>
  </PopoverTrigger>
  <PopoverContent>
    <Text size="sm" className="px-3 py-2">Содержимое</Text>
  </PopoverContent>
</Popover>

// Controlled
const [open, setOpen] = useState(false);
<Popover open={open} onOpenChange={setOpen}>
  ...
</Popover>

// Dropdown-меню с кнопкой закрытия
<Popover>
  <PopoverTrigger>
    <button type="button"><MoreHorizontal size={16} /></button>
  </PopoverTrigger>
  <PopoverContent align="end" className="w-[160px] px-0 py-1">
    <button type="button" className="...">Редактировать</button>
    <PopoverClose>
      <button type="button" className="...">Закрыть</button>
    </PopoverClose>
  </PopoverContent>
</Popover>
```

---

## Popconfirm

Лёгкое инлайн-подтверждение перед действием (построен на `Popover`) — альтернатива полноэкранному `AlertDialog` для рутинных операций вроде удаления строки таблицы.

| prop | type | default | description |
|---|---|---|---|
| `children` | `ReactNode` | — | **required** — элемент-триггер (кнопка, иконка и т.д.) |
| `title` | `string` | — | **required** — основной вопрос |
| `description` | `string` | — | пояснение под вопросом |
| `confirmText` | `string` | `'Подтвердить'` | текст кнопки подтверждения |
| `cancelText` | `string` | `'Отмена'` | текст кнопки отмены |
| `danger` | `boolean` | `false` | красная кнопка подтверждения — для деструктивных действий |
| `onConfirm` | `() => void \| Promise<void>` | — | **required** — может быть async, кнопки блокируются до резолва |
| `onCancel` | `() => void` | — | callback отмены |
| `open` / `defaultOpen` / `onOpenChange` | | | controlled/uncontrolled состояние, как у `Popover` |
| `side` | `'top' \| 'right' \| 'bottom' \| 'left'` | `'top'` | сторона появления |
| `className` | `string` | — | Tailwind-классы контента |

```tsx
import { Popconfirm, Button } from '@nerva-start-up/ui';

<Popconfirm
  title="Удалить студента из группы?"
  description="Это действие нельзя отменить."
  confirmText="Удалить"
  danger
  onConfirm={() => removeStudent(id)}
>
  <Button variant="danger" size="sm">Удалить</Button>
</Popconfirm>

// async — кнопка подтверждения показывает спиннер до резолва промиса
<Popconfirm title="Сдать задание?" onConfirm={() => submitAssignment(id)}>
  <Button size="sm">Сдать</Button>
</Popconfirm>
```

---

## Form

Структурный слой для построения форм. Обеспечивает автоматическое a11y-связывание (id / aria-invalid / aria-describedby) и работает с любой библиотекой валидации — react-hook-form, zod, tanstack-form или нативными обработчиками.

**Без зависимостей** на rhf / zod — потребитель подключает свою библиотеку.

### Компоненты

| Компонент | Описание |
|---|---|
| `Form` | `<form noValidate>` с `flex-col gap-5` |
| `FormSection` | `<fieldset>` с опциональной легендой |
| `FormField` | Провайдер контекста поля: `name`, `error`. Устанавливает `id = field-{name}` |
| `FormLabel` | `<label htmlFor={id}>` из контекста. Краснеет при ошибке |
| `FormControl` | Оборачивает единственный контрол и инжектит `id`, `aria-invalid`, `aria-describedby` |
| `FormDescription` | Статичная подсказка (id = `field-{name}-description`) |
| `FormMessage` | Сообщение об ошибке из контекста (id = `field-{name}-message`). Скрыт когда нет ошибки |
| `useFormField()` | Хук для кастомных контролов — читает `{ id, name, error }` из контекста |

### Props

**FormField**

| prop | type | default | description |
|---|---|---|---|
| `name` | `string` | — | Имя поля (обязательно). Используется для генерации id |
| `error` | `string` | — | Текст ошибки; пробрасывается в FormMessage и FormControl |
| `className` | `string` | — | |

**FormSection**

| prop | type | description |
|---|---|---|
| `legend` | `string` | Подпись секции |
| `className` | `string` | |

### Совместимость контролов

`FormControl` работает через `React.cloneElement` — инжектит `id`, `aria-invalid`, `aria-describedby` в props дочернего компонента.

Все KSI kit контролы принимают эти props:
- **Input** — `aria-invalid` активирует красную рамку; `aria-describedby` пробрасывается на `<input>`
- **Checkbox** — `aria-invalid` активирует красную рамку индикатора
- **PasswordInput**, **Textarea**, **Select** — аналогично через spread `...props`

Кастомный контрол нужно написать так, чтобы он принимал `id`, `aria-invalid`, `aria-describedby` и пробрасывал их на нативный элемент. Или использовать `useFormField()` для ручного связывания.

### Использование

```tsx
import {
  Form, FormField, FormLabel,
  FormControl, FormMessage, FormDescription,
  FormSection,
} from '@nerva-start-up/ui';

// Базовый пример (нативная валидация)
function LoginForm() {
  const [errors, setErrors] = useState<Record<string, string>>({});

  return (
    <Form onSubmit={handleSubmit}>
      <FormField name="email" error={errors.email}>
        <FormLabel>Email</FormLabel>
        <FormControl>
          <Input type="email" placeholder="student@ksi.uz" />
        </FormControl>
        <FormMessage />
      </FormField>

      <FormField name="password" error={errors.password}>
        <FormLabel>Пароль</FormLabel>
        <FormControl>
          <PasswordInput />
        </FormControl>
        <FormDescription>Минимум 8 символов</FormDescription>
        <FormMessage />
      </FormField>

      <Button type="submit">Войти</Button>
    </Form>
  );
}
```

### С react-hook-form

```tsx
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email('Неверный email'),
  password: z.string().min(8, 'Минимум 8 символов'),
  agree: z.literal(true, { errorMap: () => ({ message: 'Обязательно' }) }),
});

function RegisterForm() {
  const { register, control, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {/* Неконтролируемые поля — через register */}
      <FormField name="email" error={errors.email?.message}>
        <FormLabel>Email</FormLabel>
        <FormControl>
          <Input {...register('email')} type="email" />
        </FormControl>
        <FormMessage />
      </FormField>

      <FormField name="password" error={errors.password?.message}>
        <FormLabel>Пароль</FormLabel>
        <FormControl>
          <PasswordInput {...register('password')} />
        </FormControl>
        <FormMessage />
      </FormField>

      {/* Контролируемые (Checkbox, Select и др.) — через Controller */}
      <Controller
        name="agree"
        control={control}
        render={({ field, fieldState }) => (
          <FormField name="agree" error={fieldState.error?.message}>
            <FormControl>
              <Checkbox
                label="Принимаю условия"
                checked={field.value}
                onChange={field.onChange}
              />
            </FormControl>
            <FormMessage />
          </FormField>
        )}
      />

      <Button type="submit">Зарегистрироваться</Button>
    </Form>
  );
}
```

### Форма с секциями

```tsx
<Form onSubmit={handleSubmit}>
  <FormSection legend="Личные данные">
    <FormField name="first-name">
      <FormLabel>Имя</FormLabel>
      <FormControl><Input placeholder="Иван" /></FormControl>
    </FormField>
    <FormField name="last-name">
      <FormLabel>Фамилия</FormLabel>
      <FormControl><Input placeholder="Иванов" /></FormControl>
    </FormField>
  </FormSection>

  <FormSection legend="Учётная запись">
    <FormField name="email">
      <FormLabel>Email</FormLabel>
      <FormControl><Input type="email" /></FormControl>
      <FormDescription>Используется для входа</FormDescription>
    </FormField>
  </FormSection>

  <Button type="submit">Сохранить</Button>
</Form>
```

### Кастомный контрол через useFormField

```tsx
import { useFormField } from '@nerva-start-up/ui';

function MyCustomInput(props: { id?: string; 'aria-invalid'?: boolean; 'aria-describedby'?: string }) {
  // Либо принимаете через props (инжектируются FormControl),
  // либо читаете из контекста напрямую:
  const { id, error } = useFormField();

  return <input id={id} aria-invalid={!!error} /* ... */ />;
}

// В форме:
<FormField name="custom" error={errors.custom}>
  <FormLabel>Поле</FormLabel>
  <FormControl>
    <MyCustomInput />
  </FormControl>
  <FormMessage />
</FormField>
```

---

## Checkbox / CheckboxGroup / CheckboxItem

Чекбокс с поддержкой indeterminate-состояния, описания, ошибок. Группа с контекстом для мульти-выбора.

### Checkbox Props

| prop | type | default | description |
|---|---|---|---|
| `checked` | `boolean` | — | Controlled состояние |
| `defaultChecked` | `boolean` | `false` | Uncontrolled начальное состояние |
| `indeterminate` | `boolean` | `false` | Частично выбранное состояние (для "выбрать все") |
| `onChange` | `(checked: boolean) => void` | — | Callback изменения |
| `label` | `string` | — | Текст метки |
| `description` | `string` | — | Второстепенное описание под меткой |
| `hint` | `string` | — | Подсказка под чекбоксом (скрывается при `error`) |
| `error` | `string` | — | Текст ошибки |
| `disabled` | `boolean` | `false` | |
| `id` | `string` | — | id для `<input>` (по умолчанию — из label) |
| `className` | `string` | — | |

### CheckboxGroup Props

| prop | type | default | description |
|---|---|---|---|
| `value` | `string[]` | — | Controlled массив выбранных значений |
| `defaultValue` | `string[]` | `[]` | Uncontrolled начальное значение |
| `onChange` | `(value: string[]) => void` | — | Callback изменения |
| `label` | `string` | — | Подпись группы |
| `hint` | `string` | — | Подсказка под группой |
| `error` | `string` | — | Текст ошибки |
| `orientation` | `"vertical" \| "horizontal"` | `"vertical"` | Направление элементов |
| `disabled` | `boolean` | — | Отключает все дочерние `CheckboxItem` |
| `className` | `string` | — | |

### CheckboxItem Props

| prop | type | description |
|---|---|---|
| `value` | `string` | Значение пункта (обязательно) |
| `label` | `string` | Текст метки |
| `description` | `string` | Описание |
| `disabled` | `boolean` | Отключает только этот пункт |

### Использование

```tsx
import { Checkbox, CheckboxGroup, CheckboxItem } from '@nerva-start-up/ui';

// Одиночный
const [checked, setChecked] = useState(false);
<Checkbox label="Принимаю условия" checked={checked} onChange={setChecked} />

// С описанием и ошибкой
<Checkbox
  label="Согласен с правилами"
  description="Ознакомьтесь с политикой конфиденциальности"
  checked={agreed}
  onChange={setAgreed}
  error={!agreed ? "Обязательно для продолжения" : undefined}
/>

// Indeterminate ("выбрать все")
const allChecked = selected.length === options.length;
const someChecked = selected.length > 0 && !allChecked;

<Checkbox
  label="Выбрать все"
  checked={allChecked}
  indeterminate={someChecked}
  onChange={() => setSelected(allChecked ? [] : options)}
/>

// Группа
const [permissions, setPermissions] = useState<string[]>(['read']);

<CheckboxGroup label="Права доступа" value={permissions} onChange={setPermissions}>
  <CheckboxItem value="read"   label="Просмотр"       description="Читать материалы" />
  <CheckboxItem value="write"  label="Редактирование" description="Загружать файлы" />
  <CheckboxItem value="delete" label="Удаление"       disabled />
</CheckboxGroup>

// Горизонтальная группа
<CheckboxGroup label="Дни" value={days} onChange={setDays} orientation="horizontal">
  <CheckboxItem value="mon" label="Пн" />
  <CheckboxItem value="tue" label="Вт" />
  <CheckboxItem value="wed" label="Ср" />
</CheckboxGroup>
```

---

## NumberInput

Числовой инпут с кнопками `-`/`+`. Два визуальных варианта.

### Props

| prop | type | default | description |
|---|---|---|---|
| `value` | `number` | — | Controlled значение |
| `defaultValue` | `number` | `0` | Uncontrolled начальное значение |
| `onChange` | `(value: number) => void` | — | Callback изменения |
| `min` | `number` | — | Минимальное значение (кнопка `-` отключается на границе) |
| `max` | `number` | — | Максимальное значение (кнопка `+` отключается на границе) |
| `step` | `number` | `1` | Шаг изменения |
| `variant` | `"default" \| "line"` | `"default"` | Вид компонента |
| `label` | `string` | — | Подпись над инпутом |
| `hint` | `string` | — | Подсказка под инпутом (скрывается при `error`) |
| `error` | `string` | — | Текст ошибки |
| `disabled` | `boolean` | `false` | |
| `id` | `string` | — | id для `<input>` (по умолчанию — из label) |
| `className` | `string` | — | |

### variant="default"

Полноразмерный bordered контейнер в стиле `Input`: кнопка `-` слева, число по центру, кнопка `+` справа. Focus ring оранжевый.

```tsx
import { NumberInput } from '@nerva-start-up/ui';

// Базовый
<NumberInput label="Количество" defaultValue={1} />

// Controlled с диапазоном
const [score, setScore] = useState(50);
<NumberInput
  label="Баллы за задание"
  value={score}
  onChange={setScore}
  min={0}
  max={100}
  step={5}
  hint="От 0 до 100"
/>

// С ошибкой
<NumberInput
  label="Минимальный балл"
  value={value}
  onChange={setValue}
  error={value < 10 ? "Укажите не менее 10" : undefined}
/>
```

### variant="line"

Минималистичный вид: подчёркивание вместо рамки, маленькие круглые кнопки `−`/`+`. Если заданы `min` и `max` — показывает прогресс-бар и метки границ.

```tsx
// С прогресс-баром
<NumberInput
  variant="line"
  label="Академика, %"
  value={value}
  onChange={setValue}
  min={0}
  max={100}
  step={5}
  hint="Вес в формуле KSI Score"
/>

// Редактор весов KSI Score
const [weights, setWeights] = useState({ academic: 40, activity: 25, contribution: 20, interaction: 15 });
const total = Object.values(weights).reduce((a, b) => a + b, 0);
const set = (key) => (v) => setWeights(prev => ({ ...prev, [key]: v }));

<NumberInput variant="line" label="Академика"     value={weights.academic}     onChange={set('academic')}     min={0} max={100} step={5} />
<NumberInput variant="line" label="Активность"    value={weights.activity}     onChange={set('activity')}     min={0} max={100} step={5} />
<NumberInput variant="line" label="Вклад"         value={weights.contribution} onChange={set('contribution')} min={0} max={100} step={5} />
<NumberInput variant="line" label="Взаимодействие" value={weights.interaction} onChange={set('interaction')} min={0} max={100} step={5} />
<Badge variant={total === 100 ? 'success' : 'error'}>{total}%</Badge>
```

---

## KnowledgeGraph

Граф базы знаний: модули → темы со статусом освоения, интерактивный canvas (drag/zoom) на [`@xyflow/react`](https://reactflow.dev/) **или** плоский список — оба варианта читают одни и те же `nodes`/`edges` через контекст. Клик по теме или модулю открывает соответствующий Drawer с деталями.

Composable API в стиле shadcn ui: `KnowledgeGraph` — провайдер данных и состояния выбранных узлов, `KnowledgeGraphCanvas` / `KnowledgeGraphList` / `KnowledgeGraphStats` / `KnowledgeGraphDrawer` / `KnowledgeGraphModuleDrawer` / `KnowledgeGraphEditor` — независимые вьюхи, которые можно комбинировать как угодно.

Компонент **полностью controlled** — `nodes`/`edges` живут в состоянии приложения-потребителя. Всё, что нужно для полностью редактируемого графа (создание, drag, редактирование тем/модулей, связи) — это передать `onNodesChange`/`onEdgesChange`:

```tsx
<KnowledgeGraph nodes={nodes} edges={edges} onNodesChange={setNodes} onEdgesChange={setEdges}>
```

Оба колбэка получают уже готовый обновлённый массив — граф сам считает diff внутри (append при создании, merge при редактировании, `applyNodeChanges` при drag), так что `setNodes`/`setEdges` напрямую достаточно. Без `onNodesChange`/`onEdgesChange` соответствующие возможности (drag, создание, редактирование, коннекторы) просто не отображаются — граф безопасно деградирует до read-only.

Если нужно перехватить конкретное событие (например, отправить запрос на бэкенд при создании темы) — есть более гранулярные **опциональные** хуки `onCreateNode` / `onCreateEdge` / `onUpdateNode` / `onUpdateModule`. Они не заменяют `onNodesChange`/`onEdgesChange` — вызываются **вместе** с ними, как side-channel, и ничего не обязаны делать с состоянием сами.

> Требует peer-зависимость `@xyflow/react` (уже объявлена как обычная `dependency` пакета) и её стили:
> ```ts
> import "@xyflow/react/dist/style.css";
> ```
> Импортировать один раз в корне приложения — так же, как `tailwindcss`/`@nerva-start-up/ui/base`.

### Компоненты

| Компонент | Props | Description |
|---|---|---|
| `KnowledgeGraph` | `nodes`, `edges`, `moduleIconOptions?`, `selectedTopicId?`/`defaultSelectedTopicId?`/`onSelectedTopicIdChange?`, `selectedModuleId?`/`defaultSelectedModuleId?`/`onSelectedModuleIdChange?`, `onNodesChange?`, `onEdgesChange?`, `onCreateNode?`, `onCreateEdge?`, `onUpdateNode?`, `onUpdateModule?`, `className?`, `children` | Root. Держит данные и состояние выбранной темы/модуля в контексте |
| `KnowledgeGraphCanvas` | `height?` (`540`), `className?` | Интерактивный граф: drag, zoom, minimap, кнопки zoom/fit/lock. См. «Редактирование на canvas» ниже |
| `KnowledgeGraphList` | `className?` | Плоский список тем, сгруппированный по модулям. Клик по теме/заголовку модуля открывает Drawer |
| `KnowledgeGraphStats` | `className?` | Плашки-счётчики: освоено / в процессе / не начато + общий прогресс |
| `KnowledgeGraphDrawer` | `side?` (`'right'` \| `'bottom'`, default `'right'`) | Drawer с деталями темы. Поля (название, статус, описание, часы) становятся editable-инпутами, если задан `onNodesChange`. `null`, пока тема не выбрана |
| `KnowledgeGraphModuleDrawer` | `side?` (`'right'` \| `'bottom'`, default `'right'`) | Drawer с деталями модуля (название, иконка, цвет). Editable, если задан `onNodesChange`. `null`, пока модуль не выбран |
| `KnowledgeGraphEditor` | `triggerLabel?` (`'Добавить'`) | Кнопка + Drawer с вкладками «Тема» / «Модуль» / «Связь» для формы создания |

Все вьюхи — сиблинги внутри `KnowledgeGraph`, читают состояние через `useKnowledgeGraphContext()`; ни один из них не обязателен — используйте только нужные. `selectedModuleId` поддерживает тот же controlled/uncontrolled паттерн, что и `selectedTopicId` (для deep-link на конкретный модуль через URL).

### Свои иконки для модулей

Иконка модуля выбирается из `moduleIconOptions` — селект в `KnowledgeGraphEditor` (создание) и `KnowledgeGraphModuleDrawer` (редактирование), а также автовыбор при создании модуля через canvas (правый клик по пустому месту) все читают этот список из контекста:

```tsx
import { KnowledgeGraph, type ModuleIconOption } from '@nerva-start-up/ui';
import { Radar, Bug, Skull } from 'lucide-react';

const MY_MODULE_ICONS: ModuleIconOption[] = [
  { value: 'radar', label: 'Разведка', icon: Radar },
  { value: 'bug', label: 'Уязвимости', icon: Bug },
  { value: 'skull', label: 'Малварь', icon: Skull },
];

<KnowledgeGraph nodes={nodes} edges={edges} moduleIconOptions={MY_MODULE_ICONS} onNodesChange={setNodes}>
  ...
</KnowledgeGraph>
```

Если `moduleIconOptions` не передан — используется встроенный набор (`MODULE_ICON_OPTIONS`, тоже экспортирован из пакета, можно расширить через spread вместо полной замены: `[...MODULE_ICON_OPTIONS, myIcon]`).

### Редактирование на canvas

`KnowledgeGraphCanvas` — не просто вьюха, это полноценный редактор графа (когда переданы `onNodesChange`/`onEdgesChange`):

**Левый клик по узлу ничего не открывает** — единственный способ открыть тему/модуль это пункт «Открыть» в контекстном меню (правый клик). Левый клик остаётся только для drag (перетаскивания) и стандартного выделения узла в React Flow.

| Действие | Требует | Результат |
|---|---|---|
| Перетаскивание узла | `onNodesChange` | Новая позиция уходит в колбэк (`applyNodeChanges` под капотом) |
| Удаление узла (Backspace на выбранном) | `onNodesChange` | Узел удаляется; связанные `edges` (по `source`/`target`) подчищаются автоматически через `onEdgesChange`, если он задан |
| Правый клик по пустому месту → «Добавить модуль» | `onNodesChange` | Новый `moduleHeader` в точке клика |
| Перетащить связь из темы на пустое место | `onNodesChange` + `onEdgesChange` | Новая `topic` в точке отпускания + `edge`, соединяющий её с источником |
| Перетащить связь между двумя темами | `onEdgesChange` | Новый `edge` |

У каждого узла свой context menu (правый клик):

| Узел | Пункты меню | Требует |
|---|---|---|
| Тема | «Открыть» — открывает `KnowledgeGraphDrawer` | — |
| Тема | «Статус» (подменю) — «Не начато» / «В процессе» / «Освоено», каждый пункт со своей иконкой (`Lock`/`Flame`/`CheckCircle2`); иконка на самом триггере подменю отражает текущий статус | `onNodesChange` |
| Тема | «Удалить» — тема + связанные `edges` | `onNodesChange` (+ `onEdgesChange` для чистки связей) |
| Модуль | «Открыть» — открывает `KnowledgeGraphModuleDrawer` | — |
| Модуль | «Добавить тему» — новая `topic` в колонке этого модуля | `onNodesChange` |
| Модуль | «Удалить» — модуль **и все его темы**, плюс связи, которые на них ссылались | `onNodesChange` (+ `onEdgesChange` для чистки связей) |

Без соответствующего колбэка действие просто недоступно (drag выключен, деструктивные/создающие пункты меню не показываются, остаётся только «Открыть») — граф безопасно деградирует до read-only просмотра.

**Стиль связи всегда вычисляется из текущих статусов её тем** (`KnowledgeGraphCanvas` пересчитывает его при каждом рендере через `getStyledEdges`) — любой `style`/`animated`, заданный вручную на самом объекте `edge` (в том числе в статических исходных данных), при отрисовке на canvas переопределяется. Поэтому если статус темы меняется (например, через `KnowledgeGraphDrawer`), все связанные с ней рёбра сразу же перекрашиваются — ничего пересоздавать не нужно.

У каждой пары статусов свой стиль — `mastered` («освоено») выделяется в любой комбинации, не только когда обе темы освоены:

| Пара статусов | Стиль |
|---|---|
| `mastered` + `mastered` | зелёная сплошная |
| `mastered` + `in_progress` | оранжевая анимированная |
| `mastered` + `not_started` | синяя сплошная (`--info`) — пререквизит освоен, можно начинать |
| `in_progress` + `in_progress` | оранжевая анимированная |
| `in_progress` + `not_started` | оранжевая пунктирная анимированная |
| `not_started` + `not_started` | серая пунктирная |

Это применимо к любым связям, которые проходят через `KnowledgeGraphCanvas` — включая те, что вы сами положили в исходный массив `edges` (их изначальный `style` используется только как fallback до первого рендера canvas). Если нужна логика вычисления стиля из чего-то другого — экспортирован `getEdgeStyle(sourceStatus, targetStatus)`.

### Модель данных

```ts
type TopicStatus = 'not_started' | 'in_progress' | 'mastered';

type TopicResource = { title: string; type: 'pdf' | 'video' | 'quiz' | 'article' };

type TopicNodeData = {
  moduleId: string;             // id узла модуля (type: 'moduleHeader'), которому принадлежит тема
  label: string;
  status: TopicStatus;
  mastery: number | null;       // 0..1, null — прогресс не отслеживается
  description?: string;
  isNext?: boolean;             // бейдж «Рекомендуется» на узле/в списке
  fullDescription?: string;
  prerequisites?: string[];
  estimatedHours?: number;
  resources?: TopicResource[];
  quizBestScore?: number;
};

type ModuleHeaderData = {
  label: string;
  accent: string;               // hex-цвет акцента модуля
  icon: React.ElementType;
};

// Узлы графа — это `Node<T, type>` из @xyflow/react
type KnowledgeGraphNode = Node<TopicNodeData, 'topic'> | Node<ModuleHeaderData, 'moduleHeader'>;
type KnowledgeGraphEdge = Edge;
```

`nodes` — плоский массив; принадлежность темы модулю определяется через `data.moduleId` (а не порядком в массиве), так что новые узлы можно просто дописывать в конец. `topicCount`/`masteredCount` в `ModuleHeaderData` больше нет — счётчики модуля (`X / Y тем`) всегда считаются на лету из фактических тем с этим `moduleId`. Позиционирование (`position: { x, y }`) нужно только для `Canvas` — `List`/`Stats` его игнорируют.

### Использование

```tsx
import {
  KnowledgeGraph,
  KnowledgeGraphCanvas,
  KnowledgeGraphList,
  KnowledgeGraphStats,
  KnowledgeGraphDrawer,
  KnowledgeGraphModuleDrawer,
  KnowledgeGraphEditor,
  type KnowledgeGraphNode,
  type KnowledgeGraphEdge,
} from '@nerva-start-up/ui';
import { Shield } from 'lucide-react';

const [nodes, setNodes] = useState<KnowledgeGraphNode[]>([
  {
    id: 'mod-1',
    type: 'moduleHeader',
    position: { x: 0, y: 0 },
    data: { label: 'Веб-безопасность', accent: '#f97316', icon: Shield },
  },
  {
    id: 'xss',
    type: 'topic',
    position: { x: 10, y: 90 },
    data: {
      moduleId: 'mod-1',
      label: 'XSS атаки',
      status: 'in_progress',
      mastery: 0.4,
      description: 'Reflected, Stored, DOM-based',
    },
  },
]);
const [edges, setEdges] = useState<KnowledgeGraphEdge[]>([]);

// Полностью редактируемый canvas: создание, перетаскивание, редактирование тем и модулей —
// onNodesChange/onEdgesChange это всё, что нужно
<KnowledgeGraph
  nodes={nodes}
  edges={edges}
  selectedTopicId={topicId}
  onSelectedTopicIdChange={setTopicId}
  onNodesChange={setNodes}
  onEdgesChange={setEdges}
>
  <KnowledgeGraphStats />
  <KnowledgeGraphCanvas height={540} />
  <KnowledgeGraphDrawer />
  <KnowledgeGraphModuleDrawer />
</KnowledgeGraph>

// List — mobile / доступный fallback, создание через форму-Drawer вместо canvas-жестов.
// side="bottom" — Drawer открывается снизу (bottom-sheet), это удобнее в List-раскладке на мобильных
<KnowledgeGraph nodes={nodes} edges={edges} onNodesChange={setNodes} onEdgesChange={setEdges}>
  <KnowledgeGraphEditor />
  <KnowledgeGraphStats />
  <KnowledgeGraphList />
  <KnowledgeGraphDrawer side="bottom" />
  <KnowledgeGraphModuleDrawer side="bottom" />
</KnowledgeGraph>

// Read-only: без onNodesChange/onEdgesChange — просто просмотр
<KnowledgeGraph nodes={nodes} edges={edges}>
  <KnowledgeGraphStats />
  <KnowledgeGraphCanvas />
  <KnowledgeGraphDrawer />
</KnowledgeGraph>

// Side-channel хук: например, отправить создание темы на бэкенд отдельно от локального стейта
<KnowledgeGraph
  nodes={nodes}
  edges={edges}
  onNodesChange={setNodes}
  onCreateNode={(node) => api.createTopic(node)}
>
```

---

## Anchor

Scrollspy-навигация по разделам страницы (идея из ant-design `Anchor`). `Anchor` слушает скролл (`window` или свой контейнер), подсвечивает `AnchorLink`, чья секция сейчас видна, и плавно скроллит к ней по клику (без "прыжка" — `scrollTo({ behavior: 'smooth' })`), обновляя URL через `history.pushState`.

| Компонент | Props | Description |
|---|---|---|
| `Anchor` | `offsetTop?`, `bounds?`, `container?`, `onChange?`, `className?`, `children` | Root — контейнер `<nav>`, хранит контекст и слушает скролл |
| `AnchorLink` | `href`, `label`, `children?`, `className?` | Ссылка на секцию (`href="#id"`); вложенные `AnchorLink` рендерятся как под-разделы с отступом |

### Использование

```tsx
import { Anchor, AnchorLink } from '@nerva-start-up/ui';

<div className="flex gap-8">
  <Anchor className="w-56 shrink-0" offsetTop={16}>
    <AnchorLink href="#install" label="Установка" />
    <AnchorLink href="#usage" label="Использование">
      <AnchorLink href="#usage-basic" label="Базовый пример" />
      <AnchorLink href="#usage-advanced" label="Продвинутый пример" />
    </AnchorLink>
    <AnchorLink href="#faq" label="FAQ" />
  </Anchor>

  <article className="flex-1">
    <section id="install">...</section>
    <section id="usage">
      <div id="usage-basic">...</div>
      <div id="usage-advanced">...</div>
    </section>
    <section id="faq">...</section>
  </article>
</div>
```

Свой скролл-контейнер (например `ScrollArea`, а не `window`) — `container` — функция, возвращающая элемент:

```tsx
const scrollRef = useRef<HTMLDivElement>(null);

<Anchor container={() => scrollRef.current ?? window}>
  <AnchorLink href="#a" label="A" />
</Anchor>

<div ref={scrollRef} className="overflow-y-auto">
  <section id="a">...</section>
</div>
```

`offsetTop` — отступ (px), после которого секция считается текущей (например высота sticky-хедера); `bounds` — доп. допуск (px) для сглаживания границы переключения.

---

## FloatButton

Плавающая кнопка действия, закреплённая в углу экрана (идея из ant-design `FloatButton`). `FloatButtonGroup` собирает несколько кнопок в раскрывающийся кластер, `FloatButtonBackTop` — специализированная кнопка «наверх», которая появляется после прокрутки.

| Компонент | Props | Description |
|---|---|---|
| `FloatButton` | `icon?`, `description?`, `tooltip?`, `type?`, `shape?`, `href?`, `target?`, `onClick?`, `badge?`, `className?` | Круглая (`shape="circle"`) или квадратная (`shape="square"`, с подписью) кнопка. Форма наследуется от `FloatButtonGroup`, если кнопка внутри группы |
| `FloatButtonGroup` | `shape?`, `trigger?`, `open?`, `defaultOpen?`, `onOpenChange?`, `icon?`, `closeIcon?`, `className?`, `children` | Кластер `FloatButton`, раскрывается по клику (`trigger="click"`, по умолчанию) или наведению (`trigger="hover"`) |
| `FloatButtonBackTop` | `visibilityHeight?` (400), `container?`, `icon?`, `onClick?`, `className?` | Появляется после прокрутки `container` (по умолчанию `window`) на `visibilityHeight` px, скроллит к началу |

`badge` — `{ count?, dot?, max? }`: точка или число в углу кнопки (`count > max` показывается как `${max}+`). `tooltip` рендерится через `Tooltip` — требует `TooltipProvider` в корне приложения.

### Использование

```tsx
import { FloatButton, FloatButtonGroup, FloatButtonBackTop } from '@nerva-start-up/ui';
import { MessageCircle, Plus, QrCode, Share2 } from 'lucide-react';

// Одиночная кнопка с тултипом и бейджем
<FloatButton
  icon={MessageCircle}
  tooltip="Написать в поддержку"
  badge={{ count: 3 }}
  className="fixed bottom-6 right-6"
/>

// Раскрывающаяся группа
<div className="fixed bottom-6 right-6">
  <FloatButtonGroup icon={Plus} trigger="click">
    <FloatButton icon={QrCode} tooltip="QR-код" />
    <FloatButton icon={Share2} tooltip="Поделиться" />
  </FloatButtonGroup>
</div>

// Кнопка «наверх», появляется после 400px скролла
<FloatButtonBackTop className="fixed bottom-6 right-6" />
```

---

## QRCode

QR-код на SVG. Кодирование происходит на клиенте (`qrcode-generator`, без сети). Поддерживает уровни коррекции ошибок, кастомные цвета и логотип по центру.

| prop | type | default | description |
|---|---|---|---|
| `value` | `string` | — | **required** — кодируемые данные (URL, текст, vCard…) |
| `size` | `number` | `200` | размер в пикселях (квадрат) |
| `level` | `'L' \| 'M' \| 'Q' \| 'H'` | `'M'` | коррекция ошибок: L=7%, M=15%, Q=25%, H=30% |
| `color` | `string` | `var(--text)` | цвет тёмных модулей |
| `background` | `string` | `var(--surface)` | цвет фона |
| `logo` | `React.ReactNode` | — | логотип по центру (например, иконка на цветном фоне) |
| `logoRatio` | `number` | `0.22` | доля от `size` под логотип. При `level="H"` можно поднять до ~0.3 |
| `className` | `string` | — | Tailwind-классы |

Если `value` не помещается в спецификацию QR на выбранном `level`, компонент рендерит fallback-заглушку с сообщением об ошибке вместо падения.

```tsx
import { QRCode } from '@nerva-start-up/ui';
import { GraduationCap } from 'lucide-react';

// Простой QR
<QRCode value="https://ksi-ed.uz" />

// С логотипом — level="H" даёт запас на перекрытие
<QRCode
  value="https://ksi-ed.uz/join?group=ib-101"
  level="H"
  size={200}
  logo={
    <div className="flex h-full w-full items-center justify-center bg-[var(--primary)]">
      <GraduationCap size={20} color="white" />
    </div>
  }
/>
```

---

## Rate

Рейтинг звёздами. Controlled/uncontrolled, поддерживает половину звезды, кастомную иконку и управление стрелками (`role="slider"`).

| prop | type | default | description |
|---|---|---|---|
| `value` | `number` | — | controlled значение (0..`count`, шаг 0.5 при `allowHalf`) |
| `defaultValue` | `number` | `0` | uncontrolled начальное значение |
| `onChange` | `(value: number) => void` | — | callback изменения |
| `count` | `number` | `5` | количество звёзд |
| `allowHalf` | `boolean` | `false` | разрешить выбор половины звезды |
| `allowClear` | `boolean` | `true` | повторный клик по текущему значению сбрасывает рейтинг в 0 |
| `readOnly` | `boolean` | `false` | только просмотр — без интерактивности, но не тускнеет как `disabled` |
| `disabled` | `boolean` | `false` | блокирует взаимодействие и тускнеет |
| `icon` | `React.ElementType` | `Star` (lucide) | иконка звезды |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | размер иконок (16 / 20 / 26px) |
| `label` | `string` | — | подпись над рейтингом |
| `hint` | `string` | — | подсказка под рейтингом (скрывается при `error`) |
| `error` | `string` | — | текст ошибки |
| `className` | `string` | — | Tailwind-классы |

```tsx
import { Rate } from '@nerva-start-up/ui';
import { useState } from 'react';

// Простой контролируемый рейтинг
const [value, setValue] = useState(0);
<Rate value={value} onChange={setValue} />

// Половина звезды + подпись
<Rate label="Оцените преподавателя" defaultValue={4.5} allowHalf />

// Только просмотр (например, средний рейтинг курса)
<Rate defaultValue={4.5} allowHalf readOnly />
```

---

## Image

Картинка с pulse-плейсхолдером во время загрузки, fallback-иконкой при ошибке и опциональным полноэкранным просмотром по клику (`preview`).

| prop | type | default | description |
|---|---|---|---|
| `src` | `string` | — | **required** — URL изображения |
| `alt` | `string` | — | **required** — альтернативный текст |
| `width` | `number \| string` | — | CSS-ширина контейнера |
| `height` | `number \| string` | — | CSS-высота контейнера |
| `fit` | `'cover' \| 'contain' \| 'fill' \| 'none' \| 'scale-down'` | `'cover'` | object-fit |
| `rounded` | `'none' \| 'sm' \| 'md' \| 'lg' \| 'full'` | `'md'` | border-radius |
| `fallback` | `React.ReactNode` | — | кастомный UI вместо иконки-заглушки при ошибке загрузки |
| `showSkeleton` | `boolean` | `true` | показывать pulse-плейсхолдер во время загрузки |
| `preview` | `boolean` | `false` | клик по изображению открывает полноэкранный просмотр (закрытие по Esc/клику на фон) |
| `loading` | `'lazy' \| 'eager'` | `'lazy'` | native `loading` |
| `onLoad` / `onError` | `() => void` | — | колбэки загрузки |
| `className` | `string` | — | Tailwind-классы |

```tsx
import { Image } from '@nerva-start-up/ui';

// Простое изображение с фиксированным размером
<Image src="/course-cover.jpg" alt="Обложка курса" width={320} height={200} />

// Галерея с полноэкранным просмотром по клику
<div className="grid grid-cols-4 gap-3">
  {photos.map((p) => (
    <Image key={p.id} src={p.url} alt={p.alt} width="100%" height={120} preview />
  ))}
</div>
```

---

## PdfViewer

Постраничный просмотр PDF на базе `pdf.js`: страница рендерится в `<canvas>` внутри скроллируемой области фиксированной высоты (зум не растягивает layout — скроллится содержимое), с навигацией по страницам и зумом. Полностью независим от `DocxViewer` — разные библиотеки, разный рендер-таргет (canvas vs. HTML).

`src` принимает либо уже загруженный на сервер файл (`string`-ссылка — резолвится через range-запросы самого pdf.js), либо локальный `File`/`Blob` (например, из `Dropzone`/`Upload` до отправки на сервер).

Навигация: кнопки вперёд/назад, клик по счётчику «N / M» открывает поле ввода номера страницы, стрелки `←`/`→` клавиатуры — когда область просмотра в фокусе (клик по ней или Tab).

| prop | type | default | description |
|---|---|---|---|
| `src` | `string \| File \| Blob` | — | **required** — ссылка на PDF или локальный файл |
| `page` / `defaultPage` | `number` | — / `1` | controlled/uncontrolled номер текущей страницы (с 1) |
| `onPageChange` | `(page: number) => void` | — | смена страницы (кнопки, ввод номера, стрелки клавиатуры) |
| `scale` / `defaultScale` | `number` | — / `1` | controlled/uncontrolled масштаб (`1` = 100%), зажат в `[0.5, 3]` |
| `onScaleChange` | `(scale: number) => void` | — | смена масштаба (кнопки зума) |
| `workerSrc` | `string` | jsdelivr CDN, версия под установленный `pdfjs-dist` | URL воркера pdf.js — переопределить для self-hosted/офлайн-сценариев |
| `toolbar` | `boolean` | `true` | встроенная панель навигации/зума. `false` — управление полностью через `page`/`onPageChange` снаружи |
| `height` | `number \| string` | `600` | высота видимой области — при зуме страница скроллится внутри неё |
| `onLoad` / `onError` | `() => void` / `(error: Error) => void` | — | колбэки загрузки |
| `className` | `string` | — | Tailwind-классы |

```tsx
import { PdfViewer } from '@nerva-start-up/ui';

// Файл с сервера
<PdfViewer src="/uploads/assignment.pdf" />

// Локальный File сразу после выбора в Dropzone, до отправки на сервер
function AssignmentPreview({ file }: { file: File }) {
  return <PdfViewer src={file} />;
}
```

---

## DocxViewer

Просмотр `.docx` с сохранением вёрстки/пагинации Word — рендерит через `docx-preview` напрямую в DOM-контейнер (страницы, шрифты, изображения — как в оригинале), а не через упрощённую HTML-конвертацию. Скроллируемая область фиксированной высоты — при зуме документ скроллится внутри неё, а не растягивает layout (тот же паттерн, что у `PdfViewer`).

`src` принимает те же варианты, что и `PdfViewer`: `string`-ссылку или локальный `File`/`Blob`.

Навигация: `docx-preview` рендерит документ постранично (`section` на страницу Word) — счётчик «N / M» в тулбаре обновляется автоматически по мере скролла (через `IntersectionObserver`, как индикатор текущей страницы в Google Docs), клик по нему открывает поле ввода номера страницы, кнопки зума масштабируют контент (`transform: scale`, скролл-область пересчитывается под реальный масштабированный размер).

| prop | type | default | description |
|---|---|---|---|
| `src` | `string \| File \| Blob` | — | **required** — ссылка на DOCX или локальный файл |
| `page` / `defaultPage` | `number` | — / `1` | controlled/uncontrolled номер видимой страницы — обновляется при скролле, задаёт скролл при изменении снаружи |
| `onPageChange` | `(page: number) => void` | — | смена страницы (скролл, кнопки, ввод номера) |
| `scale` / `defaultScale` | `number` | — / `1` | controlled/uncontrolled масштаб (`1` = 100%), зажат в `[0.5, 2]` |
| `onScaleChange` | `(scale: number) => void` | — | смена масштаба (кнопки зума) |
| `toolbar` | `boolean` | `true` | встроенная панель навигации/зума |
| `height` | `number \| string` | `600` | высота видимой области — при зуме документ скроллится внутри неё |
| `onLoad` / `onError` | `() => void` / `(error: Error) => void` | — | колбэки загрузки |
| `className` | `string` | — | Tailwind-классы контейнера |

```tsx
import { DocxViewer } from '@nerva-start-up/ui';

<DocxViewer src="/uploads/report.docx" />
```

---

## Descriptions

Список подписанных полей (label + значение) в сетке — для страниц просмотра сущности (профиль, курс, задание…).

### Компоненты

| Компонент | Props | Description |
|---|---|---|
| `Descriptions` | `title?`, `extra?`, `column?` (1\|2\|3\|4, default 2), `layout?` ('horizontal'\|'vertical', default 'horizontal'), `bordered?`, `size?` ('sm'\|'md', default 'md'), `className?`, `children` | Корень — задаёт сетку и передаёт `layout`/`bordered`/`size` в контекст |
| `DescriptionsItem` | `label`, `span?` (1\|2\|3\|4, default 1), `className?`, `children` | Один пункт — подпись + значение |

`layout="horizontal"` — label и значение в одной строке; `layout="vertical"` — label над значением (удобнее для длинных значений). `bordered` рисует рамку и разделители между пунктами (табличный вид). `span` растягивает пункт на несколько колонок сетки.

```tsx
import { Descriptions, DescriptionsItem, Badge } from '@nerva-start-up/ui';

<Descriptions title="Профиль студента" bordered column={2}>
  <DescriptionsItem label="ФИО">Иванов Иван Иванович</DescriptionsItem>
  <DescriptionsItem label="Группа">ИБ-101</DescriptionsItem>
  <DescriptionsItem label="Статус">
    <Badge variant="success">Активен</Badge>
  </DescriptionsItem>
  <DescriptionsItem label="Описание" span={2}>
    Курс охватывает основы криптографии и сетевую безопасность.
  </DescriptionsItem>
</Descriptions>
```

---

## Segmented

Сегментированный переключатель (iOS-стиль) — одно значение из нескольких опций, с анимированной "плавающей" подложкой активного пункта (Motion `layoutId`). В отличие от `Tabs` не привязан к контенту вкладок — просто controlled/uncontrolled значение.

| prop | type | default | description |
|---|---|---|---|
| `options` | `{ label: ReactNode; value: string; icon?: React.ElementType; disabled?: boolean }[]` | — | **required** — список опций |
| `value` | `string` | — | controlled значение |
| `defaultValue` | `string` | первая опция | uncontrolled начальное значение |
| `onChange` | `(value: string) => void` | — | callback изменения |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | размер |
| `block` | `boolean` | `false` | растянуть на всю ширину, опции равной ширины |
| `disabled` | `boolean` | `false` | блокирует весь контрол |
| `aria-label` | `string` | — | aria-label контейнера (важно для варианта только с иконками) |
| `className` | `string` | — | Tailwind-классы |

```tsx
import { Segmented } from '@nerva-start-up/ui';
import { LayoutList, Grid3x3 } from 'lucide-react';
import { useState } from 'react';

const [view, setView] = useState('list');
<Segmented
  value={view}
  onChange={setView}
  options={[
    { label: 'Список', value: 'list', icon: LayoutList },
    { label: 'Сетка', value: 'grid', icon: Grid3x3 },
  ]}
/>
```

---

## AI-чат: ChatInput / AttachmentChip / ToolCall

Три presentational-компонента для сборки интерфейса AI-чата. Ничего не знают про конкретного AI-провайдера, формат tool-calls или бизнес-логику диалога — только слоты, controlled/uncontrolled состояние и render-props. Собраны поверх уже существующих примитивов библиотеки (`Collapsible`, `CodeBlock`, `Badge`, `Spinner`, `Button`) — см. [ChatBubble](#chatbubble) / [TypingIndicator](#typingindicator) для пузырей сообщений.

### ChatInput

Композер: textarea с auto-grow по контенту (без фиксированной высоты), Enter — сабмит, Shift+Enter — перенос строки (IME-композиция не сабмитит промежуточный ввод). Controlled (`value`/`onChange`) или uncontrolled (`defaultValue`) — как остальные form-контролы библиотеки. `loading` подменяет кнопку отправки на кнопку остановки (`onStop`). Кнопка отправки задизейблена, если текст пустой/только пробелы, либо `disabled`/`loading`.

| prop | type | default | description |
|---|---|---|---|
| `value` | `string` | — | controlled текст |
| `defaultValue` | `string` | `''` | uncontrolled начальное значение |
| `onChange` | `(value: string) => void` | — | вызывается при каждом изменении текста |
| `onSubmit` | `(value: string) => void` | — | Enter без Shift / клик по кнопке отправки |
| `onStop` | `() => void` | — | клик по кнопке остановки при `loading` |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | плотность контрола |
| `disabled` | `boolean` | `false` | |
| `loading` | `boolean` | `false` | подменяет кнопку отправки на кнопку остановки |
| `maxLength` | `number` | — | нативный `maxLength` textarea |
| `placeholder` | `string` | — | |
| `topSlot` | `ReactNode` | — | слот над textarea — ряд `AttachmentChip` |
| `toolbarStart` | `ReactNode` | — | левая часть нижнего тулбара (вложения, модель…) |
| `toolbarEnd` | `ReactNode` | — | правая часть тулбара, перед кнопкой отправки |
| `submitIcon` / `stopIcon` | `ReactNode` | стрелка вверх / залитый квадрат | кастомные иконки кнопок |
| `submitLabel` / `stopLabel` | `string` | `'Отправить'` / `'Остановить'` | aria-label кнопок |
| `className` | `string` | — | Tailwind-классы |

### AttachmentChip

Превью прикреплённого файла/картинки для `topSlot` у `ChatInput`. Миниатюра — картинка, если `type` начинается с `image/` и передан `previewUrl`, иначе дефолтная file-иконка (переиспользует `getFileIconConfig` из `FileCard`). Под именем файла — размер (переиспользует `formatFileSize` из `Upload`), либо процент загрузки, либо текст ошибки — в зависимости от `status`.

| prop | type | default | description |
|---|---|---|---|
| `name` | `string` | — | **required** — имя файла |
| `size` | `number` | — | байты, форматируется автоматически (Б/КБ/МБ) |
| `type` | `string` | — | MIME-тип |
| `previewUrl` | `string` | — | URL превью-картинки |
| `status` | `'idle' \| 'uploading' \| 'done' \| 'error'` | `'idle'` | `uploading` — спиннер поверх миниатюры, `error` — красная обводка |
| `progress` | `number` | — | 0..100, вместо размера при `status="uploading"` |
| `error` | `string` | — | вместо размера при `status="error"` |
| `onRemove` | `() => void` | — | если передан — показывает кнопку удаления |
| `removeLabel` | `string` | `'Удалить'` | aria-label кнопки удаления |
| `className` | `string` | — | |

### ToolCall

Карточка вызова tool/function-call. Заголовок всегда виден: иконка инструмента (по умолчанию гаечный ключ), имя моноширинным шрифтом, статус-индикатор (`running` — спиннер вместо бейджа, иначе `Badge` — pending=нейтральный/success=зелёный/error=красный), шеврон. Раскрывающееся тело — `Collapsible` (без анимации с нуля): Input форматируется как JSON через `CodeBlock`, Output — тоже JSON по умолчанию либо кастомный `renderOutput`, Error — вместо output при `status="error"`. Если нечего раскрывать (нет input/output/error) — заголовок не кликабелен, шеврон скрыт.

| prop | type | default | description |
|---|---|---|---|
| `name` | `string` | — | **required** — имя инструмента/функции |
| `status` | `'pending' \| 'running' \| 'success' \| 'error'` | `'pending'` | |
| `input` | `unknown` | — | аргументы — JSON.stringify(x, null, 2), если не строка |
| `output` | `unknown` | — | результат — то же самое, если нет `renderOutput` |
| `renderOutput` | `(output: unknown) => ReactNode` | — | кастомный рендер результата вместо JSON |
| `error` | `string` | — | вместо output при `status="error"` |
| `icon` | `ReactNode` | гаечный ключ | иконка слева от имени |
| `defaultExpanded` | `boolean` | — | uncontrolled начальное раскрытие |
| `expanded` | `boolean` | — | controlled раскрытие |
| `onExpandedChange` | `(expanded: boolean) => void` | — | |
| `className` | `string` | — | |

### Использование — композер с вложениями и tool-call внутри сообщения

```tsx
import {
  AttachmentChip,
  Button,
  ChatBubble,
  ChatInput,
  ToolCall,
} from '@nerva-start-up/ui';
import { Paperclip } from 'lucide-react';
import { useState } from 'react';

function ChatDemo() {
  const [value, setValue] = useState('');
  const [attachments, setAttachments] = useState([
    { id: '1', name: 'network-scan.pcap', size: 412_000, status: 'done' as const },
  ]);

  return (
    <div className="flex flex-col gap-3 max-w-xl">
      <ChatBubble sender="user" content="Проверь этот .pcap на подозрительный трафик" />

      <ToolCall
        name="analyze_pcap"
        status="success"
        input={{ file: 'network-scan.pcap', filters: ['dns', 'http'] }}
        output={{ suspicious_hosts: ['185.220.101.7'], anomalies: 3 }}
      />

      <ChatBubble
        sender="ai"
        name="Нора"
        content="Нашла 3 аномалии, один хост похож на выходной узел Tor. Разобрать по пакетам?"
      />

      <ChatInput
        value={value}
        onChange={setValue}
        onSubmit={(v) => {
          sendMessage(v);
          setValue('');
        }}
        topSlot={attachments.map((a) => (
          <AttachmentChip
            key={a.id}
            name={a.name}
            size={a.size}
            status={a.status}
            onRemove={() => setAttachments((prev) => prev.filter((x) => x.id !== a.id))}
          />
        ))}
        toolbarStart={
          <Button type="button" variant="ghost" size="icon" aria-label="Прикрепить файл">
            <Paperclip size={16} />
          </Button>
        }
        placeholder="Ответьте Норе…"
      />
    </div>
  );
}
```
