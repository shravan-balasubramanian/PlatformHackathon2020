<template>
  <footer class="footer-container">
    <div class="footer-text">
      Copyright © 2020 Freshworks, Inc.
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
};
</script>

<style scoped lang="scss">
.footer-container {
  height: 40px;
  width: 100%;
  background-color: var(--color-milk);
  bottom: 0;
  left: 0;
  position: fixed;
  display: flex;
  align-items: center;
  padding: 0 20px;
  height: 50px;
  color: var(--color-navyblue-600);
  font-size: var(--font-size-12);
  .footer-text {
    text-align: left;
    width: 100%;
    margin: 13px 40px;
  }
}
</style>
