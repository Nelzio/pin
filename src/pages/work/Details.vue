<template>
  <q-page padding>
    <!-- content -->
    <div class="row q-gutter-y-md">

      <q-card class="my-card col-12" style="padding: 0;height: 300px">
        <q-video
          style="padding: 0;height: 300px"
          src="https://www.youtube.com/embed/Raa0vBXA8OQ"
        />
      </q-card>

      <div class="col-12 row justify-end q-gutter-x-md">
        <q-btn
            rounded
            color="teal"
            label="Candidatar-se"
            size="md"
            @click="submit"
            icon="done_all"
        />
        <q-btn round outline color="teal" icon="share" />
      </div>
      

      <q-card bordered class="my-card col-sm-12" :class="[appMode.bgColor, appMode.textColorOptional]">
        <q-card-section>
          <div class="text-h6">Descricao</div>
        </q-card-section>

        <q-separator dark inset />

        <q-card-section class="row" v-for="i in 4" :key="i">
          <div class="col text-center">
          <q-icon name="arrow_forward_ios" />
          </div>
          <div class="col-11 text-body1">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure animi adipisci itaque deleniti error ipsam blanditiis nostrum maxime, pariatur, corporis architecto consequuntur. Voluptates quis rerum quam ex eos. Corrupti, ipsam!
          </div>
        </q-card-section>
      </q-card>
    </div>

    <q-dialog v-model="socialNet">
      <q-card style="width: 80vw;">
        <q-list bordered separator>
          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="ion-logo-facebook" />
            </q-item-section>
            
            <q-item-section>
              Facebook
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="ion-logo-whatsapp" />
            </q-item-section>
            
            <q-item-section>
              Whatsapp
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="ion-logo-linkedin" />
            </q-item-section>
            
            <q-item-section>
              Linkedin
            </q-item-section>
          </q-item>
        </q-list>
      </q-card>
    </q-dialog>

    <q-dialog v-model="apply">
      <q-card style="width: 80vw;">
        
      </q-card>
    </q-dialog>
    <div class="col-12 row justify-end q-gutter-x-md q-pt-md q-mb-lg">
      <q-btn rounded color="teal" label="Candidatar-se" @click="submit" icon="done_all" />
      <q-btn round outline color="teal" icon="share" @click="socialNet = true" />
    </div>

  </q-page>
</template>

<script>
  import { mapState } from 'vuex'
export default {
  // name: 'PageName',
  data () {
    return {
      socialNet: false,
      apply: false
    }
  },
  computed: {
      ...mapState ('settings', ['appMode'])
  },
  methods: {
    submit () {
      alert("A sua candidatura foi submetida com sucesso!!")
    }
  },
    mounted () {
        this.$root.$emit('isHomePage', 'Descrição da vaga')
    }
}
</script>
