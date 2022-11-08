import {
  Card,
  Page,
  Layout,
  TextContainer,
  Image,
  Stack,
  Link,
  Heading,
} from '@shopify/polaris';
import { TitleBar } from '@shopify/app-bridge-react';

import { trophyImage } from '../assets';

import { AllPacks, EmptyState } from '../components';

let loading = false;

export default function HomePage() {
  return loading ? (
    <Card sectioned>
      <EmptyState />
    </Card>
  ) : (
    <Page narrowWidth>
      <Layout>
        <Layout.Section>
          <AllPacks />
        </Layout.Section>
      </Layout>
    </Page>
  );
}
