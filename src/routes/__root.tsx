import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Página não encontrada</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          A página que você procura não existe ou foi movida.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Voltar ao início
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold">Esta página não carregou</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Algo deu errado. Tente novamente ou volte para o início.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Tentar novamente
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent"
          >
            Início
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        title:
          "Mievre Ministério do Evangelho do Reino | Igreja Evangélica em Aracaju",
      },
      {
        name: "description",
        content:
          "Conheça o Mievre Ministério do Evangelho do Reino, uma igreja evangélica em Aracaju dedicada à pregação do Evangelho, discipulado e adoração a Deus. Venha participar dos nossos cultos.",
      },
      {
        name: "keywords",
        content:
          "igreja em Aracaju, igreja evangélica Aracaju, culto Aracaju, igreja gospel Sergipe, Ministério do Evangelho do Reino",
      },
      { name: "author", content: "Mievre" },
      {
        property: "og:title",
        content:
          "Mievre Ministério do Evangelho do Reino | Igreja Evangélica em Aracaju",
      },
      {
        property: "og:description",
        content:
          "Um lugar para encontrar Deus, fortalecer sua fé e viver o Evangelho do Reino. Participe dos nossos cultos em Aracaju.",
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Mievre" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: "Mievre Ministério do Evangelho do Reino",
      },
      {
        name: "twitter:description",
        content:
          "Igreja evangélica em Aracaju — cultos, discipulado e comunhão.",
      },
      { name: "theme-color", content: "#0F3D75" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      {
        rel: "icon",
        type: "image/png",
        href: "/__l5e/assets-v1/c73ddcb3-9f7e-46c6-9ef7-a9563e6a8f1b/mievre-logo.png",
      },
      {
        rel: "apple-touch-icon",
        href: "/__l5e/assets-v1/c73ddcb3-9f7e-46c6-9ef7-a9563e6a8f1b/mievre-logo.png",
      },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700&family=Inter:wght@300;400;500;600;700&display=swap",
      },
    ],

    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Church",
          name: "Mievre Ministério do Evangelho do Reino",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Rua Rio Grande do Sul - Novo Paraíso",
            addressLocality: "Aracaju",
            addressRegion: "SE",
            postalCode: "49082-000",
            addressCountry: "BR",
          },
          areaServed: "Aracaju, SE",
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
