import axios from "axios";



async function fetchFipe({ queryKey }: any) {
    const placa = queryKey[1];

    // console.log(placa);

    if (placa.length !== 7) return;

    const data = await axios.post(
        "https://cluster-01.apigratis.com/api/v1/vehicles/dados",
        { placa: placa },
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

    return data;
}

export default fetchFipe;
