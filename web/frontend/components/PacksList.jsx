import { useState } from "react";
import { Stack, Image, Pagination } from "@shopify/polaris";
import { useNavigate } from "react-router-dom";
import { PickDetailsModal, PageNumbers, EmptyState } from "./";
import { HomePageStyle, VideoIcon, placeHolder } from "../assets";

const PacksList = ({ packs }) => {
  console.log(packs);
  const navigate = useNavigate();
  let [currentPage, setCurrentPage] = useState(1);
  let [packsPerPage] = useState(12);

  const paginate = (number) => {
    setCurrentPage(number);
  };

  let LastPackIndex = currentPage * packsPerPage;
  let FirstPackIndex = LastPackIndex - packsPerPage;
  console.log(LastPackIndex, FirstPackIndex);
  let currentPacks = packs.slice(FirstPackIndex, LastPackIndex);
  console.log(currentPacks);
  let packsList = currentPacks.map((pack, index) => {
    return (
      <div
        onClick={() =>
          navigate(
            `/packs/${pack.node.id.replace("gid://shopify/Product/", "")}`
          )
        }
        key={`${pack.node.id}--${index}`}
        className="packItem"
        style={{
          backgroundImage: `url(${
            pack.node.featuredImage ? pack.node.featuredImage.url : placeHolder
          })`,
        }}
      >
        <div className="slider"></div>
        <Image source={VideoIcon} width={20} height={20} />
      </div>
    );
  });
  console.log("inside data packs", packsList);

  return packs.length > 0 && packs.length > 0 ? (
    <Stack
      vertical
      alignment="center"
      spacing="extraLoose"
      distribution="center"
    >
      <Stack distribution="center" spacing="extraLoose">
        {packsList}
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
        label={
          <PageNumbers
            packSamples={packs}
            packSamplesPerPage={packsPerPage}
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
          currentPage !== Math.ceil(packs.length / packsPerPage) &&
            setCurrentPage((pagenumber) => {
              return ++pagenumber;
            });
          console.log("Next");
        }}
      />
    </Stack>
  ) : (
    EmptyState
  );
};

export default PacksList;
