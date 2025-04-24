"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import styles from "../../styles/Home.module.css";

import CharacterCard from "@/components/CharacterCard";

export default function Home() {
  const [search, setSearch] = useState("");
  const [characters, setCharacters] = useState([]);
  const [notFound, setNotFound] = useState(false);

  const fetchCharacters = async (name = "") => {
    try {
      const { data } = await axios.get(
        `https://rickandmortyapi.com/api/character/?name=${name}`
      );
      setCharacters(data.results);
    } catch (error) {
      console.error("Error fetching characters:", error);
      setNotFound(true);
      setCharacters([]);
    }
  };

  useEffect(() => {
    fetchCharacters();
  }, []);

  const handleCardClick = (name) => {
    toast.info(`Você clicou em ${name}`);
  };

  return (
    <div className={styles.container}>
      <ToastContainer
        position="top-right" // "top-right", "top-center", "top-left", "bottom-right", "bottom-center", "bottom-left"
        autoClose={7500} // tempo em milissegundos para o toast fechar automaticamente
        theme="light" // tema do toast, pode ser "light", "dark" ou "colored"
      />

      <div className={styles.searchContainer}>
        <input
          className={styles.searchInput}
          type="text"
          placeholder="Digite o nome do personagem..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button
          className={styles.searchButton}
          onClick={() => fetchCharacters(search.trim())}
        >
          Buscar
        </button>

        <button
          className={styles.resetButton}
          onClick={() => {
            setSearch("");
            fetchCharacters();
          }}
        >
          Resetar
        </button>
      </div>
      {notFound && <h1 className={styles.notFound}> Nenhum personagem</h1>}
      <div className={styles.grid}>
        {characters.map((char) => (
          <CharacterCard
            key={char.id}
            character={char}
            onClick={() => handleCardClick(char.name)}
          />
        ))}
      </div>
    </div>
  );
}
