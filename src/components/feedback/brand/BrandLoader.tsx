import { HStack } from "@components/layout/HStack";
import { Text } from "@components/typography/Text";
import { BrandMark } from "./BrandMark";

const sizeMap = { sm: 24, md: 32, lg: 48 } as const;

export type BrandLoaderProps = {
  /** sm=24px, md=32px, lg=48px */
  size?: keyof typeof sizeMap;
  /** Текст рядом с глифом */
  label?: string;
  className?: string;
};

/** Брендированный инлайн-индикатор загрузки — замена `Spinner`, когда важен брендинг. */
export function BrandLoader({ size = "md", label, className }: BrandLoaderProps) {
  return (
    <HStack gap={2.5} className={className}>
      <BrandMark size={sizeMap[size]} animated />
      {label && (
        <Text as="span" size="sm" variant="muted">
          {label}
        </Text>
      )}
    </HStack>
  );
}
