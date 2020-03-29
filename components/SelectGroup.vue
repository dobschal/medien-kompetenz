<template>
  <div>
    <label>
      <slot name="label"></slot>
    </label>
    <select v-model="selectedOption">
      <option v-for="({ text, key }, index) in localOptions" :key="index" :value="key">{{ text }}</option>
    </select>
  </div>
</template>

<script>
export default {
  name: "Select",
  props: {
    defaultOption: {
      type: String,
      default: ""
    },
    options: {
      type: Array,
      default: () => [],
      validator: options => {
        return (
          Array.isArray(options) &&
          !options.some(
            ({ text, key }) => key === undefined || text === undefined
          )
        );
      }
    }
  },
  computed: {
    localOptions() {
      return [
        {
          key: "default",
          text: this.defaultOption
        }
      ].concat(this.options);
    }
  },
  watch: {
    selectedOption(value) {
      this.$emit("selected", this.options.find(({ key }) => key === value));
    }
  },
  data() {
    return {
      selectedOption: "default"
    };
  }
};
</script>
