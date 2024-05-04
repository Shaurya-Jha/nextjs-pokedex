import Image from "next/image";
import { Inter } from "next/font/google";
import Head from "next/head";
import PokemonEntry from "@/components/PokemonEntry";
import { useRouter } from "next/router";
import useSWR from "swr";
import * as PokemonApi from "@/network/pokemon-api"

const inter = Inter({ subsets: ["latin"] });

export default function Home() {

  const router = useRouter()

  const page = parseInt(router.query.page?.toString() || "1");

  const { data, isLoading } = useSWR(["getPokemonPage", page], () => PokemonApi.getPokemonPage(page))

  if (isLoading) return <div className="my-4 bg-yellow-500 p-4 rounded-2xl">
    <p><span className="font-semibold">WARNING</span> - Pokemon not found!</p>
  </div>

  return (
    <main className={`${inter.className} flex justify-center flex-col gap-4 items-center`}>
      <Head>
        <title>NextJS Pokedex</title>
        <meta name="description" content="NextJS Pokedex app by Kakashi" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="my-4 py-4">
        <p className="text-[30px] underline decoration-wavy decoration-white text-red-500 font-semibold">Gotta cache &apos;em all !!</p>
      </div>

      <div className="grid grid-cols-4 justify-center gap-[100px] items-center mt-[50px]">
        {/* <PokemonEntry name={"bulbasaur"} /> */}

        {data?.results?.map((response) => (
          <div>
            <PokemonEntry key={response?.name} name={response?.name} />
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-[100px] items-center my-[50px]">
        {data?.previous && <button className="btn btn-error text-white" onClick={() => router.push({ query: { ...router.query, page: page - 1 } })}>Previous</button>}

        {data?.next && <button className="btn btn-error text-white" onClick={() => router.push({ query: { ...router.query, page: page + 1 } })}>Next</button>}
      </div>

    </main>
  );
}
