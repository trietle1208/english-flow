type ExampleItem = { en: string; vi: string };

type ExampleBlockProps = {
  items: ExampleItem[];
};

export function ExampleBlock({ items }: ExampleBlockProps) {
  return (
    <section aria-labelledby="lesson-examples-heading" className="space-y-3">
      <h2 id="lesson-examples-heading" className="text-sm font-semibold tracking-tight">
        Examples
      </h2>
      <ul className="flex flex-col gap-3">
        {items.map((item, index) => (
          <li
            key={`${item.en}-${index}`}
            className="rounded-lg border bg-muted/40 px-4 py-3"
          >
            <p className="text-sm font-medium sm:text-base">{item.en}</p>
            <p className="mt-1 text-sm text-muted-foreground">{item.vi}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
