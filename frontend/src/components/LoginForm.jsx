function LoginForm({ credentials, setCredentials, onLogin }) {
    return (
        <div className="w-full flex justify-center">
            <form
                onSubmit={onLogin}
                className="w-full max-w-md space-y-4 bg-white dark:bg-zinc-900 p-6 rounded shadow"
            >
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
        </div>
    );
}

export default LoginForm;
