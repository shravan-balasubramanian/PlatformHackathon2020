<template>
  <header class="navbar-container">
    <div class="navbar">
      <div class="fw-logo">
        <a href="/">
          <img
            class="logo"
            src="../assets/images/product-logos/freshworks-dew.svg"
            alt="Freshworks Logo">
        </a>
      </div>

      <div class="title">
          Freshworks Appify
      </div>

      <div class="button-group">
        <div class="btn" v-for="btn in buttonConfigs" :key="btn.id">
          <fw-button :color="btn.color" size="medium" v-html="btn.label"
           @click="$emit(btn.event)" />
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      buttonConfigs: [
        {
          id: 1,
          name: 'downloadBtn',
          label: 'Download App zip <fw-icon name="download" />',
          color: 'secondary',
          event: 'downloadClicked',
        },
      ],
    };
  },
};
</script>

<style scoped lang="scss">
.navbar-container {
  height: 60px;
  width: 100%;
  background: var(--color-navyblue-600) 0% 0% no-repeat padding-box;
  box-shadow: 0 1px 5px 0 #E0E6F1;
  margin: 0px !important;
  z-index: 99;

  .navbar {
    width: 100%;
    padding: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .fw-logo {
      cursor: pointer;
      width: 60px;
      height: 58px;
      background: #0E273C;
      .logo {
        height: 24px;
        margin: 15px;
        width: 30px;
        height: 30px;
      }
    }

    .title {
      flex: 1;
      padding: 0 20px;
      color: #FFFFFF;
      opacity: 0.8;
      cursor: pointer;
    }

    .button-group {
      display: flex;
      .btn {
        margin-right: 10px;
      }
    }
  }
}
</style>
