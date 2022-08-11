import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import classnames from "classnames";
import { Class } from "../../entities/Class";
import "./CharacterStats.css";

interface ICharacterStats {
    choosedClass?: Class;
}

const CharacterStats = ({
    choosedClass
}: ICharacterStats) => {
    return (
        <div className={classnames('wrapper-character-stats col col-stats', choosedClass === undefined && 'hide')}>
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
    );
}

export default CharacterStats;
