"use client";
import useSWR, { SWRResponse} from "swr";
import { fetchEntity } from "@/services/fetchEntity";
import  config  from "@/config/config";

export function useEntityAllData<T>(endpoint: string) : SWRResponse<T> {
    const { apiUrl } = config;
    const url = apiUrl.endsWith('/') ? apiUrl + endpoint : apiUrl + '/' + endpoint;
    return useSWR<T>(url,fetchEntity);
};