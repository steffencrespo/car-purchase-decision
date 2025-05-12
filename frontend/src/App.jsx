import { useState } from "react";
import LoginForm from './components/LoginForm';
import CarForm from './components/CarForm';
import CarList from './components/CarList';

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

    const [carList, setCarList] = useState([
        {
            make: "Toyota",
            model: "Corolla",
            year: "2020",
            trim: "XEi",
            engine: "2.0 Flex",
            listedPrice: "R$ 98.000",
            sellerName: "AutoShopping SP",
            dealerUrl: "https://www.toyotabrasil.com.br",
            comments: "Bem conservado, única dona."
        },
        {
            make: "Honda",
            model: "Civic",
            year: "2018",
            trim: "EXL",
            engine: "2.0",
            listedPrice: "R$ 91.500",
            sellerName: "Particular",
            dealerUrl: "https://www.honda.com.br",
            comments: "Revisões feitas, pneus novos."
        }
    ]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleRemoveCar = (indexToRemove) => {
        setCarList(prev => prev.filter((_, i) => i !== indexToRemove));
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
        <div className="min-h-screen bg-gray-100 dark:bg-zinc-900 text-gray-800 dark:text-gray-100">
            <header className="p-6 bg-white dark:bg-zinc-800 shadow">
                <div className="max-w-5xl mx-auto flex items-center justify-between">
                    <h1 className="text-2xl font-bold">What Car Am I Going to Buy?</h1>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
                        Toggle Dark Mode
                    </button>
                </div>
            </header>

            <main className="max-w-5xl mx-auto px-4 py-8 grid gap-8 md:grid-cols-2">
                <div className="space-y-8">
                    {!auth.token && (
                        <LoginForm
                            credentials={credentials}
                            setCredentials={setCredentials}
                            onLogin={handleLogin}
                        />
                    )}

                    <CarForm
                        formData={formData}
                        onChange={handleChange}
                        onSubmit={handleSubmit}
                    />
                </div>

                <div>
                    <CarList carList={carList} onRemove={handleRemoveCar} />
                </div>
            </main>
        </div>
    );
}

export default App;
