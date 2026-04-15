import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export interface FAQItem {
  question: string;
  answer: string;
}

interface SchemaFAQProps {
  items: FAQItem[];
  /** Optional heading above the FAQ block */
  title?: string;
}

/**
 * Renders an FAQ section with:
 * - Schema.org FAQPage microdata (for Google rich snippets)
 * - JSON-LD script (for AI engines: ChatGPT, Claude, Perplexity)
 * - Accessible accordion UI
 */
export default function SchemaFAQ({ items, title = "Questions fréquentes" }: SchemaFAQProps) {
  if (!items.length) return null;

  // JSON-LD for AI citability
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <section className="py-16 md:py-20">
      <div className="max-w-3xl mx-auto px-4">
        {/* JSON-LD for AI/search engines */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <h2 className="font-display text-[28px] md:text-[36px] text-foreground text-center mb-10">
          {title}
        </h2>

        {/* Schema.org microdata + Accordion UI */}
        <div itemScope itemType="https://schema.org/FAQPage">
          <Accordion type="single" collapsible className="space-y-3">
            {items.map((item, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="border border-border/50 rounded-2xl px-6 data-[state=open]:bg-muted/30"
                itemScope
                itemProp="mainEntity"
                itemType="https://schema.org/Question"
              >
                <AccordionTrigger className="text-left text-[15px] md:text-[16px] font-body font-semibold text-foreground py-5 hover:no-underline">
                  <span itemProp="name">{item.question}</span>
                </AccordionTrigger>
                <AccordionContent
                  className="text-[14px] text-muted-foreground font-body leading-relaxed pb-5"
                  itemScope
                  itemProp="acceptedAnswer"
                  itemType="https://schema.org/Answer"
                >
                  <p itemProp="text">{item.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
