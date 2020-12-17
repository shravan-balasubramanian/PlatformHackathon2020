<template>
  <div class="main-section-container">
    <div class="main-title">
        Create Freshworks Marketplace App with low to no code
    </div>
    <div class="steps-container">
      <AppStep v-for="step in steps" :key="step.id"
       :step="step"
      />
    </div>
  </div>
</template>

<script>
import { stepConfigs } from '../configs/index';
import AppStep from '../components/AppStep.vue';

export default {
  name: 'mainSection',
  data() {
    return {
      steps: [],
    };
  },
  components: {
    AppStep,
  },
  mounted() {
    this.steps = stepConfigs;
  },
};
</script>

<style lang="scss" scoped>
.main-section-container {
  margin: 5px 15%;
  .main-title {
    font-weight: var(--font-weight-600);
    font-size: var(--font-size-18);
    text-align: center;
  }
  .steps-container {
    width: 100%;
    margin-top: 25px;
  }
}
</style>
