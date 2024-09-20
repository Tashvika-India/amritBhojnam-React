import React from 'react'

function RejectButton({lable, disabled = false, loader = false , handleClick}) {
  return (
    <button className='btn btn-outline-danger' onClick={handleClick}>{lable}</button>
  )
}

export default RejectButton