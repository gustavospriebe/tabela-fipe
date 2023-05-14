import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

const sendPlacaFipeReq = (placa) => {
    if (placa.length !== 7) return;

    return axios.post(
        "https://cluster-01.apigratis.com/api/v1/vehicles/dados",
        placa,
        {
            headers: {
                "Content-Type": "application/json",
                SecretKey: import.meta.env.VITE_PUBLIC_FIPE_API_SECRET_KEY,
                PublicToken: "672ABC94262CVF7CE8262O0ZF35C46F0651A7",
                DeviceToken: import.meta.env.VITE_PUBLIC_FIPE_API_DEVICE_TOKEN,
                Authorization: `Bearer ${
                    import.meta.env.VITE_PUBLIC_FIPE_API_AUTH_TOKEN
                }`,
            },
        }
    );
};

export const fetchPlacaFipeData = () => {
    return useMutation(sendPlacaFipeReq);
};

// export const fetchThreeMonthsPrice = async () => {
//     const req = await axios.get(
//         `https://parallelum.com.br/fipe/api/v2/cars/${result.CodigoFipe}/years/${result.AnoModelo}-1/history`
//     );
// };
