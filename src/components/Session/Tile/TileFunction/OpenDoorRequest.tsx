import {useEffect, useState} from "react";
import "./OpenDoorRequest.css";

interface IOpenDoorRequest {
    show: boolean;
    onTimeUp(): void;
}

const OpenDoorRequest = ({ show, onTimeUp }: IOpenDoorRequest) => {
    const [time, setTime] = useState<number>(3);

    useEffect(() => {
        if (show) {
            let timeLeft = 3;
            setTime(timeLeft)

            const timer = setInterval(() => {
                timeLeft--;
                setTime(timeLeft);
                if(timeLeft <= 0){
                    clearInterval(timer);
                    onTimeUp();
                }
            },1000);

        }
    }, [show]);

    if (!show) return null;
    return (
        <>
            <div className="open-door-request" style={{color:"red"}} />
            <span className="countdown">
                {time}
            </span>
        </>
    )
};

export default OpenDoorRequest;
