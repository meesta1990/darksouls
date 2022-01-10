import { ITile } from "../../entities/Tile";
import "./Tile.css";
import * as firekeeper from '../../assets/images/models/firekeeper.obj';
import OBJLoader from "three-obj-loader"

interface ITileComponent {
    tile: ITile;
}

const Tile = ({
    tile
}: ITileComponent) => {
    OBJLoader(firekeeper);
    return (
        <div className="tile">
            <img
                className="img-tile"
                src={require("../../assets/images/tiles/" + tile.name + ".jpg").default}
                useMap="#workmap"
            />

            <map name="workmap">

            </map>
        </div>
    )
}

export default Tile;