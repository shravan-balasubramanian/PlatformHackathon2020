<template>
  <div class="step-container">
      <div class="step-header">
        <div class="step-label">
          {{step.id}} . {{step.label}}
        </div>
        <fw-button
          v-if="step.showButton"
          size="small"
          @click="stepButtonClicked"
          v-html="addButtonLabel"
        >
        </fw-button>
      </div>
      <div class="divider" />
      <template v-if="step.form_fields">
          <div class="form-fields-container">
             <FormField
              class="form-field-container"
              v-for="formField in step.form_fields"
              :key="formField.id"
              :value="getAppMetaValue(formField)"
              :form-field-options="formField"
              @formFieldChanged="setFieldValue"
             />
          </div>
      </template>
      <template v-if="isIparamStep">
        <IparamsSection
          :iparam-added="iparamAddClicked"
          @reset="iparamAddClicked = false"
        />
      </template>
      <template v-if="isWorkflowStep">
        <WorkflowSection
          :workflow-added="workflowAddClicked"
          @reset="workflowAddClicked = false"
        />
      </template>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import FormField from './FormField.vue';
import IparamsSection from './IparamsSection.vue';
import WorkflowSection from './WorkflowSection.vue';

export default {
  name: 'appStep',
  data() {
    return {
      addButtonLabel: 'Add <i class="el-icon-plus" />',
      iparamAddClicked: false,
      workflowAddClicked: false,
    };
  },
  props: {
    step: Object,
  },
  components: {
    FormField,
    IparamsSection,
    WorkflowSection,
  },
  computed: {
    ...mapState([
      'newAppConfigs',
    ]),
    isIparamStep() {
      return this.step.name === 'iparam_details';
    },
    isWorkflowStep() {
      return this.step.name === 'workflow_details';
    },
  },
  methods: {
    setAppMetaInStore(key, value) {
      const clonedNewAppConfigs = {
        ...this.newAppConfigs,
      };
      clonedNewAppConfigs.meta_details[key] = value;
      this.$store.dispatch('setNewAppConfigs', clonedNewAppConfigs);
    },
    stepButtonClicked() {
      if (this.isIparamStep) {
        this.iparamAddClicked = true;
      } else {
        this.workflowAddClicked = true;
      }
    },
    setFieldValue({ key, value }) {
      this.setAppMetaInStore(key, value);
    },
    getAppMetaValue(formField) {
      if (formField.value.length) {
        return formField.value;
      }
      return this.newAppConfigs.meta_details[formField.name];
    },
  },
};
</script>

<style lang="scss" scoped>
.step-container {
  width: 100%;
  margin-bottom: 20px;
  .step-header {
    display: flex;
    justify-content: space-between;
    .step-label {
      font-size: var(--font-size-16);
      font-weight: var(--font-weight-600);
    }
  }
  .divider {
    height: 1.5px;
    width: 100%;
    background: #D5D8E5;
    opacity: 0.3;
  }
  .form-fields-container {
      margin-top: 10px;
    display: flex;
    justify-content: space-between;
    .form-field-container {
      width: 30%;
      margin-right: 5px;
    }
  }
}
</style>
