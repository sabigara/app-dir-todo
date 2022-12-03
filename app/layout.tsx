import { LayoutProps } from "../types";
import { Inter } from "@next/font/google";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Suspense } from "react";
import SidebarLoading from "./Sidebar/Loading";

import "../styles/globals.css";
import styles from "./layout.module.css";

const inter = Inter({
  subsets: ["latin"],
});

export default async function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en" className={inter.className}>
      <body className={styles.body}>
        <Header className={styles.header} />
        <Suspense fallback={<SidebarLoading />}>
          {/* @ts-ignore */}
          <Sidebar className={styles.sidebar} />
        </Suspense>
        <main className={styles.content}>{children}</main>
      </body>
    </html>
  );
}
