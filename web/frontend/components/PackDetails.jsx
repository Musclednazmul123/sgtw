import { Button, Card, Icon, Stack } from '@shopify/polaris';
import { packStyle, musicIcon, downloadIcon, trophyImage } from '../assets';
import { EditMajor } from '@shopify/polaris-icons';
import { PickDetailsModal, EmptyState, PackDetailsList } from './';
import { useNavigate } from 'react-router-dom';

export function PackDetails() {
  const pack = undefined;
  const navigate = useNavigate();

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
              <img className="pack-thumbnail" src={trophyImage} />
              <small>
                Accepts:
                <i> png, jpg, svg, jpeg</i>
              </small>
            </div>
            <Stack vertical distribution="fill">
              <h2 className="pack-title">Pack</h2>
              <Stack spacing="tight">
                <img src={musicIcon} />
                <p className="details">
                  Hip Hop <span>$44.75</span>{' '}
                  <PickDetailsModal buttonText="Edit Pack Details" link />
                </p>
              </Stack>
              <small>
                *This pack can hold 250 samples, 0 added and 250 left
              </small>
              <p className="details">Fresh Added</p>
              <Stack>
                <span onClick={() => navigate('/packs/new')}>
                  <Button primary>+ Add Samples</Button>
                </span>
                <Button destructive>Delete</Button>
              </Stack>
            </Stack>
          </Stack>
          <Stack>
            <Stack spacing="tight">
              <span>Downloads: 0</span> <img src={downloadIcon} color="base" />
            </Stack>
            <span>Sales: $0.0</span>
          </Stack>
        </div>
        </Card.Section>
        <Card.Section>
        {pack ? 'pack is render' : <PackDetailsList />}
        </Card.Section>
      </Card>
    </>
  );
}
