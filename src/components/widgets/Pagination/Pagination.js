import "../../../scss/pagination.scss";

const CustomPagination = ({
  previousLabel,
  nextLabel,
  pageCount,
  dispatch,
  containerClassName,
  activeClassName,
  initialPage,
  totalRows,
}) => {
  const handleFirstPageButtonClick = () => {
    dispatch({ page: 1 });
  };

  const handleBackButtonClick = () => {
    dispatch({ page: initialPage - 1 });
  };

  const handleNextButtonClick = () => {
    dispatch({ page: initialPage + 1 });
  };

  const handleLastPageButtonClick = () => {
    dispatch({ page: pageCount });
  };

  return (
    <>
      <div>
        <nav className="custom-pagination--nav">
          <span className="custom-pagination--current-elements">{`${
            1 + 20 * (initialPage - 1)
          }-${
            20 * initialPage < totalRows ? 20 * initialPage : totalRows
          } of ${totalRows}`}</span>
          <div className="custom-pagination--buttons">
            <button
              className="custom-pagination--btn"
              onClick={handleFirstPageButtonClick}
              disabled={initialPage === 1}
              aria-label="first page"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                aria-hidden="true"
                role="presentation"
              >
                <path d="M18.41 16.59L13.82 12l4.59-4.59L17 6l-6 6 6 6zM6 6h2v12H6z"></path>
                <path fill="none" d="M24 24H0V0h24v24z"></path>
              </svg>
            </button>
            <button
              className="custom-pagination--btn"
              onClick={handleBackButtonClick}
              disabled={initialPage === 1}
              aria-label="previous page"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                aria-hidden="true"
                role="presentation"
              >
                <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path>
                <path d="M0 0h24v24H0z" fill="none"></path>
              </svg>
            </button>
            <button
              className="custom-pagination--btn"
              onClick={handleNextButtonClick}
              disabled={initialPage >= pageCount}
              aria-label="next page"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                aria-hidden="true"
                role="presentation"
              >
                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path>
                <path d="M0 0h24v24H0z" fill="none"></path>
              </svg>
            </button>
            <button
              className="custom-pagination--btn"
              onClick={handleLastPageButtonClick}
              disabled={initialPage >= pageCount}
              aria-label="last page"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                aria-hidden="true"
                role="presentation"
              >
                <path d="M5.59 7.41L10.18 12l-4.59 4.59L7 18l6-6-6-6zM16 6h2v12h-2z"></path>
                <path fill="none" d="M0 0h24v24H0V0z"></path>
              </svg>
            </button>
          </div>
        </nav>
      </div>
    </>
  );
};

export default CustomPagination;
