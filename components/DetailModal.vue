<template>
  <div class="modal-wrapper" v-if="opened">
    <div class="modal-glassplane" @click="$emit('update:opened', false)">
      <div class="modal" :class="{show: showModal}" @click.stop="modalClick">
        <div class="header">
          <span class="close-button" @click="$emit('update:opened', false)">Close</span>
          <h3 class="mb-1">{{ location.title }}</h3>
        </div>
        <div class="body">
          <div class="row">
            <div>Träger:</div>
            <div>{{ location.carrier }}</div>
          </div>
          <div class="row">
            <div>Leiter:</div>
            <div>{{ location.lead }}</div>
          </div>
          <div class="row">
            <div>Adresse:</div>
            <div>
              {{ location.address }}
              <br>
              <a
                target="_blank"
                :href="'https://www.google.com/maps?daddr=' + encodeURIComponent(location.address) + '&dirflg=d&t=h'"
              >> Route anzeigen</a>
            </div>
          </div>
          <div class="row">
            <div>Kontakt:</div>
            <div>
              <b>E-Mail:</b>
              <a :href="'mailto¸: ' + location.mail">{{ location.mail }}</a>
              <br>
              <b>Telefon:</b>
              <a :href="'tel: ' + location.phone">{{ location.phone }}</a>
              <br>
              <b>Fax:</b>
              <a :href="'tel: ' + location.fax">{{ location.fax }}</a>
              <br>
            </div>
          </div>
          <div class="row">
            <div>Angebote:</div>
            <div v-html="offers"></div>
          </div>
          <div class="row">
            <div>Zwecke:</div>
            <div v-html="support"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//import schoolAreas from "@/config/schoolAreas";
import supportItems from "@/config/supportItems";
import offers from "@/config/offers";

export default {
  name: "DetailModal",
  props: {
    opened: {
      type: Boolean,
      default: true
    },
    location: {
      type: Object,
      default: undefined
    }
  },
  computed: {
    offers() {
      if (!this.location) return "";
      return this.location.offers
        .map(id => {
          return (offers.find(offer => offer.id === id) || {}).title;
        })
        .join("<br>");
    },
    support() {
      if (!this.location) return "";
      return this.location.supportOptions
        .map(id => {
          return (supportItems.find(supportItem => supportItem.id === id) || {})
            .title;
        })
        .join("<br>");
    }
  },
  watch: {
    opened(val) {
      setTimeout(() => {
        this.showModal = val;
      });
    }
  },
  data() {
    return {
      showModal: false
    };
  },
  methods: {
    modalClick() {
      console.log("Clicked modal");
    }
  }
};
</script>


<style scoped>
.modal-wrapper {
  z-index: 999;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
}
.modal-wrapper .modal-glassplane {
  display: flex;
  width: 100vw;
  height: 100vh;
  background-color: rgba(255, 255, 255, 0.8);
}
.modal-wrapper .modal-glassplane .modal {
  opacity: 0;
  transition: opacity 0.5s ease-in-out;
  margin: auto;
  width: 60%;
  max-width: 480px;
  max-height: 90vh;
  overflow-y: auto;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 3px 3px 1px rgba(0, 0, 0, 0.09),
    0 0 10px 10px rgba(0, 0, 0, 0.09);
  padding: 1rem;
  text-align: left;
}
.modal-wrapper .modal-glassplane .modal.show {
  opacity: 1;
}
.close-button {
  display: block;
  float: right;
  width: 24px;
  height: 24px;
  background-image: url("~assets/close.svg");
  background-repeat: no-repeat;
  background-position: 50% 50%;
  font-size: 0;
  line-height: 0;
  opacity: 0.75;
}
.close-button:hover {
  cursor: pointer;
  opacity: 1;
}

.row {
  margin-bottom: 0.5rem;
}

.row > div:first-child {
  font-weight: bold;
  min-width: 60px;
  flex-grow: 0;
}
</style>