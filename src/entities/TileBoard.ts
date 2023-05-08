import {IDoor, ITile} from "./Tile";
import { Session } from "./Session";

export interface ITileBoard {
    tile: ITile;
    onDoorClicked?:(doorClicked:IDoor, nextTile?: ITile) => void;
    session: Session;
}