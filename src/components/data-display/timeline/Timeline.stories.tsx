import type { Story } from "@ladle/react";
import {
  AlertTriangle,
  BookOpen,
  CheckCircle2,
  Clock,
  LogIn,
  MessageSquare,
  Trophy,
  Upload,
  XCircle,
} from "lucide-react";
import { Badge } from "../badge/Badge";
import { Timeline } from "./Timeline";
import { TimelineContent } from "./TimelineContent";
import { TimelineDescription } from "./TimelineDescription";
import { TimelineIcon } from "./TimelineIcon";
import { TimelineItem } from "./TimelineItem";
import { TimelineMeta } from "./TimelineMeta";
import { TimelineTitle } from "./TimelineTitle";

export default { title: "Components / Data Display / Timeline" };

/* ── История оценок ─────────────────────────────────────── */
export const GradeHistory: Story = () => (
  <div className="max-w-sm">
    <Timeline>
      <TimelineItem variant="success">
        <TimelineIcon icon={CheckCircle2} />
        <TimelineContent>
          <TimelineTitle>Лабораторная №3 — XSS-атаки</TimelineTitle>
          <TimelineDescription>Преподаватель выставил оценку</TimelineDescription>
          <TimelineMeta>
            2 часа назад
            <Badge variant="success">85 / 100</Badge>
          </TimelineMeta>
        </TimelineContent>
      </TimelineItem>

      <TimelineItem variant="error">
        <TimelineIcon icon={XCircle} />
        <TimelineContent>
          <TimelineTitle>Лабораторная №2 — SQL-инъекции</TimelineTitle>
          <TimelineDescription>Работа отправлена на доработку</TimelineDescription>
          <TimelineMeta>
            вчера
            <Badge variant="error">42 / 100</Badge>
          </TimelineMeta>
        </TimelineContent>
      </TimelineItem>

      <TimelineItem variant="success">
        <TimelineIcon icon={CheckCircle2} />
        <TimelineContent>
          <TimelineTitle>Лабораторная №1 — Модели доступа</TimelineTitle>
          <TimelineDescription>Принята с первой попытки</TimelineDescription>
          <TimelineMeta>
            3 дня назад
            <Badge variant="success">92 / 100</Badge>
          </TimelineMeta>
        </TimelineContent>
      </TimelineItem>

      <TimelineItem variant="info">
        <TimelineIcon icon={BookOpen} />
        <TimelineContent>
          <TimelineTitle>Квиз по модулю 1</TimelineTitle>
          <TimelineDescription>8 из 10 верных ответов</TimelineDescription>
          <TimelineMeta>
            неделю назад
            <Badge variant="info">+20 KSI</Badge>
          </TimelineMeta>
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  </div>
);

/* ── Активность студента ────────────────────────────────── */
export const StudentActivity: Story = () => (
  <div className="max-w-sm">
    <Timeline>
      <TimelineItem variant="primary">
        <TimelineIcon icon={Trophy} />
        <TimelineContent>
          <TimelineTitle>Поднялся на 2 позиции</TimelineTitle>
          <TimelineDescription>Теперь занимает #3 в рейтинге группы ИБ-101</TimelineDescription>
          <TimelineMeta>5 минут назад</TimelineMeta>
        </TimelineContent>
      </TimelineItem>

      <TimelineItem variant="success">
        <TimelineIcon icon={Upload} />
        <TimelineContent>
          <TimelineTitle>Материал одобрен Норой</TimelineTitle>
          <TimelineDescription>«Введение в PKI и сертификаты.pdf»</TimelineDescription>
          <TimelineMeta>
            1 час назад
            <Badge variant="success">+10 KSI</Badge>
          </TimelineMeta>
        </TimelineContent>
      </TimelineItem>

      <TimelineItem variant="info">
        <TimelineIcon icon={MessageSquare} />
        <TimelineContent>
          <TimelineTitle>Сессия с Норой AI</TimelineTitle>
          <TimelineDescription>
            Тема: RSA и ассиметричное шифрование — 12 сообщений
          </TimelineDescription>
          <TimelineMeta>
            3 часа назад
            <Badge variant="info">+5 KSI</Badge>
          </TimelineMeta>
        </TimelineContent>
      </TimelineItem>

      <TimelineItem variant="warning">
        <TimelineIcon icon={AlertTriangle} />
        <TimelineContent>
          <TimelineTitle>Пропущено занятие</TimelineTitle>
          <TimelineDescription>Сетевые протоколы и VPN — 14:00</TimelineDescription>
          <TimelineMeta>вчера</TimelineMeta>
        </TimelineContent>
      </TimelineItem>

      <TimelineItem variant="default">
        <TimelineIcon icon={LogIn} />
        <TimelineContent>
          <TimelineTitle>Вход в платформу</TimelineTitle>
          <TimelineMeta>вчера · 09:42</TimelineMeta>
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  </div>
);

