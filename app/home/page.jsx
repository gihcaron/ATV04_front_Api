"use client";

import { useRef, useEffect, useState } from "react";
import axios from "axios";
import styles from "../../styles/Home.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CharacterCard from "@/components/CharacterCard";
import Loader from "@/components/Loader";

export default function Home() {
  const [search, setSearch] = useState("");
  const [characters, setCharacters] = useState([]);
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const cacheRef = useRef(new Map())
  
  const fetchCharacters = async (name = "", pageNumber = 1) => {
    setLoading(true);
    const cache = cacheRef.current;
    const cacheKey = `${name}-${pageNumber}`;
    const nextPageNumber = pageNumber + 1;
    const nextCacheKey = `${name}-${nextPageNumber}`;

    const cleanCacheIfNeeded = () => {
      while (cache.size > 5) {
        const firstKey = cache.keys().next().value;
        cache.delete(firstKey);
        console.log(`♻️ Removido do cache: ${firstKey}`)

      }
    };
    console.log("🟢🟢 BUSCA FOI INICIALIZADA 🟢🟢");
    console.log(` Cache anterior ${cache.size} páginas` )

    let total = totalPages;

    if (cache.has(cacheKey)) {
      const cached = cache.get(cacheKey);
      setCharacters(cached.results);
      setTotalPages(cached.totalPages);
      total = cached.totalPages;
      setNotFound(false);
      setLoading(false);
      console.log(` O cache: ${cacheKey} está sendo usado 😆😆`);
    } else {

    try {
      const { data } = await axios.get(
        `https://rickandmortyapi.com/api/character/?name=${name}`
      );
      cleanCacheIfNeeded();
      cache.set(cacheKey,{
        results: data.results,
        totalPages: data.info.pages,

      }
      );

      setCharacters(data.results);
      setTotalPages(data.info.pages);
      total = data.info.pages;
      setNotFound(false);
      console.log(` 📜 Armazenando no cache: ${cacheKey}`)

    } catch (error) {
      console.error("Error fetching characters:", error);
      setCharacters([]);
      setNotFound(true);
    }
    finally {
      setLoading(false);
    }

    if (nextPageNumber <= total && !cache.has(nextCacheKey)) {
    try { 
      const res = await axios.get( 
        `https://rickandmortyapi.com/api/character/?name=${name}&page=${pageNumber}`
      )
      cleanCacheIfNeeded();
      cache.set(nextCacheKey, {
        results: res.data.results,
        totalPages: res.data.info.pages,
      });
      console.log(`💾 Salvo no cache: ${nextCacheKey}`);

    } catch (err) {
      console.log(`❌ Prefetch falhou: ${nextCacheKey}`, err);
    }
  }else {
    console.log("ℹ️ Prefetch ignorado: já no cache ou fora do limite")
  }
  console.log(`🔄 Cache final: ${cache.size} páginas`);
  for (const [key,value] of cache.entries()) {
    console.log(`📦 &{key: ${value.results.length}} personagens`)
  }
  console.log("============== BUSCA FINALIZADA ==============\n")
    };
  };


  useEffect(() => {
    fetchCharacters(search.trim(), page);
  }, [page]);
  
  useEffect(() => {
    fetchCharacters(search, page)
  }, [search])

const handleSearch = () => {
  const name = search.trim();
  setPage(1); 
  fetchCharacters(name, 1);
};

  const handleReset = () => {
    setSearch("");
    setPage(1); 
    fetchCharacters("", 1);
    toast.success("Filtro resetado com sucesso!", {position: "top-left" });
  }

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
          onClick={(handleSearch) => fetchCharacters(search.trim())}
        >
          Buscar
        </button>

        <button
          className={styles.resetButton}
          onClick={(handleReset) => {
            setSearch("");
            fetchCharacters();
          }}
        >
          Resetar
        </button>
      </div>

      <div className={styles.navControls}>

          <button className={styles.buttonNav}
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
          >
           Página Anterior
          </button>

          <span className={styles.pageNumber}>
          Pagina {page} de {totalPages}
          </span>

          <button className={styles.buttonNav}
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          disabled={page === totalPages}
          >
           Próxima Página
          </button>
      </div>
      {notFound && <h1 className={styles.notFound}> Nenhum personagem encontrado 😥</h1>}

      {loading ? (
                <div className={`${styles.loaderWrapper} ${loading ? "" : styles.hidden}`}>
                    <Loader />
                </div>
            ) : (

      <div className={styles.grid}>
        {characters.map((char) => (
          <CharacterCard
            key={char.id}
            character={char}
            onClick={() => handleCardClick(char.name)}
          />
        ))}
      </div>
      )}
    </div>
  );
}
