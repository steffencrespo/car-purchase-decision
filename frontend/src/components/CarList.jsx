function CarList({ carList, onRemove }) {
    if (!carList.length) {
        return (
            <div className="text-gray-600 dark:text-gray-400">
                No cars added yet.
            </div>
        );
    }

    return (
        <div>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
                My Car List
            </h2>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                {carList.map((car, index) => (
                    <div
                        key={index}
                        className="relative bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg p-4 shadow-sm"
                    >
                        <button
                            onClick={() => onRemove(index)}
                            className="absolute top-2 right-2 text-sm text-red-500 hover:text-red-700"
                            title="Remove"
                        >
                            ×
                        </button>

                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                            {car.make} {car.model}
                        </h3>
                        <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                            Year: {car.year} {car.trim && `| Trim: ${car.trim}`}
                        </p>
                        {car.comments && (
                            <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                                {car.comments}
                            </p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CarList;

