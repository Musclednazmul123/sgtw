import React from 'react';
import { Stack, Image, Pagination } from '@shopify/polaris';
import { packSamplesHomePage } from './';
import { HomePageStyle, VideoIcon, placeHolder } from '../assets';
import { PickDetailsModal, PaginationNumber } from './';
import { useNavigate } from 'react-router-dom';
import { useAppQuery } from '../hooks';

const HomePage = () => {
  const navigate = useNavigate();

  const {
    data,
    // refetch: refetchProductCount,
    // isLoading: isLoadingCount,
    // isRefetching: isRefetchingCount,
  } = useAppQuery({
    url: '/api/packs',
    reactQueryOptions: {
      onSuccess: () => {
        // setIsLoading(false);
      },
    },
  });

  let packs = null;
  if (data) {
    packs = data.body.data.products.edges;
    console.log(data.body.data.products.edges);
    packs = packs.map((pack, index) => (
      <div
        onClick={() =>
          navigate(
            `/packs/${pack.node.id.replace('gid://shopify/Product/', '')}`
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
    ));
  }

  console.log(packs);

  let label = (
    <Stack distribution="center" spacing="extraTight">
      {[1, 2, 3].map((number, index) => (
        <PaginationNumber key={index} number={number} />
      ))}
    </Stack>
  );

  return (
    <Stack
      vertical
      alignment="center"
      spacing="extraLoose"
      distribution="center"
    >
      <Stack distribution="center" spacing="extraLoose">
        {packs}
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
          console.log('Previous');
        }}
        hasNext
        onNext={() => {
          console.log('Next');
        }}
      />
    </Stack>
  );
};

export default HomePage;
