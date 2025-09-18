import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import {
  Page,
  Layout,
  FormLayout,
  TextField,
  Button,
  Card,
  IndexTable,
  Text,
  useIndexResourceState,
} from "@shopify/polaris";
import {
  DeleteIcon
} from '@shopify/polaris-icons';
import { Form, useLoaderData, useFetcher } from "@remix-run/react";
import { useState } from "react";
import { authenticate } from "app/shopify.server";


type ProductNode = {
  node: {
    id: string;
    title: string;
    handle: string;
    descriptionHtml: string;
    productType: string;
    vendor: string;
    status: string;
    tags?: string[];
  };
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { admin } = await authenticate.admin(request);
  const productQuery = `query {
        products(first: 50) {
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

  if (formDataObject._action === "delete") {
    const productDeleteMutation = `
      mutation productDelete($id: ID!) {
        productDelete(input: {id: $id}) {
          deletedProductId
          userErrors {
            field
            message
          }
        }
      }
    `;

    const response = await admin.graphql(productDeleteMutation, {
      variables: { id: formDataObject.id },
    });

    const result = await response.json();
    return {result};
  }

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

  return {result};
};


export default function Crud() {
  const { products } = useLoaderData<{ products: ProductNode[] }>();
  const fetcher = useFetcher();

  const handleClick = (id: string) => {
    fetcher.submit({ id, _action: "delete" }, { method: "post" });
  };

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
          <Text as="span" alignment="start">
            {descriptionHtml}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>{productType}</IndexTable.Cell>
        <IndexTable.Cell>{vendor}</IndexTable.Cell>
        <IndexTable.Cell>{status}</IndexTable.Cell>
        <IndexTable.Cell>{tags}</IndexTable.Cell>
        <IndexTable.Cell>
          <Button
            variant="primary"
            icon={DeleteIcon}
            tone="critical"
            onClick={() => handleClick(id)}
          >
            Delete
          </Button>
        </IndexTable.Cell>
      </IndexTable.Row>
    ),
  );

  return (
    <Page title="App Crud" fullWidth>
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
                { title: "productType" },
                { title: "vendor" },
                { title: "status" },
                { title: "tags" },
                { title: "action" },
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
