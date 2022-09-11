import React, {useEffect, useState} from "react";
import ReactPaginate from 'react-paginate';
import Pagination from "./Pagination.jsx";


function PaginatedItems({ itemsPerPage, toggle, docs }) {

  const [items, setItems ] = useState([]);
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {

    if (typeof docs === 'object')  {
      setItems(docs);
      const endOffset = itemOffset + itemsPerPage;
      console.log(`Loading items from ${itemOffset} to ${endOffset}`);
      setCurrentItems(docs.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(docs.length / itemsPerPage));
    }
  }, [itemOffset, itemsPerPage]);


  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % docs.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };


  return (
    <>
      <div className={`card-wrapper ${toggle}-list`}>
        {currentItems &&
          (currentItems.map((item, index) => {
            return (
              <Pagination key={`index-${index}`} toggle={toggle} item={item} />
          )}))
        }
      </div>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
      />
    </>
  );
}

const Results = ({ data, toggle }) => {

  const {numFound, docs} = data;

  return (
    <div className="result">
      {numFound === 0 ? (
        <h2 className="result-text">No Books Found</h2>
      ) : (
        <>
          <h2 className="result-text">{numFound} Books Found</h2>
          < PaginatedItems toggle={toggle} itemsPerPage={10} docs={docs}/>
          
        </>
      )}
    </div>
  );
};

export default Results;
