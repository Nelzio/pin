<template>
  <q-page padding>
    <!-- content -->
    <div class="row q-gutter-y-md justify-center">

      <q-card class="my-card col-8">
        <q-video
          src="https://www.youtube.com/embed/Raa0vBXA8OQ"
           style="height: 50vh;"
        />
        <!-- <iframe width="960" height="540" src="https://www.youtube.com/embed/Raa0vBXA8OQ" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> -->
      </q-card>

      

      <q-card bordered class="my-card col-sm-10">
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
    


    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn round color="primary" icon="edit" />
    </q-page-sticky>

  </q-page>
</template>

<script>
export default {
  // name: 'PageName',
  data () {
    return {
      socialNet: false,
      apply: false
    }
  },
  methods: {
    submit () {
      alert("submeteu vaga")
    }
  },
    mounted () {
        this.$root.$emit('isHomePage', false)
    }
}
</script>
