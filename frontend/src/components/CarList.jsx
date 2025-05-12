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

            <div className="grid gap-6 sm:grid-cols-2">
                {carList.map((car, index) => (
                    <div
                        key={index}
                        className="relative bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-xl p-4 shadow-sm flex flex-col gap-2"
                    >
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                                    {car.make || "—"} {car.model || ""}
                                </h3>

                                {(car.year || car.trim) && (
                                    <p className="text-sm text-gray-600 dark:text-gray-300">
                                        {car.year && `Year: ${car.year}`}{" "}
                                        {car.trim && `| Trim: ${car.trim}`}
                                    </p>
                                )}

                                {car.engine && (
                                    <p className="text-sm text-gray-600 dark:text-gray-300">
                                        Engine: {car.engine}
                                    </p>
                                )}

                                {car.listedPrice && (
                                    <p className="text-sm text-gray-600 dark:text-gray-300">
                                        Price: {car.listedPrice}
                                    </p>
                                )}

                                {car.sellerName && (
                                    <p className="text-sm text-gray-600 dark:text-gray-300">
                                        Seller: {car.sellerName}
                                    </p>
                                )}
                            </div>

                            <button
                                onClick={() => onRemove(index)}
                                className="text-red-500 hover:text-red-700 text-xl font-bold"
                                title="Remove"
                            >
                                ×
                            </button>
                        </div>

                        {car.dealerUrl && (
                            <a
                                href={car.dealerUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 dark:text-blue-400 text-sm hover:underline"
                            >
                                View listing
                            </a>
                        )}

                        {car.comments && (
                            <p className="text-sm text-gray-500 dark:text-gray-400 italic">
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
