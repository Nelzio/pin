<template>
  <div>
    <div class="row justify-center">
      <q-card
        class="my-card col-12"
        style="background: radial-gradient(circle, #f5ffff 0%, #dbffff 100%)"
      >
        <q-card-section>
          <q-card-section horizontal>
            <q-card-section v-if="vacancy.user" class="col-3 flex flex-center">
              <q-card class="my-card text-center">
                <!-- <q-icon name="person" color="black" size="100px" /> -->

                <q-img :src="vacancy.user.img" spinner-color="white" style="max-width: 120px" />
                <q-card-section class="text-h5">
                  {{ vacancy.user.name }}
                  <div class="text-body1">{{ vacancy.user.email }}</div>
                </q-card-section>
              </q-card>
            </q-card-section>
            <q-card-section>
              <div>
                <div class="text-body1 text-bold">Título</div>
                <div class="text-subtitle1">{{ vacancy.title }}</div>
              </div>
              <div>
                <div class="text-body1 text-bold">Validade</div>
                <div class="text-subtitle1">{{ vacancy.validate }}</div>
              </div>
              <div>
                <div class="text-body1 text-bold">Numero de vagas</div>
                <div class="text-subtitle1">10 vagas</div>
              </div>
              <div>
                <div class="text-body1 text-bold">Descrição</div>
                <div class="text-subtitle1" v-html="vacancy.description"></div>
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
      vacancy: {},
    };
  },
  computed: {
    ...mapGetters("admin", ["vacancyId"]),
  },
  methods: {
    getVacancy() {
      const vm = this;
      // console.log(this.vacancyId);
      if (this.vacancyId) {
        const ref = firestoreDb.collection("vacancies").doc(this.vacancyId);

        ref.get().then((doc) => {
          if (doc.exists) {
            vm.vacancy = {
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
          vm.vacancy["user"] = {
            name: doc.data().displayName,
            email: doc.data().email,
            img: doc.data().photoURL,
          };
        }
      });
    },

    // updateAllUsers() {
    //   let ref = firestoreDb.collection("vacancies");

    //   ref.get().then((docs) => {
    //     docs.forEach((doc) => {
    //       var updateRef = firestoreDb
    //         .collection("vacancies")
    //         .doc(doc.id)
    //         .collection("candidates");
    //       updateRef.get().then((docs2) => {
    //         docs2.forEach((doc2) => {
    //           var data = {
    //             id: doc2.data().id,
    //             address: doc2.data().adress,
    //             date: doc2.data().date,
    //             description: doc2.data().description,
    //             displayName: doc2.data().displayName,
    //             education: doc2.data().education,
    //             email: doc2.data().email,
    //             phoneNumber: doc2.data().phoneNumber,
    //             photoURL: doc2.data().photoURL,
    //             profileType: doc2.data().profileType,
    //             profession: doc2.data().profission,
    //             association: "",
    //             status: "",
    //             evaluators: [],
    //           };
    //           console.log(doc2.data().id);
    //           console.log(doc2.data());
    //           var update2Ref = updateRef.doc(doc2.id);
    //           update2Ref.set(data).then(() => {
    //             console.log("done");
    //           });
    //         });
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