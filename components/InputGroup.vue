<template>
  <form @submit.prevent="submit">
    <label for="input">
      <slot name="label"></slot>
    </label>
    <div class="row">
      <input
        id="input"
        type="text"
        @keyup="emitChange"
        :value="value"
        autofocus
        placeholder="Address oder Suchbegriff eingeben..."
      >
      <button type="submit" v-if="showButton">
        <slot name="button-text"></slot>
      </button>
    </div>
  </form>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: ""
    },
    showButton: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      timeoutId: undefined,
      formSubmitted: false
    };
  },
  methods: {
    emitChange($event) {
      if (this.timeoutId !== undefined) {
        clearTimeout(this.timeoutId);
        this.timeoutId = undefined;
      }
      const value = $event.target.value;
      this.timeoutId = setTimeout(() => {
        this.$emit("update:value", value);
        if (this.formSubmitted) {
          this.formSubmitted = false;
          this.timeoutId = undefined;
          this.$emit("submit", value);
        }
      }, 300);
    },
    submit($event) {
      if (!this.timeoutId) {
        this.$emit("submit", this.value);
      } else {
        this.formSubmitted = true;
      }
    }
  }
};
</script>

<style scoped>
button {
  width: 100px;
  flex-grow: 0.2;
}
</style>


