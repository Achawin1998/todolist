"use client";
import React, { useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import DelBtn from "./DelBtn";
import "./items.css";

function Items({ item, toggleChangeToEdit, toggleComplete, onDelete }) {
  // เก็บเวลาเมื่อข้อมูลถูกเพิ่ม
  const [isHovered, setIsHovered] = useState(false);

  // ใช้เวลาที่เพิ่มข้อมูลไว้แสดงผล
  const time = new Date(item.addedTime).toLocaleTimeString("en-US", {
    hour12: true,
  });

  return (
    <section
      className={`cursor-pointer mt-3 shadow-2xl rounded-md bg-rose-200 border-4 border-gray-300 ${
        item.complete ? "line-through" : null
      }`}
      style={{
        animation: `bounceUpDown 8s infinite alternate`,
        animationPlayState: isHovered ? "paused" : "running",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`flex items-center px-8 py-1 justify-between space-x-6`}>
        <input
          type="checkbox"
          className="rounded border-gray-400 border-2 p-2"
          checked={item.complete}
          onChange={() => toggleComplete(item.id)}
        />
        <div>
          <h2 className="text-lg font-medium">{item.data.title}</h2>
          <p className="text-gray-700">{item.data.content}</p>
        </div>

        <div>
          <button
            className="mx-2 hover:scale-110"
            onClick={() => toggleChangeToEdit(item.id)}
          >
            <AiFillEdit size={25} />
          </button>
          <DelBtn item={item} onDelete={onDelete} />
        </div>
      </div>
      <h6 className="text-sm flex justify-end mr-2">{time}</h6>
    </section>
  );
}

export default Items;
