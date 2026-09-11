import type { Story } from "@ladle/react";
import { Quote } from "lucide-react";
import { useState } from "react";
import { Button } from "../../actions/button/Button";
import { Text } from "../../typography/Text";
import { Avatar } from "../avatar/Avatar";
import { Badge } from "../badge/Badge";
import { Card } from "../card/Card";
import { Image } from "../image/Image";
import { Carousel } from "./Carousel";
import { CarouselItem } from "./CarouselItem";

export default { title: "Components / Data Display / Carousel" };

const COLORS = ["#f97316", "#0ea5e9", "#22c55e", "#a855f7"];

function Slide({ label, color }: { label: string; color: string }) {
  return (
    <div
      className="flex h-56 w-full items-center justify-center text-xl font-semibold text-white"
      style={{ background: color }}
    >
      {label}
    </div>
  );
}

/* ── Default ────────────────────────────────────────────── */
export const Default: Story = () => (
  <div className="max-w-lg overflow-hidden rounded-[var(--radius-lg)]">
    <Carousel>
      {COLORS.map((color, i) => (
        <CarouselItem key={color}>
          <Slide label={`Слайд ${i + 1}`} color={color} />
        </CarouselItem>
      ))}
    </Carousel>
  </div>
);

/* ── Autoplay ───────────────────────────────────────────── */
export const Autoplay: Story = () => (
  <div className="max-w-lg overflow-hidden rounded-[var(--radius-lg)]">
    <Carousel autoplay autoplayInterval={2000}>
      {COLORS.map((color, i) => (
        <CarouselItem key={color}>
          <Slide label={`Баннер курса ${i + 1}`} color={color} />
        </CarouselItem>
      ))}
    </Carousel>
  </div>
);

/* ── Without loop ───────────────────────────────────────── */
export const WithoutLoop: Story = () => (
  <div className="max-w-lg overflow-hidden rounded-[var(--radius-lg)]">
    <Carousel loop={false}>
      {COLORS.map((color, i) => (
        <CarouselItem key={color}>
          <Slide label={`Слайд ${i + 1}`} color={color} />
        </CarouselItem>
      ))}
    </Carousel>
  </div>
);

/* ── Without arrows/dots ────────────────────────────────── */
export const Minimal: Story = () => (
  <div className="max-w-lg overflow-hidden rounded-[var(--radius-lg)]">
    <Carousel showArrows={false} showDots={false} autoplay>
      {COLORS.map((color, i) => (
        <CarouselItem key={color}>
          <Slide label={`Слайд ${i + 1}`} color={color} />
        </CarouselItem>
      ))}
    </Carousel>
  </div>
);

/* ── Controlled ─────────────────────────────────────────── */
export const Controlled: Story = () => {
  const [index, setIndex] = useState(0);
  return (
    <div className="flex flex-col gap-3">
      <div className="max-w-lg overflow-hidden rounded-[var(--radius-lg)]">
        <Carousel activeIndex={index} onChange={setIndex}>
          {COLORS.map((color, i) => (
            <CarouselItem key={color}>
              <Slide label={`Слайд ${i + 1}`} color={color} />
            </CarouselItem>
          ))}
        </Carousel>
      </div>
      <Text size="xs" variant="muted">
        Активный слайд: <Badge variant="orange">{index + 1}</Badge>
      </Text>
    </div>
  );
};

/* ── Single slide (стрелки/точки скрыты автоматически) ──── */
export const SingleSlide: Story = () => (
  <div className="max-w-lg overflow-hidden rounded-[var(--radius-lg)]">
    <Carousel>
      <CarouselItem>
        <Slide label="Единственный слайд" color={COLORS[0]} />
      </CarouselItem>
    </Carousel>
  </div>
);

/* ── Без паузы при наведении ────────────────────────────── */
export const NoPauseOnHover: Story = () => (
  <div className="max-w-lg overflow-hidden rounded-[var(--radius-lg)]">
    <Carousel autoplay autoplayInterval={1500} pauseOnHover={false}>
      {COLORS.map((color, i) => (
        <CarouselItem key={color}>
          <Slide label={`Слайд ${i + 1}`} color={color} />
        </CarouselItem>
      ))}
    </Carousel>
  </div>
);

/* ── Много слайдов ──────────────────────────────────────── */
export const ManySlides: Story = () => (
  <div className="max-w-lg overflow-hidden rounded-[var(--radius-lg)]">
    <Carousel>
      {Array.from({ length: 9 }, (_, i) => (
        <CarouselItem key={i}>
          <Slide
            label={`${i + 1} / 9`}
            color={["#f97316", "#0ea5e9", "#22c55e", "#a855f7", "#ef4444"][i % 5]}
          />
        </CarouselItem>
      ))}
    </Carousel>
  </div>
);

