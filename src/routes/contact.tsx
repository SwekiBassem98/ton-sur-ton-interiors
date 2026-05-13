import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { Phone, MapPin, Clock, Mail, Send } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Meuble Ton sur Ton" },
      { name: "description", content: "Contactez Meuble Ton sur Ton à La Soukra. Téléphone, adresse, horaires et formulaire." },
      { property: "og:title", content: "Contact — Meuble Ton sur Ton" },
      { property: "og:description", content: "Visitez notre showroom à La Soukra ou contactez-nous." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <Layout>
      <section className="bg-gradient-warm">
        <div className="container mx-auto px-4 py-20 text-center md:py-24">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">Contact</p>
          <h1 className="mt-4 font-display text-5xl md:text-6xl">
            Parlons <span className="italic text-primary">décoration</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-muted-foreground">
            Une question, un projet, une visite à organiser ? Notre équipe vous répond
            avec plaisir.
          </p>
        </div>
      </section>

      <section className="container mx-auto grid gap-10 px-4 py-20 lg:grid-cols-5">
        <div className="space-y-5 lg:col-span-2">
          <InfoCard icon={<MapPin className="h-5 w-5" />} title="Adresse" lines={["Résidence FARES", "Av. Fattouma Bourguiba", "La Soukra 2036, Tunisie"]} />
          <InfoCard icon={<Phone className="h-5 w-5" />} title="Téléphone" lines={["54 480 694"]} href="tel:+21654480694" />
          <InfoCard icon={<Mail className="h-5 w-5" />} title="Email" lines={["contact@meubletonsurton.tn"]} href="mailto:contact@meubletonsurton.tn" />
          <InfoCard icon={<Clock className="h-5 w-5" />} title="Horaires" lines={["Lun – Sam : 9h – 19h", "Dimanche : Fermé"]} />
        </div>

        <div className="lg:col-span-3">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
            className="rounded-2xl border border-border bg-card p-8 shadow-soft"
          >
            <h2 className="font-display text-3xl">Écrivez-nous</h2>
            <p className="mt-1 text-sm text-muted-foreground">Nous vous répondons sous 24h.</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <Field label="Nom" name="name" required />
              <Field label="Email" name="email" type="email" required />
              <Field label="Téléphone" name="phone" />
              <Field label="Sujet" name="subject" />
            </div>
            <div className="mt-4">
              <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Message</label>
              <textarea
                required
                rows={5}
                className="mt-1.5 w-full rounded-lg border border-input bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <button
              type="submit"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-medium uppercase tracking-wider text-primary-foreground shadow-soft transition-transform hover:scale-105"
            >
              {sent ? "Message envoyé !" : "Envoyer le message"} <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      </section>

      <section className="bg-secondary">
        <div className="container mx-auto px-4 py-12">
          <div className="overflow-hidden rounded-2xl shadow-soft">
            <iframe
              title="Localisation Meuble Ton sur Ton"
              src="https://www.google.com/maps?q=Av.+Fattouma+Bourguiba,+La+Soukra+2036,+Tunisie&output=embed"
              loading="lazy"
              className="h-[420px] w-full border-0"
            />
          </div>
        </div>
      </section>
    </Layout>
  );
}

function InfoCard({ icon, title, lines, href }: { icon: React.ReactNode; title: string; lines: string[]; href?: string }) {
  const Tag: keyof React.JSX.IntrinsicElements = href ? "a" : "div";
  return (
    <Tag {...(href ? { href } : {})} className="block rounded-2xl border border-border bg-card p-6 shadow-soft transition-transform hover:-translate-y-1">
      <div className="flex items-start gap-4">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">{icon}</span>
        <div>
          <div className="font-display text-lg">{title}</div>
          {lines.map((l, i) => (
            <div key={i} className="text-sm text-muted-foreground">{l}</div>
          ))}
        </div>
      </div>
    </Tag>
  );
}

function Field({ label, name, type = "text", required }: { label: string; name: string; type?: string; required?: boolean }) {
  return (
    <div>
      <label htmlFor={name} className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {label}{required && " *"}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="mt-1.5 w-full rounded-lg border border-input bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
      />
    </div>
  );
}
