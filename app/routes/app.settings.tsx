import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import {
  Page,
  Layout,
  Card,
} from "@shopify/polaris";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  return({})
};

export const action = async ({ request }: ActionFunctionArgs) => {
  return({})
};

export default function settings() {
  

  return (
    <Page>
      <Layout>
          <Card>
            <p>this is settings page </p>
          </Card>
      </Layout>
    </Page>
  );
}
