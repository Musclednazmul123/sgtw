import React from "react";
import { Stack, Image, Pagination } from "@shopify/polaris";
import { packSamplesHomePage } from "./";
import { HomePageStyle, VideoIcon } from "../assets";
import { PickDetailsModal, PaginationNumber } from "./";

const HomePage = () => {

    let label= <Stack distribution="center" spacing="extraTight">
{[1,2,3].map((number,index)=><PaginationNumber key={index} number={number} />)}
    </Stack>

  return (
    <Stack
      vertical
      alignment="center"
      spacing="extraLoose"
      distribution="center"
    >
      <Stack distribution="center" spacing="extraLoose">
        {packSamplesHomePage.map(({ thumnailSrc, id }) => {
          return (
            <div
              key={id}
              className="packItem"
              style={{ backgroundImage: `url(${thumnailSrc})` }}
            >
              <div className="slider"></div>
              <Image source={VideoIcon} width={20} height={20} />
            </div>
          );
        })}
        <PickDetailsModal
          customContent={
            <div className="newPack">
              <div className="newPackSlider"></div>
              <p className="newPackItem">Add new Pack</p>
            </div>
          }
        />
      </Stack>
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
  );
};

export default HomePage;
