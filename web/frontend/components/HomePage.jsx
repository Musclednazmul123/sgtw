import { PacksList } from "./";

import { useAppQuery } from "../hooks";

const HomePage = () => {
  const {
    data,
    // refetch: refetchProductCount,
    isLoading,
    // isRefetching: isRefetchingCount,
  } = useAppQuery({
    url: "/api/packs",
    reactQueryOptions: {
      onSuccess: () => {
        // setIsLoading(false);
        console.log("inside sucess of homepage data");
      },
    },
  });

  console.log("Component re rendered");
  // let paginate=number

  if (isLoading) {
    return <p>Loading...</p>;
  }

  
  return data && <PacksList packs={data.body.data.products.edges} />
};

export default HomePage;
