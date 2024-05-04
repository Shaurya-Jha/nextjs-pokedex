import { Pokemon, PokemonPage } from "@/models/Pokemon";
import api from "./axiosInstance";

export async function getPokemon(name: string) {
    // adding custom delay for showing loading screen effect
    const delay = Math.random() * 2000;
    await new Promise (r => setTimeout(r, delay))

    const response = await api.get<Pokemon>('/pokemon/'+name);
    console.log(response.data);
    return response.data;
}

export async function getPokemonPage(page: number) {
    const pageSize = 12;

    const response = await api.get<PokemonPage>(`/pokemon?limit=${pageSize}&offset=${pageSize * (page - 1)}`);
    console.log(response.data);
    return response.data;
}