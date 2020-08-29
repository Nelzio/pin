<template>
  <div>
    <div class="row justify-center">
      <q-card
        class="my-card col-12"
        style="background: radial-gradient(circle, #f5ffff 0%, #dbffff 100%)"
      >
        <q-card-section>
          <q-card-section horizontal>
            <q-card-section v-if="vacancyDetails.user" class="col-3 flex flex-center">
              <q-card class="my-card text-center">
                <!-- <q-icon name="person" color="black" size="100px" /> -->

                <q-img
                  :src="vacancyDetails.user.img"
                  spinner-color="white"
                  style="max-width: 120px"
                />
                <q-card-section class="text-h5">
                  {{ vacancyDetails.user.name }}
                  <div class="text-body1">{{ vacancyDetails.user.email }}</div>
                </q-card-section>
              </q-card>
            </q-card-section>
            <q-card-section>
              <div>
                <div class="text-body1 text-bold">Título</div>
                <div class="text-subtitle1">{{ vacancyDetails.title }}</div>
              </div>
              <div>
                <div class="text-body1 text-bold">Validade</div>
                <div class="text-subtitle1">{{ vacancyDetails.validate }}</div>
              </div>
              <div>
                <div class="text-body1 text-bold">Numero de vagas</div>
                <div class="text-subtitle1">10 vagas</div>
              </div>
              <div>
                <div class="text-body1 text-bold">Descrição</div>
                <div class="text-subtitle1" v-html="vacancyDetails.description"></div>
              </div>
            </q-card-section>
          </q-card-section>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
import { firestoreDb } from "boot/firebase";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      vacancyDetails: {},
    };
  },
  computed: {
    ...mapGetters("admin", ["vacancy"]),
  },
  methods: {
    getVacancy() {
      const vm = this;
      // console.log(this.vacancy.id);
      if (this.vacancy.id) {
        const ref = firestoreDb.collection("vacancies").doc(this.vacancy.id);

        ref.get().then((doc) => {
          if (doc.exists) {
            vm.vacancyDetails = {
              key: doc.id,
              title: doc.data().title,
              user: doc.data().user,
              description: doc.data().description,
              img: doc.data().img,
              public: doc.data().public,
              place: doc.data().place,
              validate: doc.data().validate,
              category: doc.data().category,
              timeSend: new Date(doc.data().timeSend),
            };
            vm.getUser(doc.data().user);
            // Loading.hide()
          } else {
            console.log("No such document!");
            // Loading.hide()
          }
        });
      }
    },
    getUser(userId) {
      const vm = this;
      let ref = firestoreDb.collection("users").doc(userId);

      ref.get().then((doc) => {
        if (doc.exists) {
          vm.vacancyDetails["user"] = {
            name: doc.data().displayName,
            email: doc.data().email,
            img: doc.data().photoURL,
          };
        }
      });
    },

    // updateAllUsers() {
    //   let ref = firestoreDb.collection("users");
    //   ref.where("profileType", "==", "organization").get().then((docs) => {
    //     docs.forEach((doc) => {
    //       // console.log(doc.data())
    //       var data = doc.data();
    //       data["status"] = "";
    //       firestoreDb.collection("users").doc(doc.id).set(data).then(() => {
    //         console.log("done");
    //       });
    //     });
    //   });
    // },
  },
  mounted() {
    this.getVacancy();
  },
};
</script>

<style>
</style>