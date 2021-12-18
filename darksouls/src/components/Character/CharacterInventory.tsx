import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@mui/material';
import './CharacterInvetory.css';

const CharacterInventory = () => {
    return (
        <div className="wrapper-character-inventory">
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
                            <TableCell align="center" className="cell-value">13</TableCell>
                            <TableCell align="center" className="cell-value">21</TableCell>
                            <TableCell align="center" className="cell-value">30</TableCell>
                            <TableCell align="center" className="cell-value">40</TableCell>
                        </TableBody>
                        <TableBody>
                            <TableCell>Strength</TableCell>
                            <TableCell align="center" className="cell-value">13</TableCell>
                            <TableCell align="center" className="cell-value">21</TableCell>
                            <TableCell align="center" className="cell-value">30</TableCell>
                            <TableCell align="center" className="cell-value">40</TableCell>
                        </TableBody>
                        <TableBody>
                            <TableCell>Strength</TableCell>
                            <TableCell align="center" className="cell-value">13</TableCell>
                            <TableCell align="center" className="cell-value">21</TableCell>
                            <TableCell align="center" className="cell-value">30</TableCell>
                            <TableCell align="center" className="cell-value">40</TableCell>
                        </TableBody>
                        <TableBody>
                            <TableCell>Strength</TableCell>
                            <TableCell align="center" className="cell-value">13</TableCell>
                            <TableCell align="center" className="cell-value">21</TableCell>
                            <TableCell align="center" className="cell-value">30</TableCell>
                            <TableCell align="center" className="cell-value">40</TableCell>
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
};

export default CharacterInventory;