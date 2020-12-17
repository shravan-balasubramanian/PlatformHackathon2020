const workflowFormConfigs = (type = null, selectedBlocks = null) => {
  const canShowFinalAction = type === 'ticket'
    ? Boolean(selectedBlocks && selectedBlocks.target_value)
    : Boolean(selectedBlocks && selectedBlocks.value_matcher);
  // eslint-disable-next-line no-confusing-arrow
  const getTargetValueFieldType = (valueTicketField) => ['status', 'priority']
    .includes(valueTicketField) ? 'select' : 'input';
  const getFinalActionOptions = () => (type === 'ticket'
    ? [
      {
        value: 'place_shopify_order',
        label: 'place an order in Shopify',
      },
    ]
    : [{
      value: 'send_slack_message',
      label: 'send a slack message',
    },
    ]);
  const getTargetValueOptions = (valueTicketField) => {
    if (['status', 'priority'].includes(valueTicketField)) {
      if (valueTicketField === 'status') {
        return [
          {
            value: 'open',
            label: 'Open',
          },
          {
            value: 'pending',
            label: 'Pending',
          },
          {
            value: 'resolved',
            label: 'Resolved',
          },
          {
            value: 'closed',
            label: 'Closed',
          },
        ];
      }
      return [
        {
          value: 'low',
          label: 'Low',
        },
        {
          value: 'medium',
          label: 'Medium',
        },
        {
          value: 'high',
          label: 'High',
        },
        {
          value: 'urgent',
          label: 'Urgent',
        },
      ];
    }
    return null;
  };
  const getValueMatcherOptions = () => {
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
      placeholder: 'Select a value',
      value: (selectedBlocks && selectedBlocks.initial_event) || '',
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
      value: `${type}${type === 'ticket' ? "'s" : ''}`,
      disabled: true,
    },
    {
      id: 3,
      prefix: '',
      show: Boolean(type),
      name: 'value_matcher',
      type: 'select',
      placeholder: 'Select a value',
      options: getValueMatcherOptions(),
      value: (selectedBlocks && selectedBlocks.value_matcher) || '',
    },
    {
      id: 4,
      prefix: selectedBlocks && selectedBlocks.value_matcher === 'description' ? 'has' : 'is',
      show: Boolean(type === 'ticket' && (selectedBlocks && selectedBlocks.value_matcher)),
      name: 'target_value',
      type: getTargetValueFieldType(selectedBlocks && selectedBlocks.value_matcher),
      placeholder: 'Select a value',
      options: getTargetValueOptions(selectedBlocks && selectedBlocks.value_matcher),
      value: (selectedBlocks && selectedBlocks.target_value) || '',
    },
    {
      id: 5,
      prefix: ',',
      show: canShowFinalAction,
      name: 'final_action',
      type: 'select',
      placeholder: 'Select a value',
      options: getFinalActionOptions(),
      value: (selectedBlocks && selectedBlocks.final_action) || '',
    },
  ];
};

export default workflowFormConfigs;
