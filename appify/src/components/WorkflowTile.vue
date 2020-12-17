<template>
  <div class="workflow-tile-container" ref="workflow">
    <div class="delete-btn">
      <fw-button color="primary" size="small" @click="() => $emit('deleted', workflow)">
        <fw-icon name="delete" color="white"></fw-icon>
      </fw-button>
    </div>
    <div class="add-config" v-if="showConfigBtn">
      <fw-button size="small" modal-trigger-id='config'>
        <fw-icon name="dependent-field" color="white"></fw-icon>
      </fw-button>
    </div>
    <fw-modal size="small" id='config' icon="info"
    custom-footer title-text="Please enter the details">
      <fw-input
      v-for="(item) in apiConfigs[thirdPartProduct]" :key="item.id"
      :label="item.label"
      :placeholder="item.placeholder"
      :value="item.value"
      @fwBlur="$emit('flowConfigChanged', { key: item.name, event: $event })"
      required
      state="normal"
      clear-input>
      </fw-input>
    </fw-modal>
    <div class="workflow-tile">
      <div class="___container" v-for="formConfig in workflowFormConfigs" :key="formConfig.id">
        <template v-if="formConfig.show">
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
      selectedBlocks: {},
      order: ['initial_event', 'key_matcher', 'value_matcher', 'target_value', 'final_action'],
      showConfigBtn: false,
    };
  },
  props: {
    workflow: Object,
  },
  computed: {
    thirdPartProduct() {
      if (!Object.keys(this.selectedBlocks)
        .includes('final_action')) {
        return null;
      }
      return this.selectedBlocks.final_action.includes('shopify') ? 'shopify' : 'slack';
    },
  },
  watch: {
    // eslint-disable-next-line no-return-assign
    selectedBlocks(newVal) {
      this.showConfigBtn = Object.keys(newVal).includes('final_action');
    },
  },
  components: {
    FormField,
  },
  methods: {
    setFieldValue({ key, value }) {
      if (key === 'initial_event') {
        this.targetType = value.includes('ticket') ? 'ticket' : 'conversation';
        this.selectedBlocks.key_matcher = `${this.targetType}'s`;
        // eslint-disable-next-line no-prototype-builtins
        if (this.selectedBlocks.hasOwnProperty(key)) {
          this.order.slice(
            this.order.findIndex((val) => val === 'key_matcher'),
          ).forEach((orderKey) => delete this.selectedBlocks[orderKey]);
        }
      }
      this.selectedBlocks = {
        ...this.selectedBlocks,
        [key]: value,
      };
      this.$emit('blocksAdded', { workflow: this.workflow, blocks: this.selectedBlocks });
      this.workflowFormConfigs = workflowFormConfigs(this.targetType, this.selectedBlocks);
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
  padding: 20px;
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
    flex-wrap: wrap;
    .___container {
      margin-bottom: 20px;
      display: flex;
      max-width: 95%;
      flex-wrap: no-wrap;
      .prefix {
        margin-left: 10px;
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
