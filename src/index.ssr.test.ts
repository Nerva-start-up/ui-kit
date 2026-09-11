import { describe, expect, it } from "vitest";

/**
 * Регресс-тест на SSR-совместимость: пакет должен грузиться в чистом Node-окружении
 * без DOM (Cloudflare Workers/workerd, Node SSR без jsdom/happy-dom и т.п.), даже если
 * ни один компонент кита реально не рендерится. По умолчанию vitest в этом проекте
 * использует node-окружение (см. `// @vitest-environment happy-dom` в отдельных тестах,
 * которым явно нужен DOM) — этот файл намеренно НЕ переопределяет окружение.
 *
 * Ловит любой статический top-level импорт зависимости, которая на уровне модуля
 * обращается к браузерным глобалам (DOMMatrix, window, document и т.п.) — такая
 * зависимость обязана быть lazy (dynamic import), выполняемым только когда компонент
 * реально используется в браузере.
 */
describe("package entry point is SSR-safe", () => {
  it("imports without throwing in an environment with no DOM globals", async () => {
    await expect(import("./index")).resolves.toBeDefined();
  });
});
