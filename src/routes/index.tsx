import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform, type Variants } from "framer-motion";
import {
  Menu, X, MapPin, Phone, Mail, User, MessageCircle, BookOpen, Users,
  HeartHandshake, Calendar, Clock, ArrowUp, Instagram, Facebook, Youtube,
  ArrowRight, Navigation, ChevronLeft, ChevronRight, ChevronDown, Copy,
  Music, Heart, Flame,
} from "lucide-react";
import { toast, Toaster } from "sonner";
import { z } from "zod";

import heroImg from "@/assets/culto-fundo.jpeg";
import aboutImg from "@/assets/about-bible.jpg";
import logoImg from "@/assets/logo.png"

const LOGO = logoImg;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        property: "og:image",
        content: `https://id-preview--11a55fc4-d0a6-474a-9432-1405a6c5cb02.lovable.app${LOGO}`,
      },
      {
        name: "twitter:image",
        content: `https://id-preview--11a55fc4-d0a6-474a-9432-1405a6c5cb02.lovable.app${LOGO}`,
      },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

const NAV = [
  { href: "#top", label: "Início" },
  { href: "#historia", label: "História" },
  { href: "#pastores", label: "Pastores" },
  { href: "#horarios", label: "Horários" },
  { href: "#eventos", label: "Eventos" },
  { href: "#midia", label: "Mídia" },
  { href: "#fe", label: "Declaração de Fé" },
  { href: "#contribua", label: "Contribua" },
  { href: "#localizacao", label: "Localização" },
  { href: "#contato", label: "Contato" },
];

const CULTOS = [
  { day: "Terça-feira", time: "19:30", title: "Culto de Ensino", icon: "📖" },
  { day: "Quinta-feira", time: "19:30", title: "Culto de Oração", icon: "🙏" },
  { day: "Sábado", time: "08:00", title: "Encontro da Igreja", icon: "☀️" },
  { day: "Domingo", time: "17:30", title: "Culto de Celebração", icon: "🎵" },
];

const MISSAO = [
  { icon: BookOpen, title: "Evangelizar", text: "Levar a Palavra de Deus a todas as pessoas." },
  { icon: Users, title: "Discipular", text: "Formar discípulos comprometidos com Cristo." },
  { icon: HeartHandshake, title: "Servir", text: "Amar e servir ao próximo através do Evangelho." },
];

