import React, { useState } from "react";
import {
  Filters,
  IndexTable,
  Stack,
  Image,
  Icon,
  Badge,
  useIndexResourceState,
  TextField,
  Button,
} from "@shopify/polaris";
import { packDetailsListStyle, VideoIcon } from "../assets";
import { ImportMinor, SortMinor } from "@shopify/polaris-icons";

let columnHeading = ["Samples", "Price", "Downloads", "Sales", "Status"];

const PackDetailsIndexTable = ({ currentPackSamples }) => {
  const [queryValue, setQueryValue] = useState(null);

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
    useIndexResourceState(currentPackSamples);

  let rowMarkup =
    currentPackSamples &&
    currentPackSamples.map(
      (
        { id, thumnailSrc, sampleCaption, price, downloads, sales, status },
        index
      ) => {
        return (
          <IndexTable.Row
            id={id}
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

  let columns = columnHeading.map((title,index) => {
    return {
      title: <p className="columnHeading">{title}</p>,
      id: index+"_1_2",
    };
  });

  return (
    <>
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
        itemCount={currentPackSamples.length}
        headings={columns}
        onSelectionChange={handleSelectionChange}
        selectedItemsCount={
          allResourcesSelected ? "All" : selectedResources.length
        }
      >
        {rowMarkup}
      </IndexTable>
    </>
  );
};

export default PackDetailsIndexTable;
