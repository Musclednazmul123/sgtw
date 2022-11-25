import React, { useState } from "react";
import {
  Filters,
  IndexTable,
  Stack,
  Image,
  Icon,
  Badge,
  useIndexResourceState,
  Pagination,
  TextField,
  Button,
} from "@shopify/polaris";
import { packSamples, PaginationNumber } from ".";
import { packDetailsListStyle, VideoIcon } from "../assets";
import { ImportMinor, SortMinor } from "@shopify/polaris-icons";

let columnHeading = ["Samples", "Price", "Downloads", "Sales", "Status"];

const PackDetailsList = () => {
  const [queryValue, setQueryValue] = useState(null);

  let label = (
    <Stack distribution="center" spacing="extraTight">
      {[1, 2, 3].map((number, index) => (
        <PaginationNumber key={index} number={number} />
      ))}
    </Stack>
  );

  let filters = [
    {
      key: "actions",
      label: "Actions",
      filter: (
        <TextField type="text" label="Actions" autoComplete="off" labelHidden />
      ),
      shortcut: true,
    },
    {
      key: "bpm",
      label: "BPM",
      filter: (
        <TextField type="text" label="BPM" autoComplete="off" labelHidden />
      ),
      shortcut: true,
    },
    {
      key: "genre",
      label: "Genre",
      filter: (
        <TextField type="text" label="Genre" autoComplete="off" labelHidden />
      ),
      shortcut: true,
    },
    {
      key: "key",
      label: "Key",
      filter: (
        <TextField type="text" label="Key" autoComplete="off" labelHidden />
      ),
      shortcut: true,
    },
    {
      key: "edit",
      label: "Edit",
      filter: (
        <TextField type="text" label="Edit" autoComplete="off" labelHidden />
      ),
      shortcut: true,
    },
  ];

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
      <div className="filterWrapper">
        <div className="filter">
        <Filters
          filters={filters}
          queryValue={queryValue}
          queryPlaceholder="Filter"
          onQueryChange={setQueryValue}
        />
        </div>
        <Button icon={SortMinor}>Sort</Button>
      </div>
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
