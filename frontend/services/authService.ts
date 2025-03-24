const API_URL = "http://localhost:8080/auth";

export const login = async (email: string, password: string) => {
    const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    });

    if (!response.ok) throw new Error("Error en la autenticación");

    const data = await response.json();
    localStorage.setItem("token", data.token); 
    return data;
};

export const register = async (fullName: string, email: string, password: string) => {
    const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: email, email, password })
    });

    if (!response.ok) throw new Error("Error en el registro");

    return await response.json();
};

export const logout = () => {
    localStorage.removeItem("token");
};


