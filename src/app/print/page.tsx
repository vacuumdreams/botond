import { ScreenPrint } from "@/components/screen-print";

export default async function Home() {
  return (
    <main className="max-w-screen min-h-screen flex-col items-center justify-between overflow-hidden text-xs">
      <ScreenPrint />
    </main>
  );
}
