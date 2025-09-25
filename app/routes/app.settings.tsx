import {
  Page,
  Card,
  TextField,
  ChoiceList,
  Select,
  Box,
  InlineGrid,
  Text,
  Button,
  Divider,
  BlockStack,
} from "@shopify/polaris";
import { useState } from "react";

export default function SettingsPage() {
  const [storeName, setStoreName] = useState("Puzzlify Store");
  const [businessAddress, setBusinessAddress] = useState("123 Main St, Anytown, USA");
  const [storePhone, setStorePhone] = useState("+1 (555) 123-4567");
  const [currency, setCurrency] = useState(["usd"]);
  const [notificationFrequency, setNotificationFrequency] = useState("immediately");
  const [notificationTypes, setNotificationTypes] = useState(["new-order"]);

  const handleFormReset = () => {
    console.log("Handle discarded changes if necessary");
  };

  const handleFormSubmit = (event: any) => {
    event.preventDefault();
    console.log({
      storeName,
      businessAddress,
      storePhone,
      currency,
      notificationFrequency,
      notificationTypes,
    });
  };

  return (
    <form data-save-bar onSubmit={handleFormSubmit} onReset={handleFormReset}>
      <Page title="Settings" narrowWidth>
        {/* Store Information */}
        <Card title="Store Information">
          <TextField
            label="Store name"
            value={storeName}
            onChange={setStoreName}
            autoComplete="off"
          />
          <TextField
            label="Business address"
            value={businessAddress}
            onChange={setBusinessAddress}
            autoComplete="off"
          />
          <TextField
            label="Store phone"
            value={storePhone}
            onChange={setStorePhone}
            autoComplete="off"
          />
          <ChoiceList
            title="Primary currency"
            choices={[
              { label: "US Dollar ($)", value: "usd" },
              { label: "Canadian Dollar (CAD)", value: "cad" },
              { label: "Euro (€)", value: "eur" },
            ]}
            selected={currency}
            onChange={setCurrency}
          />
        </Card>

        {/* Notifications */}
        <Card title="Notifications">
          <Select
            label="Notification frequency"
            options={[
              { label: "Immediately", value: "immediately" },
              { label: "Hourly digest", value: "hourly" },
              { label: "Daily digest", value: "daily" },
            ]}
            value={notificationFrequency}
            onChange={setNotificationFrequency}
          />

          <ChoiceList
            title="Notification types"
            allowMultiple
            choices={[
              { label: "New order notifications", value: "new-order" },
              { label: "Low stock alerts", value: "low-stock" },
              { label: "Customer review notifications", value: "customer-review" },
              { label: "Shipping updates", value: "shipping-updates" },
            ]}
            selected={notificationTypes}
            onChange={setNotificationTypes}
          />
        </Card>

        {/* Preferences */}
        <Card title="Preferences">
          <BlockStack gap="300">
            <Button url="/app/settings/shipping" fullWidth>
              Shipping & fulfillment
            </Button>
            <Divider />
            <Button url="/app/settings/products_catalog" fullWidth>
              Products & catalog
            </Button>
            <Divider />
            <Button url="/app/settings/customer_support" fullWidth>
              Customer support
            </Button>
          </BlockStack>
        </Card>

        {/* Tools */}
        <Card title="Tools">
          <BlockStack gap="300">
            <InlineGrid columns={["1fr", "auto"]} alignItems="center">
              <Box>
                <Text as="h3" variant="headingMd">
                  Reset app settings
                </Text>
                <Text variant="bodyMd" tone="subdued">
                  Reset all settings to their default values. This action cannot be undone.
                </Text>
              </Box>
              <Button tone="critical">Reset</Button>
            </InlineGrid>

            <Divider />

            <InlineGrid columns={["1fr", "auto"]} alignItems="center">
              <Box>
                <Text as="h3" variant="headingMd">
                  Export settings
                </Text>
                <Text variant="bodyMd" tone="subdued">
                  Download a backup of all your current settings.
                </Text>
              </Box>
              <Button>Export</Button>
            </InlineGrid>
          </BlockStack>
        </Card>
      </Page>
    </form>
  );
}
