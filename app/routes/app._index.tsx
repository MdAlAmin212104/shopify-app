import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import {
  Page,
  Layout,
  Card,
} from "@shopify/polaris";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  return null;
};

export const action = async ({ request }: ActionFunctionArgs) => {
  return {};
};

export default function Index() {
  

  return (
    <Page fullWidth>
      <Layout>
        <Layout.Section>
          <Card>
            <p>View a summary of your online store’s performance.</p>
            <div>
              <h1 className="confirmation-text">this is text data to confermation your information </h1>
            </div>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
