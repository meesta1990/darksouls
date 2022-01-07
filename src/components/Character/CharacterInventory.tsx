import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import './CharacterInvetory.css';
import { Class } from '../../entities/Class';
import classNames from "classnames";

interface ICharacterInventory {
    choosedClass?: Class;
    minified?: boolean;
};

const CharacterInventory = ({
    choosedClass,
    minified
}: ICharacterInventory) => {
    return (
        <div className={classNames('wrapper-character-inventory', choosedClass === undefined && 'hide')}>
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

            {!minified &&
                <div className="col col-stats">
                    <div className="wrapper-class-level">
                        <p> Level {choosedClass?.level} </p>
                    </div>
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>&nbsp;</TableCell>
                                    <TableCell align="center">Base</TableCell>
                                    <TableCell align="center">Tier 1</TableCell>
                                    <TableCell align="center">Tier 2</TableCell>
                                    <TableCell align="center">Tier 3</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell>Strength</TableCell>
                                    <TableCell align="center" className="cell-value">{choosedClass?.stats.base.str}</TableCell>
                                    <TableCell align="center" className="cell-value">{choosedClass?.stats.base.dex}</TableCell>
                                    <TableCell align="center" className="cell-value">{choosedClass?.stats.base.int}</TableCell>
                                    <TableCell align="center" className="cell-value">{choosedClass?.stats.base.fth}</TableCell>
                                </TableRow>
                            </TableBody>
                            <TableBody>
                                <TableRow>
                                    <TableCell>Dexterity</TableCell>
                                    <TableCell align="center" className="cell-value">{choosedClass?.stats.tier_1.str}</TableCell>
                                    <TableCell align="center" className="cell-value">{choosedClass?.stats.tier_1.dex}</TableCell>
                                    <TableCell align="center" className="cell-value">{choosedClass?.stats.tier_1.int}</TableCell>
                                    <TableCell align="center" className="cell-value">{choosedClass?.stats.tier_1.fth}</TableCell>
                                </TableRow>
                            </TableBody>
                            <TableBody>
                                <TableRow>
                                    <TableCell>Intelligence</TableCell>
                                    <TableCell align="center" className="cell-value">{choosedClass?.stats.tier_2.str}</TableCell>
                                    <TableCell align="center" className="cell-value">{choosedClass?.stats.tier_2.dex}</TableCell>
                                    <TableCell align="center" className="cell-value">{choosedClass?.stats.tier_2.int}</TableCell>
                                    <TableCell align="center" className="cell-value">{choosedClass?.stats.tier_2.fth}</TableCell>
                                </TableRow>
                            </TableBody>
                            <TableBody>
                                <TableRow>
                                    <TableCell className="no-border-bottom">Faith</TableCell>
                                    <TableCell align="center" className="cell-value no-border-bottom">{choosedClass?.stats.tier_3.str}</TableCell>
                                    <TableCell align="center" className="cell-value no-border-bottom">{choosedClass?.stats.tier_3.dex}</TableCell>
                                    <TableCell align="center" className="cell-value no-border-bottom">{choosedClass?.stats.tier_3.int}</TableCell>
                                    <TableCell align="center" className="cell-value no-border-bottom">{choosedClass?.stats.tier_3.fth}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <div className="wrapper-class-skill">
                        <p> {choosedClass?.class_skill?.title} </p>
                        <p> {choosedClass?.class_skill?.body} </p>
                    </div>
                </div>
            }
        </div>
    );
};

export default CharacterInventory;
