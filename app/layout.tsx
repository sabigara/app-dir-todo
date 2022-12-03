import { LayoutProps } from "../types";
import { Inter } from "@next/font/google";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Suspense } from "react";

import { prisma } from "../lib/db";
import { sleep } from "../lib/sleep";

import "../styles/globals.css";
import styles from "./layout.module.css";

const inter = Inter({
  subsets: ["latin"],
});

async function getData() {
  await sleep(1000);
  return prisma.todo.findMany();
}

export default async function RootLayout({ children }: LayoutProps) {
  const todoList = await getData();
  return (
    <html lang="en" className={inter.className}>
      <body className={styles.body}>
        <Header className={styles.header} />
        <Sidebar todoList={todoList} className={styles.sidebar} />
        <main className={styles.content}>{children}</main>
      </body>
    </html>
  );
}
