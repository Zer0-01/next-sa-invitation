const CountdownComponent = () => {
    return (
        <div className="flex flex-col items-center gap-4">
            {/* Title */}
            <div className="text-lg font-semibold tracking-wide">
                MENGHITUNG HARI
            </div>

            {/* Countdown Row */}
            <div className="flex flex-row items-center gap-4">
                {/* Day */}
                <div className="flex flex-col items-center">
                    <span className="text-3xl font-bold">29</span>
                    <span className="text-sm text-gray-600">Hari</span>
                </div>

                {/* Hour */}
                <div className="flex flex-col items-center">
                    <span className="text-3xl font-bold">21</span>
                    <span className="text-sm text-gray-600">Jam</span>
                </div>

                {/* Minute */}
                <div className="flex flex-col items-center">
                    <span className="text-3xl font-bold">29</span>
                    <span className="text-sm text-gray-600">Minit</span>
                </div>

                {/* Second */}
                <div className="flex flex-col items-center">
                    <span className="text-3xl font-bold">29</span>
                    <span className="text-sm text-gray-600">Saat</span>
                </div>
            </div>
        </div>
    );
};

export default CountdownComponent;
