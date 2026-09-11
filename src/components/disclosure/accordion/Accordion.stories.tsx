import type { Story } from "@ladle/react";
import { BookOpen, HelpCircle, Lock, Network, Settings, Shield, ShieldAlert } from "lucide-react";
import { cn } from "../../../lib/cn";
import { Badge } from "../../data-display/badge/Badge";
import { Text } from "../../typography/Text";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./Accordion";

export default { title: "Components / Disclosure / Accordion" };

/* ── Single (default) ───────────────────────────────────── */
export const Single: Story = () => (
  <div className="max-w-lg mx-auto py-8 px-4">
    <Accordion type="single" collapsible defaultValue="item-1">
      <AccordionItem value="item-1">
        <AccordionTrigger>Что такое KSI Score?</AccordionTrigger>
        <AccordionContent>
          KSI Score — взвешенный балл активности студента: 40% академика, 25% активность, 20% вклад,
          15% взаимодействие с Норой.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Как получить доступ к материалам?</AccordionTrigger>
        <AccordionContent>
          Материалы доступны в разделе «Библиотека». Загруженные файлы проходят проверку Норой —
          после одобрения начисляются +10 очков.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Как работает Нора AI?</AccordionTrigger>
        <AccordionContent>
          Нора — AI-тьютор по кибербезопасности. Использует RAG по загруженным материалам курса,
          ведёт профиль освоения тем и рекомендует следующий шаг.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  </div>
);

/* ── Multiple (несколько открытых) ─────────────────────── */
export const Multiple: Story = () => (
  <div className="max-w-lg mx-auto py-8 px-4">
    <Accordion type="multiple" defaultValue={["rbac", "jwt"]}>
      <AccordionItem value="rbac">
        <AccordionTrigger icon={<Shield size={14} />}>RBAC</AccordionTrigger>
        <AccordionContent>
          Role-Based Access Control — модель управления доступом на основе ролей. В KSI:{" "}
          <strong>student</strong>, <strong>teacher</strong>, <strong>admin</strong>. Каждый маршрут
          API проверяет роль через JWT.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="jwt">
        <AccordionTrigger icon={<Lock size={14} />}>JWT</AccordionTrigger>
        <AccordionContent>
          JSON Web Token (RFC 7519). Состоит из header.payload.signature. KSI использует HS256, срок
          действия — 7 дней. Хранится в localStorage.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="xss">
        <AccordionTrigger icon={<ShieldAlert size={14} />}>XSS</AccordionTrigger>
        <AccordionContent>
          Cross-Site Scripting — инъекция вредоносного JS в страницу. Защита: экранирование вывода,
          Content-Security-Policy, HttpOnly cookies.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="network">
        <AccordionTrigger icon={<Network size={14} />}>OSI Model</AccordionTrigger>
        <AccordionContent>
          7 уровней: Physical, Data Link, Network, Transport, Session, Presentation, Application.
          «All People Seem To Need Data Processing».
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  </div>
);

