"use client";

import React from 'react'
import Table from "@/components/general/Table"
function Dashboard() {

  const addAction = ( ) => {
    console.log("add");
  }
  const editAction = ( item : object ) => {
    console.log(item);
  }


  const headers = ["image" , 'name' , "date" ,"action"];
  const rows = [
    [

      {
        id: 1,
        isImg:true,
        item:``
      },
      {
        id: 1,
        item_en: "Abdelrahman",
        item_ar: "عبدالرحمن",
      },
      {
        id: 1,
        isDate:true,
        item: Date.now(),
      },
      {
        id: 1,
        isAction: true,
        hasDelete:true,
        hasEdit:true,
        hasCustom:true,
        customTitle:"custom",
        currentItem: {
          name_ar: "عبدالرحمن",
          name_en: "Abdelrahman",
          role:"frontend"
        },
      },
    ],
    [

      {
        id: 2,
        isImg:true,
        item:`/u/feedback/img-1735573110804-857223659me.jpg`
      },
      {
        id: 2,
        item_en: "Mahmoud",
        item_ar: "محمود",
      },
      {
        id: 2,
        isDate:true,
        item: Date.now(),
      },
      {
        id: 2,
        isAction: true,
        hasDelete:true,
        hasEdit:true,
        hasCustom:true,
        customTitle:"custom",
        currentItem: {
          name_ar: "محمود",
          name_en: "mahmoud",
          role:"frontend"
        },
      },
    ],
  ];
  return (
    <div>
      <Table page={'dashboard'} headers={headers} rows={rows} addAction={addAction} editAction={editAction} />
    </div>
  )
}

export default Dashboard