/* ── С аватарами ────────────────────────────────────────── */
export const WithAvatars: Story = () => (
  <div className="max-w-sm">
    <Timeline>
      <TimelineItem variant="success">
        <TimelineIcon avatar="https://i.pravatar.cc/32?img=3" />
        <TimelineContent>
          <TimelineTitle>Преподаватель принял работу</TimelineTitle>
          <TimelineDescription>Иванов И.И. выставил 90/100 за Лабораторную №4</TimelineDescription>
          <TimelineMeta>2 часа назад</TimelineMeta>
        </TimelineContent>
      </TimelineItem>

      <TimelineItem variant="info">
        <TimelineIcon avatar="https://i.pravatar.cc/32?img=5" />
        <TimelineContent>
          <TimelineTitle>Камола оставила комментарий</TimelineTitle>
          <TimelineDescription>
            «Посмотри мой подход к задаче 3, там интересное решение»
          </TimelineDescription>
          <TimelineMeta>4 часа назад</TimelineMeta>
        </TimelineContent>
      </TimelineItem>

      <TimelineItem variant="default">
        <TimelineIcon avatar="https://i.pravatar.cc/32?img=1" />
        <TimelineContent>
          <TimelineTitle>Алишер загрузил материал</TimelineTitle>
          <TimelineDescription>
            «Шпаргалка по Bell-LaPadula.md» ждёт проверки Норой
          </TimelineDescription>
          <TimelineMeta>вчера</TimelineMeta>
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  </div>
);

/* ── Точки (без иконок) ─────────────────────────────────── */
export const Dots: Story = () => (
  <div className="max-w-xs">
    <Timeline>
      {(
        [
          { variant: "primary", title: "Аккаунт создан", time: "15 июня 2026" },
          { variant: "success", title: "Первое задание сдано", time: "18 июня" },
          { variant: "success", title: "Квиз пройден", time: "20 июня" },
          { variant: "warning", title: "Дедлайн пропущен", time: "22 июня" },
          { variant: "primary", title: "Вошёл в топ-10", time: "сегодня" },
        ] as const
      ).map((item, i) => (
        <TimelineItem key={i} variant={item.variant}>
          <TimelineIcon />
          <TimelineContent>
            <TimelineTitle>{item.title}</TimelineTitle>
            <TimelineMeta>{item.time}</TimelineMeta>
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  </div>
);

/* ── Pending последний элемент ──────────────────────────── */
export const WithPending: Story = () => (
  <div className="max-w-sm">
    <Timeline>
      <TimelineItem variant="success">
        <TimelineIcon icon={CheckCircle2} />
        <TimelineContent>
          <TimelineTitle>Задание отправлено</TimelineTitle>
          <TimelineMeta>вчера · 23:55</TimelineMeta>
        </TimelineContent>
      </TimelineItem>

      <TimelineItem variant="warning">
        <TimelineIcon icon={Clock} />
        <TimelineContent>
          <TimelineTitle>Ожидает проверки</TimelineTitle>
          <TimelineDescription>Преподаватель ещё не открыл работу</TimelineDescription>
          <TimelineMeta>сейчас</TimelineMeta>
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  </div>
);
