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

import {AllPacks, ProductsCard, EmptyState, HomePage as HomePageContent } from '../components';

let loading = false;

export default function HomePage() {
  return loading ? (
    <Card sectioned>
      <EmptyState />
    </Card>
  ) : (
    <Page fullWidth>
      <Layout>
        <Layout.Section>
          <Card sectioned>
            <HomePageContent/>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
  
