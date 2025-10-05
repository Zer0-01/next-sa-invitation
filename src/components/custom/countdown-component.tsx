const CountdownComponent = () => {
    return (
        <div className="grid grid-cols-7 gap-2 items-center justify-center m-3">
            {/* Days */}
            <div className="flex flex-col items-center">
                <div>0</div>
                <div>Hari</div>
            </div>

            {/* Colon */}
            <div className="flex items-center justify-center">:</div>

            {/* Hours */}
            <div className="flex flex-col items-center">
                <div>0</div>
                <div>Jam</div>
            </div>

            {/* Colon */}
            <div className="flex items-center justify-center">:</div>

            {/* Minutes */}
            <div className="flex flex-col items-center">
                <div>0</div>
                <div>Menit</div>
            </div>

            {/* Colon */}
            <div className="flex items-center justify-center">:</div>

            {/* Seconds */}
            <div className="flex flex-col items-center">
                <div>0</div>
                <div>Detik</div>
            </div>
        </div>
    );
};

export default CountdownComponent;
