import workflowConfigs from '../configs/workflow-configs';

const selectHtml = ({ workflow, blocks }) => {
  let initial = `
    <div class="workflow-select" style="margin-left: 15px; width: 200px; margin-top: -10px;">
    <fw-select name="workflow_${workflow.id}">
  `;
  const end = '</fw-select></div>';

  // eslint-disable-next-line no-return-assign
  blocks.forEach((block) => initial += `<fw-select-option value="${block.value}">
  ${block.label}</fw-select-option>`);

  initial += end;
  return initial;
};

const targetBlockChildren = (block) => {
  // eslint-disable-next-line no-debugger
  debugger;
  const recursiveSearch = ([key, val]) => {
    // eslint-disable-next-line no-debugger
    debugger;
    if (key === block) {
      // eslint-disable-next-line no-debugger
      debugger;
      return val.children;
    }
    // eslint-disable-next-line no-debugger
    debugger;
    return Object.entries(val.children).forEach(recursiveSearch);
  };
  // eslint-disable-next-line no-debugger
  debugger;
  return Object.entries(workflowConfigs).map(recursiveSearch)[0];
};

const generateHtmlFromWorkflow = (workflow) => {
  let resultant = 'When ';
  workflow.blocks.forEach((block) => {
    // eslint-disable-next-line no-debugger
    debugger;
    const children = targetBlockChildren(block);
    // eslint-disable-next-line no-debugger
    debugger;
    if (children) {
      const modifiedChildren = Object.entries(children)
        .map(([key, val]) => ({ value: key, label: val.label }));
      // eslint-disable-next-line no-debugger
      debugger;
      resultant += selectHtml({ workflow, blocks: modifiedChildren });
    }
  });

  return resultant;
};

const workflow = {
  generateHtmlFromWorkflow,
};

export default workflow;
