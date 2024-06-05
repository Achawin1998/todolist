'use client'

import { useState , useEffect } from "react";
import Form from "./components/Form";
import Items from "./components/Items";
import Edit from "./components/Edit";


export default function Home() {

  const [items , setItems] = useState([]);
  const [itemsCount , setItemsCount] = useState(0)
  
  useEffect(() => {
    const storedItems = localStorage.getItem('noteItems');
   if (storedItems) {
       const parsedItems = JSON.parse(storedItems);
       setItems(parsedItems);
       setItemsCount(parsedItems.length);
   }
  }, []);

  const addItems = (item) => {
    setItems(preV => ([...preV , {id: Date.now() , data: item , isEdit: false , complete: false , addedTime: Date.now()
    }]))
    setItemsCount((count) => count + 1)
    localStorage.setItem('noteItems', JSON.stringify([...items, { id: Date.now(), data: item, isEdit: false, complete: false }]));
}

  const handleDelete = (id) => {
      setItems(preV => (preV.filter(item => item.id !== id)))
      setItemsCount((count) => count - 1)
      localStorage.setItem('noteItems', JSON.stringify(items.filter(item => item.id !== id)));
  }

  const toggleChangeToEdit = (id) => {
      setItems(items.map(item => (
          item.id === id ? ({...item , isEdit: !item.isEdit}) : item
      )))
  }

  const toggleComplete = (id) => {
      setItems(items.map(item => (
          item.id === id ? ({...item , complete: !item.complete}) : item
      )))
  }

  const updateTextEdit = (data , id) => {
      setItems(items.map(item => (
          item.id === id ? {...item , data , isEdit: !item.isEdit} : item
      )))
      localStorage.setItem('noteItems', JSON.stringify(items.map(item => (item.id === id ? { ...item, data, isEdit: !item.isEdit } : item))));
  }


  return (
    <section className="flex justify-center ">
          <div className='text-center  w-full '>
              <h1 className='my-3 text-4xl text-gray-800 font-semibold'>Note Todo For Today</h1>
                  <hr className='border-gray-200 border-2'/>
                      <div className=' container mx-auto'>
                          <div className=' flex flex-col items-center '>
                              <Form addItems={addItems} />
                               {items.length > 0 && ( <h2 className='mt-8 mb-3 text-gray-800 text-3xl font-semibold '>Your Note List ( <span className='text-rose-700 text-3xl hover:text-sky-500 cursor-pointer'> {itemsCount} </span> <span> ) </span></h2>)}
                                  <div className='flex flex-wrap gap-10 justify-center items-center'>
                                  {items.map(item => (
                                              item.isEdit ? (
                                              <Edit item={item} updateTextEdit={updateTextEdit} toggleChangeToEdit={toggleChangeToEdit} /> 
                                              ):(
                                              <Items item={item} toggleChangeToEdit={toggleChangeToEdit} toggleComplete={toggleComplete} onDelete={handleDelete}/>
                                              )
                                  ))}
                                  </div>
                          </div>
                       </div>
          </div>
        </section>
  );
}
