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
    const [chart, setChart] = useState([])

    useEffect(() => {



        chartData()

    }, [])


    async function fipeData(placa: string) {
        if (placa.length !== 7) return

        const data = await axios.post(
            "https://cluster-01.apigratis.com/api/v1/vehicles/dados",
            placa,
            {
                headers: {
                    "Content-Type": "application/json",
                    SecretKey: process.env.NEXT_PUBLIC_FIPE_API_SECRET_KEY,
                    PublicToken: "672ABC94262CVF7CE8262O0ZF35C46F0651A7",
                    DeviceToken: process.env.NEXT_PUBLIC_FIPE_API_DEVICE_TOKEN,
                    Authorization: `Bearer ${process.env.NEXT_PUBLIC_FIPE_API_AUTH_TOKEN}`,
                },
            }
        );

        console.log(data)


    }



    async function chartData() {
        const req = await axios.get(`https://parallelum.com.br/fipe/api/v2/cars/003232-8/years/2007-1/history`)

        const res = req.data.priceHistory.map((t: { month: string; price: string; }) => ({
            x: t.month,
            y: Number(t.price.split("R$")[1].trim().split(",")[0]),
        })).reverse()

        setChart(res)
    }


    // teste
    const result = dataInfo;
    // const priceThreeMonths = priceInfo?.priceHistory
    //     .map((t) => ({
    //         x: t.month,
    //         y: Number(t.price.split("R$")[1].trim().split(",")[0]),
    //     }))
    //     .reverse();

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        fipeData(state);

        setState("");
    }

    return (
        <div className="flex items-center justify-center gap-8 flex-row min-h-screen">
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

            <>
                <div className="info">
                    <img src={result.logo} alt="" />
                    <h3>{result.Modelo}</h3>
                    <p>{result.AnoModelo}</p>
                    <p>{result.cor}</p>
                </div>
                <div>
                    <ChartComponent priceThreeMonths={chart} />
                </div>
            </>
        </div>
    );
}

export default Home;
