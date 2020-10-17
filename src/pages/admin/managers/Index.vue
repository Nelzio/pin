<template>
  <q-page padding>
    <div>
      <q-table
        title="Treats"
        :data="data"
        :columns="columns"
        row-key="name"
        :filter="filter"
      >
        <template v-slot:top-left>
          <div class="row q-gutter-x-lg">
            <div class="text-h6">Administradores</div>
            <q-input
              rounded
              outlined
              dense
              debounce="300"
              v-model="filter"
              placeholder="Search"
            >
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </div>
        </template>
        <template v-slot:top-right v-if="userData.access == 'rwxrw'">
          <q-btn
            color="primary"
            rounded
            icon="add"
            outline
            label="Adicionar Administrador"
            @click="addDialog = true"
          />
        </template>
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="name" :props="props">
              {{ props.row.name }}
            </q-td>
            <q-td key="email" :props="props">
              {{ props.row.email }}
            </q-td>
            <q-td key="read" :props="props">
              <q-checkbox
                v-if="userData.access == 'rwxrw'"
                v-model="props.row.read"
                @input="addAdminTable(props.row, props.row.read ? 'r' : '')"
              />
              <q-checkbox v-else disable v-model="props.row.read" />
            </q-td>
            <q-td key="write" :props="props">
              <q-checkbox
                v-if="userData.access == 'rwxrw'"
                v-model="props.row.write"
                @input="addAdminTable(props.row, props.row.write ? 'rw' : 'r')"
              />
              <q-checkbox v-else disable v-model="props.row.write" />
            </q-td>
            <q-td key="master" :props="props">
              <q-checkbox
                v-if="userData.access == 'rwxrw'"
                v-model="props.row.master"
                @input="
                  addAdminTable(props.row, props.row.master ? 'rwxrw' : 'rw')
                "
              />
              <q-checkbox v-else disable v-model="props.row.master" />
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>

    <div>
      <q-dialog
        v-model="addDialog"
        role="dialog"
        aria-label="Dialogo de adição de administrador"
        lang="pt-PT"
      >
        <q-card style="width: 80vw">
          <q-card-section>
            <q-toolbar :class="[darkModeConf.bgColor, darkModeConf.textColor]">
              <q-toolbar-title :class="getFont.title">
                Adicionar Administrador
              </q-toolbar-title>
              <q-btn flat round dense icon="close" v-close-popup />
            </q-toolbar>
          </q-card-section>
          <q-card-section>
            <div class="text-center" :class="getFont.title">
              Pesquisar usuário por nome ou email
            </div>
            <div>
              <q-input
                :color="darkModeConf.color"
                dense
                outlined
                rounded
                v-model="valueSearch"
                :loading="loadingStateInput"
                input-class="text-right"
                class="full-width"
                type="search"
                role="searchbox"
              >
                <template v-slot:append v-if="!loadingStateInput">
                  <q-icon
                    :color="darkModeConf.iconVar"
                    v-if="valueSearch === ''"
                    name="search"
                  />
                  <q-icon
                    :color="darkModeConf.iconVar"
                    v-else
                    name="clear"
                    class="cursor-pointer"
                    @click="valueSearch = ''"
                  />
                </template>
              </q-input>
            </div>
          </q-card-section>
          <q-card-section>
            <q-item
              v-for="user in dataSearch"
              :key="user.id"
              @click="addAdmin(user, 'r')"
              clickable
              v-ripple
            >
              <q-item-section avatar>
                <q-avatar>
                  <img :src="user.photoURL" alt="image do usuário" role="img" />
                </q-avatar>
              </q-item-section>
              <q-item-section>
                <div :class="getFont.text">{{ user.displayName }}</div>
                <div>{{ user.email }}</div>
              </q-item-section>
            </q-item>
          </q-card-section>
        </q-card>
      </q-dialog>
    </div>
  </q-page>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex"
