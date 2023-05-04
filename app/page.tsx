"use client";

import { FormEvent, useEffect, useState } from "react";
import useFipe from "@/hooks/useFipe";
import Image from "next/image";

const data = {
    AnoModelo: "2007",
    Autenticacao: "11smn9w7lpc",
    CodigoFipe: "003232-8",
    Combustivel: "Gasolina",
    DataConsulta: "sexta-feira, 21 de outubro de 2022 17:13",
    Marca: "Ford",
    MesReferencia: "abril de 2023",
    Modelo: "Ka XR 1.6 MPI 8V",
    SiglaCombustivel: "G",
    TipoVeiculo: 1,
    Valor: "R$ 23.172,00",
    chassi: "9BFBLZGDA7B608374",
    cilindradas: "10.0",
    cor: "Preta",
    extra: true,
    ipva: "R$ 463,44",
    logo: "https://apiplaca.com.br/logo/ford.png",
    municipio: "TUBARAO",
    origem: "NACIONAL",
    potencia: "65",
    renavam: "Não encontrado",
    situacao: "Sem restrição",
    uf: "SC",
};

function Home() {
    const [state, setState] = useState("");
    const [fipe, setFipe] = useState("");

    // const result = useFipe(fipe);
    const result = data;

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();

        setFipe(state);

        setState("");
    }

    console.log(result);

    return (
        <div className="app">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                />
                <button>Enviar</button>
            </form>

            {result && (
                <div className="info">
                    <Image src={result.logo} alt="" width={150} height={150} />
                    <h3>{result.Modelo}</h3>
                    <p>{result.AnoModelo}</p>
                    <p>{result.cor}</p>
                    <p>{result.Valor}</p>
                </div>
            )}
        </div>
    );
}

export default Home;
