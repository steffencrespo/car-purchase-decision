import { useState } from "react";

function App() {
    const [auth, setAuth] = useState({
        token: null,
        userId: null
    });

    const [credentials, setCredentials] = useState({
        username: "",
        password: ""
    });

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const loginRes = await fetch("http://localhost:8080/api/auth/login", {
                method: "GET",
                headers: {
                    Authorization: "Basic " + btoa(`${credentials.username}:${credentials.password}`)
                }
            });

            if (!loginRes.ok) throw new Error("Invalid credentials");

            const { authToken } = await loginRes.json();

            const userRes = await fetch(`http://localhost:8080/api/users/userId/${credentials.username}`, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            });

            if (!userRes.ok) throw new Error("Could not fetch user ID");

            const userData = await userRes.json();

            setAuth({ token: authToken, userId: userData.id });
            setCredentials({ username: "", password: "" });

        } catch (err) {
            alert("Login failed");
            console.error(err);
        }
    };

    const [formData, setFormData] = useState({
        make: "",
        model: "",
        year: "",
        trim: "",
        engine: "",
        dealerUrl: "",
        listedPrice: "",
        sellerName: "",
        comments: ""
    });

    const [carList, setCarList] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.model || !formData.make) return;

        try {
            const response = await fetch("http://localhost:8080/purchaseList", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${auth.token}`
                },
                body: JSON.stringify({
                    ...formData,
                    userId: auth.userId,
                })
            });

            if (!response.ok) throw new Error("Erro ao enviar dados");

            const result = await response.json();
            setCarList([...carList, result]);

            setFormData({
                make: "",
                model: "",
                year: "",
                trim: "",
                engine: "",
                dealerUrl: "",
                listedPrice: "",
                sellerName: "",
                comments: ""
            });

        } catch (err) {
            console.error(err);
            alert("Erro ao salvar carro");
        }
    };

    return (
        <div style={{ padding: "2rem", maxWidth: "600px", margin: "auto" }}>
            <h1>What Car Am I Going to Buy?</h1>

            {!auth.token && (
                <form onSubmit={handleLogin}>
                    <h2>Login</h2>
                    <input
                        type="text"
                        placeholder="Username"
                        value={credentials.username}
                        onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={credentials.password}
                        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                    />
                    <button type="submit">Login</button>
                </form>
            )}

            <form onSubmit={handleSubmit}>
                {Object.keys(formData).map((key) => (
                    <div key={key} style={{ marginBottom: "0.5rem" }}>
                        <label style={{ display: "block", fontWeight: "bold" }}>
                            {key.charAt(0).toUpperCase() + key.slice(1)}:
                        </label>
                        <input
                            type="text"
                            name={key}
                            value={formData[key]}
                            onChange={handleChange}
                            style={{ width: "100%" }}
                        />
                    </div>
                ))}
                <button type="submit">Add Car</button>
            </form>

            <h2 style={{ marginTop: "2rem" }}>My Car List</h2>
            <ul>
                {carList.map((car, index) => (
                    <li key={index}>
                        <strong>{car.make} {car.model}</strong> — {car.year}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
