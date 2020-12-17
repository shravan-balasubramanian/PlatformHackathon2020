const workflowFormConfigs = (type = null) => {
  const getValueMatcherOptions = () => {
    // eslint-disable-next-line no-debugger
    debugger;
    if (type === 'ticket') {
      return [
        {
          value: 'subject',
          label: 'subject',
        },
        {
          value: 'description',
          label: 'description',
        },
        {
          value: 'status',
          label: 'status',
        },
        {
          value: 'priority',
          label: 'priority',
        },
      ];
    }
    return [
      {
        name: 'exists',
        label: 'exists',
      },
    ];
  };
  return [
    {
      id: 1,
      prefix: 'When ',
      name: 'initial_event',
      type: 'select',
      show: true,
      options: [
        {
          value: 'ticket_create',
          label: 'a new ticket is created',
        },
        {
          value: 'conversation_create',
          label: 'a new conversation is created',
        },
      ],
    },
    {
      id: 2,
      prefix: 'and',
      name: 'key_matcher',
      type: 'input',
      show: Boolean(type),
      value: `${type}'s`,
      disabled: true,
    },
    {
      id: 3,
      prefix: '',
      show: Boolean(type),
      name: 'value_matcher',
      type: 'select',
      options: getValueMatcherOptions(),
    },
  ];
};

export default workflowFormConfigs;
