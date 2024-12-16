import React from 'react'

function RejectButton({lable, disabled = false, loader = false , handleClick}) {
  return (
    <button className='btn btn-outline-danger px-4' onClick={handleClick}>{lable}</button>
  )
}

export default RejectButton