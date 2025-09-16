import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import {
  Page,
  Layout,
  FormLayout,
  TextField,
  Button,
  Card,
  IndexTable,
  Badge,
  Text,
  useIndexResourceState,
} from "@shopify/polaris";
import { Form, useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { authenticate } from "app/shopify.server";
import { Product } from "@shopify/app-bridge-react";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { admin } = await authenticate.admin(request);
  const productQuery = `query {
        products(first: 10) {
            edges {
                node {
                    id
                    title
                    handle
                    descriptionHtml
                    productType
                    vendor
                    tags
                    status
                }
            }

        }
    }`;

  const response = await admin.graphql(productQuery);
  const data = await response.json();
  return { products: data.data.products.edges };
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const { admin } = await authenticate.admin(request);

  const formDataObject = Object.fromEntries(formData);

  // Map properly to ProductInput
  const productInput = {
    title: formDataObject.title,
    handle: formDataObject.handle,
    descriptionHtml: formDataObject.descriptionHtml,
    productType: formDataObject.productType,
    vendor: formDataObject.vendor,
    tags: formDataObject.tags
      ? (formDataObject.tags as string).split(",").map((t) => t.trim())
      : [],
    status: formDataObject.status || "DRAFT", // default to DRAFT if empty
  };

  const productQuery = `
    mutation productCreate($input: ProductInput!) {
      productCreate(input: $input) {
        product {
          id
          title
          handle
          descriptionHtml
          productType
          vendor
          tags
          status
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const response = await admin.graphql(productQuery, {
    variables: { input: productInput },
  });

  const result = await response.json();
  console.log(result, "this is data");

  return {};
};

export default function Crud() {
  const { products } = useLoaderData<typeof loader>();
  console.log(products);

  const [formValues, setFormValues] = useState({
    title: "",
    handle: "",
    descriptionHtml: "",
    productType: "",
    vendor: "",
    tags: "",
    status: "DRAFT", // default
  });

  const productsRows = products.map(({ node: product }) => ({
    id: product.id,
    title: product.title,
    handle: product.handle,
    descriptionHtml: product.descriptionHtml,
    productType: product.productType,
    vendor: product.vendor,
    status: product.status,
    tags: product.tags?.join(", ") || "",
  }));

  //   const orders = [
  //     {
  //       id: '1020',
  //       order: '#1020',
  //       date: 'Jul 20 at 4:34pm',
  //       customer: 'Jaydon Stanton',
  //       total: '$969.44',
  //       paymentStatus: <Badge progress="complete">Paid</Badge>,
  //       fulfillmentStatus: <Badge progress="incomplete">Unfulfilled</Badge>,
  //     },
  //     {
  //       id: '1019',
  //       order: '#1019',
  //       date: 'Jul 20 at 3:46pm',
  //       customer: 'Ruben Westerfelt',
  //       total: '$701.19',
  //       paymentStatus: <Badge progress="partiallyComplete">Partially paid</Badge>,
  //       fulfillmentStatus: <Badge progress="incomplete">Unfulfilled</Badge>,
  //     },
  //     {
  //       id: '1018',
  //       order: '#1018',
  //       date: 'Jul 20 at 3.44pm',
  //       customer: 'Leo Carder',
  //       total: '$798.24',
  //       paymentStatus: <Badge progress="complete">Paid</Badge>,
  //       fulfillmentStatus: <Badge progress="incomplete">Unfulfilled</Badge>,
  //     },
  //   ];

  const orders = productsRows;
  const resourceName = {
    singular: "order",
    plural: "orders",
  };

  const { selectedResources, allResourcesSelected, handleSelectionChange } =
    useIndexResourceState(orders);

  const rowMarkup = orders.map(
    (
      { id, title, handle, descriptionHtml, productType, vendor, status, tags },
      index,
    ) => (
      <IndexTable.Row
        id={id}
        key={id}
        selected={selectedResources.includes(id)}
        position={index}
      >
        <IndexTable.Cell>
          <Text variant="bodyMd" fontWeight="bold" as="span">
            {id}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>{title}</IndexTable.Cell>
        <IndexTable.Cell>{handle}</IndexTable.Cell>
        <IndexTable.Cell>
          <Text as="span" alignment="end" numeric>
            {descriptionHtml}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>{productType}</IndexTable.Cell>
        <IndexTable.Cell>{vendor}</IndexTable.Cell>
        <IndexTable.Cell>{status}</IndexTable.Cell>
        <IndexTable.Cell>{tags}</IndexTable.Cell>
      </IndexTable.Row>
    ),
  );

  return (
    <Page fullWidth narrowWidth title="App Crud">
      <Layout>
        <Layout.Section>
          <Form method="post">
            <FormLayout>
              <TextField
                label="Product Name"
                name="title"
                autoComplete="off"
                value={formValues.title}
                onChange={(value) =>
                  setFormValues({ ...formValues, title: value })
                }
              />
              <TextField
                label="Product Handle"
                name="handle"
                autoComplete="off"
                value={formValues.handle}
                onChange={(value) =>
                  setFormValues({ ...formValues, handle: value })
                }
              />
              <TextField
                label="Product Description"
                name="descriptionHtml"
                autoComplete="off"
                value={formValues.descriptionHtml}
                onChange={(value) =>
                  setFormValues({ ...formValues, descriptionHtml: value })
                }
              />
              <TextField
                label="Product Type"
                name="productType"
                autoComplete="off"
                value={formValues.productType}
                onChange={(value) =>
                  setFormValues({ ...formValues, productType: value })
                }
              />
              <TextField
                label="Product Vendor"
                name="vendor"
                autoComplete="off"
                value={formValues.vendor}
                onChange={(value) =>
                  setFormValues({ ...formValues, vendor: value })
                }
              />
              <TextField
                label="Product Tags (comma separated)"
                name="tags"
                autoComplete="off"
                value={formValues.tags}
                onChange={(value) =>
                  setFormValues({ ...formValues, tags: value })
                }
              />
              <TextField
                label="Product Status (ACTIVE, DRAFT, ARCHIVED)"
                name="status"
                autoComplete="off"
                value={formValues.status}
                onChange={(value) =>
                  setFormValues({ ...formValues, status: value })
                }
              />
              <Button submit>Create Product</Button>
            </FormLayout>
          </Form>

          <Card>
            <IndexTable
              resourceName={resourceName}
              itemCount={orders.length}
              selectedItemsCount={
                allResourcesSelected ? "All" : selectedResources.length
              }
              onSelectionChange={handleSelectionChange}
              headings={[
                { title: "id" },
                { title: "title" },
                { title: "handle" },
                { title: "descriptionHtml" },
                { title: "vendor" },
                { title: "status" },
                { title: "tags" },
              ]}
            >
              {rowMarkup}
            </IndexTable>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
