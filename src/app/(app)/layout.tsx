import type { Metadata } from "next";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import Main from "@/components/layout/main";
import LogoutButton from "@/components/features/logout-button";

export const metadata: Metadata = {
  title: "scaf-next",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header>
        <LogoutButton />
      </Header>
      <Main>
        {children}
      </Main>
      <Footer />
    </>
  );
}
