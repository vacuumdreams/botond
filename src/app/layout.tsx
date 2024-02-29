import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Botond Fekete",
  description: "Botond Fekete's personal website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="print:light dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cutive+Mono&family=Protest+Guerrilla&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdn.jsdelivr.net/gh/devicons/devicon@2.16.0/devicon.min.css"
        />
      </head>
      <body className="font-mono">{children}</body>
    </html>
  );
}
