import {
  reactExtension,
  AdminBlock,
  BlockStack,
  TextArea,
} from '@shopify/ui-extensions-react/admin';


const TARGET = 'admin.product-details.block.render';

export default reactExtension(TARGET, () => <App />);

function App() {
  const metafield = useMetafield({ namespace: 'custom', key: 'product_note' });

  return (
    <AdminBlock title="Product Note">
      <BlockStack>
        <TextArea
          value={metafield?.value || ''}
          onChange={metafield?.onChange}
          label="Product Note"
          rows={4}
        />
      </BlockStack>
    </AdminBlock>
  );
}
