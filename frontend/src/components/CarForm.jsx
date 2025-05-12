function CarForm({ formData, onChange, onSubmit }) {
    return (
        <div className="w-full flex justify-center">
            <form
                onSubmit={onSubmit}
                className="w-full max-w-md space-y-6 bg-white dark:bg-zinc-900 p-6 rounded shadow-md"
            >
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
                    Add a New Car
                </h2>
                {Object.keys(formData).map((key) => (
                    <div key={key} className="space-y-1">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            {key}
                        </label>
                        <input
                            type="text"
                            name={key}
                            value={formData[key]}
                            onChange={onChange}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-zinc-600 rounded-md bg-white dark:bg-zinc-800 text-sm text-gray-800 dark:text-gray-100"
                        />
                    </div>
                ))}

                <button
                    type="submit"
                    className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md"
                >
                    Add Car
                </button>
            </form>
        </div>
    );
}

export default CarForm;
