<template>
  <div class="form-field">
     <div class="label">
       {{formFieldOptions.label}}
     </div>
     <fw-input
      v-if="formFieldOptions.type === 'input'"
      :placeholder="formFieldOptions.placeholder"
      :disabled="formFieldOptions.disabled"
      :id="formFieldOptions.name"
      :ref="formFieldOptions.name"
     />

     <fw-select
      :placeholder="formFieldOptions.placeholder"
      :value="selectValue"
      v-if="formFieldOptions.type === 'select'">
        <fw-select-option
        v-for="selectOption in formFieldOptions.options"
        :key="selectOption.id || selectOption"
        :value="selectOption.value || selectOption"
        > {{selectOption.label || selectOption}}  </fw-select-option>
      </fw-select>

  </div>
</template>

<script>
export default {
  name: 'formField',
  props: {
    formFieldOptions: Object,
  },
  computed: {
    selectValue() {
      return this.formFieldOptions.value
      || (this.formFieldOptions.options[0].value || this.formFieldOptions.options[0]);
    },
  },
};
</script>

<style lang="scss" scoped>
.form-field {
  width: 100%;
  .label {
    font-size: var(--font-size-14);
    font-weight: var(--font-weight-500);
  }
}
</style>
