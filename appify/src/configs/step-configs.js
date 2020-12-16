import productConfigs from './product-configs';
import appLocationsConfigs from './app-locations';

const getAppLocations = () => appLocationsConfigs.freshdesk;

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
        value: null,
      },
      {
        id: 2,
        type: 'select',
        name: 'app_products',
        label: 'Products supported',
        placeholder: 'Select the products supported',
        options: productConfigs,
        value: null,
      },
      {
        id: 3,
        type: 'select',
        name: 'app_location',
        label: 'App Location',
        placeholder: 'Select the app location',
        options: getAppLocations(),
        value: null,
      },
    ],
  },
  {
    id: 2,
    name: 'iparam_details',
    label: 'Add installation parameters',
    showButton: true,
  },
  {
    id: 3,
    name: 'workflow_details',
    label: 'Create app workflows',
    showButton: true,
  },
];

export default stepConfigs;
