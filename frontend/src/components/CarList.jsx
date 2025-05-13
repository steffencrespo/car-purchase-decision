import sampleImage from '../images/rearview.jpg';

function CarList({ carList, onRemove }) {
    if (!carList.length) {
        return (
            <div className="text-gray-600 dark:text-gray-400 text-center mt-6">
                No cars added yet.
            </div>
        );
    }

    return (
        <div>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-6 text-center">
                My Car List
            </h2>

            <div className="grid grid-cols-[repeat(auto-fit,_minmax(280px,_1fr))] gap-y-8 gap-x-6 justify-center">

            {carList.map((car, index) => (
                    <div
                        key={index}
                        className="bg-white dark:bg-zinc-800 border border-red-500 dark:border-zinc-700 rounded-md shadow-sm flex flex-col p-4"
                    >
                        <div className="w-full h-[150px] overflow-hidden rounded-t-md">
                            <img
                                src={sampleImage}
                                alt={`${car.make} ${car.model}`}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        <div className="p-4">
                            <div className="flex justify-between items-start">
                                <div className="pr-4">
                                    <h3 className="text-sm font-bold text-gray-900 dark:text-white leading-tight">
                                        {car.make || '—'} {car.model || ''}
                                    </h3>

                                    {(car.year || car.trim) && (
                                        <p className="text-xs text-gray-600 dark:text-gray-300">
                                            {car.year && `Year: ${car.year}`}{' '}
                                            {car.trim && `| Trim: ${car.trim}`}
                                        </p>
                                    )}

                                    {car.engine && (
                                        <p className="text-xs text-gray-600 dark:text-gray-300">
                                            Engine: {car.engine}
                                        </p>
                                    )}

                                    {car.listedPrice && (
                                        <p className="text-xs text-gray-600 dark:text-gray-300">
                                            Price: {car.listedPrice}
                                        </p>
                                    )}

                                    {car.sellerName && (
                                        <p className="text-xs text-gray-600 dark:text-gray-300">
                                            Seller: {car.sellerName}
                                        </p>
                                    )}
                                </div>

                                <button
                                    onClick={() => onRemove(index)}
                                    className="text-red-500 hover:text-red-700 text-lg font-bold"
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
                                    className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
                                >
                                    View listing
                                </a>
                            )}

                            {car.comments && (
                                <p className="text-xs text-gray-500 dark:text-gray-400 italic mt-1">
                                    {car.comments}
                                </p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CarList;
