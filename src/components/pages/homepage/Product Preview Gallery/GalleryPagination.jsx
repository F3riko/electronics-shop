import Pagination from "react-bootstrap/Pagination";
import { useState, useEffect } from "react";

function GalleryPagination({ currentPage, setCurrentPage, pagesTotal }) {
  const pagesToShow = 2; // Number of page numbers to show before and after the current page
  const [pagesConfig, setPagesConfig] = useState({
    ellipsisStartRequired: false,
    ellipsisEndRequired: false,
    prevRequired: false,
    firstRequired: false,
    nextRequired: false,
    lastRequired: false,
  });

  useEffect(() => {
    const ellipsisStartRequired = currentPage > pagesToShow;
    const ellipsisEndRequired = currentPage < pagesTotal - pagesToShow;
    const prevRequired = currentPage > 1;
    const firstRequired = currentPage > pagesToShow + 1;
    const nextRequired = currentPage < pagesTotal;
    const lastRequired = currentPage < pagesTotal - pagesToShow;

    setPagesConfig({
      ellipsisStartRequired,
      ellipsisEndRequired,
      prevRequired,
      firstRequired,
      nextRequired,
      lastRequired,
    });
  }, [currentPage, pagesTotal]);

  const handleSetPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (
      let i = currentPage - pagesToShow;
      i <= currentPage + pagesToShow;
      i++
    ) {
      if (i > 0 && i <= pagesTotal) {
        pageNumbers.push(
          <Pagination.Item
            key={i}
            active={i === currentPage}
            onClick={() => handleSetPage(i)}
          >
            {i}
          </Pagination.Item>
        );
      }
    }
    return pageNumbers;
  };

  const {
    ellipsisStartRequired,
    ellipsisEndRequired,
    prevRequired,
    firstRequired,
    nextRequired,
    lastRequired,
  } = pagesConfig;

  return (
    <Pagination className="justify-content-center">
      {firstRequired && <Pagination.First onClick={() => handleSetPage(1)} />}
      {prevRequired && (
        <Pagination.Prev onClick={() => handleSetPage(currentPage - 1)} />
      )}
      {ellipsisStartRequired && (
        <>
          <Pagination.Item onClick={() => handleSetPage(1)}>1</Pagination.Item>
          <Pagination.Ellipsis disabled />
        </>
      )}
      {renderPageNumbers()}
      {ellipsisEndRequired && <Pagination.Ellipsis disabled />}
      {ellipsisEndRequired && (
        <Pagination.Item onClick={() => handleSetPage(pagesTotal)}>
          {pagesTotal}
        </Pagination.Item>
      )}
      {nextRequired && (
        <Pagination.Next onClick={() => handleSetPage(currentPage + 1)} />
      )}
      {lastRequired && (
        <Pagination.Last onClick={() => handleSetPage(pagesTotal)} />
      )}
    </Pagination>
  );
}

export default GalleryPagination;
