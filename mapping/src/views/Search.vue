<template>
  <div class="search-wrap">
    <input type="text" class="input-style" @change="onChange" @keypress="onSearch"/>
    <button class="search-btn" @click="onSearch">
      {{ searching ? "......" : "Search" }}
    </button>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      searching: false,
      value: "",
      places: {},
    };
  },

  methods: {
    onChange(e) {
      console.log(888, e.target.value);
      this.value = e.target.value;
    },
    onSearch() {
      if (this.searching) return;
      this.searching = true;
      // Do search server
      const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${this.value}.json?access_token=${this.accessToken}`;
      fetch(url)
        .then((response) => response.json())
        .then((res) => {
          this.searching = false;
          if (res.features && res.features.length) {
						const result = res.features[0]
            this.places = {
							name: this.value,
							longitude: result.center[0],
							latitude: result.center[1]
						};
						this.$emit('places', this.places)
          }
        });
    },
  },
};
</script>

<style lang="css" scoped>
.search-wrap {
  position: absolute;
  top: 30px;
  left: 10px;
  z-index: 999;
}

.input-style {
  height: 38px;
  width: 200px;
  border: none;
  outline: none;
}

.search-btn {
  height: 38px;
  width: 60px;
  border: none;
  color: #fff;
  background: #444;
  cursor: pointer;
}
.search-btn:hover {
  opacity: 0.8;
}
</style>