<template>
  <div>
    <section class="header mt-2">
      <Icon></Icon>
      <h1>
        Thüringer
        <span>Medienkompetenz</span>netzwerkpartner im Überblick
      </h1>
      <p class="mt-1">
        Finden sie schnell und einfach interessante Angebote regionaler Medienkompetenzpartner.
        Nutzer sie bitte die folgenden Filtern, um ihre Suche zu einzuschränken.
      </p>
    </section>
    <section class="filter mt-2">
      <InputGroup class="mb-1" :value.sync="searchQuery" :show-button="true" @submit="submitSearch">
        <template #label>Im Netzwerk suchen</template>
        <template #button-text>Suchen</template>
      </InputGroup>
      <div class="row-lg">
        <SelectGroup
          class="mb-1"
          :options="schoolAreaOptions"
          default-option="Alle anzeigen"
          @selected="filterSchoolArea"
        >
          <template #label>Nach Schulamtsbereich filtern</template>
        </SelectGroup>
        <SelectGroup
          class="mb-1"
          :options="supportOptions"
          default-option="Alle anzeigen"
          @selected="filterSupportOption"
        >
          <template #label>Nach Unterstützungsmöglichkeit filtern</template>
        </SelectGroup>
      </div>
      <!--<SelectGroup
        class="mb-1"
        :options="offerOptions"
        default-option="Alle anzeigen"
        @selected="filterOffer"
      >
        <template #label>Angebot wählen</template>
      </SelectGroup>-->
    </section>
    <div class="row-lg result-area mt-1">
      <section class="map">
        <Map
          :selectedLocation.sync="selectedLocation"
          :locations="locations"
          ref="map"
          :show-default="showMapDefault"
        ></Map>
      </section>
      <section class="list">
        <ul>
          <li
            v-for="location in locationsFiltered"
            :key="location.lat + '' + location.lng"
            class="mb-1"
            title="Auf Karte zeigen"
            @click="showLocation(location)"
          >
            <h3>{{ location.title }}</h3>
            <p>{{ location.address }}</p>
            <p>> Details anzeigen</p>
          </li>
        </ul>
      </section>
    </div>
    <section class="mt-2">
      <b>Ihr Eintrag fehlt oder sie kennen einen Partner, der hier vertreten sein sollte?</b>
      <br>Dann melden sie sich unter
      <a
        href="mailto: email@merci-fehlt-noch.de"
      >email@merci-fehlt-noch.de</a>
    </section>
    <section class="footer mt-2 mb-2">© Apolda 2020. Alle Rechte vorbehalten.</section>
    <DetailModal :opened.sync="modalOpened" :location="selectedLocation"/>
  </div>
</template>

<script>
import InputGroup from "@/components/InputGroup";
import SelectGroup from "@/components/SelectGroup";
import Map from "@/components/Map";
import Icon from "@/components/Icon";
import DetailModal from "@/components/DetailModal";

import schoolAreas from "@/config/schoolAreas";
import netzwerkPartner from "@/config/networkPartner";
import supportItems from "@/config/supportItems";
import offers from "@/config/offers";

export default {
  components: { SelectGroup, InputGroup, Map, Icon, DetailModal },
  data() {
    return {
      selectedLocation: undefined,
      modalOpened: false,
      searchQuery: "",
      schoolArea: undefined,
      supportOption: undefined,
      offer: undefined,
      supportOptions: supportItems.map(({ id, title }) => ({
        key: id,
        text: title
      })),
      schoolAreaOptions: schoolAreas.map(({ id, title }) => ({
        key: id,
        text: title
      })),
      offerOptions: offers.map(({ id, title }) => ({
        key: id,
        text: title
      }))
    };
  },
  watch: {
    selectedLocation(val) {
      if (val) this.modalOpened = true;
    },
    modalOpened(val) {
      if (!val) this.selectedLocation = undefined;
    }
  },
  computed: {
    showMapDefault() {
      return (
        !this.supportOption &&
        !this.searchQuery &&
        !this.schoolArea &&
        !this.offer
      );
    },
    locationsFiltered() {
      return this.locations.filter(item => item.visible);
    },
    locations() {
      return netzwerkPartner.map(this.filterNetworkPartner);
    }
  },
  methods: {
    showLocation(location) {
      this.$refs.map.focusLocation(location);
      setTimeout(() => {
        this.selectedLocation = location;
      }, 300);
    },

    submitSearch() {
      this.$forceUpdate();
    },

    filterSchoolArea({ key } = {}) {
      this.schoolArea = schoolAreas.find(({ id }) => id === key);
    },

    filterSupportOption({ key } = {}) {
      this.supportOption = supportItems.find(({ id }) => id === key);
    },

    filterOffer({ key } = {}) {
      this.offer = offers.find(({ id }) => id === key);
    },

    filterNetworkPartner(item) {
      item.visible = true;
      if (this.schoolArea && item.schoolArea !== this.schoolArea.id) {
        item.visible = false;
        return item;
      }
      if (this.offer && !item.offers.includes(this.offer.id)) {
        item.visible = false;
        return item;
      }
      if (
        this.supportOption &&
        !item.supportOptions.includes(this.supportOption.id)
      ) {
        item.visible = false;
        return item;
      }
      if (!this.searchQuery) {
        return item;
      }
      item.visible = false;
      for (const key in item) {
        if (
          item.hasOwnProperty(key) &&
          (item[key] + "")
            .toLowerCase()
            .includes(this.searchQuery.toLowerCase())
        ) {
          item.visible = true;
        }
      }
      return item;
    }
  }
};
</script>

<style scoped>
.footer {
  font-size: 0.8rem;
  line-height: 1.2rem;
  color: #505050;
}

ul {
  list-style: none;
  padding: 0;
}

ul li p:nth-child(2) {
  font-size: 0.8rem;
  line-height: 1.2rem;
  color: #505050;
}

ul li:hover {
  cursor: pointer;
  color: #922d76;
}

.row-lg .list {
  flex-grow: 1;
  flex-basis: 420px;
  max-height: 80vh;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}
.row-lg .map {
  flex-grow: 1;
  margin: -1rem -1rem 1rem -1rem;
  width: calc(100% + 2rem);
}

.result-area {
  background-color: #922d761a;
  border-radius: 8px;
  padding: 1rem;
  overflow: hidden;
}

@media screen and (min-width: 900px) {
  .row-lg .map {
    flex-grow: 1;
    margin: -1rem 1rem -1rem -1rem;
    width: 100%;
  }
}
</style>
