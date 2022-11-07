import React from "react";
import { Filters, IndexTable, Stack } from "@shopify/polaris";
import { packSamples } from "./";

const PackDetailsList = () => {
  let rowMarkup = packSamples.map(
    (
      { id, thumnailSrc, sampleCaption, price, downloads, sales, status },
      index
    ) => {
      return (
        <IndexTable.Row id={id} key={id} position={index}>
          <IndexTable.Cell>
          <Stack>
            <div className="packSampleItemDescContainer">
             
            </div>

          </Stack>
          </IndexTable.Cell>
        </IndexTable.Row>
      );
    }
  );

  return <div>PackDetailsList</div>;
};

export default PackDetailsList;
