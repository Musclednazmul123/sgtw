import { useState } from 'react';
import { useAppQuery, useAuthenticatedFetch } from '../hooks';

export default function AllPacks() {
  const {
    data,
    // refetch: refetchProductCount,
    isLoading: isLoadingCount,
    // isRefetching: isRefetchingCount,
  } = useAppQuery({
    url: '/api/packs',
    reactQueryOptions: {
      onSuccess: () => {
        // setIsLoading(false);
      },
    },
  });

  // const toastMarkup = toastProps.content && !isRefetchingCount && (
  //   <Toast {...toastProps} onDismiss={() => setToastProps(emptyToastProps)} />
  // );

  let packs;
  if (data) {
    packs = data.body.data.products.edges;
  }
  console.log(packs);

  return (
    <>
      <div>
        {packs
          ? packs.map((pack) => (
              <div key={pack.node.id}>
                <h2>{pack.node.id}</h2>
                {pack.node.featuredImage ? (
                  <img src={`${pack.node.featuredImage.url}`} />
                ) : (
                  ''
                )}
              </div>
            ))
          : ''}
      </div>
    </>
  );
}
