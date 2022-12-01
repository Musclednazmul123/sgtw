import { Button, Card, Icon, Stack } from '@shopify/polaris';
import {
  packStyle,
  musicIcon,
  downloadIcon,
  packThumbnail,
  placeHolder,
} from '../assets';
import { EditMajor } from '@shopify/polaris-icons';
import { PickDetailsModal, EmptyState, PackDetailsList } from './';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppQuery, useAuthenticatedFetch } from '../hooks';
import { LazyLoadImage } from 'react-lazy-load-image-component';

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

  let product = null;
  if (data) {
    product = data;
    // console.log('data is: ' + data._id);
    // return <p>data...</p>;
  } else {
    return <p>Loading...</p>;
  }

  const handleDelete = async () => {
    const deleted = await fetch(`/api/packs/${id}`, {
      method: 'DELETE',
    });

    if (deleted.ok) {
      return navigate('/');
    }
  };

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
                <div className="pack-thumbnail">
                  <LazyLoadImage
                    src={product.thumbnail ? product.thumbnail : placeHolder}
                    width={166}
                    effect="blur"
                  />
                </div>
                <small>
                  Accepts:
                  <i> png, jpg, svg, jpeg</i>
                </small>
              </div>
              <Stack vertical distribution="fill">
                <h2 className="pack-title">{product.title}</h2>
                <Stack alignment="center">
                  <Stack spacing="tight">
                    <img src={musicIcon} style={{ marginTop: '2px' }} />
                    <p className="pack-caption">Hip Hop</p>
                    <p className="pack-caption bold-caption">
                      ${product.price}
                    </p>
                  </Stack>
                  <PickDetailsModal
                    buttonText="Edit Pack Details"
                    oldproduct={product}
                    link
                  />
                </Stack>
                <p className="pack-sub-caption">
                 *This pack can hold 250 samples, {product.variants.length} added
                  and {250 - parseInt(product.variants.length)} left 
                </p>
                <p className="pack-caption">{product.description}</p>
                <Stack>
                  <span
                    onClick={() =>
                      navigate(
                        `/samples/${product.productId.replace(
                          'gid://shopify/Product/',
                          ''
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
                </p>{' '}
                <img src={downloadIcon} color="base" />
              </Stack>
              <p className="pack-caption">
                Sales: <span className="bold-caption">$62.59k</span>
              </p>
            </Stack>
          </div>
        </Card.Section>
        <Card.Section>
          {product ? <PackDetailsList pack={product}/> : 'pack is render' }
        </Card.Section>
      </Card>
    </>
  );
}
