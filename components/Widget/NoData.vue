<template>
  <div style="margin-top: 2rem;">
    <div style="display: flex; align-items: center; justify-content: center">
        <img
            src="../../assets/images/icons/empty.gif"
            style="text-align: center; user-select: none;"
            :width="width"
            :height="height"
            alt=""
        />
    </div>
    <br />
    <label
      style="display: flex; align-items: center; justify-content: center; user-select: none;"
      >{{ message }}</label
    >
  </div>
</template>
<script>
export default {
  props: {
    message: {
      type: String,
      required: true,
    },
    width: {
      type: String,
      required: true,
    },
    height: {
      type: String,
      required: true,
    },
  },
  data() {
    return {};
  },
};
</script>
