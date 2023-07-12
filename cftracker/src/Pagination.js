import React from 'react'
import { DOTS, usePagination } from './usePagination';
import './Pagination.css'
export const Pagination = props => {
    const {
        onPageChange,
        totalCount,
        siblingCount=1,
        currentPage,
        pageSize,
    }=props;
    const paginationRange=usePagination({
        currentPage,
        totalCount,
        siblingCount,
        pageSize
    });
    if(currentPage===0 || paginationRange.length<2)return null;
    const onNext=()=>{
        onPageChange(currentPage+1);
    }
    const onPrevious=()=>{
        onPageChange(currentPage-1);
    }
    let lastPage=paginationRange[paginationRange.length-1];
  return (
    <ul className='pagination-bar pagination-container'>
        <li className={ "pagination-item " + (currentPage==1?"disabled":"")} onClick={onPrevious}>
        &laquo;
        </li>
        {paginationRange.map(page=>{
            if(page===DOTS){
                return <li className='pagination-item'>&#8230;</li>
            }
            return (
                <li onClick={()=>onPageChange(page)} className={ "pagination-item " + (currentPage==page?"selected":"")}>{page}</li>
            )
        })}
        <li className={ "pagination-item " + (currentPage==lastPage?"disabled":"")} onClick={onNext}>
        &raquo;
        </li>
    </ul>
  );
}
