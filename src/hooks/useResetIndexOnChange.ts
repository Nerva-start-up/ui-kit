import { useEffect, useState } from "react";

/**
 * Активный индекс списка, который сбрасывается на 0 при каждом изменении `resetKey`
 * (обычно — отфильтрованный список). Централизует единственный неизбежный случай
 * "setState не в deps" вместо того, чтобы копировать `biome-ignore` на каждый вызов.
 */
export function useResetIndexOnChange(
  resetKey: unknown
): [number, React.Dispatch<React.SetStateAction<number>>] {
  const [index, setIndex] = useState(0);

  // biome-ignore lint/correctness/useExhaustiveDependencies: setIndex is a stable React setter
  useEffect(() => {
    setIndex(0);
  }, [resetKey]);

  return [index, setIndex];
}
