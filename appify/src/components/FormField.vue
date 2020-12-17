<template>
  <div class="form-field">
     <div class="label" v-if="formFieldOptions.label">
       {{formFieldOptions.label}}
     </div>
     <fw-input
      v-if="formFieldOptions.type === 'input'"
      :placeholder="formFieldOptions.placeholder"
      :disabled="formFieldOptions.disabled"
      :id="formFieldOptions.name"
      :ref="formFieldOptions.name"
      :value="formFieldOptions.value"
      @fwBlur="formFieldChanged(formFieldOptions.name, $event)"
     />

     <fw-select
      :placeholder="formFieldOptions.placeholder"
      @fwChange="$emit('formFieldChanged', { key: formFieldOptions.name, event: $event })"
      :value="formFieldOptions.value"
      v-if="formFieldOptions.type === 'select'">
        <fw-select-option
        v-for="selectOption in formFieldOptions.options"
        :key="selectOption.id || selectOption.label"
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
