<template>
  <div>
    <Search @places="changePlaces" />
    <div id="map"></div>
  </div>
</template>

<script lang="ts">
import Search from "./Search.vue";

import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl"; // or "const mapboxgl = require('mapbox-gl');"
import MapboxLanguage from "@mapbox/mapbox-gl-language";

export default {
  components: {
    Search,
  },
  mounted() {
    this.init();
  },

  data() {
    return {
      places: {
        name: '杭州',
        longitude: 120.2,
				latitude: 30.3
      },
      map: null
    };
  },
  methods: {
    init() {
      // TO MAKE THE MAP APPEAR YOU MUST
      // ADD YOUR ACCESS TOKEN FROM
      // https://account.mapbox.com
      mapboxgl.accessToken = this.accessToken;
      const map = new mapboxgl.Map({
        container: "map", // container ID
        style: "mapbox://styles/mapbox/outdoors-v11", // style URL
        center: [this.places.longitude, this.places.latitude], // starting position [lng, lat]
        zoom: 15, // starting zoom
      });
      
      console.log("init");
      map.on("style.load", () => {
        map.addControl(
          new MapboxLanguage({
            defaultLanguage: "zh-Hans",
          })
        );
        map.addSource("route", {
          type: "geojson",
          data: {
            type: "Feature",
            properties: {},
            geometry: {
              type: "LineString",
              coordinates: [
                [-122.483696, 37.833818],
                [-122.483482, 37.833174],
                [-122.483396, 37.8327],
                [-122.483568, 37.832056],
                [-122.48404, 37.831141],
                [-122.48404, 37.830497],
                [-122.483482, 37.82992],
                [-122.483568, 37.829548],
                [-122.48507, 37.829446],
                [-122.4861, 37.828802],
                [-122.486958, 37.82931],
                [-122.487001, 37.830802],
                [-122.487516, 37.831683],
                [-122.488031, 37.832158],
                [-122.488889, 37.832971],
                [-122.489876, 37.832632],
                [-122.490434, 37.832937],
                [-122.49125, 37.832429],
                [-122.491636, 37.832564],
                [-122.492237, 37.833378],
                [-122.493782, 37.833683],
              ],
            },
          },
        });
        map.addLayer({
          id: "route",
          type: "line",
          source: "route",
          layout: {
            "line-join": "round",
            "line-cap": "round",
          },
          paint: {
            "line-color": "#888",
            "line-width": 8,
          },
        });
      });
      this.map = map;
    },

    changePlaces(places) {
      this.places = places;
      this.map.flyTo({
        center: [places.longitude, places.latitude]
      })
    },
  },
};
</script>
<style lang="css" scoped>
#map {
  position: absolute;
  top: 20px;
  bottom: 0;
  width: 1300px;
  height: 660px;
  margin: 0;
  padding: 0;
}
</style>

