<template>
  <div class="workflow-tile-container" ref="workflow">
    <div class="delete-btn">
      <fw-button color="primary" size="small" @click="() => $emit('deleted', workflow)">
        <fw-icon name="delete" color="white"></fw-icon>
      </fw-button>
    </div>
    <div class="add-config">
      <fw-button size="small" modal-trigger-id='config'>
        <fw-icon name="dependent-field" color="white"></fw-icon>
      </fw-button>
    </div>
    <fw-modal size="small" id='config' icon="info"
    custom-footer title-text="Please enter the details">
      <fw-input
      v-for="(item) in apiConfigs.slack" :key="item.id"
      v-bind:label="item.label"
      v-bind:placeholder="item.placeholder"
      v-bind:value="item.value"
      v-on:input="item.value = $event.target.value"
      required
      state="normal"
      clear-input>
      </fw-input>
      <span slot="footer">
      <fw-button >Save</fw-button>
    </span>
    </fw-modal>
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
import apiConfigs from '../configs/api-configs';

export default {
  name: 'workflowTile',
  data() {
    return {
      workflowFormConfigs: [],
      targetType: '',
      apiConfigs: [],
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
    this.apiConfigs = apiConfigs;
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
    margin-left: 5px;
    float: right;
  }
  .add-config {
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
