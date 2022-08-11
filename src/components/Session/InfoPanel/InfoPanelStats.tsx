import CommonSessionInterface from "../../../entities/CommonSessionInterface";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import "./InfoPanelStats.css";
import ClassButtons from "../ClassButtons";
import CharacterInventory from "../../Character/CharacterInventory";
import {useEffect, useState} from "react";
import {updateSession} from "../../../services/Sessions/ServiceSession";

interface IstatToLevelUp {
    stat: string;
    nextTier: string;
    cost: number;
}

const InfoPanelStats = ({
    session,
    user,
}: CommonSessionInterface) => {
    const [modalLevelUp, setModalLevelUp] = useState(false);
    const [readableStat, setReadableStat] = useState<string>('');
    const [readableLevelledStat, setReadableLevelledStat] = useState<string>('');
    const [choosedStatToLevelUp, setChoosedStatToLevelUp] = useState<IstatToLevelUp | undefined>();
    const playerClass = session?.players.players.find((player) => player.owner.uid === user.uid);
    const [checkDisabled, setCheckDisabled] = useState({
        str: false,
        dex: false,
        int: false,
        fth: false
    });

    useEffect(() => {
        if (!modalLevelUp) {
            setReadableStat('');
            setReadableLevelledStat('');
            setChoosedStatToLevelUp(undefined);
        }
    }, [modalLevelUp])

    useEffect(() => {
        const _checkDisabled: any = {};

        if (session) {
            for (let key in playerClass?.choosed_stats) {
                if (playerClass?.choosed_stats[key] === 'base' && session.souls < 2) {
                    _checkDisabled[key] = true;
                }
                if (playerClass?.choosed_stats[key] === 'tier_1' && session.souls < 4) {
                    _checkDisabled[key] = true;
                }
                if (playerClass?.choosed_stats[key] === 'tier_2' && session.souls < 8) {
                    _checkDisabled[key] = true;
                }
                if (playerClass?.choosed_stats[key] === 'tier_3') {
                    _checkDisabled[key] = true;
                }
            }

            setCheckDisabled(_checkDisabled);
        }
    }, [session])

    const handleClickLevelUp = (stat: string) => {
        let _stat = '';
        let _readableLevelledStat = '';
        let nextTier = '';
        let cost = 0;

        if (stat === 'str') _stat = 'Strength';
        if (stat === 'dex') _stat = 'Dexterity';
        if (stat === 'int') _stat = 'Intelligence';
        if (stat === 'fth') _stat = 'Faith';

        if (playerClass?.choosed_stats[stat] === 'base') {
            _readableLevelledStat = playerClass.stats.base[stat] + ' -> ' +
            playerClass.stats.tier_1[stat] + ' for 2 souls';

            nextTier = 'tier_1';
            cost = 2;
        }
        if (playerClass?.choosed_stats[stat] === 'tier_1') {
            _readableLevelledStat = playerClass.stats.tier_1[stat] + ' -> ' +
            playerClass.stats.tier_2[stat] + ' for 4 souls';

            nextTier = 'tier_2';
            cost = 4;
        }
        if (playerClass?.choosed_stats[stat] === 'tier_2') {
            _readableLevelledStat = playerClass.stats.tier_2[stat] + ' -> ' +
            playerClass.stats.tier_3[stat] + ' for 8 souls';

            nextTier = 'tier_3';
            cost = 8;
        }

        setChoosedStatToLevelUp({
            stat,
            nextTier,
            cost
        });
        setModalLevelUp(true);
        setReadableStat(_stat);
        setReadableLevelledStat(_readableLevelledStat);
    }

    const handleConfirmLevelUp = () => {
        if(choosedStatToLevelUp && choosedStatToLevelUp.cost && playerClass) {
            session.souls -= choosedStatToLevelUp?.cost;
            playerClass.choosed_stats[choosedStatToLevelUp.stat] = choosedStatToLevelUp.nextTier;

            updateSession(session).then(() => {
                setModalLevelUp(false);
            });
        }
    }

    const handleDialogClose = () => {
        setModalLevelUp(false);
    }

    return (
        <>
            <Dialog
                open={modalLevelUp}
                className="modal-level-up"
                maxWidth={'md'}
                scroll="body"
            >
                <DialogTitle id="alert-dialog-title">
                    Level your {readableStat} ?
                </DialogTitle>
                <DialogContent>
                    <div className="center">
                        {readableLevelledStat}
                        {choosedStatToLevelUp && choosedStatToLevelUp.cost > session.souls &&
                            <p className="error">
                                Not enough souls.
                            </p>
                        }
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="contained"
                        size="large"
                        color="primary"
                        onClick={handleDialogClose}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        size="large"
                        disabled={choosedStatToLevelUp && choosedStatToLevelUp.cost > session.souls }
                        color="secondary"
                        onClick={handleConfirmLevelUp}
                    >
                        Level up
                    </Button>
                </DialogActions>
            </Dialog>

            <div className="stat">
                <span>
                    Str
                </span>
                <span className={playerClass?.choosed_stats.str === 'base' ? 'choosed' : ''}>
                    {playerClass?.stats.base.str}
                </span>
                <span className={playerClass?.choosed_stats.str === 'tier_1' ? 'choosed' : ''}>
                    {playerClass?.stats.tier_1.str}
                </span>
                <span className={playerClass?.choosed_stats.str === 'tier_2' ? 'choosed' : ''}>
                    {playerClass?.stats.tier_2.str}
                </span>
                <span className={playerClass?.choosed_stats.str === 'tier_3' ? 'choosed' : ''}>
                    {playerClass?.stats.tier_3.str}
                </span>
                <span>
                    <IconButton aria-label="delete" color="secondary" onClick={()=>handleClickLevelUp('str')}
                        disabled={checkDisabled.str}>
                        <AddIcon />
                    </IconButton>
                </span>
            </div>

            <div className="stat">
                <span>
                    Dex
                </span>
                <span className={playerClass?.choosed_stats.dex === 'base' ? 'choosed' : ''}>
                    {playerClass?.stats.base.dex}
                </span>
                <span className={playerClass?.choosed_stats.dex === 'tier_1' ? 'choosed' : ''}>
                    {playerClass?.stats.tier_1.dex}
                </span>
                <span className={playerClass?.choosed_stats.dex === 'tier_2' ? 'choosed' : ''}>
                    {playerClass?.stats.tier_2.dex}
                </span>
                <span className={playerClass?.choosed_stats.dex === 'tier_3' ? 'choosed' : ''}>
                    {playerClass?.stats.tier_3.dex}
                </span>
                <span>
                    <IconButton aria-label="delete" color="secondary" onClick={()=>handleClickLevelUp('dex')}
                        disabled={checkDisabled.dex}>
                        <AddIcon />
                    </IconButton>
                </span>
            </div>

            <div className="stat">
                <span>
                    Int
                </span>
                <span className={playerClass?.choosed_stats.int === 'base' ? 'choosed' : ''}>
                    {playerClass?.stats.base.int}
                </span>
                <span className={playerClass?.choosed_stats.int === 'tier_1' ? 'choosed' : ''}>
                    {playerClass?.stats.tier_1.int}
                </span>
                <span className={playerClass?.choosed_stats.int === 'tier_2' ? 'choosed' : ''}>
                    {playerClass?.stats.tier_2.int}
                </span>
                <span className={playerClass?.choosed_stats.int === 'tier_3' ? 'choosed' : ''}>
                    {playerClass?.stats.tier_3.int}
                </span>
                <span>
                    <IconButton aria-label="delete" color="secondary" onClick={()=>handleClickLevelUp('int')}
                        disabled={checkDisabled.int}>
                        <AddIcon />
                    </IconButton>
                </span>
            </div>

            <div className="stat">
                <span>
                    Fth
                </span>
                <span className={playerClass?.choosed_stats.fth === 'base' ? 'choosed' : ''}>
                    {playerClass?.stats.base.fth}
                </span>
                <span className={playerClass?.choosed_stats.fth === 'tier_1' ? 'choosed' : ''}>
                    {playerClass?.stats.tier_1.fth}
                </span>
                <span className={playerClass?.choosed_stats.fth === 'tier_2' ? 'choosed' : ''}>
                    {playerClass?.stats.tier_2.fth}
                </span>
                <span className={playerClass?.choosed_stats.fth === 'tier_3' ? 'choosed' : ''}>
                    {playerClass?.stats.tier_3.fth}
                </span>
                <span>
                    <IconButton aria-label="delete" color="secondary" onClick={()=>handleClickLevelUp('fth')}
                        disabled={checkDisabled.fth}>
                        <AddIcon />
                    </IconButton>
                </span>
            </div>
        </>
    )
}

export default InfoPanelStats;
