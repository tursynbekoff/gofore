import React, { useEffect, useState } from "react";
import ReactPaginate from 'react-paginate';
import Card from "./Card.jsx";

export function PaginatedItems({ itemsPerPage, listMode, docs }) {

  const [items, setItems] = useState([]);
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {

    if (typeof docs === 'object') {
      setItems(docs);
      const endOffset = itemOffset + itemsPerPage;
      setCurrentItems(docs.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(docs.length / itemsPerPage));
    }
  }, [itemOffset, itemsPerPage, docs]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % docs.length;
    setItemOffset(newOffset);
  };


  return (
    <>
      <div className={`card-wrapper ${listMode}-list`}>
        {currentItems &&
          (currentItems.map((item, index) => {
            return (
              <Card key={`index-${index}`} item={item} listMode={listMode} />
            );
          }))}
      </div>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="previous"
        renderOnZeroPageCount={null} />
    </>
  );
}