import { Loading } from "quasar"
import { firestoreDB } from "boot/firebase"
export default {
  data() {
    return {
      filter: "",
      valueSearch: "",
      addDialog: false,
      loadingStateInput: false,
      dataSearch: [],
      columns: [
        {
          name: "name",
          required: true,
          label: "Nome",
          align: "left",
          field: (row) => row.name,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "email",
          align: "center",
          label: "Email",
          field: "email",
          sortable: true,
        },
        {
          name: "read",
          label: "Acesso a leitura",
          field: "read",
          sortable: true,
        },
        { name: "write", label: "Acesso a escrita", field: "write" },
        { name: "master", label: "Adição de admins", field: "master" },
      ],

      data: [],
      adminsUsers: [],
      users: [],
    }
  },
  computed: {
    ...mapState("settings", ["appMode", "darkModeConf"]),
    ...mapGetters("settings", ["getFont", "getVibrate"]),
    ...mapGetters("auth", ["user", "userData"]),
  },
  methods: {
    getUsers() {
      const vm = this
      const ref = firestoreDB.collection("users")
      let admins = []
      if (!this.users.length) this.loadingStateInput = true
      ref.onSnapshot((usersDocs) => {
        vm.users = []
        vm.adminsUsers = []
        admins = []
        usersDocs.forEach((userDoc) => {
          let user = userDoc.data()
          user["id"] = userDoc.id
          if (user.access) {
            vm.adminsUsers.push(user)
            let admin = {
              name: user.displayName,
              email: user.email,
              read: user.access[0] == "r" ? true : false,
              write: user.access[1] == "w" ? true : false,
              master: user.access == "rwxrw" ? true : false,
            }
            admins.push(admin)
          } else {
            vm.users.push(user)
          }
        })
        vm.data = admins
        vm.loadingStateInput = false
        vm.search(vm.valueSearch) // to search after get datas
      })
    },

    search(val) {
      this.loadingStateInput = true
      if (val != "") {
        var temp = new RegExp(".*" + val + ".*")
        var items = []
        var users = this.users
        for (var i in users) {
          var value = users[i]["email"].match(temp)
          var valueName = users[i]["displayName"].match(temp)
          if (value != null && valueName != null) {
            if (
              users[i]["email"] == value[0] &&
              users[i]["displayName"] == valueName[0]
            ) {
              items.push(users[i])
            }
          } else if (value != null) {
            if (users[i]["email"] == value[0]) {
              items.push(users[i])
            }
          } else if (valueName != null) {
            if (users[i]["displayName"] == valueName[0]) {
              items.push(users[i])
            }
          }
        }
        this.dataSearch = items.slice(0, 4)
        this.loadingStateInput = false
      } else {
        this.dataSearch = []
        this.loadingStateInput = false
      }
    },

    addAdmin(user, access) {
      /* access is rwxrw */
      Loading.show()
      const ref = firestoreDB.collection("users")
      const dataUser = {
        access: access,
        address: user.address,
        association: user.association,
        date: user.date,
        deficiency: user.deficiency,
        description: user.description,
        displayName: user.displayName,
        education: user.education,
        email: user.email,
        gender: user.gender,
        phoneNumber: user.phoneNumber,
        photoURL: user.photoURL,
        place: user.place,
        profession: user.profession,
        profileType: user.profileType,
        registrationDate: user.registrationDate,
      }
      ref
        .doc(user.id)
        .set(dataUser)
        .then((response) => {
          // console.log("done")
          Loading.hide()
        })
        .catch((error) => {
          console.log(error)
          Loading.hide()
        })
    },

    addAdminTable(user, access) {
      /* access is rwxrw */
      Loading.show()
      let userObject = {}
      for (let index = 0; index < this.adminsUsers.length; index++) {
        const userElement = this.adminsUsers[index]
        if (userElement.email == user.email) {
          userObject = userElement
          continue
        }
      }
      const ref = firestoreDB.collection("users")
      const dataUser = {
        access: access,
        address: userObject.address,
        association: userObject.association,
        date: userObject.date,
        deficiency: userObject.deficiency,
        description: userObject.description,
        displayName: userObject.displayName,
        education: userObject.education,
        email: userObject.email,
        gender: userObject.gender,
        phoneNumber: userObject.phoneNumber,
        photoURL: userObject.photoURL,
        place: userObject.place,
        profession: userObject.profession,
        profileType: userObject.profileType,
        registrationDate: userObject.registrationDate,
      }
      ref
        .doc(userObject.id)
        .set(dataUser)
        .then((response) => {
          // console.log("done")
          Loading.hide()
        })
        .catch((error) => {
          console.log(error)
          Loading.hide()
        })
    },
  },
  mounted() {
    this.getUsers()
  },
  watch: {
    valueSearch(val) {
      if (!this.users.length) {
        this.getUsers()
      } else {
        this.search(val)
      }
    },
  },
}
</script>

<style>
</style>