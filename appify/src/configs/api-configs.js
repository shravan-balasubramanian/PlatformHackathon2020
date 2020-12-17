const apiConfigs = {
  shopify: [
    {
      id: 1,
      label: 'Shopify Domain',
      name: 'shopify_domain',
      placeholder: 'Enter your shopify domain name',
    },
    {
      id: 2,
      name: 'shopify_password',
      label: 'Shopify Password',
      placeholder: 'Enter your shopify password',
    },
    {
      id: 3,
      name: 'shopify_api_key',
      label: 'Shopify Api key',
      placeholder: 'Enter your shopify api key',
    },
    {
      id: 4,
      name: 'item',
      label: 'Item',
      placeholder: 'Choose the item',
    },
    {
      id: 5,
      name: 'quantity',
      label: 'Quantity',
      placeholder: 'Choose the quantity',
    },
  ],
  slack: [
    {
      id: 1,
      label: 'Token',
      name: 'slack_token',
      placeholder: 'Enter the slack token value',
    },
    {
      id: 2,
      label: 'Workspace',
      name: 'slack_workspace',
      placeholder: 'Enter the slack workspace',
    },
    {
      id: 3,
      label: 'Channel',
      name: 'slack_channel',
      placeholder: 'Enter the slack channel name',
    },
  ],
};

export default apiConfigs;
