import { Card, Icon, Stack } from '@shopify/polaris';
import { trophyImage } from '../assets';
import { packStyle } from '../assets';

export function PackDetails() {
  return (
    <>
      <Card sectioned subdued>
        <Stack>
          <Stack>
            <img className="pack-thumbnail" size="large" src={trophyImage} />
            <Stack>
              <h2>Pack</h2>
              <p>
                <Icon /> Hip Hop $44.75 <a>Edit Pack Details</a>
              </p>
            </Stack>
          </Stack>
          <Stack></Stack>
        </Stack>
      </Card>
    </>
  );
}
