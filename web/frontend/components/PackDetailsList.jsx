import React from "react";
import { Filters, IndexTable, Stack, Image} from "@shopify/polaris";
import { packSamples } from ".";
import {packDetailsListStyle,VideoIcon} from "../assets";

const PackDetailsList = () => {

  const resourceName = {
    singular: 'customer',
    plural: 'customers',
  };

  let rowMarkup = packSamples.map(
    (
      { id, thumnailSrc, sampleCaption, price, downloads, sales, status },
      index
    ) => {
      return (
        <IndexTable.Row id={id} key={id} position={index}>
          <IndexTable.Cell className="firstCell">
          <Stack spacing="extraloose" alignment="center">
            <div className="packSampleItemDescContainer" style={{backgroundImage:`url(${thumnailSrc})`}}>
             
              <Image source={VideoIcon}/>
             
            </div>
            <p>{sampleCaption}</p>
          </Stack>
          </IndexTable.Cell>
          <IndexTable.Cell></IndexTable.Cell>
          <IndexTable.Cell></IndexTable.Cell>
          <IndexTable.Cell></IndexTable.Cell>
          <IndexTable.Cell></IndexTable.Cell>

        </IndexTable.Row>
      );
    }
  );

  return <IndexTable resourceName={resourceName}
  itemCount={packSamples.length}
  headings={[
    {title: 'Name'},
    {title: 'Location'},
    {title: 'Order count'},
    {title: 'Amount spent'},
    {title: 'Amount spent'}
  ]}>
    {rowMarkup}
  </IndexTable>;
};

export default PackDetailsList;
