import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

export const metadata: Metadata = {
  title: "AI Pulse Korea",
  description: "AI 생태계 뉴스 포털 + OpenAI/Claude/Gemini 공식 업데이트 트래커",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <div className="min-h-screen">
          <Header />
          <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