/* ── FAQ (КСИ) ──────────────────────────────────────────── */
export const FAQ: Story = () => {
  const items = [
    {
      value: "attendance",
      question: "Как отмечается посещаемость?",
      answer:
        "Преподаватель отмечает посещаемость через панель учителя. Каждое занятие — +5 очков активности. QR-система планируется.",
      badge: null,
    },
    {
      value: "assignments",
      question: "Когда открываются задания?",
      answer:
        "Задание появляется сразу после создания преподавателем. Дедлайн устанавливается в настройках задания.",
      badge: "new",
    },
    {
      value: "leaderboard",
      question: "Как часто обновляется рейтинг?",
      answer:
        "Рейтинг обновляется в реальном времени после каждого события: посещение, сдача задания, загрузка материала, чат с Норой.",
      badge: null,
    },
    {
      value: "nora",
      question: "Нора отвечает только по учёбе?",
      answer:
        "Нора специализируется на кибербезопасности и темах курса. На вопросы не по теме отвечает кратко и направляет к учебным материалам.",
      badge: null,
    },
    {
      value: "upload",
      question: "Какие форматы файлов можно загружать?",
      answer:
        "PDF, DOCX, TXT, PNG, JPG, WEBP, MD. Максимальный размер — 20 МБ. После загрузки Нора проверяет и оценивает материал.",
      badge: null,
    },
  ];

  return (
    <div className="max-w-lg mx-auto py-8 px-4">
      <div className="flex items-center gap-2 mb-6">
        <HelpCircle size={18} className="text-[var(--primary)]" />
        <Text as="h2" size="md" weight="semibold">
          Частые вопросы
        </Text>
      </div>
      <Accordion type="single" collapsible>
        {items.map(({ value, question, answer, badge }) => (
          <AccordionItem key={value} value={value}>
            <AccordionTrigger>
              <span className="flex items-center gap-2">
                {question}
                {badge && <Badge variant="orange">{badge}</Badge>}
              </span>
            </AccordionTrigger>
            <AccordionContent>{answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

/* ── Curriculum (модули курса) ──────────────────────────── */
export const Curriculum: Story = () => {
  const modules = [
    {
      id: "m1",
      title: "Модуль 1 — Основы ИБ",
      icon: <BookOpen size={14} />,
      topics: ["Введение в кибербезопасность", "Модели угроз", "CIA Triad", "RBAC / DAC / MAC"],
      done: 3,
    },
    {
      id: "m2",
      title: "Модуль 2 — Криптография",
      icon: <Lock size={14} />,
      topics: [
        "Симметричное шифрование",
        "Асимметричное шифрование (RSA)",
        "Хэш-функции",
        "JWT / TLS",
      ],
      done: 1,
    },
    {
      id: "m3",
      title: "Модуль 3 — Веб-безопасность",
      icon: <ShieldAlert size={14} />,
      topics: ["XSS", "SQL-инъекции", "CSRF", "CORS и политика одного источника"],
      done: 0,
    },
    {
      id: "m4",
      title: "Модуль 4 — Сети",
      icon: <Network size={14} />,
      topics: ["Модель OSI", "TCP/IP", "DNS / VPN", "Брандмауэры и IDS"],
      done: 0,
    },
  ];

  return (
    <div className="max-w-lg mx-auto py-8 px-4">
      <Accordion type="single" collapsible defaultValue="m1">
        {modules.map((mod) => (
          <AccordionItem key={mod.id} value={mod.id}>
            <AccordionTrigger icon={mod.icon}>
              <span className="flex items-center justify-between flex-1 pr-2">
                {mod.title}
                <Text as="span" size="xs" variant="muted">
                  {mod.done}/{mod.topics.length}
                </Text>
              </span>
            </AccordionTrigger>
            <AccordionContent>
              <ul className="flex flex-col gap-2">
                {mod.topics.map((topic, i) => (
                  <li key={topic} className="flex items-center gap-2 text-xs">
                    <span
                      className={cn(
                        "w-4 h-4 rounded-full border flex items-center justify-center text-[10px] shrink-0",
                        i < mod.done
                          ? "border-[var(--success)] bg-[rgba(74,222,128,0.1)] text-[var(--success)]"
                          : "border-[var(--border)] text-[var(--text-muted)]"
                      )}
                    >
                      {i < mod.done ? "✓" : i + 1}
                    </span>
                    <Text
                      as="span"
                      size="xs"
                      variant={i < mod.done ? "muted" : "default"}
                      className={i < mod.done ? "line-through" : undefined}
                    >
                      {topic}
                    </Text>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

/* ── Settings sections ──────────────────────────────────── */
export const SettingsSections: Story = () => (
  <div className="max-w-lg mx-auto py-8 px-4">
    <Accordion type="multiple" defaultValue={["profile"]}>
      <AccordionItem value="profile">
        <AccordionTrigger icon={<Settings size={14} />}>Профиль</AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-col gap-3">
            {[
              ["Имя", "Иванов Алексей"],
              ["Email", "freyzan@ksi.uz"],
              ["Группа", "2-Б"],
            ].map(([label, val]) => (
              <div key={label} className="flex justify-between text-xs">
                <Text as="span" size="xs" variant="muted">
                  {label}
                </Text>
                <Text as="span" size="xs">
                  {val}
                </Text>
              </div>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="security">
        <AccordionTrigger icon={<Shield size={14} />}>Безопасность</AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-col gap-2">
            <Text size="xs" variant="muted">
              Последний вход: сегодня, 09:42
            </Text>
            <Text size="xs" variant="muted">
              Токен действителен ещё 6 дней
            </Text>
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="notifications">
        <AccordionTrigger icon={<HelpCircle size={14} />}>Уведомления</AccordionTrigger>
        <AccordionContent>
          <Text size="xs">Настройки уведомлений появятся в следующей версии.</Text>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  </div>
);
