/**
 * Вставка structured data (schema.org). Рендерится на сервере.
 * ИИ: не дублируйте крупные объекты в нескольких местах — собирайте в один `graph`.
 */
type JsonLdProps = {
  data: Record<string, unknown> | Record<string, unknown>[];
};

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
