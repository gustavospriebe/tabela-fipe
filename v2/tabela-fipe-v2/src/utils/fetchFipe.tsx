import axios from "axios";

async function fetchFipe({ queryKey }: any) {
    const placa = queryKey[1];

    // console.log(placa);

    if (placa.length !== 7) return;

    

    return data;
}

export default fetchFipe;
