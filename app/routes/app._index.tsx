import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import {
  Page,
  Card,
  EmptyState,
  Grid,
  BlockStack,
  Text,
  InlineStack,
  Button,
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
      {/* <Layout>
        <Layout.Section>
          <Card>
            <p>View a summary of your online store’s performance.</p>
            <div>
              <h1 className="confirmation-text">this is text data to confermation your information </h1>
            </div>
          </Card>
        </Layout.Section>
      </Layout> */}
      <Card>
        <Grid>
          <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6}}>
            <img
              src="https://cdn.shopify.com/static/images/polaris/patterns/callout.png"
              alt="Puzzle graphic"
              style={{ maxWidth: "200px" }}
            />
          </Grid.Cell>
          <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 9, lg: 9, xl: 9 }}>
            <BlockStack gap="200" align="center">
              <Text as="h2" variant="headingLg">
                Start creating puzzles
              </Text>
              <Text as="p" variant="bodyMd" tone="subdued">
                Create and manage your collection of puzzles for players to enjoy.
              </Text>
              <InlineStack gap="200">
                <Button>Learn more</Button>
                <Button variant="primary">Create puzzle</Button>
              </InlineStack>
            </BlockStack>
          </Grid.Cell>
        </Grid>
      </Card>
       <Card>
      <EmptyState
        heading="Start creating puzzles"
        action={{content: 'Create puzzle'}}
        secondaryAction={{
          content: 'Learn more',
          url: 'https://shopify.dev/docs',
        }}
        image="https://cdn.shopify.com/static/images/polaris/patterns/callout.png"
      >
        <p>Create and manage your collection of puzzles for players to enjoy.</p>
      </EmptyState>
    </Card>
    <Grid>
        {/* Left Side Image */}
        <Grid.Cell columnSpan={{ xs: 6, md: 3 }}>
          <img
            src="https://cdn.shopify.com/static/images/polaris/patterns/callout.png"
            alt="Puzzle graphic"
            style={{ maxWidth: "200px", borderRadius: "12px" }}
          />
        </Grid.Cell>

        {/* Right Side Content */}
        <Grid.Cell columnSpan={{ xs: 6, md: 9 }}>
          <BlockStack gap="200">
            <Text as="h2" variant="headingLg">
              Start creating puzzles
            </Text>
            <Text as="p" tone="subdued">
              Create and manage your collection of puzzles for players to enjoy.
            </Text>
            <InlineStack gap="200">
              <Button>Learn more</Button>
              <Button variant="primary">Create puzzle</Button>
            </InlineStack>
          </BlockStack>
        </Grid.Cell>
      </Grid>
    </Page>
  );
}
