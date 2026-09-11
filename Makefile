.PHONY: ui-rebuild ui-storybook client-dev admin-dev docs help

# Список доступных команд
help:
	@echo "make rebuild  — пересобрать @nerva-start-up/ui (bun run build)"
	@echo "make dev      — запустить Ladle (storybook) → http://localhost:61000"
	@echo "make docs     — сгенерировать docs/components.json из JSDoc"
	@echo "make ci       — typecheck + lint + format + docs:check + test + build"

# Пересобрать @nerva-start-up/ui и перезапустить client dev-сервер
rebuild:
	bun run build

# Запустить Ladle (storybook для @nerva-start-up/ui) → http://localhost:61000
dev:
	bun run storybook

# Сгенерировать docs/components.json из JSDoc (AI-facing манифест компонентов)
docs:
	bun run docs:generate


ci:
	bun run typecheck
	bun run lint:fix
	bun run format
	bun run docs:check
	bun run test
	bun run build
