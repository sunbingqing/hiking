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
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";

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
        name: "杭州",
        longitude: 120.064926,
        latitude: 30.266938,
      },
      map: null,
      coordinates: [], // 用户画的点（2-25个）
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
      map.addControl(
        new MapboxLanguage({
          defaultLanguage: "zh-Hans",
        })
      );

      const draw = new MapboxDraw({
        displayControlsDefault: false,
        // Select which mapbox-gl-draw control buttons to add to the map.
        controls: {
          line_string: true,
          trash: true,
        },
        // Set mapbox-gl-draw to draw by default.
        // The user does not have to click the polygon control button first.
        defaultMode: "draw_line_string",
      });
      map.addControl(draw);

      map.on("click", () => {
        const { features = [] } = draw.getAll();
        const coordinates = features[0]?.geometry?.coordinates || [];
        this.coordinates = coordinates;
      });

      map.on("dblclick", async () => {
        if (this.coordinates && this.coordinates.length) {
          const data = await this.getRoute();
          const route = data.geometry.coordinates;
          const geojson = {
            type: "Feature",
            properties: {},
            geometry: {
              type: "LineString",
              coordinates: route,
            },
          };
          if (map.getSource("route")) {
            map.getSource("route").setData(geojson);
          }
          // otherwise, we'll make a new request
          else {
            map.addLayer({
              id: "route",
              type: "line",
              source: {
                type: "geojson",
                data: geojson,
              },
              layout: {
                "line-join": "round",
                "line-cap": "round",
              },
              paint: {
                "line-color": "#3887be",
                "line-width": 5,
                "line-opacity": 0.75,
              },
            });
          }
        }
      });

      map.on("load", () => {});

      this.map = map;
    },
    // 获取最近的不行路径
    getRoute() {
      const coordinatesStr = this.coordinates.reduce((p, n) => {
        return p + ";" + n;
      });
      const url = `https://api.mapbox.com/directions/v5/mapbox/walking/${coordinatesStr}?geometries=geojson&access_token=${mapboxgl.accessToken}`;
      return fetch(url)
        .then((response) => response.json())
        .then((res) => {
          const data = res.routes[0];
          return data;
        });
    },

    changePlaces(places) {
      this.places = places;
      this.map.flyTo({
        center: [places.longitude, places.latitude],
      });
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

