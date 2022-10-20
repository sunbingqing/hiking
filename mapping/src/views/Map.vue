<template>
  <div id="map"></div>
</template>

<script lang="ts">
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl"; // or "const mapboxgl = require('mapbox-gl');"

export default {
  mounted() {
    this.init()
  },

  data() {},
  methods: {
    init() {
      // TO MAKE THE MAP APPEAR YOU MUST
      // ADD YOUR ACCESS TOKEN FROM
      // https://account.mapbox.com
      mapboxgl.accessToken = 'pk.eyJ1Ijoic3VuYmluZ3FpbmciLCJhIjoiY2w5Z3R2a2g2MDgzdDN1cDIxYWUwMjUzcSJ9.JWn1byZ7mTIBqVNZzpEwRA';
      const map = new mapboxgl.Map({
        container: "map", // container ID
        style: "mapbox://styles/mapbox/streets-v11", // style URL
        center: [-74.5, 40], // starting position [lng, lat]
        zoom: 9, // starting zoom
        projection: "globe", // display the map as a 3D globe
      });
      map.on("style.load", () => {
        map.setFog({}); // Set the default atmosphere style
      });
    },
  },
};
</script>

