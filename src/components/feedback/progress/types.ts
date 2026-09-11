export type ProgressColor = "primary" | "success" | "info";

/**
 * `active` — бегущая световая полоса поверх заливки (для длительных фоновых операций);
 * `success`/`error` — принудительный цвет и иконка вместо значения.
 */
export type ProgressStatus = "normal" | "active" | "success" | "error";
