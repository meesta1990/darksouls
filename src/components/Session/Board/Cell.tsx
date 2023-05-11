import React, { FC } from 'react'

type CellPropsType = {
  position: { x: number, y: number }
}

const Cell: FC<CellPropsType> = ({
    position,
}) => {
  return (
    <>
      <mesh
        onClick={() => console.log(position)}
        scale={[1, 1, 0.1]}
        position={[position.x, 0, position.y]}
        rotation={[Math.PI / -2, 0, 0]}>
        <meshStandardMaterial roughness={0.1} metalness={0.7} color={'black'} />
        <boxGeometry />
      </mesh>
    </>
  )
}

export default Cell
