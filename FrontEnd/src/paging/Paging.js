// src/components/Paging.js
import React from 'react';
import Pagination from 'react-js-pagination';

const Paging = ({ activePage, itemsCountPerPage, totalItemsCount, pageRangeDisplayed, onPageChange }) => {
    return (
        <div>
            <Pagination
                activePage={activePage}
                itemsCountPerPage={itemsCountPerPage}
                totalItemsCount={totalItemsCount}
                pageRangeDisplayed={pageRangeDisplayed}
                onChange={onPageChange}
                prevPageText={"<"}
                nextPageText={">"}
                itemClass="mx-1"
                linkClass="px-3 py-1 border border-gray-300 rounded text-gray-600 hover:bg-gray-200 hover:text-white"
                activeLinkClass='bg-gray-300 rounded'
            />
        </div>
    );
};

export default Paging;
