<template>
  <GMap
    ref="gMap"
    :center="{lat: startLocation.lat, lng: startLocation.lng}"
    :options="{fullscreenControl: false, styles: mapStyle}"
    :zoom="startZoom"
  >
    <GMapMarker
      v-for="(location, index) in locations"
      :key="index"
      :position="location"
      @click="$emit('update:selectedLocation', location)"
    >
    </GMapMarker>
  </GMap>
</template>

<script>
export default {
  name: "Map",
  props: {
    locations: {
      type: Array,
      default: () => []
    },
    showDefault: {
      type: Boolean,
      default: false
    },
    selectedLocation: {
      type: Object
    }
  },
  watch: {
    locations() {
      if (!this.$refs.gMap) return;
      this.$emit("update:selectedLocation", undefined);
      let visibleLocations = [];
      this.$refs.gMap.markers.forEach((marker, index) => {
        if (this.locations[index].visible) {
          marker.setMap(this.$refs.gMap.map);
          visibleLocations.push(this.locations[index]);
        } else {
          marker.setMap(null);
        }
      });
      if (visibleLocations.length && !this.showDefault) {
        const lat = visibleLocations.reduce(function(
          avg,
          { lat },
          _,
          { length }
        ) {
          return avg + lat / length;
        },
        0);
        const lng = visibleLocations.reduce(function(
          avg,
          { lng },
          _,
          { length }
        ) {
          return avg + lng / length;
        },
        0);
        this.setMapCenter({ lat, lng }, visibleLocations);
      } else {
        this.setMapCenter(this.startLocation);
        this.$refs.gMap.map.setZoom(this.startZoom);
      }
    }
  },
  data() {
    return {
      startZoom: 7.9,
      windowOpen: false,
      startLocation: {
        lat: 50.952716,
        lng: 11.3
      },
      mapStyle: [
        {
          featureType: "administrative",
          elementType: "geometry.stroke",
          stylers: [
            {
              color: "#922d76"
            },
            {
              visibility: "on"
            },
            {
              weight: "3"
            }
          ]
        },
        {
          featureType: "administrative",
          elementType: "labels.text.fill",
          stylers: [
            {
              color: "#922d76"
            }
          ]
        },
        {
          featureType: "landscape",
          elementType: "all",
          stylers: [
            {
              color: "#f2f2f2"
            }
          ]
        },
        {
          featureType: "poi",
          elementType: "all",
          stylers: [
            {
              visibility: "off"
            }
          ]
        },
        {
          featureType: "road",
          elementType: "all",
          stylers: [
            {
              saturation: -100
            },
            {
              lightness: 45
            }
          ]
        },
        {
          featureType: "road.highway",
          elementType: "all",
          stylers: [
            {
              visibility: "simplified"
            }
          ]
        },
        {
          featureType: "road.arterial",
          elementType: "labels.icon",
          stylers: [
            {
              visibility: "off"
            }
          ]
        },
        {
          featureType: "transit",
          elementType: "all",
          stylers: [
            {
              visibility: "off"
            }
          ]
        },
        {
          featureType: "water",
          elementType: "all",
          stylers: [
            {
              color: "#505a65"
            },
            {
              visibility: "on"
            }
          ]
        }
      ]
    };
  },
  methods: {
    showInfoWindow(m) {
      for (var i = 0; i < this.locations.length; i++) {
        if (i === m) {
          this.locations[i].ifw = this.locations[i].ifw ? false : true;
        } else {
          this.locations[i].ifw = false;
        }
      }
    },
    focusLocation(location) {
      this.setMapCenter(location);

      // TODO: Open tool window...

      //this.$refs.gMap.markers[0].infoWindow.setMap(this.$refs.gMap.map);
      //console.log("Focus", this.$refs.gMap.markers[0].infoWindow);
    },
    setMapCenter(position, visibleLocations) {
      this.$refs.gMap.map.setCenter(position);
      if (visibleLocations && visibleLocations.length) {
        this.$nextTick(() => {
          let bounds = new this.$refs.gMap.google.maps.LatLngBounds();
          visibleLocations.forEach(({ lat, lng }) => {
            bounds.extend(
              new this.$refs.gMap.google.maps.LatLng(lat + "", lng + "")
            );
          });
          this.$refs.gMap.map.fitBounds(bounds);
        });
      }
    }
  }
};
</script>

<style scoped>

>>> .GMap__Wrapper {
  height: 80vh;
}

@media screen and (min-width: 900px) {
  >>> .GMap__Wrapper {
    min-width: 620px;
  }
}
</style>
