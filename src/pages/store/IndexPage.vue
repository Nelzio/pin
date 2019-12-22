<template>
  <q-page
    style="padding-bottom: 80px;"
    v-touch-swipe.mouse.left.right="handleSwipe"
  >
    <!-- content -->
    <div class="row">
      <div class="col-12 col-md-3 q-pa-sm" v-for="i in 16" :key="i">
        <q-card class="my-card" :class="[appMode.textColorOptional, appMode.bgColor]">
          <q-img src="https://cdn.awsli.com.br/600x1000/60/60876/produto/28035638/9e1cebfb32.jpg" spinner-color="white" />
          <q-card-section>
            <div class="text-body1">Armando Jose</div>
            <div class="text-subtitle2">Sandalias de cabdal</div>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn
               size="md"
               outline
               rounded
               :text-color="appMode.modeName === 'dark' ? 'white' : 'primary'"
               label="Detalhes"
               to="/store/details"
            />
            <!-- <q-btn
               size="xs"
               round
               :color="appMode.modeName === 'dark' ? 'white' : 'primary'"
               outline
               icon="volume_up"
            /> -->
          </q-card-actions> 
        </q-card>
      </div>
    </div>

    <AddItemComponent
    :modal="addModal"
    @close-dialog="addModal = false"
    />

    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="add" color="teal" @click="modalEmit({modal: 'addStore', val: true})" />
    </q-page-sticky>
  </q-page>
</template>

<script>
    import { mapState, mapActions } from 'vuex'
    import AddItemComponent from "components/store/dialogs/AddItemComponent.vue"
  export default {
    // name: 'PageName',
    data () {
      return {
        addModal: false
      }
    },
      computed: {
          ...mapState('settings', [
              'settings', 'appMode'
          ]),
      },
    methods: {
        ...mapActions ('settings', ['setSettings', 'playSound', 'vibrate']),
        modalEmit(modal) {
        /**emit to open modal */
        this.$root.$emit(modal.modal, modal.val);
      },
        handleSwipe (val) {
            if (val.direction === 'left') {
                this.$router.push('/settings')
            }

            if (val.direction === 'right') {
                this.$router.push('/work')
            }
        }
    },
      mounted () {
          this.deviceWidth = window.screen.width
          if(this.$q.screen.gt.sm) this.padding = 'q-pa-sm'
          // console.log(this.deviceWidth)

          this.$root.$emit('isHomePage', 'Exposições')

          // Vibração
          if (this.settings.isVibrationActive) {
              this.vibrate ()
          }
          // Play do áudio
          if (this.settings.isNarratorActive) {
              this.playSound('/statics/audios/exposicao.aac')
          }
      },
    components: {
      AddItemComponent
    }
  }
</script>
