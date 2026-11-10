import type { Metadata } from "next";
import AdminComments from "@/components/AdminComments";

export const metadata: Metadata = {
  title: "Moderate comments",
  robots: { index: false, follow: false },
};

export default function AdminCommentsPage() {
  return (
    <section className="min-h-[70vh] bg-paper px-4 py-14 md:py-20">
      <h1 className="display text-center text-[36px] text-ink md:text-[52px]">Reader comments</h1>
      <div className="mt-10">
        <AdminComments />
      </div>
    </section>
  );
}
