<template>
  <div>
    <SvgDemo></SvgDemo>
    <SvgTranDemo></SvgTranDemo>
  </div>
</template>

<script>
export default {
  components: {
    SvgDemo: () => import("./01-svg"),
    SvgTranDemo: () => import("./02-svg-transition"),
  },
};
</script>

<style>
</style>
