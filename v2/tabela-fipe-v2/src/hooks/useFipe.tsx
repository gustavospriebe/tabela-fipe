import { useQuery } from "@tanstack/react-query";
import fetchFipe from "@/utils/fetchFipe";

function useFipe(placa: string) {
    // console.log(placa);

    const result = useQuery(["fipe", placa], fetchFipe);

    return result?.data?.data?.response;
}

export default useFipe;
