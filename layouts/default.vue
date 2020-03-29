<template>
  <div class="container">
    <Nuxt/>
  </div>
</template>

<style>
html {
  font-family: "Lato", sans-serif;
  font-size: 14px;
  line-height: 150%;
  word-spacing: 0.1em;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  color: rgb(46, 43, 48);
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
  /*-webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;*/
}

*:focus {
  outline: none;
}

.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 0 1rem;
}

.mb-1 {
  margin-bottom: 1rem;
}
.mb-2 {
  margin-bottom: 2rem;
}
.mb-3 {
  margin-bottom: 3rem;
}
.mb-4 {
  margin-bottom: 4rem;
}
.mt-1 {
  margin-top: 1rem;
}
.mt-2 {
  margin-top: 2rem;
}
.mt-3 {
  margin-top: 3rem;
}
.mt-4 {
  margin-top: 4rem;
}

h1 {
  font-family: "Baloo 2", cursive;
  font-weight: 700;
  font-size: 2rem;
  line-height: 1.3em;
  letter-spacing: -0.05em;
  word-wrap: break-all;
  hyphens: auto;
}

a:link,
a:visited {
  color: rgb(46, 43, 48);
  text-decoration: underline;
}

a:active,
a:hover {
  color: #922d76;
  cursor: pointer;
  text-decoration: none;
}

section {
  width: 100%;
  max-width: 1200px;
  text-align: left;
}

label {
  font-family: "Baloo 2", cursive;
  font-weight: 700;
  line-height: 1.5rem;
  font-size: 0.85rem;
  text-transform: uppercase;
  display: block;
  letter-spacing: 0.05rem;
}

input {
  font-size: 0.85rem;
  line-height: 1.5rem;
  border: solid 1px #E3E3E3;
  border-radius: 5px;
  background-color: #E3E3E3;
  color: rgb(46, 43, 48);
  padding: 0.15rem 0.5rem;
  font-family: "Lato", sans-serif;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}

button {
  background-color: #922d76;
  color: white;
  border: solid 1px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  padding: 0.15rem;
  font-size: 0.85rem;
  line-height: 1.5rem;
  font-weight: 700;
  letter-spacing: 0.1rem;
  font-family: "Lato", sans-serif;
}
button:hover {
  cursor: pointer;
  background-color: rgb(180, 55, 145);
  border: solid 1px rgba(0, 0, 0, 0);
}

.row {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
}
.row > * {
  flex-grow: 1;
  margin-right: 1rem;
}
.row > *:last-child {
  margin-right: 0;
}

@media screen and (min-width: 900px) {
  .row-lg {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
  }
  .row-lg > * {
    flex-grow: 1;
    margin-right: 1rem;
  }
  .row-lg > *:last-child {
    margin-right: 0;
  }
}
</style>
