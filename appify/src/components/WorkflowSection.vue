<template>
  <div class="workflow-section">
    <div class="workflows-container" v-if="localWorkflows.length">
      <WorkflowTile v-for="workflow in localWorkflows" :key="workflow.id"
        :workflow="workflow" />
    </div>
    <div v-else class="no-workflow-message">
        Currently there is no workflow for the app. Create one
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
// import WorkflowTile from './WorkflowTile.vue';

export default {
  name: 'workflowSection',
  data() {
    return {
      localWorkflows: [],
    };
  },
  components: {
    // WorkflowTile,
  },
  props: {
    workflowAdded: Boolean,
  },
  watch: {
    workflowAdded(newVal) {
      if (newVal) {
        this.createWorkflow();
      }
    },
  },
  computed: {
    ...mapState([
      'newAppConfigs',
    ]),
  },
  methods: {
    createWorkflow() {
      const workflow = {
        id: this.localWorkflows.length + 1,
        blocks: [],
      };
      this.localWorkflows.push(workflow);
      this.$emit('reset');
    },
  },
  mounted() {
    this.localWorkflows = this.newAppConfigs.workflows;
  },
};
</script>

<style lang="scss" scoped>
.workflow-section {
  .workflows-container {
  }
  .no-workflow-message {
    margin-top: 35px;
    text-align: center;
  }
}
</style>
