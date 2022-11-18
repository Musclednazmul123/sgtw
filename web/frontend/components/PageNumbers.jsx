import React from "react";
import { Stack } from "@shopify/polaris";
import { PaginationNumberStyle } from "../assets";

const PageNumbers = ({
  packSamples,
  packSamplesPerPage,
  paginate,
  currentPage,
}) => {
  let pageNumbers = [];

  for (
    let number = 1;
    number <= Math.ceil(packSamples.length / packSamplesPerPage);
    number++
  ) {
    let numberItem = (
      <div
        className={`paginationNumberContainer 
        ${currentPage==number?"activePaginationBorder":"simplePaginationBorder"}`}
        onClick={() => paginate(number)}
        key={number}
      >
        {number}
      </div>
    );

    pageNumbers.push(numberItem);
  }

  return (
    <Stack distribution="center" spacing="extraTight">
      {pageNumbers}
    </Stack>
  );
};

export default PageNumbers;
