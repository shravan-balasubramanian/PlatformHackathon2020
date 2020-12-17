<template>
  <div class="form-field">
     <div class="label" v-if="formFieldOptions.label">
       {{formFieldOptions.label}}
     </div>
     <el-input
      v-if="formFieldOptions.type === 'input'"
      :placeholder="formFieldOptions.placeholder"
      :disabled="formFieldOptions.disabled"
      :id="formFieldOptions.name"
      :ref="formFieldOptions.name"
      :value="formFieldOptions.value || value || ''"
      @input="$emit('formFieldChanged', { key: formFieldOptions.name, value: $event })"
     />
     <el-select
      :placeholder="formFieldOptions.placeholder"
      size="large"
      @change="$emit('formFieldChanged', { key: formFieldOptions.name, value: $event })"
      :value="formFieldOptions.value || value || ''"
      v-if="formFieldOptions.type === 'select'">
        <el-option
          v-for="selectOption in formFieldSelectOptions"
          :key="selectOption.id || selectOption.label"
          :value="selectOption.value || selectOption"
          :label="selectOption.label || selectOption"
        />
      </el-select>

  </div>
</template>

<script>
export default {
  name: 'formField',
  props: {
    formFieldOptions: Object,
    value: String,
  },
  computed: {
    selectValue() {
      return this.formFieldOptions.value
      || (this.formFieldOptions.options[0].value || this.formFieldOptions.options[0]);
    },
    formFieldSelectOptions() {
      if (this.formFieldOptions.options) {
        return this.formFieldOptions.options;
      }
      return [];
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
