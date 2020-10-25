
module.exports = (totalCount, page = 1, itemCount) => {

  itemCount = itemCount ? itemCount : totalCount;

  let currentPage = page;

  let totalPages = totalCount ? Math.ceil(parseFloat(totalCount) / parseFloat(itemCount)) : 0;

  let startPage = currentPage - 5;
  let endPage = currentPage + 4;

  if (startPage <= 0) {
    endPage -= (startPage - 1);
    startPage = 1
  }

  if (endPage > totalPages) {
    
    endPage = totalPages;

    if (endPage > 10)
      startPage = endPage - 9;
    
  }

  return {
    totalCount,
    currentPage,
    page,
    itemCount: parseInt(itemCount),
    startPage,
    endPage,
    offset: (currentPage - 1) * itemCount
  }

}

