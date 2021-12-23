import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import './CharacterInvetory.css';
import { Class } from '../../entities/Class';
import classNames from "classnames";

interface ICharacterInventory {
    choosedClass?: Class;
};

const CharacterInventory = ({
    choosedClass
}: ICharacterInventory) => {
    return (
        <div className={classNames('wrapper-character-inventory', choosedClass === undefined && 'hide')}>
            <div className="col vertical-aligned">
                <Paper variant="outlined" />
            </div>
            <div className="col">
                <Paper variant="outlined" />
                <Paper variant="outlined" />
            </div>
            <div className="col vertical-aligned">
                <Paper variant="outlined" />
            </div>
            <div className="col col-stats">
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
                            <TableCell>Strength</TableCell>
                            <TableCell align="center" className="cell-value">{choosedClass?.stats.base.str}</TableCell>
                            <TableCell align="center" className="cell-value">{choosedClass?.stats.base.dex}</TableCell>
                            <TableCell align="center" className="cell-value">{choosedClass?.stats.base.int}</TableCell>
                            <TableCell align="center" className="cell-value">{choosedClass?.stats.base.fth}</TableCell>
                        </TableBody>
                        <TableBody>
                            <TableCell>Strength</TableCell>
                            <TableCell align="center" className="cell-value">{choosedClass?.stats.tier_1.str}</TableCell>
                            <TableCell align="center" className="cell-value">{choosedClass?.stats.tier_1.dex}</TableCell>
                            <TableCell align="center" className="cell-value">{choosedClass?.stats.tier_1.int}</TableCell>
                            <TableCell align="center" className="cell-value">{choosedClass?.stats.tier_1.fth}</TableCell>
                        </TableBody>
                        <TableBody>
                            <TableCell>Strength</TableCell>
                            <TableCell align="center" className="cell-value">{choosedClass?.stats.tier_2.str}</TableCell>
                            <TableCell align="center" className="cell-value">{choosedClass?.stats.tier_2.dex}</TableCell>
                            <TableCell align="center" className="cell-value">{choosedClass?.stats.tier_2.int}</TableCell>
                            <TableCell align="center" className="cell-value">{choosedClass?.stats.tier_2.fth}</TableCell>
                        </TableBody>
                        <TableBody>
                            <TableCell>Strength</TableCell>
                            <TableCell align="center" className="cell-value">{choosedClass?.stats.tier_3.str}</TableCell>
                            <TableCell align="center" className="cell-value">{choosedClass?.stats.tier_3.dex}</TableCell>
                            <TableCell align="center" className="cell-value">{choosedClass?.stats.tier_3.int}</TableCell>
                            <TableCell align="center" className="cell-value">{choosedClass?.stats.tier_3.fth}</TableCell>
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
};

export default CharacterInventory;