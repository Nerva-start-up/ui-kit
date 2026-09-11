import type { Story } from "@ladle/react";
import { ChatBubble } from "./ChatBubble";
import { TypingIndicator as TypingIndicatorComponent } from "./TypingIndicator";

export default { title: "Components / Data Display / Chat" };

export const Bubbles: Story = () => (
  <div className="flex flex-col gap-3 max-w-sm">
    <ChatBubble sender="user" content="Привет Нора! Объясни, что такое XSS-атака?" />
    <ChatBubble
      sender="ai"
      name="Нора"
      content="XSS (Cross-Site Scripting) — это уязвимость, при которой злоумышленник внедряет вредоносный скрипт в веб-страницу, просматриваемую другими пользователями."
    />
    <ChatBubble sender="user" content="А как защититься?" />
    <ChatBubble
      sender="ai"
      name="Нора"
      content="Основные методы защиты:\n• Экранирование пользовательского ввода\n• Content Security Policy (CSP)\n• Заголовок X-XSS-Protection\n• Валидация на сервере"
    />
  </div>
);

export const WithTimestamps: Story = () => (
  <div className="flex flex-col gap-3 max-w-sm">
    <ChatBubble sender="user" content="Что такое JWT?" timestamp="14:32" />
    <ChatBubble
      sender="ai"
      name="Нора"
      content="JWT (JSON Web Token) — это компактный, URL-безопасный способ представления утверждений между двумя сторонами в формате JSON."
      timestamp="14:32"
    />
  </div>
);

export const TypingIndicator: Story = () => (
  <div className="flex flex-col gap-3 max-w-sm">
    <ChatBubble sender="user" content="Расскажи про Bell-LaPadula" />
    <TypingIndicatorComponent name="Нора" />
  </div>
);

export const TypingOnly: Story = () => (
  <div className="flex flex-col gap-2">
    <TypingIndicatorComponent />
    <TypingIndicatorComponent name="Нора печатает..." />
  </div>
);
