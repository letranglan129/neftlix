import ReactPaginate from 'react-paginate'

export default function Pagination({ isLoading, handlePageClick, page, totalPage }) {
    return (
        <div
            className={`flex justify-center py-12 ${isLoading ? 'hidden' : ''}`}
        >
            <ReactPaginate
                pageCount={totalPage > 500 ? 500 : totalPage}
                previousLabel={<i className="far fa-chevron-left"></i>}
                nextLabel={<i className="far fa-chevron-right"></i>}
                pageRangeDisplayed={2}
                marginPagesDisplayed={2}
                containerClassName="paginate-container"
                pageClassName="paginate-item"
                pageLinkClassName="paginate-link"
                previousClassName="paginate-item"
                previousLinkClassName="paginate-link"
                nextClassName="paginate-item"
                nextLinkClassName="paginate-link"
                breakLabel="..."
                forcePage={page - 1}
                onPageChange={handlePageClick}
                breakClassName="paginate-item"
                breakLinkClassName="paginate-link"
            />
        </div>
    )
}
