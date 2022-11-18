import { Button, Card, Icon, Stack } from "@shopify/polaris";
import {
  packStyle,
  musicIcon,
  downloadIcon,
  packThumbnail,
  placeHolder,
} from "../assets";
import { EditMajor } from "@shopify/polaris-icons";
import { PickDetailsModal, EmptyState, PackDetailsList } from "./";
import { useNavigate, useParams } from "react-router-dom";
import { useAppQuery, useAuthenticatedFetch } from "../hooks";

export function PackDetails() {
  const pack = undefined;
  const fetch = useAuthenticatedFetch();
  const navigate = useNavigate();

  const { id } = useParams();

  const {
    data,
    // refetch: refetchProductDetails,
    // isLoading: isLoadingCount,
    // isRefetching: isRefetchingCount,
  } = useAppQuery({
    url: `/api/packs/${id}`,
    reactQueryOptions: {
      onSuccess: () => {
        // setIsLoading(false);
      },
    },
  });

  const handleDelete = async () => {
    const deleted = await fetch(`/api/packs/${id}`, {
      method: "DELETE",
    });

    if (deleted.ok) {
      return navigate("/");
    }
  };

  let product = null;
  if (data) {
    product = data;
  } else {
    return <PackDetailsList />;
  }

  console.log(product);

  return (
    <>
      <Card sectioned subdued>
        <Card.Section>
          <div className="viewport-container">
            <Stack>
              <div className="pack-thumbnail-container">
                <div className="thumbnail-edit">
                  <div>
                    <Icon source={EditMajor} color="highlight" />
                  </div>
                  <p>Change Pack Thumbnail</p>
                </div>
                <div
                  className="pack-thumbnail"
                  style={{
                    backgroundImage: `url(${
                      product.featuredImage
                        ? product.featuredImage.url
                        : placeHolder
                    })`,
                  }}
                ></div>
                <small>
                  Accepts:
                  <i> png, jpg, svg, jpeg</i>
                </small>
              </div>
              <Stack vertical distribution="fill">
                <h2 className="pack-title">{product.title}</h2>
                <Stack alignment="center">
                  <Stack spacing="tight">
                    <img src={musicIcon} style={{ marginTop: "2px" }} />
                    <p className="pack-caption">Hip Hop</p>
                    <p className="pack-caption bold-caption">
                      ${product.variants.edges[0].node.price}
                    </p>
                  </Stack>
                  <PickDetailsModal
                    buttonText="Edit Pack Details"
                    oldproduct={product}
                    link
                  />
                </Stack>
                <p className="pack-sub-caption">
                  *This pack can hold 250 samples, {product.totalVariants} added
                  and {250 - parseInt(product.totalVariants)} left
                </p>
                <p className="pack-caption">{product.description}</p>
                <Stack>
                  <span
                    onClick={() =>
                      navigate(
                        `/samples/${product.id.replace(
                          "gid://shopify/Product/",
                          ""
                        )}`
                      )
                    }
                  >
                    <Button primary>+ Add Samples</Button>
                  </span>
                  <Button destructive onClick={handleDelete}>
                    Delete
                  </Button>
                </Stack>
              </Stack>
            </Stack>
            <Stack>
              <Stack spacing="tight">
                <p className="pack-caption">
                  Downloads: <span className="bold-caption">5.5k</span>
                </p>{" "}
                <img src={downloadIcon} color="base" />
              </Stack>
              <p className="pack-caption">
                Sales: <span className="bold-caption">$62.59k</span>
              </p>
            </Stack>
          </div>
        </Card.Section>
        <Card.Section>
          {/* {pack ? 'pack is render' : <PackDetailsList />} */}
        </Card.Section>
      </Card>
    </>
  );
}
