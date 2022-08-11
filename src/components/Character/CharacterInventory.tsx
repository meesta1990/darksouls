import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import './CharacterInvetory.css';
import { Class } from '../../entities/Class';
import classNames from "classnames";
import InfoPanelStats from "../Session/InfoPanel/InfoPanelStats";
import {Session} from "../../entities/Session";
import {User} from "../../entities/User";

interface ICharacterInventory {
    choosedClass?: Class;
    minified?: boolean;
    user?: User;
    session?: Session;
};

const CharacterInventory = ({
    choosedClass,
    minified,
    user,
    session
}: ICharacterInventory) => {
    return (
        <div className={classNames('wrapper-character-inventory-container', choosedClass === undefined && 'hide')}>
            <div className="wrapper-character-inventory">
                <div className="col vertical-aligned">
                    <Paper variant="outlined" className={choosedClass?.equip?.weapon_1 ? 'active' : ''}>
                        {choosedClass?.equip?.weapon_1 && <img className="class-equip" src={choosedClass?.equip?.weapon_1?.img} />}
                    </Paper>
                </div>
                <div className="col">
                    <Paper variant="outlined" className={choosedClass?.equip?.weapon_3 ? 'active' : ''}>
                        {choosedClass?.equip?.weapon_3 && <img className="class-equip" src={choosedClass?.equip?.weapon_3?.img} />}
                    </Paper>
                    <Paper variant="outlined" className={choosedClass?.equip?.body ? 'active' : ''}>
                        {choosedClass?.equip?.body && <img className="class-equip" src={choosedClass?.equip?.body?.img} />}
                    </Paper>
                </div>
                <div className="col vertical-aligned">
                    <Paper variant="outlined" className={choosedClass?.equip?.weapon_2 ? 'active' : ''}>
                        {choosedClass?.equip?.weapon_2 && <img className="class-equip" src={choosedClass?.equip?.weapon_2?.img} />}
                    </Paper>
                </div>
            </div>

            <div>
                {session && user && <InfoPanelStats session={session} user={user} />}
            </div>
        </div>
    );
};

export default CharacterInventory;
