import {Page, Badge, Card} from '@shopify/polaris';

export default function AdditionalPage() {
  return (
    <Page
  backAction={{content: 'Products', url: '#'}}
  title="3/4 inch Leather pet collar"
  titleMetadata={<Badge tone="success">Paid</Badge>}
  subtitle="Perfect for any pet"
  compactTitle
  primaryAction={{content: 'Save', disabled: true}}
  actionGroups={[
    {
      title: 'More actions',
      actions: [
        {
          content: 'Duplicate',
          onAction: () => alert('Duplicate action'),
        },
        {
          content: 'View on your store',
          onAction: () => alert('View on your store action'),
        },
      ],
    },
    {
      title: 'Promote',
      actions: [
        {
          content: 'Share on Facebook',
          onAction: () => alert('Share on Facebook action'),
        },
      ],
    },
  ]}
  pagination={{
    hasPrevious: true,
    hasNext: true,
  }}
>
  <Card>
    <p>Credit card information</p>
  </Card>
</Page>

  );
}