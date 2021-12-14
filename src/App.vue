/* eslint-disable no-tabs */
<template>
  <div id="app">
    <router-view />
  </div>
</template>
<style lang="less">
* {
  padding: 0;
  margin: 0;
}
html,
body {
  // eslint-disable-next-line no-tabs
  width: 100%;
  min-width: 350px;
  max-width: 650px;

  // overflow: hidden;
}

html{
  font-size: 14px;
}
a {
  text-decoration: none;
}
ul li {
  list-style: none;
}
#app {
  width: 100%;
  height: 100%;
   margin: 0 auto !important;
    background-color: tomato;
  font-family: "微软雅黑";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
}
</style>
