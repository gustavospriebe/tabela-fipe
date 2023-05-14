"use client";

import useFipe from "@/hooks/useFipe";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import { FormEvent, useEffect, useState } from "react";

import ChartComponent from "./chart";

const dataInfo = {
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

const priceInfo = {
    priceHistory: [
        {
            price: "R$ 23.983,00",
            month: "maio de 2023",
            reference: "297",
        },
        {
            price: "R$ 23.172,00",
            month: "abril de 2023",
            reference: "296",
        },
        {
            price: "R$ 23.289,00",
            month: "março de 2023",
            reference: "295",
        },
    ],
};

function Home() {
    const [state, setState] = useState("");
    const [fipe, setFipe] = useState("teste");

    const { data } = useQuery({
        queryKey: ["price", fipe],
        queryFn: () =>
            axios.get(
                `https://parallelum.com.br/fipe/api/v2/cars/${result.CodigoFipe}/years/${result.AnoModelo}-1/history`
            ),
    });

    // teste
    const result = dataInfo;
    const priceThreeMonths = priceInfo?.priceHistory
        .map((t) => ({
            x: t.month,
            y: Number(t.price.split("R$")[1].trim().split(",")[0]),
        }))
        .reverse();

    // const result = useFipe(fipe);
    // const priceThreeMonths = data?.data.priceHistory
    //     .map((t) => ({
    //         x: t.month,
    //         y: Number(t.price.split("R$")[1].trim().split(",")[0]),
    //     }))
    //     .reverse();

    console.log(priceThreeMonths);

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();

        setFipe(state);

        setState("");
    }

    return (
        <div className="flex items-center justify-center gap-8 flex-col min-h-screen md:flex-row">
            <form
                onSubmit={handleSubmit}
                className="flex gap-4 items-center justify-center "
            >
                <input
                    className="border border-black p-1 rounded"
                    placeholder="Insira placa"
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                />
                <button className="border border-black rounded p-1">
                    Enviar
                </button>
            </form>

            {result && (
                <>
                    <div className="info">
                        <Image
                            src={result.logo}
                            alt=""
                            width={150}
                            height={150}
                        />
                        <h3>{result.Modelo}</h3>
                        <p>{result.AnoModelo}</p>
                        <p>{result.cor}</p>
                    </div>
                    <div>
                        <ChartComponent priceThreeMonths={priceThreeMonths} />
                    </div>
                </>
            )}
        </div>
    );
}

export default Home;
