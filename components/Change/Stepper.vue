<template>
  <div>
    <v-stepper
      v-model="stepper"
      alt-labels
      elevation="0"
      style="border-radius: 0"
    >
      <v-stepper-header>
        <template v-for="(item, index) in step">
          <v-stepper-step
            :key="`${item.id}-step`"
            :complete="stepper > item.id"
            :step="item.id"
            editable
          >
            {{ item.title }}
          </v-stepper-step>

          <v-divider v-if="item.id !== step.length" :key="item.id"></v-divider>
        </template>
      </v-stepper-header>

      <v-stepper-items>
        <template v-for="(item, index) in step">
          <v-stepper-content :step="item.id">
            <component :is="item.content.component" v-bind="item.content.props">
            </component>
          </v-stepper-content>
        </template>
      </v-stepper-items>
    </v-stepper>
  </div>
</template>
<script>
export default {
  data() {
    return {
      stepper: 1,
    };
  },
  props: {
    step: Array,
  },
  methods: {
    nextStep() {
      this.stepper += 1;
    },
  },
};
</script>
<style lang="scss"></style>
