import { Screen } from "@/components/screen";
import { ThemeSwitch } from "@/components/widgets/theme-switch";

export default function Home() {
  return (
    <main className="max-w-screen min-h-screen flex-col items-center justify-between overflow-hidden">
      <Screen />
      <ThemeSwitch />
    </main>
  );
}
