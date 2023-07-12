import { useMemo } from "react";

export const DOTS="...";

const range=(start,end)=>{
    let length=end-start+1;
    return Array.from({length},(_,idx)=>idx+start);
}

export const usePagination=({
    totalCount,
    pageSize,
    siblingCount=1,
    currentPage
}) =>{
    const paginationRange=useMemo(()=>{
        const totalPageCount=Math.ceil(totalCount/pageSize);
        const totalPageNumbers=siblingCount+5;
        if(totalPageNumbers>=totalPageCount){
            return range(1,totalPageCount);
        }
        const lefId=Math.max(currentPage-siblingCount,1);
        const rigId=Math.min(currentPage+siblingCount,totalPageCount);

        const showLef=lefId>2;
        const showRig=rigId<totalPageCount-2;
        if(!showLef && showRig){
            let lefCount=3+2*siblingCount;
            let lefRange=range(1,lefCount);
            return [...lefRange,DOTS,totalPageCount];
        }
        if(showLef && !showRig){
            let rigCount=3+2*siblingCount;
            let rigRange=range(totalPageCount-rigCount+1,totalPageCount);
            return [1,DOTS,...rigRange];
        }
        if(showLef && showRig){
            let midRange=range(lefId,rigId);
            return [1,DOTS,...midRange,DOTS,totalPageCount];
        }
    },[totalCount,pageSize,siblingCount,currentPage]);
    return paginationRange;
}