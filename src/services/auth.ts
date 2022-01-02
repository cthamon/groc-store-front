import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import axios from "./axios";
import { useAppDispatch } from "../store/store";
import { setUser } from "../store/slices/authSlice";

const AuthService = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();

    const [accessToken, setAccessToken] = useState("");
    const [refreshToken, setRefreshToken] = useState("");
    const [tokenLoading, setTokenLoading] = useState(true);

    const refreshAccessToken = async () => {
        try {
            const { data } = await axios.post("api/user/refresh", { refreshToken });
            setAccessToken(data.accessToken);
            localStorage.setItem("accessToken", data.accessToken);
        } catch (error: any) {
            if (error.response.data[0].message === "jwt expired") {
                router.push("/signin");
            }
        }
    };

    const getUser = async () => {
        try {
            const { data } = await axios.get("/api/user/me", { headers: { 'Authorization': `Bearer ${accessToken}` } });
            dispatch(setUser(data));
        } catch (error: any) {
            if (error.response.data[0].message === "jwt expired") {
                refreshAccessToken();
            }
        }
    };

    useEffect(() => {
        setAccessToken(localStorage.getItem("accessToken") || "");
        setRefreshToken(localStorage.getItem("refreshToken") || "");
        setTokenLoading(false);
        if (!tokenLoading) {
            if (refreshToken) {
                getUser();
            } else if (!refreshToken) {
                router.push("/signin");
            }
        }
    }, [tokenLoading, accessToken]);

    return {};
};

export default AuthService;