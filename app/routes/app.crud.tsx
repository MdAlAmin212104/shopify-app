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
  DeleteIcon,
  EditIcon
} from '@shopify/polaris-icons';
import { useLoaderData, useFetcher } from "@remix-run/react";
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
    return { result };
  }

  if (formDataObject._action === "update") {
    const productInput = {
      id: formDataObject.id,
      title: formDataObject.title,
      handle: formDataObject.handle,
      descriptionHtml: formDataObject.descriptionHtml,
      productType: formDataObject.productType,
      vendor: formDataObject.vendor,
      tags: formDataObject.tags
        ? (formDataObject.tags as string).split(",").map((t) => t.trim())
        : [],
      status: formDataObject.status || "DRAFT",
    };

    const productUpdateMutation = `
      mutation productUpdate($input: ProductInput!) {
        productUpdate(input: $input) {
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

    const response = await admin.graphql(productUpdateMutation, {
      variables: { input: productInput },
    });

    const result = await response.json();
    return { result };
  }

  // Create new product
  const productInput = {
    title: formDataObject.title,
    handle: formDataObject.handle,
    descriptionHtml: formDataObject.descriptionHtml,
    productType: formDataObject.productType,
    vendor: formDataObject.vendor,
    tags: formDataObject.tags
      ? (formDataObject.tags as string).split(",").map((t) => t.trim())
      : [],
    status: formDataObject.status || "DRAFT",
  };

  const productCreateMutation = `
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

  const response = await admin.graphql(productCreateMutation, {
    variables: { input: productInput },
  });

  const result = await response.json();
  return { result };
};

export default function Crud() {
  const { products } = useLoaderData<{ products: ProductNode[] }>();
  const fetcher = useFetcher();

  // Missing state variables
  const [isEditing, setIsEditing] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);

  const [formValues, setFormValues] = useState({
    title: "",
    handle: "",
    descriptionHtml: "",
    productType: "",
    vendor: "",
    tags: "",
    status: "DRAFT",
  });

  const handleDeleteClick = (id: string) => {
    fetcher.submit({ id, _action: "delete" }, { method: "post" });
  };

  const handleEditClick = (id: string) => {
    const product = products.find(p => p.node.id === id);
    if (product) {
      setFormValues({
        title: product.node.title,
        handle: product.node.handle,
        descriptionHtml: product.node.descriptionHtml,
        productType: product.node.productType,
        vendor: product.node.vendor,
        tags: product.node.tags?.join(", ") || "",
        status: product.node.status,
      });
      setIsEditing(true);
      setEditingProductId(id);
    }
  };

  const handleCancelEdit = () => {
    setFormValues({
      title: "",
      handle: "",
      descriptionHtml: "",
      productType: "",
      vendor: "",
      tags: "",
      status: "DRAFT",
    });
    setIsEditing(false);
    setEditingProductId(null);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData();
    
    // Add form values to FormData
    Object.entries(formValues).forEach(([key, value]) => {
      formData.append(key, value);
    });

    if (isEditing && editingProductId) {
      formData.append("id", editingProductId);
      formData.append("_action", "update");
    }

    fetcher.submit(formData, { method: "post" });

    // Reset form after submission
    setFormValues({
      title: "",
      handle: "",
      descriptionHtml: "",
      productType: "",
      vendor: "",
      tags: "",
      status: "DRAFT",
    });
    setIsEditing(false);
    setEditingProductId(null);
  };

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

  const resourceName = {
    singular: "product",
    plural: "products",
  };

  const { selectedResources, allResourcesSelected, handleSelectionChange } =
    useIndexResourceState(productsRows);

  const rowMarkup = productsRows.map(
    ({ id, title, handle, descriptionHtml, productType, vendor, status, tags }, index) => (
      <IndexTable.Row
        id={id}
        key={id}
        selected={selectedResources.includes(id)}
        position={index}
      >
        <IndexTable.Cell>
          <Text variant="bodyMd" fontWeight="bold" as="span">
            {id.split('/').pop()}
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
            icon={EditIcon}
            onClick={() => handleEditClick(id)}
          >
            Edit
          </Button>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Button
            variant="primary"
            icon={DeleteIcon}
            tone="critical"
            onClick={() => handleDeleteClick(id)}
          >
            Delete
          </Button>
        </IndexTable.Cell>
      </IndexTable.Row>
    ),
  );

  return (
    <Page title="Product CRUD" fullWidth>
      <Layout>
        <Layout.Section>
          <Card>
            <form onSubmit={handleSubmit}>
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
                  multiline={4}
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
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <Button submit variant="primary">
                    {isEditing ? "Update Product" : "Create Product"}
                  </Button>
                  {isEditing && (
                    <Button onClick={handleCancelEdit}>
                      Cancel
                    </Button>
                  )}
                </div>
              </FormLayout>
            </form>
          </Card>

          <Card>
            <IndexTable
              resourceName={resourceName}
              itemCount={productsRows.length}
              selectedItemsCount={
                allResourcesSelected ? "All" : selectedResources.length
              }
              onSelectionChange={handleSelectionChange}
              headings={[
                { title: "ID" },
                { title: "Title" },
                { title: "Handle" },
                { title: "Description" },
                { title: "Type" },
                { title: "Vendor" },
                { title: "Status" },
                { title: "Tags" },
                { title: "Edit" },
                { title: "Delete" },
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