import React from "react";
import { Pagination } from "react-bootstrap";

const CustomPagination = ({
  currentPage,
  totalPages,
  maxPagesToShow,
  onChangePage,
}) => {
  const pageNumbers = [];

  // Calculate the range of pages to show in the pagination component
  const startPage =
    currentPage <= Math.floor(maxPagesToShow / 2)
      ? 1
      : Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
  const endPage =
    currentPage + Math.floor(maxPagesToShow / 2) > totalPages
      ? totalPages
      : Math.min(totalPages, currentPage + Math.floor(maxPagesToShow / 2));

  // Add the pages to the pageNumbers array, and include Ellipsis if needed
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(
      <Pagination.Item
        key={i}
        active={i === currentPage}
        onClick={() => onChangePage(i)}
      >
        {i}
      </Pagination.Item>
    );
  }

  if (startPage > 1) {
    pageNumbers.unshift(<Pagination.Ellipsis key="startEllipsis" disabled />);
    pageNumbers.unshift(
      <Pagination.Item key={1} onClick={() => onChangePage(1)}>
        1
      </Pagination.Item>
    );
  }

  if (endPage < totalPages) {
    pageNumbers.push(<Pagination.Ellipsis key="endEllipsis" disabled />);
    pageNumbers.push(
      <Pagination.Item
        key={totalPages}
        onClick={() => onChangePage(totalPages)}
      >
        {totalPages}
      </Pagination.Item>
    );
  }
  if (!totalPages) return <></>;
  return (
    <Pagination size="sm" className="justify-content-end">
      <Pagination.Prev
        children={<>&laquo;</>}
        disabled={currentPage === 1}
        onClick={() => onChangePage(currentPage - 1)}
      />
      {pageNumbers}
      <Pagination.Next
        children={<>&raquo;</>}
        disabled={currentPage === totalPages}
        onClick={() => onChangePage(currentPage + 1)}
      />
    </Pagination>
  );
};

export default CustomPagination;
