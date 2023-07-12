import React, { useMemo, useState } from 'react'
import data from './data/mock-data.json';
import { Pagination as Pagination } from './Pagination';
import './PageApp.css'
const pageSize=10;
export const PageApp = () => {
    const [curPage,setCurPage]=useState(1);
    const curTableDate=useMemo(()=>{
        const firstId=(curPage-1)*pageSize;
        const lastId=firstId+pageSize;
        return data.slice(firstId,lastId);
    },[curPage]);
  return (
    <>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>FIRST NAME</th>
                    <th>LAST NAME</th>
                    <th>EMAIL</th>
                    <th>PHONE</th>
                </tr>
            </thead>
            <tbody>
                {curTableDate.map(item=>{
                    return (
                    <tr>
                        <td>{item.id}</td>
                        <td>{item.first_name}</td>
                        <td>{item.last_name}</td>
                        <td>{item.email}</td>
                        <td>{item.phone}</td>
                    </tr>
                    )
                })}
            </tbody>
        </table>
        <Pagination
            currentPage={curPage}
            totalCount={data.length}
            pageSize={pageSize}
            onPageChange={page=>setCurPage(page)}
        />
    </>
  )
}
