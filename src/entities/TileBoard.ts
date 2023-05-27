import {IDoor, ITile} from "./Tile";
import { Session } from "./Session";
import {User} from "./User";
import {Class} from "./Class";

export interface ITileBoard {
    tile: ITile;
    onDoorClicked?:(doorClicked:IDoor, nextTile?: ITile) => void;
    session: Session;
    sceneRef: any;
    user?: User;
    classes?:Class[]
    dynamicContainerDivRef: any;
}