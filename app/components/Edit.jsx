'use client'

import React, { useState } from 'react'

function Edit({ item, updateTextEdit, toggleChangeToEdit}) {

    const [updateText , setText] = useState({
        title: item.data.title ? item.data.title : '',
        content: item.data.content ? item.data.content : ''
      })
    
      const hanldeChange = (e) => {
        const { name, value } = e.target;
      
        // ตรวจสอบชื่อและความยาวของค่าที่ป้อน
        if (name === 'title' && value.length > 50) {
          alert('Maximum character 50');
          return;
        }
        if (name === 'content' && value.length > 140) {
          alert('Maximum character 140');
          
          // ลบตัวอักษรล่าสุดออกเมื่อความยาวเกิน 140
          const maximumValue = value.slice(0, 139);
          
          setText(prev => ({ ...prev, [name]: maximumValue }));
          return;
        }
      
        setText(prev => ({ ...prev, [name]: value }));
      }
    
      const hanldeSubmit = (e) => {
        e.preventDefault();
    
        updateTextEdit(updateText , item.id)
      }
    
      return (
        <section className='border-4 p-2 rounded-xl shadow-xl border-gray-500  bg-blue-100	'>
          <div className='flex flex-col items-center'>
            <form className='flex flex-col'>
              <input type='text' onChange={hanldeChange} value={updateText.title} name='title' placeholder={item.data.title} className='my-1 mx-4 p-2 rounded-md border-b border-gray-400 focus:outline-none bg-gray-100 focus:border-blue-500' />
              <textarea type='text' className='my-2 border border-gray-400 focus:outline-none p-1 rounded-md bg-gray-100' onChange={hanldeChange} name='content' value={updateText.content} placeholder={item.data.content} cols={30} rows={2} />
            </form>
            <div className='flex mt-1'>
              <button onClick={hanldeSubmit} className='bg-green-400 rounded-md text-white px-4 disabled:bg-gray-400 disabled:opacity-70 mr-2'>Save</button>
              <button onClick={() => toggleChangeToEdit(item.id)} className='bg-gray-400 rounded-md text-white px-3 py-1'>Cancel</button>
            </div>
          </div>
        </section>
      )
}

export default Edit