import { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "React練習專案－記帳小工具",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-HANT">
      <body className="body">{children}</body>
    </html>
  );
}
