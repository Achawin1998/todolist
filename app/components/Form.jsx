'use client'

import React, { useState , useEffect } from 'react'
import './form.css'

function Form({ addItems }) {

  const [text , setText] = useState({
    title: '',
    content: ''
  })

  const [valid , setValid] = useState(false)

  useEffect(() => {
    if (!text.title || !text.content || !text.title.trim() || !text.content.trim()){
      setValid(false)
    }else {
      setValid(true)
    }
  } , [text.title , text.content])

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

    addItems(text)
    setText({
      title: '',
      content: ''
    })
  }



  return (
    <section className="flex justify-between">
      <form className="input-form w-auto mr-10">
        <input
          type="text"
          className="outline-none hover:bg-gray-200 hover:scale-110 rounded-xl border border-purple-600 py-3 px-6 mt-4 mb-8 w-72"
          onChange={hanldeChange}
          value={text.title}
          name="title"
          placeholder="Title..."
        />
        <br />
        <textarea
          type="text"
          className="outline-none border border-purple-600 hover:bg-gray-200 hover:scale-105 rounded-xl px-3 py-3 text-lg"
          onChange={hanldeChange}
          name="content"
          value={text.content}
          placeholder="Take a note..."
          cols={35}
          rows={3}
        />
      </form>
      <button
        className="btn bg-blue-400 text-white hover:scale-110 py-2 px-4 rounded-lg cursor-pointer self-center disabled:bg-gray-400  disabled:text-gray-300"
        disabled={!valid}
        onClick={hanldeSubmit}
      >
        Add
      </button>
    </section>
  );
}

export default Form