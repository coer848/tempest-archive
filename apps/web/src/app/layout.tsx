import type { Metadata } from "next";
import { Fraunces, JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Tempest Archive — Archivo Analítico del Gran Sabio",
    template: "%s | Tempest Archive",
  },
  description:
    "Wiki colaborativa en español y grafo interactivo de relaciones sobre el universo de Tensei Shitara Slime Datta Ken, con control de spoilers por nivel.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${fraunces.variable} ${plusJakarta.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-[100dvh] flex flex-col antialiased">
        <div className="flex-1">{children}</div>
        <footer className="border-t border-[var(--border-subtle)] py-6 px-4 text-xs text-[var(--text-muted)]">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <p>
              <strong>Aviso legal:</strong> Tempest Archive es un proyecto académico y de fans sin
              fines de lucro. No posee afiliación con Fuse, Mitz Vah, Kodansha ni 8bit Studio. Todos
              los resúmenes son redacción 100 % original.
            </p>
            <p className="font-mono-sage shrink-0">NÚCLEO ANALÍTICO · v0.1.0</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
