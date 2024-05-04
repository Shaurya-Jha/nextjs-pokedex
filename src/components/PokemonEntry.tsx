import usePokemon from "@/hooks/usePokemon"
import Image from "next/image";
import Link from "next/link"

export default function PokemonEntry({ name }: { name: string }) {

    const { pokemon, pokemonLoading } = usePokemon(name)

    console.log(pokemon);


    return (
        <Link href={'/' + name}>

            {pokemonLoading && <span className="loading loading-spinner loading-md my-4 bg-white text-white"></span>}

            {pokemon === null && <div className="my-4 bg-yellow-500 p-4 rounded-2xl">
                <p><span className="font-semibold">WARNING</span> - Pokemon not found!</p>
            </div>}

            {pokemon && <div className="card w-80 my-4 bg-white shadow-xl shadow-slate-400">
                <figure className="px-10 pt-10">
                    <Image height={200} width={200} alt={`${pokemon?.name}`} src={pokemon?.sprites?.other?.["official-artwork"]?.front_default} />
                </figure>
                <div className="card-body items-center text-center">
                    <p className="card-title capitalize">{pokemon?.name}</p>
{/* 
                    <div className="bg-black w-full h-[1px]"></div>

                    <p>
                        <strong>Types: </strong>{pokemon?.types.map(type => type?.type?.name).join(", ")}
                    </p> */}
                </div>
            </div>}
        </Link>
    )
}