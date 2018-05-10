import React from 'react'

import './KittyCard.scss'

type Props = {
  age: number,
  level: number,
  imgId: number,
}

const placeholderForHex = (string) => {
  if (string.length === 6) return string

  for (var i = string.length; i < 6; i++) {
    string += '0'
  }

  return string
}

const KittyCard = ({
  age,
  level,
  imgId,
}: Props) => {
  const backgroundColorHex = placeholderForHex(Number(imgId * 10001).toString(16).slice(0, 6))
  return (
    <div className="KittyCard">
      <img
        className="KittyCard__img"
        style={{ backgroundColor: `#${backgroundColorHex}` }}
        src={`/static/kittyImages/${imgId}.png`}
      />
    </div>
  )
}

export default KittyCard
