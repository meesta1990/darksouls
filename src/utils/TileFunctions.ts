import { ITile } from "../entities/Tile";
import { Class } from "../entities/Class";
import { Mob } from "../entities/Monster";
// move to the next entit who has to do it's action

export const moveToNextEntity = (tile: ITile) => {
    console.log('asd')
    if(tile && tile.turn && tile.queueOrder) {
        const turn = tile.turn;
        const currentEntityTurnIndex =
            tile.queueOrder?.findIndex((entity, index) => entity.type === 'Monster' && entity.id === turn.entity.id);
        let newEntityTurnIndex = currentEntityTurnIndex;

        if(currentEntityTurnIndex < tile.queueOrder.length-1) {
            newEntityTurnIndex++;
        } else {
            newEntityTurnIndex = 0;
        }
        const newEntity: Mob | Class = tile.queueOrder[newEntityTurnIndex];
        turn.entity= newEntity;
        turn.type = newEntity.type;
    }
}