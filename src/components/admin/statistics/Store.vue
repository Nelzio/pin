<template>
  <div>
    <div>
      <q-toolbar class="text-primary q-pa-md">
        <q-toolbar-title class="text-h5">
          Produtos e serviços
        </q-toolbar-title>
        <div style="width: 200px">
          <q-select
            outlined
            rounded
            v-model="modelSelect"
            :options="optionsSelect"
            label="Selecionar província"
          />
        </div>
      </q-toolbar>
    </div>
    <div class="row q-pa-sm">
      <div class="col-3">
        <q-card class="my-card">
          <q-card-section class="text-h5">
            Resumo
          </q-card-section>
          <q-card-section class="q-pa-none">
            <q-item
              clickable
              v-ripple
            >
              <q-item-section class="text-body1">
                Produtos Publicados
              </q-item-section>
              <q-item-section side>
                <q-badge
                  class="text-bold text-body2"
                  color="primary"
                  text-color="white"
                  :label="numPublicProducts"
                />

              </q-item-section>
            </q-item>
            <q-separator />
            <q-item
              clickable
              v-ripple
            >
              <q-item-section class="text-body1">
                Serviços publicados
              </q-item-section>
              <q-item-section side>
                <q-badge
                  class="text-bold text-body2"
                  color="primary"
                  text-color="white"
                  :label="numPublicServices"
                />

              </q-item-section>
            </q-item>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-9 q-pa-sm">
        <div class="row">
          <div class="col-5 shadow-2">
            <GenderServices :stories="userObjectStories" />
          </div>
          <div class="col-7 shadow-2">
            <GenderStore :stories="userObjectStories" />
          </div>
        </div>
      </div>
    </div>
    <q-ajax-bar
      ref="barStore"
      position="bottom"
      color="primary"
      size="10px"
      skip-hijack
    />
  </div>
</template>

<script>
import GenderServices from "./graphs/store/GenderServices"
import GenderStore from "./graphs/store/GenderStore"
import { firestoreDB } from "boot/firebase"
export default {
  data () {
    return {
      modelSelect: "",
      optionsSelect: ["Todas províncias", "Cabo Delgado",
        "Gaza",
        "Inhambane",
        "Manica",
        "Maputo",
        "Matola",
        "Nampula",
        "Niassa",
        "Sofala",
        "Tete",
        "Zambézia",],
      users: [],
      stories: [],
      numPublicProducts: 0,
      numPublicServices: 0,
      userObjectStories: []
    }
  },
  components: { GenderServices, GenderStore },
  methods: {
    getStories () {
      const vm = this
      const ref = firestoreDB.collection("stories")
      const refUsers = firestoreDB.collection("users")
      let stories = []
      let users = []
      this.numPublicProducts = 0
      this.numPublicServices = 0
      this.stories = []
      this.userObjectStories = []

      refUsers.get().then(docs => {
        docs.forEach(doc => {
          users.push(doc.data())
        });
        vm.users = users

        // stories get
        if (vm.modelSelect && vm.modelSelect != vm.optionsSelect[0]) {
          ref.where("place", "==", vm.modelSelect).get().then(docs => {
            docs.forEach(doc => {
              stories.push(doc.data())
              if (doc.data().category == "Produto") {
                vm.numPublicProducts += 1
              } else if (doc.data().category == "Serviço") {
                vm.numPublicServices += 1
              }
            });
            vm.$refs.barStore.stop()
            vm.stories = stories

          }).catch(error => {
            console.log(error)
          }) // stories get
        } else {
          ref.get().then(docs => {
            docs.forEach(doc => {
              stories.push(doc.data())
              if (doc.data().category == "Produto") {
                vm.numPublicProducts += 1
              } else if (doc.data().category == "Serviço") {
                vm.numPublicServices += 1
              }
            });
            if (vm.modelSelect == vm.optionsSelect[0]) vm.$refs.barStore.stop()
            vm.stories = stories

          }).catch(error => {
            console.log(error)
          }) // stories get
        }

      }).catch(error => {
        console.log(error)
      })
    },
    addUserObjectToStories (stories, users) {
      if (stories.length && users.length) {
        for (let index = 0; index < stories.length; index++) {
          const vacancy = stories[index];
          for (let index = 0; index < users.length; index++) {
            const user = users[index];
            if (user.email == vacancy.user) {
              vacancy["userObject"] = user
            }
          }
        }
        this.userObjectStories = stories
      }
    }
  },
  mounted () {
    this.getStories()
    this.addUserObjectToStories(this.stories, this.users)
  },
  watch: {
    stories () {
      this.addUserObjectToStories(this.stories, this.users)
    },
    users () {
      this.addUserObjectToStories(this.stories, this.users)
    },
    modelSelect () {
      this.$refs.barStore.start()
      this.getStories()
      console.log(this.modelSelect)
    }
  }

}
</script>

<style>
</style>