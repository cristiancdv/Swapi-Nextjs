"use client";
import { getPublicEnv } from "./env";
const config = {
    apiUrl: getPublicEnv().NEXT_PUBLIC_API_URL,
};

export default config;