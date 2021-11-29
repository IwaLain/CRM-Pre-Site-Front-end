import ReactPaginate from "react-paginate";
import "../../../scss/pagination.scss";

const Pagination = ({
  previousLabel,
  nextLabel,
  pageCount,
  onPageChange,
  containerClassName,
  activeClassName,
}) => {
  return (
    <ReactPaginate
      previousLabel={previousLabel}
      nextLabel={nextLabel}
      pageCount={pageCount}
      onPageChange={onPageChange}
      containerClassName={containerClassName}
      activeClassName={activeClassName}
      pageRangeDisplayed={5}
    />
  );
};

export default Pagination;
