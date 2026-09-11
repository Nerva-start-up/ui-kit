import type { Story } from "@ladle/react";
import { CodeBlock } from "./CodeBlock";
import { CodeBlockContent } from "./CodeBlockContent";
import { CodeBlockHeader } from "./CodeBlockHeader";

export default { title: "Components / Data Display / CodeBlock" };

const pythonCode = `\
import hashlib, itertools

def crack_md5(hash_target: str, charset: str, max_len: int) -> str | None:
    for length in range(1, max_len + 1):
        for combo in itertools.product(charset, repeat=length):
            word = "".join(combo)
            if hashlib.md5(word.encode()).hexdigest() == hash_target:
                return word
    return None

result = crack_md5("5f4dcc3b5aa765d61d8327deb882cf99", "abc123", 8)
print(f"Пароль: {result}")`;

const sqlCode = `\
-- SQL-инъекция: обход авторизации
SELECT *
FROM users
WHERE username = 'admin' --'
  AND password = 'anything';

-- Безопасный вариант — параметризованный запрос
SELECT * FROM users
WHERE username = $1 AND password = $2;`;

const bashCode = `\
#!/bin/bash
# Сканирование открытых портов
TARGET="192.168.1.1"

for port in {1..1024}; do
  (echo >/dev/tcp/$TARGET/$port) 2>/dev/null && \\
    echo "Port $port: OPEN"
done`;

const jsonCode = `\
{
  "alg": "HS256",
  "typ": "JWT"
}
{
  "sub": "1234567890",
  "role": "admin",
  "iat": 1516239022,
  "exp": 1516239022
}`;

const jsCode = `\
// XSS через innerHTML — уязвимо
document.getElementById('output').innerHTML = userInput;

// Безопасный вариант
document.getElementById('output').textContent = userInput;

// Или через DOMPurify
import DOMPurify from 'dompurify';
element.innerHTML = DOMPurify.sanitize(userInput);`;

/* ── Python — брутфорс ─────────────────────────────────── */
export const Python: Story = () => (
  <CodeBlock code={pythonCode} lang="python">
    <CodeBlockHeader title="brute_md5.py" />
    <CodeBlockContent showLineNumbers />
  </CodeBlock>
);

/* ── SQL-инъекция ──────────────────────────────────────── */
export const SQL: Story = () => (
  <CodeBlock code={sqlCode} lang="sql">
    <CodeBlockHeader title="injection.sql" />
    <CodeBlockContent showLineNumbers />
  </CodeBlock>
);

/* ── Bash-скрипт ───────────────────────────────────────── */
export const Bash: Story = () => (
  <CodeBlock code={bashCode} lang="bash">
    <CodeBlockHeader title="port_scan.sh" />
    <CodeBlockContent showLineNumbers />
  </CodeBlock>
);

/* ── JWT payload ───────────────────────────────────────── */
export const JsonPayload: Story = () => (
  <CodeBlock code={jsonCode} lang="json">
    <CodeBlockHeader title="jwt-payload.json" />
    <CodeBlockContent />
  </CodeBlock>
);

/* ── XSS — JavaScript ──────────────────────────────────── */
export const JavaScript: Story = () => (
  <CodeBlock code={jsCode} lang="javascript">
    <CodeBlockHeader title="xss-demo.js" />
    <CodeBlockContent showLineNumbers />
  </CodeBlock>
);

/* ── Без заголовка ─────────────────────────────────────── */
export const NoHeader: Story = () => (
  <CodeBlock code={`const ksi = { role: 'student', score: 1420 };`} lang="typescript">
    <CodeBlockContent />
  </CodeBlock>
);
