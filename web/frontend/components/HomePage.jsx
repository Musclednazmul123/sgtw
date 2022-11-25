import React, { Suspense } from 'react';
import { Stack, Image, Pagination } from '@shopify/polaris';
import { packSamplesHomePage } from './';
import { HomePageStyle, VideoIcon, placeHolder } from '../assets';
import { PickDetailsModal, PaginationNumber } from './';
import { useNavigate } from 'react-router-dom';
import { useAppQuery } from '../hooks';
import { LazyLoadImage } from 'react-lazy-load-image-component';

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
    packs = data.pack;
    console.log(data);
    packs = packs.map((pack, index) => (
      <div
        onClick={() =>
          navigate(
            `/packs/${pack.productId.replace('gid://shopify/Product/', '')}`
          )
        }
        key={`${pack._id}--${index}`}
        className="packItem"
      >
        <LazyLoadImage
          src={pack.thumbnail ? pack.thumbnail : placeHolder}
          width={200}
          height={130}
          effect="blur"
        />
        <div className="slider">
          <a href={pack.thumbnail}></a>
        </div>
        <div className="absolute">
          <Image source={VideoIcon} width={20} height={20} />
        </div>
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
