import { getData } from "@/lib/data";
import { DataProvider } from "@/components/provider/data";
import { Screen } from "@/components/screen";

export default async function Home() {
  const data = await getData();

  return (
    <DataProvider data={data}>
      <main className="max-w-screen min-h-screen flex-col items-center justify-between overflow-hidden">
        <Screen />
      </main>
    </DataProvider>
  );
}
