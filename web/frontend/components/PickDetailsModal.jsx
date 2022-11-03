import React, { useState, useCallback } from "react";
import {
  Card,
  Button,
  Form,
  TextField,
  Subheading,
  Stack,
  Icon,
  Select,
  Checkbox,
  DropZone,
  Image,
  Heading,
} from "@shopify/polaris";
import { modalstyle, editIcon, closeImage } from "../assets";
import { MobileCancelMajor } from "@shopify/polaris-icons";

const PickDetailsModal = ({ buttonText }) => {
  let [active, setActive] = useState(false);
  let [priceChecked, setPriceChecked] = useState(false);
  let [file, setFile] = useState(null);

  const handleDrop = useCallback(
    (_droppedFiles, acceptedFiles, rejectedFiles) => {
      console.log("Accepted Files" + acceptedFiles[0]);
      console.log("Rejected Files" + rejectedFiles[0]);

      setFile(acceptedFiles[0]);
    },
    []
  );

  return (
    <>
      <Button
        primary
        onClick={() => {
          setActive(true);
        }}
      >
        {buttonText}
      </Button>
      {active && (
        <div className="modal">
          <div className="modalContent">
            <button
              className="closeIcon"
              onClick={() => {
                setActive(false);
              }}
            >
              <Icon source={MobileCancelMajor} color="base" />
            </button>
            <Card sectioned>
              <Form
                onSubmit={() => {
                  console.log("Inside form submit handler");
                }}
              >
                <Stack vertical>
                  <Stack distribution="center" element="h3">
                    <h3 element="h2" className="packDetailsHeading">PACK DETAILS</h3>
                  </Stack>

                  <Stack distribution="fill" spacing="baseTight" vertical>
                    <TextField
                      label="Pack Title"
                      labelHidden
                      autoComplete="off"
                      type="text"
                      placeholder="Pack Title"
                    />
                    <Select
                      label="Pack Title"
                      labelHidden
                      placeholder="Genre(!)"
                      options={[
                        { label: "option 1", value: "option1" },
                        { label: "option 2", value: "option2" },
                      ]}
                    />
                    <TextField
                      type="text"
                      autoComplete="off"
                      label="description"
                      labelHidden
                      multiline={3}
                      placeholder="Descriptions"
                    />
                    <Checkbox
                      label={<p className="checkbox">Set Price</p>}
                      checked={priceChecked}
                      onChange={(newChecked) => {
                        setPriceChecked(newChecked);
                      }}
                    />
                    {priceChecked && (
                      <TextField
                        label="Price"
                        autoComplete="off"
                        labelHidden
                        type="text"
                        placeholder="$ 50.00"
                      />
                    )}
                    <Stack vertical>
                      <DropZone
                        label={
                          <p className="dropzoneLabel">Set Pack Thumbnail</p>
                        }
                        type="image"
                        accept="image/*"
                        onDrop={handleDrop}
                      >
                        {!file && <DropZone.FileUpload />}
                        {file && (
                          <div
                            className="fileContainter"
                            style={{
                              backgroundImage: `url(${window.URL.createObjectURL(
                                file
                              )})`,
                            }}
                          >
                            <p className="fileChangeTitle">Change</p>
                            <Image
                              source={editIcon}
                              width="13px"
                              height="13px"
                            />
                          </div>
                        )}
                      </DropZone>
                      {file && (
                        <div
                          onClick={() => setFile(null)}
                          className="imageClearContainer"
                        >
                          <Stack spacing="tight" alignment="center">
                            <a className="imageClear">Clear</a>
                            <Image
                              source={closeImage}
                              width="9px"
                              height="9px"
                            />
                          </Stack>
                        </div>
                      )}
                    </Stack>
                  </Stack>
                  <Stack distribution="center">
                    <Button primary>Save</Button>
                  </Stack>
                </Stack>
              </Form>
            </Card>
          </div>
        </div>
      )}
    </>
  );
};

export default PickDetailsModal;
