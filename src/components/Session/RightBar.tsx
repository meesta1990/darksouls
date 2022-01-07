import './RightBar.css'
import { Class } from "../../entities/Class";
import {useEffect} from "react";
import CharacterInventory from "../Character/CharacterInventory";

interface ILeftBar {
    choosedClass: Class;
}

const LeftBar = ({
    choosedClass,
}: ILeftBar) => {
    useEffect(() => {

    }, []);

    return (
        <div className="right-bar">
            <CharacterInventory choosedClass={choosedClass} minified/>
        </div>
    );
}

export default LeftBar;
