import { useEffect } from "react";
import api from "../Configs/api";
import { getUserData } from "../Context/userContext";


function AuthInitializer() {
    const { setUser, setLoading } = getUserData();

    useEffect(() => {
        const initialize = async () => {
            const token = localStorage.getItem("accessToken");

            if (!token){
                setLoading(false);
                return;
            } 

            try {
                const res = await api.get("/api/auth/me", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setUser(res.data.user);
            } catch {
                localStorage.removeItem("accessToken");
            } finally {
                setLoading(false);
            }
        };

        initialize();
    }, []);

    return null;
}

export default AuthInitializer;