import { Card, Layout, Page } from '@shopify/polaris';
import { PackDetails } from '../../components';

export default function Pack() {
  return (
    <>
      <Page>
        <Layout>
          <Layout.Section>
            <PackDetails />
          </Layout.Section>
        </Layout>
      </Page>
    </>
  );
}
