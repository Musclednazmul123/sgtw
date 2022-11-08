import React from "react";
import {
  Filters,
  IndexTable,
  Stack,
  Image,
  Icon,
  Badge,
  useIndexResourceState,
  Pagination,
} from "@shopify/polaris";
import { packSamples, PaginationNumber } from ".";
import { packDetailsListStyle, VideoIcon } from "../assets";
import { ImportMinor } from "@shopify/polaris-icons";

let columnHeading = ["Samples", "Price", "Downloads", "Sales", "Status"];

const PackDetailsList = () => {
  let label = (
    <Stack distribution="center" spacing="extraTight">
      {[1, 2, 3].map((number, index) => (
        <PaginationNumber key={index} number={number} />
      ))}
    </Stack>
  );

  const resourceName = {
    singular: "pack",
    plural: "packs",
  };

  const { selectedResources, allResourcesSelected, handleSelectionChange } =
    useIndexResourceState(packSamples);

  let rowMarkup = packSamples.map(
    (
      { id, thumnailSrc, sampleCaption, price, downloads, sales, status },
      index
    ) => {
      return (
        <IndexTable.Row
          id={id}
          key={id}
          position={index}
          selected={selectedResources.includes(id)}
        >
          <IndexTable.Cell className="firstCell">
            <Stack spacing="loose" alignment="center">
              <div
                className="packSampleItemDescContainer"
                style={{ backgroundImage: `url(${thumnailSrc})` }}
              >
                <Image source={VideoIcon} />
              </div>
              <p className="sampleCaption">{sampleCaption}</p>
            </Stack>
          </IndexTable.Cell>
          <IndexTable.Cell>
            <p className="sampleCaption">{`$${price}`}</p>
          </IndexTable.Cell>
          <IndexTable.Cell>
            <Stack spacing="extraTight" alignment="center">
              <Icon source={ImportMinor} color="subdued" />
              <p className="sampleCaption">{downloads}</p>
            </Stack>
          </IndexTable.Cell>
          <IndexTable.Cell>
            <p className="sampleCaption">{`$${sales}`}</p>
          </IndexTable.Cell>
          <IndexTable.Cell>
            {status == "active" ? (
              <Badge status="success">Active</Badge>
            ) : (
              <Badge status="critical">Disabled</Badge>
            )}
          </IndexTable.Cell>
        </IndexTable.Row>
      );
    }
  );

  return (
    <Stack vertical alignment="fill" spacing="extraLoose" distribution="center">
      <IndexTable
        resourceName={resourceName}
        itemCount={packSamples.length}
        headings={columnHeading.map((heading, index) => {
          return {
            title: <p className="columnHeading">{heading}</p>,
            id: index,
          };
        })}
        onSelectionChange={handleSelectionChange}
        selectedItemsCount={
          allResourcesSelected ? "All" : selectedResources.length
        }
      >
        {rowMarkup}
      </IndexTable>
      <Stack distribution="center">
        <Pagination
          label={label}
          hasPrevious
          onPrevious={() => {
            console.log("Previous");
          }}
          hasNext
          onNext={() => {
            console.log("Next");
          }}
        />
      </Stack>
    </Stack>
  );
};

export default PackDetailsList;
