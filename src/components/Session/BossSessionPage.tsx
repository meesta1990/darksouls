import classNames from "classnames";
import { Paper, Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material";
import { Boss } from "../../entities/Monster";
import './BossSessionPage.css';
import SoulCardSession from "./SoulCardSession";
import SkeletonImage from "../SkeletonImage/SkeletonImage";

interface IBossSessionPage {
    boss: Boss;
}

const BossSessionPage = ({
    boss
}: IBossSessionPage) => {
    return (
        <div className={classNames('boss-page', boss.name)}>
            <div className="fade" />
            <SkeletonImage className="preview_img_boss" src={boss.preview_img} />


            <div className="wrapper-boss-infos">
                <Paper variant="outlined" className="recap-card">
                    <TableContainer>
                        <Table aria-label="simple table">
                            <TableBody>
                                <TableRow>
                                    <TableCell>Healt Points</TableCell>
                                    <TableCell align="center" className="cell-value">{boss.hp}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Heat Points</TableCell>
                                    <TableCell align="center" className="cell-value">{boss.heatpoints}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Skill Deck Size</TableCell>
                                    <TableCell align="center" className="cell-value">{boss.skill_cards}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Physical Defence</TableCell>
                                    <TableCell align="center" className="cell-value">{boss.physical_def}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Magic Defence</TableCell>
                                    <TableCell align="center" className="cell-value">{boss.magic_def}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
                <SoulCardSession soul_cards={boss.soul_cards} />
            </div>
        </div>
    );
}

export default BossSessionPage;
