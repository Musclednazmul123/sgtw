import React, { useState } from "react";
import { Stack, Pagination } from "@shopify/polaris";
import { packSamples, PageNumbers, PackDetailsIndexTable, EmptyState } from ".";

const PackDetailsList = () => {
  let [currentPage, setCurrentPage] = useState(1);
  let [packSamplesPerPage] = useState(5);

  console.log(currentPage);
  const paginate = (number) => {
    console.log("Inside paginate function");
    setCurrentPage(number);
  };

  let indexOfLastPackSample = currentPage * packSamplesPerPage;
  let indexOfFirstPackSample = indexOfLastPackSample - packSamplesPerPage;
  let currentPackSamples = packSamples.slice(
    indexOfFirstPackSample,
    indexOfLastPackSample
  );
  console.log(currentPackSamples);

  return packSamples.length > 0 && currentPackSamples.length > 0 ? (
    <Stack vertical alignment="fill" spacing="extraLoose" distribution="center">
      <PackDetailsIndexTable currentPackSamples={currentPackSamples} />
      <Stack distribution="center">
        <Pagination
          label={
            <PageNumbers
              packSamples={packSamples}
              packSamplesPerPage={packSamplesPerPage}
              paginate={paginate}
              currentPage={currentPage}
            />
          }
          hasPrevious
          onPrevious={() => {
            console.log("Previous");
            currentPage !== 1 &&
              setCurrentPage((pagenumber) => {
                return --pagenumber;
              });
          }}
          hasNext
          onNext={() => {
            currentPage !==
              Math.ceil(packSamples.length / packSamplesPerPage) &&
              setCurrentPage((pagenumber) => {
                return ++pagenumber;
              });
            console.log("Next");
          }}
        />
      </Stack>
    </Stack>
  ) : (
    <EmptyState />
  );
};

export default PackDetailsList;
