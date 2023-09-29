"use client"
import { PokemonCard } from "./pokemon-card";
import Pagination from "./pagination";
import { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

interface PokemonGridProps {
  pokemonList: any;
}

export function PokemonGrid({ pokemonList }: PokemonGridProps) {
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const searchFilter = (pokemonList: any) => {
    return pokemonList.filter((pokemon: any) =>
      pokemon.name.toLowerCase().includes(searchText.toLowerCase())
    );
  };

  const filteredPokemonList = searchFilter(pokemonList);
  const totalPages = Math.ceil(filteredPokemonList.length / pageSize);

  const getCurrentPagePokemon = () => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return filteredPokemonList.slice(startIndex, endIndex);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <div>
        <h3 className="text-2xl py-6 text-center">Search For Your Pokemon!</h3>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="pokemonName">Pokemon Name</Label>
          <Input
            type="text"
            value={searchText}
            autoComplete="off"
            id="pokemonName"
            placeholder="Charizard, Pikachu, etc."
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
        <h3 className="text-3xl pt-12 pb-6 text-center">Pokemon Collection</h3>
      </div>


      <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-3 lg:text-left">
        {getCurrentPagePokemon().map((pokemon: any) => {
            return <PokemonCard name={pokemon.name} key={pokemon.name + "Card"} />;
        })}
      </div>

      <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
    </>
  );
}
