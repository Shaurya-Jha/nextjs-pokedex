'use client'

import { useRouter } from "next/router"
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import usePokemon from "@/hooks/usePokemon";

export default function PokemonDetailsPage() {

    const router = useRouter()
    console.log('Router: ', router);

    console.log('Router query: ', router.query);

    const pokemonName = router.query.pokemon?.toString() || ""

    const { pokemon, pokemonLoading } = usePokemon(pokemonName)

    return (
        <>
            <Head>
                {pokemon && <title>{pokemon.name} - Pokedex</title>}
            </Head>

            <div className="flex flex-col items-center justify-center py-[50px]">
                <p className="text-xl hover:text-blue-600 visited:text-purple-600 text-white">
                    <Link href={'/'}>Pokedex</Link>
                </p>

                {pokemonLoading && <span className="loading loading-spinner loading-md my-4 bg-white text-white"></span>}

                {pokemon === null && <div className="my-4 bg-yellow-500 p-4 rounded-2xl">
                        <p><span className="font-semibold">WARNING</span> - Pokemon not found!</p>
                    </div>}

                {pokemon && (
                    <div>
                        <div className="card w-80 shadow-xl shadow-slate-400 my-4 bg-white">
                            <figure className="px-10 pt-10">
                                <Image src={pokemon?.sprites.other["official-artwork"].front_default} alt={pokemon?.name} width={250} height={250} />
                            </figure>
                            <div className="card-body items-center text-center">
                                <p className="card-title capitalize">{pokemon?.name}</p>

                                <div className="bg-black w-full h-[1px]"></div>

                                <p>
                                    <strong>Types: </strong>{pokemon?.types.map(type => type?.type?.name).join(", ")}
                                </p>

                                <p>
                                    <strong>Height: </strong>{pokemon?.height * 10} cm
                                </p>

                                <p>
                                    <strong>Weight: </strong>{pokemon?.weight / 10} kg
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}