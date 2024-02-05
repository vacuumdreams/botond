import { getData } from "@/lib/data";
import { Intro } from "@/components/widgets/intro";

export default async function Home() {
  const data = await getData();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <article className="container">
        <div className="mt-24">
          <Intro data={data} />
        </div>
      </article>
    </main>
  );
}
