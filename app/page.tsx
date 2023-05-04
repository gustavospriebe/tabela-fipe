"use client";

import Image from "next/image";
import { Inter } from "next/font/google";
import { FormEvent, useEffect, useState } from "react";
import axios from "axios";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
    const [placa, setPlaca] = useState("");
    const [state, setState] = useState("");
    const [carInfo, setCarInfo] = useState<[]>([]);

    function handleSubmit(event: FormEvent) {
        event.preventDefault();

        setPlaca(state);
        setState("");
    }
    console.log(carInfo);

    // ta funcionando, agora migra pra react query e usa zustand pra tirar daqui
    useEffect(() => {
        async function req() {
            const data = await axios.post(
                "https://cluster-01.apigratis.com/api/v1/vehicles/dados",
                { placa: placa },
                {
                    headers: {
                        "Content-Type": "application/json",
                        SecretKey: process.env.NEXT_PUBLIC_FIPE_API_SECRET_KEY,
                        PublicToken: "672ABC94262CVF7CE8262O0ZF35C46F0651A7",
                        DeviceToken:
                            process.env.NEXT_PUBLIC_FIPE_API_DEVIDE_TOKEN,
                        Authorization: `Bearer ${process.env.NEXT_PUBLIC_FIPE_API_AUTH_TOKEN}`,
                    },
                }
            );

            setCarInfo(data);
        }

        // req();
    }, [placa]);

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                />
                <button>Enviar</button>
            </form>
            <h2>{carInfo?.data?.response?.Modelo}</h2>
        </div>
    );
}
