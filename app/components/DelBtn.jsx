'use client'
import React from 'react'
import  {AiFillDelete} from "react-icons/ai"

function DelBtn({ item , onDelete }) {
  return (
    <button className='hover:scale-110'><AiFillDelete size={25} style={{color: 'red'}} onClick={() => {
        const confrimDel = window.confirm(`Are u sure to delete ${item.data.title} list ?`)
        if (confrimDel) {
          onDelete(item.id)
        }
      }} />
    </button>
  )
}

export default DelBtn