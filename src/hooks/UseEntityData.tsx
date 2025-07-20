"use client";
import useSWR, { SWRResponse} from "swr";
import { fetchEntity } from "@/services/fetchEntity";
import  config  from "@/config/config";

export function useEntityAllData<T>(endpoint: string,page:number) : SWRResponse<T> {
    const { apiUrl } = config;
    let url = apiUrl.endsWith('/') ? apiUrl + endpoint : apiUrl + '/' + endpoint;
    if(page > 1) {
        url += '?page=' + page;
    }
    return useSWR<T>(url,fetchEntity);
};

export function useEntityOneData<T>(endpoint:string,id:number) : SWRResponse<T> {
    const {apiUrl} = config;
    const url = apiUrl.endsWith('/') ? apiUrl + endpoint + '/' + id : apiUrl + '/' + endpoint + '/' + id;
    return useSWR<T>(url,fetchEntity);
}