const apiConfigs = {
  shopify: [
    {
      id: 1,
      label: 'Domain',
      name: 'shopify_domain',
      placeholder: 'Enter your shopify domain name',
    },
    {
      id: 2,
      name: 'shopify_password',
      label: 'Password',
      placeholder: 'Enter your shopify password',
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