const PASTORES = [
  { nome: "Pr. Murilo Santos", cargo: "Pastor Fundador", foto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80&auto=format&fit=crop" },
  { nome: "Pastor Auxiliar", cargo: "Pastor Auxiliar", foto: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&q=80&auto=format&fit=crop" },
  { nome: "Pastora de Louvor", cargo: "Ministério de Louvor", foto: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80&auto=format&fit=crop" },
];

const EVENTOS = [
  { nome: "Conferência do Reino", data: "15 a 17 de Agosto", desc: "Três noites de adoração, ensino da Palavra e comunhão.", img: "https://images.unsplash.com/photo-1519452575417-564c1401ecc0?w=1200&q=80&auto=format&fit=crop" },
  { nome: "Encontro de Famílias", data: "12 de Setembro", desc: "Um dia especial de comunhão para toda a família Mievre.", img: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=1200&q=80&auto=format&fit=crop" },
  { nome: "Vigília de Oração", data: "Última sexta do mês", desc: "Noite dedicada à oração e busca da presença de Deus.", img: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=1200&q=80&auto=format&fit=crop" },
];

const MENSAGENS = [
  { titulo: "Buscai primeiro o Reino", texto: "Colocar Deus em primeiro lugar é o segredo para viver com propósito.", data: "Hoje", img: "https://images.unsplash.com/photo-1585699324551-f6c309eedeca?w=800&q=80&auto=format&fit=crop" },
  { titulo: "A graça que sustenta", texto: "Nenhum vale é tão profundo que a graça de Deus não alcance.", data: "Ontem", img: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=800&q=80&auto=format&fit=crop" },
  { titulo: "Firmes na fé", texto: "A fé não remove todas as tempestades, mas nos ancora em Cristo.", data: "Esta semana", img: "https://images.unsplash.com/photo-1478147427282-58a87a120781?w=800&q=80&auto=format&fit=crop" },
];

const FE = [
  { titulo: "Das Escrituras Sagradas", texto: "Cremos que a Bíblia Sagrada é a Palavra inspirada de Deus, sem erro em seus manuscritos originais, e a única regra infalível de fé e prática para o cristão (2 Timóteo 3:16-17; 2 Pedro 1:20-21)." },
  { titulo: "Do Deus Verdadeiro", texto: "Cremos em um único Deus, eterno, criador de todas as coisas, existente em três pessoas distintas: Pai, Filho e Espírito Santo (Deuteronômio 6:4; Mateus 28:19)." },
  { titulo: "Do Espírito Santo", texto: "Cremos que o Espírito Santo é Deus, coigual e coeterno com o Pai e o Filho, que convence o mundo do pecado, regenera, habita, sela e capacita o crente para viver e servir (João 14:16-17; Atos 1:8)." },
  { titulo: "Do Senhor Jesus Cristo", texto: "Cremos em Jesus Cristo, Filho eterno de Deus, verdadeiro Deus e verdadeiro homem, concebido pelo Espírito Santo, nascido da virgem Maria, crucificado, morto, ressuscitado e assentado à direita do Pai (João 1:1,14; 1 Coríntios 15:3-4)." },
  { titulo: "Do Homem", texto: "Cremos que o homem foi criado à imagem e semelhança de Deus, mas caiu em pecado por desobediência, tornando-se separado de Deus e necessitado da salvação em Cristo (Gênesis 1:26-27; Romanos 3:23; 5:12)." },
  { titulo: "Da Salvação", texto: "Cremos que a salvação é dom gratuito de Deus, recebida pela fé em Jesus Cristo, mediante o arrependimento dos pecados e a regeneração pelo Espírito Santo (Efésios 2:8-9; Romanos 10:9-10)." },
  { titulo: "Da Igreja", texto: "Cremos que a Igreja é o corpo de Cristo, composta por todos os regenerados, chamada a adorar a Deus, edificar-se na Palavra, evangelizar e servir ao próximo (Efésios 1:22-23; Mateus 28:19-20)." },
  { titulo: "Do Batismo e da Ceia do Senhor", texto: "Cremos no batismo por imersão em nome do Pai, do Filho e do Espírito Santo como testemunho público da fé, e na Ceia do Senhor como memorial da obra de Cristo (Mateus 28:19; 1 Coríntios 11:23-26)." },
];

const REDES = [
  { icon: Instagram, label: "Instagram", href: "#" },
  { icon: Facebook, label: "Facebook", href: "#" },
  { icon: Youtube, label: "YouTube", href: "#" },
  { icon: Music, label: "Spotify", href: "#" },
  { icon: MessageCircle, label: "WhatsApp", href: "https://wa.me/" },
];

const PIX_KEY = "contato@mievre.com.br";
const ADDRESS_QUERY = encodeURIComponent(
  "Rua Rio Grande do Sul, Novo Paraíso, Aracaju - SE, 49082-000",
);

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Splash />
      <Toaster position="top-right" richColors />
      <Navbar />
      <main>
        <Hero />
        <Historia />
        <Pastores />
        <Horarios />
        <Missao />
        <Eventos />
        <Midia />
        <Contribua />
        <DeclaracaoFe />
        <PrimeiraVisita />
        <Localizacao />
        <Contato />
      </main>
      <Footer />
      <WhatsAppFloat />
      <BackToTop />
    </div>
  );
}

/* ---------------- SPLASH ---------------- */
function Splash() {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 2000);
    document.body.style.overflow = "hidden";
    return () => {
      clearTimeout(t);
      document.body.style.overflow = "";
    };
  }, []);
  useEffect(() => {
    if (!visible) document.body.style.overflow = "";
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] grid place-items-center bg-white"
          aria-hidden
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative"
          >
            <motion.div
              animate={{ opacity: [0.4, 1, 0.6, 1], scale: [1, 1.05, 0.98, 1.03] }}
              transition={{ duration: 1.2, repeat: Infinity }}
              className="absolute left-1/2 top-[8%] h-24 w-24 -translate-x-1/2 rounded-full bg-[#FE261E]/40 blur-2xl"
            />
            <img
              src={LOGO}
              alt="Mievre Ministério do Evangelho do Reino"
              className="relative h-40 w-40 object-contain drop-shadow-[0_10px_40px_rgba(255,255,255,0.15)]"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ---------------- NAVBAR ---------------- */
function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-primary/90 backdrop-blur-md shadow-[0_4px_20px_-8px_rgba(6,13,67,0.35)] py-1"
          : "bg-transparent py-2"
      }`}
    >
      <nav
        aria-label="Navegação principal"
        className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3"
      >
        <a href="#top" className="flex items-center gap-3 shrink-0">
          <img
            src={LOGO}
            alt="Logo Mievre"
            className={`transition-all ${scrolled ? "h-10 w-10" : "h-12 w-12"} object-contain`}
          />
          <span className="hidden sm:flex flex-col leading-tight text-white">
            <span className="font-display text-base font-semibold tracking-tight">Mievre</span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-gold-soft">Evangelho do Reino</span>
          </span>
        </a>

        <ul className="hidden xl:flex items-center gap-6">
          {NAV.map((n) => (
            <li key={n.href}>
              <a
                href={n.href}
                className="text-[13px] font-medium text-white/85 transition-colors hover:text-gold"
              >
                {n.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#visita"
          className="hidden xl:inline-flex items-center gap-2 rounded-full bg-[#FE261E] px-5 py-2.5 text-sm font-semibold text-white shadow-soft transition hover:brightness-110"
        >
          Planejar minha visita <ArrowRight className="h-4 w-4" />
        </a>

        <button
          type="button"
          className="xl:hidden rounded-md p-2 text-white"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="xl:hidden overflow-hidden border-t border-white/10 bg-primary/95 backdrop-blur-md"
          >
            <ul className="mx-auto flex max-w-7xl flex-col px-6 py-4">
              {NAV.map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    onClick={() => setOpen(false)}
                    className="block py-3 text-base font-medium text-white/90 hover:text-gold"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
              <li className="pt-2">
                <a
                  href="#visita"
                  onClick={() => setOpen(false)}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#FE261E] px-5 py-3 text-sm font-semibold text-white"
                >
                  Planejar minha visita <ArrowRight className="h-4 w-4" />
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/* ---------------- HERO ---------------- */
function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 120]);

  return (
    <section id="top" className="relative min-h-[100dvh] w-full overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0">
        <img
          src={heroImg}
          alt="Culto de adoração com mãos levantadas"
          className="h-full w-full object-cover"
          fetchPriority="high"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#060D43]/85 via-[#060D43]/70 to-[#060D43]/95" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(0,0,0,0.55))]" />

      <div className="relative z-10 mx-auto flex min-h-[100dvh] max-w-5xl flex-col items-center justify-center px-6 py-32 text-center text-white">
        <motion.img
          src={LOGO}
          alt=""
          initial={{ opacity: 0, y: -12, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-8 h-24 w-24 object-contain drop-shadow-2xl"
          aria-hidden
        />
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-gold-soft backdrop-blur"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-gold" /> Bem-vindo
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="font-display text-4xl font-semibold leading-[1.05] sm:text-6xl lg:text-7xl"
        >
          Mievre <span className="text-gold">Ministério</span>
          <br /> do Evangelho do Reino
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-6 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg"
        >
          Um lugar para encontrar Deus, fortalecer sua fé e viver o Evangelho do Reino.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-10 flex flex-col items-center gap-3 sm:flex-row"
        >
          <a
            href="#visita"
            className="inline-flex items-center gap-2 rounded-full bg-[#FE261E] px-7 py-3.5 text-sm font-semibold text-white shadow-elegant transition hover:brightness-110"
          >
            Quero Visitar <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href="#horarios"
            className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/15"
          >
            Horários dos Cultos
          </a>
        </motion.div>
      </div>

      <div className="pointer-events-none absolute bottom-6 left-1/2 z-10 -translate-x-1/2">
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="h-10 w-6 rounded-full border-2 border-white/50"
        >
          <div className="mx-auto mt-2 h-2 w-1 rounded-full bg-white/70" />
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------- LAYOUT HELPERS ---------------- */
function Section({ id, children, className = "" }: { id: string; children: React.ReactNode; className?: string }) {
  return (
    <section id={id} className={`scroll-mt-24 py-20 sm:py-28 ${className}`}>
      {children}
    </section>
  );
}

function SectionHeader({
  eyebrow, title, subtitle, center = true, invert = false,
}: {
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: string;
  center?: boolean;
  invert?: boolean;
}) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      className={`${center ? "mx-auto text-center" : ""} max-w-2xl`}
    >
      <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.24em] text-gold">
        <span className="h-px w-8 bg-gold" /> {eyebrow}
      </span>
      <h2 className={`mt-4 font-display text-3xl font-semibold sm:text-4xl lg:text-5xl ${invert ? "text-white" : "text-primary"}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-5 text-base leading-relaxed sm:text-lg ${invert ? "text-white/80" : "text-muted-foreground"}`}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}

/* ---------------- HISTORIA ---------------- */
function Historia() {
  return (
    <Section id="historia" className="bg-background">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2 lg:gap-20">
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }}
          className="relative"
        >
          <div className="absolute -left-4 -top-4 h-24 w-24 rounded-full bg-gold/20 blur-2xl" />
          <div className="absolute -bottom-6 -right-4 h-32 w-32 rounded-full bg-primary/20 blur-2xl" />
          <div className="relative overflow-hidden rounded-2xl shadow-elegant">
            <img
              src={aboutImg}
              alt="Bíblia aberta sobre a mesa com congregação ao fundo"
              className="h-[520px] w-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="absolute -bottom-6 left-6 right-6 rounded-xl border border-gold/30 bg-background/95 p-5 shadow-soft backdrop-blur sm:left-10 sm:right-auto sm:w-72">
            <p className="font-display text-base italic leading-relaxed text-primary">
              “Buscai primeiro o Reino de Deus…”
            </p>
            <p className="mt-2 text-xs uppercase tracking-widest text-gold">Mateus 6:33</p>
          </div>
        </motion.div>

        <div>
          <SectionHeader
            center={false}
            eyebrow="Nossa História"
            title={<>Firmes na <span className="text-gold">Palavra</span> desde 2003.</>}
          />
          <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            <p>
              O <strong className="text-foreground">Ministério do Evangelho do Reino</strong> foi fundado em 28 de outubro de 2003, pelo pastor Murilo Santos e um grupo de irmãos em Cristo, que se reuniram com essa finalidade.
            </p>
            <p>
              O principal propósito do Ministério sempre foi alcançar as almas para Cristo, por meio da pregação e do ensino da Palavra de Deus, oferecendo um ambiente acolhedor para aqueles que sinceramente desejam fazer parte da nossa comunidade.
            </p>
            <p>
              Os primeiros anos do Ministério foram marcados por muitos desafios, porém a igreja foi crescendo e superando todas as dificuldades naturais do início de uma obra.
            </p>
            <p>
              Hoje, o Ministério do Evangelho do Reino possui templo próprio e continua firme em sua missão, mantendo a mesma essência e propósito inicial: caminhar no temor de Deus, promover o crescimento espiritual dos membros e alcançar novas vidas para Cristo.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4">
            <div className="rounded-xl border border-border bg-card p-5">
              <p className="text-xs uppercase tracking-widest text-gold">Fundação</p>
              <p className="mt-2 font-display text-lg font-semibold text-primary">28 de Outubro de 2003</p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5">
              <p className="text-xs uppercase tracking-widest text-gold">Local</p>
              <p className="mt-2 font-display text-lg font-semibold text-primary">Aracaju • Sergipe</p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ---------------- CAROUSEL HOOK ---------------- */
function useCarousel(length: number, autoplay = true, interval = 5000) {
  const [i, setI] = useState(0);
  const next = () => setI((v) => (v + 1) % length);
  const prev = () => setI((v) => (v - 1 + length) % length);
  useEffect(() => {
    if (!autoplay) return;
    const t = setInterval(next, interval);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoplay, interval, length]);

  // swipe
  const startX = useRef<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) => { startX.current = e.touches[0].clientX; };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (startX.current === null) return;
    const diff = e.changedTouches[0].clientX - startX.current;
    if (diff > 50) prev(); else if (diff < -50) next();
    startX.current = null;
  };
  return { i, setI, next, prev, onTouchStart, onTouchEnd };
}

/* ---------------- PASTORES ---------------- */
function Pastores() {
  const c = useCarousel(PASTORES.length);
  return (
    <Section id="pastores" className="bg-gradient-to-b from-secondary/40 to-background">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="Liderança"
          title={<>Nossos <span className="text-gold">Pastores</span></>}
          subtitle="Servos dedicados a pastorear com amor, verdade e cuidado."
        />
        <div
          className="relative mx-auto mt-14 max-w-4xl"
          onTouchStart={c.onTouchStart}
          onTouchEnd={c.onTouchEnd}
        >
          <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-elegant">
            <AnimatePresence mode="wait">
              <motion.div
                key={c.i}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.5 }}
                className="grid gap-0 sm:grid-cols-2"
              >
                <div className="aspect-square overflow-hidden bg-primary/10">
                  <img src={PASTORES[c.i].foto} alt={PASTORES[c.i].nome} className="h-full w-full object-cover" loading="lazy" />
                </div>
                <div className="flex flex-col justify-center p-8 sm:p-12">
                  <p className="text-xs uppercase tracking-[0.24em] text-gold">{PASTORES[c.i].cargo}</p>
                  <h3 className="mt-3 font-display text-3xl font-semibold text-primary sm:text-4xl">{PASTORES[c.i].nome}</h3>
                  <p className="mt-4 text-muted-foreground leading-relaxed">
                    Dedicado ao serviço do Reino, ao ensino da Palavra e ao cuidado da família Mievre.
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <button aria-label="Anterior" onClick={c.prev} className="absolute left-2 top-1/2 -translate-y-1/2 grid h-11 w-11 place-items-center rounded-full bg-background/90 text-primary shadow-soft ring-1 ring-border transition hover:bg-primary hover:text-white sm:-left-6">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button aria-label="Próximo" onClick={c.next} className="absolute right-2 top-1/2 -translate-y-1/2 grid h-11 w-11 place-items-center rounded-full bg-background/90 text-primary shadow-soft ring-1 ring-border transition hover:bg-primary hover:text-white sm:-right-6">
            <ChevronRight className="h-5 w-5" />
          </button>

          <div className="mt-6 flex justify-center gap-2">
            {PASTORES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => c.setI(idx)}
                aria-label={`Ir para pastor ${idx + 1}`}
                className={`h-2 rounded-full transition-all ${idx === c.i ? "w-8 bg-gold" : "w-2 bg-primary/25 hover:bg-primary/50"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ---------------- HORARIOS ---------------- */
function Horarios() {
  return (
    <Section id="horarios" className="relative overflow-hidden bg-gradient-to-b from-secondary/60 to-background">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="Nossos Cultos"
          title={<>Venha adorar <span className="text-gold">conosco</span></>}
          subtitle="Todos são bem-vindos. Escolha o dia e junte-se à nossa comunidade."
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {CULTOS.map((c, i) => (
            <motion.article
              key={c.day}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-soft transition-all hover:-translate-y-1 hover:border-gold/40 hover:shadow-elegant"
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-gold to-primary opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-gold">
                <span aria-hidden className="text-lg">{c.icon}</span> {c.day}
              </div>
              <div className="mt-6 flex items-baseline gap-2">
                <span className="font-display text-5xl font-semibold text-primary">{c.time.split(":")[0]}</span>
                <span className="font-display text-2xl text-primary/60">:{c.time.split(":")[1]}</span>
              </div>
              <p className="mt-4 border-t border-border pt-4 text-base font-medium text-foreground">{c.title}</p>
              <Clock className="absolute bottom-5 right-5 h-5 w-5 text-primary/20" />
            </motion.article>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ---------------- MISSAO ---------------- */
function Missao() {
  return (
    <Section id="missao" className="relative bg-primary text-primary-foreground">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(207,159,12,0.18),transparent_50%),radial-gradient(circle_at_80%_80%,rgba(207,159,12,0.12),transparent_50%)]" />
      <div className="relative mx-auto max-w-7xl px-6">
        <SectionHeader
          invert
          eyebrow="Nossa Missão"
          title={<>Chamados para <span className="text-gold">servir</span> ao Reino</>}
        />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {MISSAO.map((m, i) => {
            const Icon = m.icon;
            return (
              <motion.div
                key={m.title}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="group rounded-2xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur transition-all hover:-translate-y-1 hover:border-gold/40 hover:bg-white/[0.07]"
              >
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gold/15 text-gold ring-1 ring-gold/30 transition-transform group-hover:scale-110">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-6 font-display text-2xl font-semibold">{m.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/75">{m.text}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

/* ---------------- EVENTOS ---------------- */
function Eventos() {
  const c = useCarousel(EVENTOS.length);
  return (
    <Section id="eventos" className="bg-background">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="Agenda"
          title={<>Próximos <span className="text-gold">Eventos</span></>}
          subtitle="Participe dos próximos encontros e conferências do Mievre."
        />
        <div
          className="relative mx-auto mt-14 max-w-5xl"
          onTouchStart={c.onTouchStart}
          onTouchEnd={c.onTouchEnd}
        >
          <div className="overflow-hidden rounded-3xl border border-border shadow-elegant">
            <AnimatePresence mode="wait">
              <motion.div
                key={c.i}
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="relative aspect-[16/9] w-full"
              >
                <img src={EVENTOS[c.i].img} alt={EVENTOS[c.i].nome} className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/50 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-10">
                  <p className="text-xs uppercase tracking-[0.24em] text-gold-soft">{EVENTOS[c.i].data}</p>
                  <h3 className="mt-2 font-display text-2xl font-semibold sm:text-4xl">{EVENTOS[c.i].nome}</h3>
                  <p className="mt-2 max-w-2xl text-sm text-white/85 sm:text-base">{EVENTOS[c.i].desc}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <button aria-label="Anterior" onClick={c.prev} className="absolute left-2 top-1/2 -translate-y-1/2 grid h-11 w-11 place-items-center rounded-full bg-background/90 text-primary shadow-soft ring-1 ring-border transition hover:bg-primary hover:text-white sm:-left-6">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button aria-label="Próximo" onClick={c.next} className="absolute right-2 top-1/2 -translate-y-1/2 grid h-11 w-11 place-items-center rounded-full bg-background/90 text-primary shadow-soft ring-1 ring-border transition hover:bg-primary hover:text-white sm:-right-6">
            <ChevronRight className="h-5 w-5" />
          </button>

          <div className="mt-6 flex justify-center gap-2">
            {EVENTOS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => c.setI(idx)}
                aria-label={`Ir para evento ${idx + 1}`}
                className={`h-2 rounded-full transition-all ${idx === c.i ? "w-8 bg-gold" : "w-2 bg-primary/25 hover:bg-primary/50"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ---------------- MIDIA ---------------- */
function Midia() {
  return (
    <Section id="midia" className="bg-gradient-to-b from-background to-secondary/40">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="Mídia"
          title={<>Mensagens <span className="text-gold">Diárias</span></>}
          subtitle="Palavras para edificar sua fé todos os dias."
        />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {MENSAGENS.map((m, i) => (
            <motion.article
              key={m.titulo}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-all hover:-translate-y-1 hover:shadow-elegant"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img src={m.img} alt={m.titulo} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="p-6">
                <p className="text-xs uppercase tracking-widest text-gold">{m.data}</p>
                <h3 className="mt-2 font-display text-xl font-semibold text-primary">{m.titulo}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{m.texto}</p>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-20">
          <div className="mx-auto max-w-3xl text-center">
            <h3 className="font-display text-2xl font-semibold text-primary sm:text-3xl">🎵 Nossa Playlist</h3>
            <p className="mt-3 text-muted-foreground">Ouça as canções que embalam nossos cultos e devocionais.</p>
          </div>
          <div className="mx-auto mt-8 max-w-3xl overflow-hidden rounded-2xl border border-border shadow-elegant">
            <iframe
              title="Playlist Mievre no Spotify"
              src="https://open.spotify.com/embed/playlist/37i9dQZF1DWYBO1MoTDhZI?utm_source=generator&theme=0"
              width="100%"
              height="380"
              loading="lazy"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              className="w-full border-0"
            />
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ---------------- CONTRIBUA ---------------- */
function Contribua() {
  const [copied, setCopied] = useState(false);
  const copyPix = async () => {
    try {
      await navigator.clipboard.writeText(PIX_KEY);
      setCopied(true);
      toast.success("Chave copiada!");
      setTimeout(() => setCopied(false), 2200);
    } catch {
      toast.error("Não foi possível copiar. Copie manualmente.");
    }
  };
  const qr = `https://api.qrserver.com/v1/create-qr-code/?size=280x280&data=${encodeURIComponent(PIX_KEY)}`;

  return (
    <Section id="contribua" className="relative overflow-hidden text-white">
      <div className="absolute inset-0 bg-gradient-to-br from-[#060D43] via-[#0d2352] to-[#165908]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(207,159,12,0.18),transparent_50%)]" />
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.24em] text-gold">
              <span className="h-px w-8 bg-gold" /> Contribua com a Obra do Senhor
            </span>
            <h2 className="mt-4 font-display text-3xl font-semibold sm:text-4xl lg:text-5xl">
              Sua semente <span className="text-gold">transforma vidas</span>
            </h2>
            <p className="mt-6 text-base leading-relaxed text-white/85 sm:text-lg">
              Sua contribuição ajuda a manter este ministério, apoiar ações evangelísticas, projetos sociais e levar a Palavra de Deus a mais pessoas.
            </p>
            <div className="mt-8 flex items-center gap-3 text-sm text-white/80">
              <Heart className="h-5 w-5 text-[#FE261E]" />
              <span>“Cada um contribua segundo propôs no seu coração.” 2 Coríntios 9:7</span>
            </div>
          </div>

          <motion.div
            variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }}
            className="rounded-3xl border border-gold/30 bg-white/[0.06] p-6 backdrop-blur-xl shadow-elegant sm:p-8"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-gold">PIX</p>
                <p className="mt-1 font-display text-2xl font-semibold">Doação por PIX</p>
              </div>
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-gold text-primary font-display text-xl font-bold">P</div>
            </div>

            <div className="mt-6 grid gap-6 sm:grid-cols-[auto_1fr] sm:items-center">
              <div className="mx-auto rounded-xl bg-white p-3">
                <img src={qr} alt="QR Code PIX" width={160} height={160} className="h-40 w-40" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-gold">Chave PIX (Copia e Cola)</p>
                <div className="mt-2 flex items-stretch gap-2 rounded-xl border border-white/15 bg-white/5 p-2">
                  <code className="flex-1 truncate rounded-lg bg-black/20 px-3 py-2 text-sm text-white">{PIX_KEY}</code>
                  <button
                    onClick={copyPix}
                    className="inline-flex items-center gap-2 rounded-lg bg-gold px-3 py-2 text-sm font-semibold text-primary transition hover:brightness-110"
                  >
                    <Copy className="h-4 w-4" />
                    {copied ? "Copiado!" : "Copiar"}
                  </button>
                </div>
                <div className="mt-4 space-y-1 text-sm text-white/85">
                  <p><span className="text-white/60">Favorecido:</span> Mievre Ministério do Evangelho do Reino</p>
                  <p><span className="text-white/60">Banco:</span> A definir</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}

/* ---------------- DECLARAÇÃO DE FÉ ---------------- */
function DeclaracaoFe() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <Section id="fe" className="bg-background">
      <div className="mx-auto max-w-4xl px-6">
        <SectionHeader
          eyebrow="Aquilo em que cremos"
          title={<>Nossa <span className="text-gold">Declaração de Fé</span></>}
          subtitle="Fundamentos bíblicos que sustentam nossa comunhão e ensino."
        />
        <div className="mt-12 space-y-3">
          {FE.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.titulo} className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center gap-4 px-5 py-5 text-left transition hover:bg-secondary/50 sm:px-6"
                >
                  <span aria-hidden className="text-2xl"></span>
                  <span className="flex-1 font-display text-base font-semibold text-primary sm:text-lg">{f.titulo}</span>
                  <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }} className="text-gold">
                    <ChevronDown className="h-5 w-5" />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div className="border-t border-border px-5 py-5 text-sm leading-relaxed text-muted-foreground sm:px-6 sm:text-base">
                        {f.texto}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

/* ---------------- PRIMEIRA VISITA ---------------- */
function PrimeiraVisita() {
  return (
    <Section id="visita" className="bg-background">
      <div className="mx-auto max-w-5xl px-6">
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }}
          className="relative overflow-hidden rounded-3xl border border-gold/30 bg-gradient-to-br from-secondary via-background to-secondary/50 p-10 shadow-elegant sm:p-16"
        >
          <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-gold/15 blur-3xl" />
          <div className="absolute -bottom-20 -left-16 h-64 w-64 rounded-full bg-primary/15 blur-3xl" />
          <div className="relative text-center">
            <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.24em] text-gold">
              <span className="h-px w-8 bg-gold" /> Primeira Visita?
            </span>
            <h2 className="mt-4 font-display text-3xl font-semibold text-primary sm:text-4xl lg:text-5xl">
              Você é o nosso <span className="text-gold">convidado</span> especial
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Será uma alegria receber você e sua família. Em nossos cultos você encontrará um ambiente acolhedor, louvor, ensino bíblico e comunhão.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="#contato"
                className="inline-flex items-center gap-2 rounded-full bg-[#FE261E] px-7 py-3.5 text-sm font-semibold text-white shadow-elegant transition hover:brightness-110"
              >
                Planejar minha visita <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#horarios"
                className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-background px-7 py-3.5 text-sm font-semibold text-primary transition hover:bg-secondary"
              >
                Ver horários
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}

/* ---------------- LOCALIZAÇÃO ---------------- */
function Localizacao() {
  return (
    <Section id="localizacao" className="bg-gradient-to-b from-background to-secondary/40">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="Localização"
          title={<>Onde nós <span className="text-gold">estamos</span></>}
          subtitle="Estamos localizados em Aracaju - SE. Venha nos visitar!"
        />
        <div className="mt-14 grid gap-8 lg:grid-cols-5">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="lg:col-span-2">
            <div className="rounded-2xl border border-border bg-card p-8 shadow-soft">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <MapPin className="h-6 w-6" />
              </div>
              <h3 className="mt-6 font-display text-2xl font-semibold text-primary">Nosso endereço</h3>
              <address className="mt-3 not-italic text-muted-foreground leading-relaxed">
                Rua Rio Grande do Sul<br />
                Novo Paraíso, Aracaju - SE<br />
                CEP 49082-000
              </address>
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${ADDRESS_QUERY}`}
                target="_blank" rel="noopener noreferrer"
                className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
              >
                <Navigation className="h-4 w-4" /> Como Chegar
              </a>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="lg:col-span-3">
            <div className="h-[420px] overflow-hidden rounded-2xl border border-border shadow-elegant">
              <iframe
                title="Mapa - Mievre em Aracaju"
                src={`https://www.google.com/maps?q=${ADDRESS_QUERY}&output=embed`}
                width="100%" height="100%" loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-full w-full border-0"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}

/* ---------------- CONTATO ---------------- */
const contactSchema = z.object({
  nome: z.string().trim().min(2, "Informe seu nome").max(100),
  email: z.string().trim().email("E-mail inválido").max(255),
  telefone: z.string().trim().min(8, "Telefone inválido").max(20),
  mensagem: z.string().trim().min(5, "Escreva uma mensagem").max(1000, "Máximo 1000 caracteres"),
});

function Contato() {
  const [sending, setSending] = useState(false);
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = {
      nome: String(fd.get("nome") ?? ""),
      email: String(fd.get("email") ?? ""),
      telefone: String(fd.get("telefone") ?? ""),
      mensagem: String(fd.get("mensagem") ?? ""),
    };
    const parsed = contactSchema.safeParse(data);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Verifique os campos");
      return;
    }
    setSending(true);
    await new Promise((r) => setTimeout(r, 700));
    setSending(false);
    (e.target as HTMLFormElement).reset();
    toast.success("Mensagem enviada! Entraremos em contato em breve.");
  };

  return (
    <Section id="contato" className="bg-background">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeader
              center={false}
              eyebrow="Fale conosco"
              title={<>Vamos <span className="text-gold">conversar</span></>}
              subtitle="Envie sua mensagem. Nossa equipe terá alegria em te responder."
            />
            <ul className="mt-10 space-y-5">
              <li className="flex items-start gap-4">
                <div className="mt-1 grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary"><MapPin className="h-5 w-5" /></div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Endereço</p>
                  <p className="text-sm text-muted-foreground">Rua Rio Grande do Sul, Novo Paraíso — Aracaju/SE</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="mt-1 grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary"><Clock className="h-5 w-5" /></div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Cultos</p>
                  <p className="text-sm text-muted-foreground">Ter e Qui 19:30 · Sáb 08:00 · Dom 17:30</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="mt-1 grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary"><MessageCircle className="h-5 w-5" /></div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Redes</p>
                  <p className="text-sm text-muted-foreground">WhatsApp, Instagram, Facebook, YouTube e Spotify</p>
                </div>
              </li>
            </ul>
          </div>

          <motion.form
            variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
            onSubmit={onSubmit}
            className="rounded-2xl border border-border bg-card p-6 shadow-elegant sm:p-10"
            noValidate
          >
            <div className="grid gap-5">
              <Field icon={User} label="Nome" name="nome" type="text" placeholder="Seu nome completo" autoComplete="name" />
              <Field icon={Mail} label="E-mail" name="email" type="email" placeholder="voce@email.com" autoComplete="email" />
              <Field icon={Phone} label="Telefone" name="telefone" type="tel" placeholder="(00) 00000-0000" autoComplete="tel" />
              <div>
                <label htmlFor="mensagem" className="mb-2 block text-sm font-medium text-foreground">Mensagem</label>
                <textarea
                  id="mensagem" name="mensagem" rows={5} required maxLength={1000}
                  placeholder="Escreva sua mensagem..."
                  className="w-full resize-none rounded-lg border border-input bg-background px-4 py-3 text-sm outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <button
                type="submit" disabled={sending}
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-[#FE261E] px-7 py-3.5 text-sm font-semibold text-white shadow-soft transition hover:brightness-110 disabled:opacity-60"
              >
                {sending ? "Enviando..." : "Enviar Mensagem"}
                {!sending && <ArrowRight className="h-4 w-4" />}
              </button>
            </div>
          </motion.form>
        </div>
      </div>
    </Section>
  );
}

function Field({
  icon: Icon, label, name, type, placeholder, autoComplete,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string; name: string; type: string; placeholder: string; autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-sm font-medium text-foreground">{label}</label>
      <div className="relative">
        <Icon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          id={name} name={name} type={type} required placeholder={placeholder} autoComplete={autoComplete}
          className="w-full rounded-lg border border-input bg-background py-3 pl-10 pr-4 text-sm outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
      </div>
    </div>
  );
}

/* ---------------- FOOTER ---------------- */
function Footer() {
  return (
    <footer className="relative overflow-hidden bg-primary text-primary-foreground">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-3">
            <img src={LOGO} alt="Logo Mievre" className="h-14 w-14 object-contain" />
            <div className="flex flex-col leading-tight">
              <span className="font-display text-xl font-semibold">Mievre</span>
              <span className="text-[11px] uppercase tracking-[0.2em] text-gold-soft">Ministério do Evangelho do Reino</span>
            </div>
          </div>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-white/70">
            Uma igreja dedicada à Palavra, ao discipulado e ao cuidado das pessoas. Venha adorar conosco em Aracaju - SE.
          </p>
          <div className="mt-6 flex items-center gap-3">
            {REDES.map((s) => {
              const I = s.icon;
              return (
                <a
                  key={s.label} href={s.href} aria-label={s.label}
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-white/5 text-white transition hover:border-gold hover:bg-gold hover:text-primary"
                >
                  <I className="h-4 w-4" />
                </a>
              );
            })}
          </div>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-widest text-gold">Endereço</h3>
          <address className="mt-4 not-italic text-sm leading-relaxed text-white/75">
            Rua Rio Grande do Sul<br />
            Novo Paraíso<br />
            Aracaju - SE
          </address>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-widest text-gold">Horários</h3>
          <ul className="mt-4 space-y-2 text-sm text-white/75">
            <li>Terça · 19:30</li>
            <li>Quinta · 19:30</li>
            <li>Sábado · 08:00</li>
            <li>Domingo · 17:30</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-6 py-6 text-xs text-white/60 sm:flex-row">
          <p>© {new Date().getFullYear()} Mievre Ministério do Evangelho do Reino.</p>
          <p>Feito com fé em Aracaju - SE.</p>
        </div>
      </div>
    </footer>
  );
}

/* ---------------- FLOATING ---------------- */
function WhatsAppFloat() {
  return (
    <a
      href="https://wa.me/" target="_blank" rel="noopener noreferrer"
      aria-label="Fale conosco no WhatsApp"
      className="fixed bottom-6 right-6 z-40 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-elegant transition hover:scale-110"
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  );
}

function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (!show) return null;
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Voltar ao topo"
      className="fixed bottom-24 right-6 z-40 grid h-11 w-11 place-items-center rounded-full border border-gold/40 bg-background/90 text-primary shadow-soft backdrop-blur transition hover:bg-gold hover:text-primary"
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
}

// Unused imports kept intentionally minimal — remove the Flame if unused
void Flame;
