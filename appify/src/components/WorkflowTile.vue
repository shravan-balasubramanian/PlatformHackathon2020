<template>
  <div class="workflow-tile-container" ref="workflow">
    <div class="delete-btn">
      <fw-button color="primary" size="small" @click="() => $emit('deleted', workflow)">
        <fw-icon name="delete" color="white"></fw-icon>
      </fw-button>
    </div>
    <div class="workflow-tile">
      <div class="___container" v-for="formConfig in workflowFormConfigs" :key="formConfig.id">
        <template v-if=formConfig.show>
          <div class="prefix">{{ formConfig.prefix }}</div>
          <div class="field">
            <FormField @formFieldChanged="setFieldValue"
            :form-field-options="formConfig"></FormField>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import FormField from './FormField.vue';
import workflowFormConfigs from '../configs/workflow-form-configs';

export default {
  name: 'workflowTile',
  data() {
    return {
      workflowFormConfigs: [],
      targetType: '',
    };
  },
  props: {
    workflow: Object,
  },
  computed: {
  },
  components: {
    FormField,
  },
  methods: {
    setFieldValue({ key, event }) {
      const { value } = event.detail;

      if (key === 'initial_event') {
        this.targetType = value.includes('ticket') ? 'ticket' : 'conversation';
      }

      this.workflowFormConfigs = workflowFormConfigs(this.targetType);
    },
  },
  mounted() {
    this.workflowFormConfigs = workflowFormConfigs();
    // eslint-disable-next-line no-debugger
    debugger;
  },
};
</script>

<style lang="scss" scoped>
.workflow-tile-container {
  width: 100%;
  min-height: 100px;
  margin: 20px 0;
  padding: 15px;
  background: #FFFFFF 0% 0% no-repeat padding-box;
  box-shadow: -1px 2px 4px #403A8F21;
  border-radius: 5px;
  .delete-btn {
    position: relative;
    float: right;
  }
  .workflow-tile {
    display: flex;
    .___container {
      display: flex;
      .prefix {
        margin-left: 15px;
      }
      .field {
        margin-left: 15px;
        width: 200px;
        margin-top: -10px;
      }
    }
  }
}
</style>