/* ── Галерея изображений ────────────────────────────────── */
export const ImageGallery: Story = () => (
  <div className="max-w-lg overflow-hidden rounded-[var(--radius-lg)]">
    <Carousel autoplay autoplayInterval={3500}>
      {Array.from({ length: 5 }, (_, i) => (
        <CarouselItem key={i}>
          <Image
            src={`https://picsum.photos/seed/ksi-carousel-${i}/640/360`}
            alt={`Фото с мероприятия ${i + 1}`}
            width="100%"
            height={224}
            rounded="none"
          />
        </CarouselItem>
      ))}
    </Carousel>
  </div>
);

/* ── Баннер с подписью поверх изображения ───────────────── */
function BannerSlide({
  title,
  description,
  color,
}: {
  title: string;
  description: string;
  color: string;
}) {
  return (
    <div
      className="relative flex h-56 w-full items-end p-5"
      style={{ background: `linear-gradient(135deg, ${color}, #0d1117)` }}
    >
      <div className="flex flex-col gap-1">
        <Text as="h4" size="lg" weight="bold" className="text-white">
          {title}
        </Text>
        <Text size="sm" className="text-white/80">
          {description}
        </Text>
      </div>
    </div>
  );
}

export const BannerWithCaption: Story = () => (
  <div className="max-w-lg overflow-hidden rounded-[var(--radius-lg)]">
    <Carousel autoplay autoplayInterval={4000}>
      <CarouselItem>
        <BannerSlide
          title="Набор в группу ИБ-101"
          description="Приём заявок открыт до 1 августа"
          color="#f97316"
        />
      </CarouselItem>
      <CarouselItem>
        <BannerSlide
          title="Хакатон KSI 2026"
          description="Регистрация команд — уже сейчас"
          color="#0ea5e9"
        />
      </CarouselItem>
      <CarouselItem>
        <BannerSlide
          title="Открытая лекция по криптографии"
          description="22 июля, 18:00, актовый зал"
          color="#22c55e"
        />
      </CarouselItem>
    </Carousel>
  </div>
);

/* ── Карточки-отзывы ─────────────────────────────────────── */
const TESTIMONIALS = [
  {
    name: "Иванов Иван",
    role: "Выпускник ИБ-101",
    quote: "KSI дал мне практические навыки, которых не хватало в университете.",
  },
  {
    name: "Каримова Дилноза",
    role: "Студентка ИБ-102",
    quote: "Преподаватели объясняют сложные темы простым языком.",
  },
  {
    name: "Азимов Азиз",
    role: "Выпускник ИБ-103",
    quote: "После курса устроился на позицию security engineer.",
  },
];

export const TestimonialCards: Story = () => (
  <div className="max-w-lg">
    <Carousel>
      {TESTIMONIALS.map((t) => (
        <CarouselItem key={t.name}>
          <div className="px-1 pb-10">
            <Card className="flex flex-col gap-4">
              <Quote size={20} className="text-[var(--primary)]" />
              <Text size="sm" className="leading-relaxed">
                {t.quote}
              </Text>
              <div className="flex items-center gap-3">
                <Avatar name={t.name} size="sm" />
                <div className="flex flex-col">
                  <Text as="span" size="sm" weight="medium">
                    {t.name}
                  </Text>
                  <Text as="span" size="xs" variant="muted">
                    {t.role}
                  </Text>
                </div>
              </div>
            </Card>
          </div>
        </CarouselItem>
      ))}
    </Carousel>
  </div>
);

/* ── Объявления с CTA ────────────────────────────────────── */
export const AnnouncementsWithCta: Story = () => (
  <div className="max-w-lg">
    <Carousel autoplay autoplayInterval={5000}>
      <CarouselItem>
        <div className="px-1 pb-10">
          <Card className="flex items-center justify-between gap-4">
            <div className="flex flex-col gap-1">
              <Badge variant="orange">Новое</Badge>
              <Text as="h4" size="md" weight="semibold">
                Курс "Пентест веб-приложений"
              </Text>
              <Text size="xs" variant="muted">
                Старт — 1 августа
              </Text>
            </div>
            <Button size="sm">Записаться</Button>
          </Card>
        </div>
      </CarouselItem>
      <CarouselItem>
        <div className="px-1 pb-10">
          <Card className="flex items-center justify-between gap-4">
            <div className="flex flex-col gap-1">
              <Badge variant="info">Событие</Badge>
              <Text as="h4" size="md" weight="semibold">
                Митап "Безопасность в CI/CD"
              </Text>
              <Text size="xs" variant="muted">
                25 июля, онлайн
              </Text>
            </div>
            <Button size="sm" variant="outline">
              Участвовать
            </Button>
          </Card>
        </div>
      </CarouselItem>
    </Carousel>
  </div>
);
