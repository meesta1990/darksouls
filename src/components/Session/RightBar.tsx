import './RightBar.css'
import { useEffect, useRef, useState } from "react";
import CharacterInventory from "../Character/CharacterInventory";
import classNames from "classnames";
import CommonSessionInterface from "../../entities/CommonSessionInterface";
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { IconButton } from "@mui/material";

const LeftBar = ({
    session,
    onFocus,
    user,
    focused = false
}: CommonSessionInterface) => {
    const [inventoryOpen, setInventoryOpen] = useState<boolean>(false);
    const ref = useRef<HTMLDivElement>(null);
    const choosedClass = session?.players.players.find((player) => player.owner.uid === user.uid);

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    });

    const handleClickOutside = (event: Event) => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
            setInventoryOpen(false);
        }
    };

    const handleGameFocus = () => {
        onFocus('rightBar');
    }

    return (
        <div
            className={classNames("right-bar", inventoryOpen && 'opened', focused && 'focused')}
            onClick={handleGameFocus}
            ref={ref}
        >
            <span className="handler-open" onClick={() => setInventoryOpen(!inventoryOpen)}>
               {inventoryOpen ? <ArrowRightIcon /> : <ArrowLeftIcon />}
            </span>
            <CharacterInventory choosedClass={choosedClass} minified user={user} session={session} />
        </div>
    );
}

export default LeftBar;
