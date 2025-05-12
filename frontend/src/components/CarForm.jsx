function CarForm({ formData, onChange, onSubmit }) {
    return (
        <form onSubmit={onSubmit} className="space-y-6 bg-white dark:bg-zinc-900 p-6 rounded shadow-md">
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
                        onChange={onChange}
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
    );
}

export default CarForm;
