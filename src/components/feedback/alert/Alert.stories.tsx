import type { Story } from "@ladle/react";
import { ShieldAlert } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Button } from "../../actions/button/Button";
import { Alert } from "./Alert";
import { AlertContent } from "./AlertContent";
import { AlertDescription } from "./AlertDescription";
import { AlertDismiss } from "./AlertDismiss";
import { AlertIcon } from "./AlertIcon";
import { AlertTitle } from "./AlertTitle";

export default { title: "Components / Feedback / Alert" };

/* ── Все варианты ───────────────────────────────────────── */
export const Variants: Story = () => (
  <div className="flex flex-col gap-3 max-w-lg">
    <Alert variant="info">
      <AlertIcon />
      <AlertContent>
        <AlertTitle>Новая версия доступна</AlertTitle>
        <AlertDescription>Обновите платформу чтобы получить последние улучшения.</AlertDescription>
      </AlertContent>
    </Alert>

    <Alert variant="success">
      <AlertIcon />
      <AlertContent>
        <AlertTitle>Задание отправлено</AlertTitle>
        <AlertDescription>
          Преподаватель получит уведомление и проверит в течение 48 часов.
        </AlertDescription>
      </AlertContent>
    </Alert>

    <Alert variant="warning">
      <AlertIcon />
      <AlertContent>
        <AlertTitle>Дедлайн через 2 часа</AlertTitle>
        <AlertDescription>
          Лабораторная №4 — XSS-атаки. Не забудь отправить решение.
        </AlertDescription>
      </AlertContent>
    </Alert>

    <Alert variant="error">
      <AlertIcon />
      <AlertContent>
        <AlertTitle>Ошибка авторизации</AlertTitle>
        <AlertDescription>Неверный email или пароль. Попробуй ещё раз.</AlertDescription>
      </AlertContent>
    </Alert>
  </div>
);

/* ── С кнопкой dismiss ──────────────────────────────────── */
export const Dismissible: Story = () => {
  const [alerts, setAlerts] = useState({
    info: true,
    success: true,
    warning: true,
    error: true,
  });

  const dismiss = (key: keyof typeof alerts) => setAlerts((prev) => ({ ...prev, [key]: false }));

  return (
    <div className="flex flex-col gap-3 max-w-lg">
      <AnimatePresence>
        {alerts.info && (
          <motion.div
            key="info"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, height: 0, marginBottom: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Alert variant="info" onDismiss={() => dismiss("info")}>
              <AlertIcon />
              <AlertContent>
                <AlertTitle>Совет</AlertTitle>
                <AlertDescription>Нажми × чтобы скрыть уведомление.</AlertDescription>
              </AlertContent>
              <AlertDismiss />
            </Alert>
          </motion.div>
        )}

        {alerts.success && (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Alert variant="success" onDismiss={() => dismiss("success")}>
              <AlertIcon />
              <AlertContent>
                <AlertTitle>Материал одобрен</AlertTitle>
                <AlertDescription>+10 очков KSI Score добавлены на твой счёт.</AlertDescription>
              </AlertContent>
              <AlertDismiss />
            </Alert>
          </motion.div>
        )}

        {alerts.warning && (
          <motion.div
            key="warning"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Alert variant="warning" onDismiss={() => dismiss("warning")}>
              <AlertIcon />
              <AlertContent>
                <AlertTitle>Посещаемость падает</AlertTitle>
                <AlertDescription>За последние 2 недели пропущено 3 занятия.</AlertDescription>
              </AlertContent>
              <AlertDismiss />
            </Alert>
          </motion.div>
        )}

        {alerts.error && (
          <motion.div
            key="error"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Alert variant="error" onDismiss={() => dismiss("error")}>
              <AlertIcon />
              <AlertContent>
                <AlertTitle>Файл отклонён</AlertTitle>
                <AlertDescription>
                  Формат не поддерживается. Загрузи PDF, DOCX или MD.
                </AlertDescription>
              </AlertContent>
              <AlertDismiss />
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>

      {Object.values(alerts).every((v) => !v) && (
        <Button
          variant="outline"
          onClick={() => setAlerts({ info: true, success: true, warning: true, error: true })}
        >
          Показать снова
        </Button>
      )}
    </div>
  );
};

/* ── Только заголовок (без описания) ───────────────────── */
export const TitleOnly: Story = () => (
  <div className="flex flex-col gap-3 max-w-lg">
    {(["info", "success", "warning", "error"] as const).map((variant) => (
      <Alert key={variant} variant={variant}>
        <AlertIcon />
        <AlertContent>
          <AlertTitle>
            {
              {
                info: "Информация",
                success: "Успешно",
                warning: "Предупреждение",
                error: "Ошибка",
              }[variant]
            }
          </AlertTitle>
        </AlertContent>
      </Alert>
    ))}
  </div>
);

/* ── Кастомная иконка ───────────────────────────────────── */
export const CustomIcon: Story = () => (
  <div className="flex flex-col gap-3 max-w-lg">
    <Alert variant="error">
      <AlertIcon icon={ShieldAlert} size={20} />
      <AlertContent>
        <AlertTitle>Угроза безопасности</AlertTitle>
        <AlertDescription>
          Обнаружена попытка SQL-инъекции. Запрос заблокирован автоматически.
        </AlertDescription>
      </AlertContent>
    </Alert>
  </div>
);
