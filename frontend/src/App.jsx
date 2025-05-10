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
        <div className="p-8 max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                What Car Am I Going to Buy?
            </h1>

            {!auth.token && (
                <form onSubmit={handleLogin} className="mb-8 space-y-4 bg-white dark:bg-zinc-900 p-6 rounded shadow">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Login</h2>
                    <input
                        type="text"
                        placeholder="Username"
                        value={credentials.username}
                        onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-zinc-700 rounded bg-white dark:bg-zinc-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={credentials.password}
                        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-zinc-700 rounded bg-white dark:bg-zinc-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded font-semibold transition duration-150"
                    >
                        Login
                    </button>
                </form>
            )}

            <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-zinc-900 p-6 rounded shadow-md">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Add a New Car</h2>
                {Object.keys(formData).map((key) => (
                    <div key={key}>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 capitalize">
                            {key}
                        </label>
                        <input
                            type="text"
                            name={key}
                            value={formData[key]}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                ))}

                <button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md font-semibold transition duration-150"
                >
                    Add Car
                </button>
            </form>

            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mt-10 mb-4">
                My Car List
            </h2>
            <ul className="list-disc pl-5 text-gray-800 dark:text-gray-100 space-y-2">
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
