import productConfigs from './product-configs';

const stepConfigs = [
  {
    id: 1,
    name: 'basic_app_details',
    label: 'Enter basic app details',
    showButton: false,
    form_fields: [
      {
        id: 1,
        type: 'input',
        name: 'app_name',
        label: 'App Name',
        placeholder: 'Enter the app name',
        value: '',
      },
      {
        id: 2,
        type: 'select',
        name: 'app_products',
        label: 'Product',
        placeholder: 'Select the product',
        options: productConfigs,
        value: '',
      },
    ],
  },
  {
    id: 2,
    name: 'workflow_details',
    label: 'Create app workflows',
    showButton: true,
  },
];

export default stepConfigs;
