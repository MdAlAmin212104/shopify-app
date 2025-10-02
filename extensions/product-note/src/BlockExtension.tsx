import {
  reactExtension,
  AdminBlock,
  BlockStack,
  TextArea,
  Button,
} from '@shopify/ui-extensions-react/admin';
import { useState } from 'react';

const TARGET = 'admin.product-details.block.render';

export default reactExtension(TARGET, () => <App />);

function App() {
  const [note, setNote] = useState('');

  const handleSave = () => {
    console.log("Saved Note:", note);
  };

  return (
    <AdminBlock title="Product Note">
      <BlockStack gap="base">
        <TextArea
          label="Product Note"
          value={note}          
          onChange={(value) => setNote(value)}
          rows={4}
        />
        <Button onPress={handleSave}>Save Note</Button>
      </BlockStack>
    </AdminBlock>
  );
}
