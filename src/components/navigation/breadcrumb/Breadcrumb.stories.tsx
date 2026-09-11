import type { Story } from "@ladle/react";
import { BookOpen, Home, LayoutDashboard, Slash, Users } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./Breadcrumb";

export default { title: "Components / Navigation / Breadcrumb" };

/* ── Basic ──────────────────────────────────────────────── */
export const Basic: Story = () => (
  <div className="p-6">
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Главная</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Библиотека</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Лекция 01 — Основы ИБ</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  </div>
);

/* ── With icons ─────────────────────────────────────────── */
export const WithIcons: Story = () => (
  <div className="p-6">
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="#" className="flex items-center gap-1.5">
            <Home size={14} />
            Главная
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="#" className="flex items-center gap-1.5">
            <LayoutDashboard size={14} />
            Дашборд
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="#" className="flex items-center gap-1.5">
            <BookOpen size={14} />
            Материалы
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Лекция 01</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  </div>
);

/* ── Custom separator ───────────────────────────────────── */
export const CustomSeparator: Story = () => (
  <div className="flex flex-col gap-6 p-6">
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Главная</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <Slash size={12} className="rotate-[-20deg]" />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Задания</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <Slash size={12} className="rotate-[-20deg]" />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbPage>Лаб. работа №3</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>

    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Главная</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>·</BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Рейтинг</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>·</BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbPage>Иванов А.</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  </div>
);

/* ── With ellipsis ──────────────────────────────────────── */
export const WithEllipsis: Story = () => (
  <div className="p-6">
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Главная</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbEllipsis />
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Материалы</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Лекция 01 — Основы ИБ</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  </div>
);

/* ── Admin panel ────────────────────────────────────────── */
export const AdminPanel: Story = () => (
  <div className="flex flex-col gap-4 p-6">
    {[
      ["Главная", "Администратор", "Пользователи"],
      ["Главная", "Администратор", "Группы", "2-Б"],
      ["Главная", "Администратор", "Расписание", "Понедельник"],
    ].map((crumbs) => (
      <Breadcrumb key={crumbs.join()}>
        <BreadcrumbList>
          {crumbs.map((crumb, i) => (
            <BreadcrumbItem key={crumb}>
              {i < crumbs.length - 1 ? (
                <>
                  <BreadcrumbLink href="#" className={i === 0 ? "flex items-center gap-1.5" : ""}>
                    {i === 0 && <Home size={13} />}
                    {crumb}
                  </BreadcrumbLink>
                  <BreadcrumbSeparator />
                </>
              ) : (
                <BreadcrumbPage>{crumb}</BreadcrumbPage>
              )}
            </BreadcrumbItem>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    ))}
  </div>
);

/* ── Long path ──────────────────────────────────────────── */
export const LongPath: Story = () => (
  <div className="p-6 max-w-md">
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="#" className="flex items-center gap-1.5">
            <Users size={13} />
            Группы
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="#">2-Б</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbEllipsis />
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Лаб. работа №3 — RBAC и модели доступа</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  </div>
);
