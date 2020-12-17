const end = {
  end: {
    label: 'end',
    children: null,
  },
};

const notify = {
  notify: {
    label: 'notify',
    children: {
      ...end,
    },
  },
};

const hide = {
  hide: {
    label: 'hide',
    children: {
      ...end,
    },
  },
};

const makeServerApiCall = {
  make_api_call: {
    label: 'make an api call',
    children: {
      success: {
        label: 'null',
        children: {
          self: 'make_api_call',
          ...end,
        },
      },
      failure: {
        self: 'make_api_call',
        ...end,
      },
    },
  },
};

const makeAppApiCall = {
  make_api_call: {
    label: 'make an api call',
    children: {
      success: {
        label: 'null',
        children: {
          self: 'make_api_call',
          ...notify,
          ...hide,
          ...end,
        },
      },
      failure: {
        self: 'make_api_call',
        ...notify,
        ...hide,
        ...end,
      },
    },
  },
};

const serverlessEvents = {
  ticket_created: {
    label: 'the ticket is created',
    children: {
      ...makeServerApiCall,
    },
  },
  ticket_updated: {
    label: 'the ticket is updated',
    children: {
      ...makeServerApiCall,
    },
  },
  converation_created: {
    label: 'the conversation is created',
    children: {
      ...makeServerApiCall,
    },
  },
  contact_created: {
    label: 'the contact is created',
    children: {
      ...makeServerApiCall,
    },
  },
  contact_updated: {
    label: 'the contact is updated',
    children: {
      ...makeServerApiCall,
    },
  },
};

const frontendEvents = {
  click_event: {
    label: 'a button in the ticket details page is clicked',
    children: {
      ...makeAppApiCall,
      ...notify,
      ...hide,
      ...end,
    },
  },
  change_event: {
    label: 'a ticket property is changed',
    children: {
      ...makeAppApiCall,
      ...notify,
      ...hide,
      ...end,
    },
  },
};

const appActivated = {
  app_activated: {
    label: 'the app is activated',
    children: {
      ...frontendEvents,
    },
  },
};

const workflowConfigs = {
  start: {
    children: {
      ...appActivated,
      ...serverlessEvents,
    },
  },
};

export default workflowConfigs;
