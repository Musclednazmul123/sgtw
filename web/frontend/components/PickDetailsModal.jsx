import React, { useState, useCallback } from 'react';
import {
  Card,
  Button,
  Form,
  TextField,
  Stack,
  Icon,
  Select,
  Checkbox,
  DropZone,
  Image,
} from '@shopify/polaris';
import { editIcon, closeImage, modalstyle } from '../assets';
import { MobileCancelMajor } from '@shopify/polaris-icons';
import { useAuthenticatedFetch } from '../hooks';

const PickDetailsModal = ({ buttonText, customContent }) => {
  let [active, setActive] = useState(false);
  let [priceChecked, setPriceChecked] = useState(false);
  let [file, setFile] = useState(null);
  // const [mainFile, setMainFile] = useState(null);

  const handleDrop = useCallback(
    (_droppedFiles, acceptedFiles, rejectedFiles) => {
      console.log('Accepted Files' + acceptedFiles[0]);
      console.log('Rejected Files' + rejectedFiles[0]);

      setFile(acceptedFiles[0]);
      // setMainFile(_droppedFiles[0].File);
    },
    []
  );

  const fetch = useAuthenticatedFetch();
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');

  // console.log(title);

  const handleCreate = async () => {
    // setIsLoading(true);
    const fd = new FormData();
    fd.append('file', file);
    fd.append('title', title);
    fd.append('price', price);

    console.log([...fd]);

    const response = await fetch('/api/packs', {
      // Adding method type
      method: 'POST',
      // Adding body or contents to send
      body: fd,

      // body: JSON.stringify({
      //   title: title,
      //   price: price,
      // }),

      // Adding headers to the request
      headers: {
        // 'Content-type': 'application/json; charset=UTF-8',
        'Content-type': 'multipart/form-data',
      },
    });

    if (response.ok) {
      console.log('product created success');
    } else {
      // setIsLoading(false);
      // setToastProps({
      //   content: 'There was an error creating products',
      //   error: true,
      // });
      console.log('Something went wrong');
    }
  };

  // const imgurl = window.URL.createObjectURL(file);

  return (
    <>
      {(buttonText && (
        <Button
          primary
          onClick={() => {
            setActive(true);
          }}
        >
          {buttonText}
        </Button>
      )) ||
        (customContent && (
          <div
            onClick={() => {
              setActive(true);
            }}
          >
            {customContent}
          </div>
        ))}
      {active && (
        <div className="modal" style={{height:`${document.getElementById ("app").scrollHeight}px`}}>
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
                  console.log('Inside form submit handler');
                }}
              >
                <Stack vertical>
                  <Stack distribution="center" element="h3">
                    <h3 element="h2" className="packDetailsHeading">
                      PACK DETAILS
                    </h3>
                  </Stack>

                  <Stack distribution="fill" spacing="baseTight" vertical>
                    <input
                      className="title-input"
                      type="text"
                      placeholder="Pack Title"
                      onChange={(e) => setTitle(e.target.value)}
                    />
                    <Select
                      label="Pack Title"
                      labelHidden
                      placeholder="Genre(!)"
                      options={[
                        { label: 'option 1', value: 'option1' },
                        { label: 'option 2', value: 'option2' },
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
                      <input
                        type="number"
                        step="0.1"
                        min="0"
                        max="999999"
                        className="price"
                        placeholder="$ 50.00"
                        onChange={(e) => setPrice(e.target.value)}
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
                    <Button onClick={handleCreate} primary>
                      Save
                    </Button>
                    {/* <input
                      type="file"
                      onChange={(e) => setMainFile(e.target.files[0])}
                    /> */}
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
