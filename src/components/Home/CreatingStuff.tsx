import { useNavigate } from 'react-router-dom';
import Page from '../Page/Page';
import './CreatingStuff.css'
import { User } from "../../entities/User";
import { useEffect, useState } from "react";
import { getEncounters, createEncounter } from "../../services/admin/ServiceCreatingStuff";
import { Encounter } from "../../entities/Encounter";
import { Button, Checkbox, FormControlLabel, TextField } from "@mui/material";
import {cleanUndefinedField} from "../../utils/Functions";

interface IHome {
    user: User;
}

const CreatingStuff = ({ user }: IHome) => {
    const [encounters_t1, setEncounters_t1] = useState<Encounter[]>();
    const [encounters_t2, setEncounters_t2] = useState<Encounter[]>();
    const [encounters_t3, setEncounters_t3] = useState<Encounter[]>();

    const [name, setName] = useState();
    const [tier, setTier] = useState('');
    const [traps, setTraps] = useState();

    const [mod_node_1_1, setMod_node_1_1] = useState();
    const [mod_node_1_2, setMod_node_1_2] = useState();
    const [mod_node_1_3, setMod_node_1_3] = useState();

    const [mod_node_2_1, setMod_node_2_1] = useState();
    const [mod_node_2_2, setMod_node_2_2] = useState();
    const [mod_node_2_3, setMod_node_2_3] = useState();

    const [mod_node_3_1, setMod_node_3_1] = useState();
    const [mod_node_3_2, setMod_node_3_2] = useState();
    const [mod_node_3_3, setMod_node_3_3] = useState();

    const [mod_node_4_1, setMod_node_4_1] = useState();
    const [mod_node_4_2, setMod_node_4_2] = useState();
    const [mod_node_4_3, setMod_node_4_3] = useState();

    useEffect(() => {
        getEncounters('tier_1', ((r: any) => {
            setEncounters_t1(r)
        }), null);
        getEncounters('tier_2', ((r: any) => {
            setEncounters_t2(r)
        }), null);
        getEncounters('tier_3', ((r: any) => {
            setEncounters_t3(r)
        }), null);
    }, []);

    const handleCreateEncounter = () => {
        let encounter = new Encounter({
            name: name,
            traps: traps === "on",
            node_1: [{id_mob: mod_node_1_1}, {id_mob: mod_node_1_2}, {id_mob: mod_node_1_3}],
            node_2: [{id_mob: mod_node_2_1}, {id_mob: mod_node_2_2}, {id_mob: mod_node_2_3}],
            node_3: [{id_mob: mod_node_3_1}, {id_mob: mod_node_3_2}, {id_mob: mod_node_3_3}],
            node_4: [{id_mob: mod_node_4_1}, {id_mob: mod_node_4_2}, {id_mob: mod_node_4_3}],
        });

        encounter = cleanUndefinedField(encounter);
        createEncounter(encounter, tier);
    }

    return (
        <Page className="homepage admin">
            <h1>
                Legend:
            </h1>
            <div>
                1 = hollow archer
            </div>
            <div>
                2 = hollow melee
            </div>
            <div>
                3 = silver knight greatbowman
            </div>
            <div>
                4 = sentinel
            </div>
            <div>
                5 = large hollow soldier
            </div>
            <div>
                6 = ilver knight swordman
            </div>
            <div>
                -1 = chest
            </div>
            <div>
                -2 = tomb
            </div>
            <div>
                -3 = barrel
            </div>
            <hr />
            <h1>Encounters:</h1>
                <p>
                    tier 1
                </p>

                {encounters_t1?.map((encounter) =>
                    <span key={encounter.name} className="encounter-card">
                        <div className="encounter-name">{encounter.name}</div>
                        <div>node 1:</div>
                        <div className="mobs">
                            {
                                encounter.red_sword?.map((node, index) =>
                                    <span className="encounter-mob" key={encounter.name + '_' + index}>
                                        {node.id}
                                    </span>
                                )
                            }
                        </div>

                        <div>node 2:</div>
                        <div className="mobs">
                            {
                                encounter.red_cross?.map((node, index) =>
                                    <span className="encounter-mob" key={encounter.name + '_' + index}>
                                        {node.id}
                                    </span>
                                )
                            }
                        </div>

                        <div>node 3:</div>
                        <div className="mobs">
                            {
                                encounter.purple_star?.map((node: any, index: number) =>
                                    <span className="encounter-mob" key={encounter.name + '_' + index}>
                                        {node.id_mob}
                                    </span>
                                )
                            }
                        </div>

                        <div>node 4:</div>
                        <div className="mobs">
                            {
                                encounter.purple_tree?.map((node, index) =>
                                    <span className="encounter-mob" key={encounter.name + '_' + index}>
                                        {node.id}
                                    </span>
                                )
                            }
                        </div>
                    </span>
                )}
            <hr />

            <p>
                tier 2
            </p>

            {encounters_t2?.map((encounter: any) =>
                <span key={encounter.name} className="encounter-card">
                        <div className="encounter-name">{encounter.name}</div>
                        <div>node 1:</div>
                        <div className="mobs">
                            {
                                encounter.node_1?.map((node: any, index: number) =>
                                    <span className="encounter-mob" key={encounter.name + '_' + index}>
                                        {node.id_mob}
                                    </span>
                                )
                            }
                        </div>

                        <div>node 2:</div>
                        <div className="mobs">
                            {
                                encounter.node_2?.map((node: any, index: number) =>
                                    <span className="encounter-mob" key={encounter.name + '_' + index}>
                                        {node.id_mob}
                                    </span>
                                )
                            }
                        </div>

                        <div>node 3:</div>
                        <div className="mobs">
                            {
                                encounter.node_3?.map((node: any, index: number) =>
                                    <span className="encounter-mob" key={encounter.name + '_' + index}>
                                        {node.id_mob}
                                    </span>
                                )
                            }
                        </div>

                        <div>node 4:</div>
                        <div className="mobs">
                            {
                                encounter.node_4?.map((node: any, index: number) =>
                                    <span className="encounter-mob" key={encounter.name + '_' + index}>
                                        {node.id_mob}
                                    </span>
                                )
                            }
                        </div>
                    </span>
            )}
            <hr />

            <p>
                tier 3
            </p>

            {encounters_t3?.map((encounter: any) =>
                <span key={encounter.name} className="encounter-card">
                        <div className="encounter-name">{encounter.name}</div>
                        <div>node 1:</div>
                        <div className="mobs">
                            {
                                encounter.node_1?.map((node: any, index: number) =>
                                    <span className="encounter-mob" key={encounter.name + '_' + index}>
                                        {node.id_mob}
                                    </span>
                                )
                            }
                        </div>

                        <div>node 2:</div>
                        <div className="mobs">
                            {
                                encounter.node_2?.map((node: any, index: number) =>
                                    <span className="encounter-mob" key={encounter.name + '_' + index}>
                                        {node.id_mob}
                                    </span>
                                )
                            }
                        </div>

                        <div>node 3:</div>
                        <div className="mobs">
                            {
                                encounter.node_3?.map((node: any, index: number) =>
                                    <span className="encounter-mob" key={encounter.name + '_' + index}>
                                        {node.id_mob}
                                    </span>
                                )
                            }
                        </div>

                        <div>node 4:</div>
                        <div className="mobs">
                            {
                                encounter.node_4?.map((node: any, index: number) =>
                                    <span className="encounter-mob" key={encounter.name + '_' + index}>
                                        {node.id_mob}
                                    </span>
                                )
                            }
                        </div>
                    </span>
            )}
            <hr />

            <h1>Create</h1>

            <div className="encounter-card-create">
                <TextField label="Encounter name" variant="outlined" color="secondary" onChange={(e: any)=>setName(e.target.value)} />
                <TextField label="tier" variant="outlined" color="secondary" onChange={(e: any)=>setTier(e.target.value)}  />
                <FormControlLabel control={<Checkbox />} label="traps" onChange={(e: any)=>setTraps(e.target.value)}  />

                <p>
                    Node 1
                </p>
                <TextField label="Encounter id" variant="outlined" color="secondary" value={mod_node_1_1} onChange={(e: any) => setMod_node_1_1(e.target.value)} />
                <TextField label="Encounter id" variant="outlined" color="secondary" value={mod_node_1_2} onChange={(e: any) => setMod_node_1_2(e.target.value)} />
                <TextField label="Encounter id" variant="outlined" color="secondary" value={mod_node_1_3} onChange={(e: any) => setMod_node_1_3(e.target.value)} />
                <p>
                    Node 2
                </p>
                <TextField label="Encounter id" variant="outlined" color="secondary" value={mod_node_2_1} onChange={(e: any) => setMod_node_2_1(e.target.value)} />
                <TextField label="Encounter id" variant="outlined" color="secondary" value={mod_node_2_2} onChange={(e: any) => setMod_node_2_2(e.target.value)} />
                <TextField label="Encounter id" variant="outlined" color="secondary" value={mod_node_2_3} onChange={(e: any) => setMod_node_2_3(e.target.value)} />
                <p>
                    Node 3
                </p>
                <TextField label="Encounter id" variant="outlined" color="secondary" value={mod_node_3_1} onChange={(e: any) => setMod_node_3_1(e.target.value)} />
                <TextField label="Encounter id" variant="outlined" color="secondary" value={mod_node_3_2} onChange={(e: any) => setMod_node_3_2(e.target.value)} />
                <TextField label="Encounter id" variant="outlined" color="secondary" value={mod_node_3_3} onChange={(e: any) => setMod_node_3_3(e.target.value)} />
                <p>
                    Node 4
                </p>
                <TextField label="Encounter id" variant="outlined" color="secondary" value={mod_node_4_1} onChange={(e: any) => setMod_node_4_1(e.target.value)} />
                <TextField label="Encounter id" variant="outlined" color="secondary" value={mod_node_4_2} onChange={(e: any) => setMod_node_4_2(e.target.value)} />
                <TextField label="Encounter id" variant="outlined" color="secondary" value={mod_node_4_3} onChange={(e: any) => setMod_node_4_3(e.target.value)} />

                <div>
                    <Button variant="outlined" size="large" onClick={handleCreateEncounter}>
                        Create
                    </Button>
                </div>
            </div>
        </Page>
    )
}

export default CreatingStuff;
