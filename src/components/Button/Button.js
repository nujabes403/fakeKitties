import React from 'react'
import classNames from 'classnames'

import './Button.scss'

const Button = ({ onClick, label, disabled }) => (
  <button 
    onClick={onClick}
    className={classNames('Button', {
      'is-disabled': disabled
    })}
  >
    {label}
  </button>
)

export default Button