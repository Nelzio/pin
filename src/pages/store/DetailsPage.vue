<template>
  <q-page padding>
    <!-- content -->
    <div class="row justify-center">
      <div class="col-12 col-md-8">
        <!-- <q-carousel
          swipeable
          animated
          arrows
          v-model="slide"
          :fullscreen.sync="fullscreen"
          infinite
        >
          <q-carousel-slide style="height: 100%;" :name="1" img-src="https://cdn.awsli.com.br/600x1000/60/60876/produto/28035638/9e1cebfb32.jpg" />
          <q-carousel-slide style="height: 100%;" :name="2" img-src="https://cdn.awsli.com.br/600x1000/60/60876/produto/15390286/9dbae6d9ec.jpg" />
          <q-carousel-slide style="height: 100%;" :name="3" img-src="https://i.pinimg.com/originals/73/84/48/738448f1c8692dcaa07dca48dea7b56f.jpg" />
          <q-carousel-slide style="height: 100%;" :name="4" img-src="hhttps://i.pinimg.com/originals/e4/b2/40/e4b2409f614fc82df06ee71ec5bd8efb.jpg" />

          <template v-slot:control>
            <q-carousel-control
              position="bottom-right"
              :offset="[18, 18]"
            >
              <q-btn
                push round dense color="white" text-color="primary"
                :icon="fullscreen ? 'fullscreen_exit' : 'fullscreen'"
                @click="fullscreen = !fullscreen"
              />
            </q-carousel-control>
          </template>
        </q-carousel> -->

        <q-tab-panels
          v-model="panelPics"
          animated
          swipeable
          infinite
          class="rounded-borders"
        >
          <q-tab-panel v-for="i in 4" :key="i" :name="''+i" style="padding: 0;">
            <q-card class="my-card">
              <img src="https://cdn.awsli.com.br/600x1000/60/60876/produto/28035638/9e1cebfb32.jpg" alt="">
            </q-card>
          </q-tab-panel>
        </q-tab-panels>

        <div class="row no-wrap items-center">
          <div class="col text-h6 ellipsis">Sandalias de Cabdal</div>
        </div>

        <q-list>
          <q-item>
          <q-item-section avatar top>
              <q-icon name="attach_money" />
          </q-item-section>
              <q-item-section>
              <q-item-label class="text-h5">
                  {{totalVal}} mt
              </q-item-label>
              </q-item-section>
          </q-item>

          <q-separator spaced inset="item" />

          <q-item>
            <q-item-section avatar top>
                <q-icon name="place" />
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-h6">
                Local de entrega
              </q-item-label>
              <q-item-label class="text-body2">
                  Maputo
              </q-item-label>
              <q-item-label class="text-body2">
                  Bairro Laulane
              </q-item-label>
              <q-item-label class="text-body2">
                  Rua 10, Q 14, casa 65
              </q-item-label>
              <q-item-label class="text-body2">
                Associacao
              </q-item-label>
            </q-item-section>
          </q-item>

          <q-separator spaced inset="item" />

          <q-item class="text-left">
            <q-item-section top avatar>
              <q-icon name="phone" />
            </q-item-section>

            <q-item-section>
              <q-item-label class="text-h6">Telefone</q-item-label>
              <q-item-label>+258 84 122 4724</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator spaced inset="item" />
          

          <q-item>
          <q-item-section top avatar>
              <q-icon name="description" />
          </q-item-section>

          <q-item-section>
              <q-item-label class="text-h6">Descrição</q-item-label>
              <q-item-label>
              Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.
              </q-item-label>
          </q-item-section>
          </q-item>
        </q-list>
      </div>
    </div>

    <!-- <q-dialog v-model="mPesa" persistent transition-show="flip-down" transition-hide="flip-up"> 
      <q-card>
        <q-card-section>
          <div class="text-h6">Pagamento de {{totalVal}} Mt pelo numero: </div>
        </q-card-section>
        <q-card-section>
            <q-form @submit="onSubmit" >
            <q-input filled v-model="number" label="Numero de telefone *"
              mask="#########"
              lazy-rules
              :rules="[ val => val && val.length == 9 || 'O contacto de ter 9 digitos' ]"
            />
            </q-form>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat icon="img:https://steemitimages.com/DQmSJbmzrztcczth6CToWeDWPAF61XChY87AZSSkkpzgUiA/image.png" label="Pagar" color="red" @click="onSubmit" />
          <q-btn flat label="Cancelar" color="grey" @click="mPesa = false, alert = true, onReset()" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="sucessPay">
      <q-card class="bg-green">
        <q-card-section>
        <div class="text-h6">Confinação</div>
        </q-card-section>
        <q-card-section>
        Pagamento de {{totalVal}} feito com sucesso
        </q-card-section>
        <q-card-actions align="right">
        <q-btn flat label="OK" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog> -->
    

  </q-page>
</template>

<script>
import axios from 'axios'
import { QSpinnerRings, QSpinnerRadio } from 'quasar'
export default {
  // name: 'PageName',
  data () {
    return {
      panelPics: '1',
      slide: 1,
      number: null,
      sucessPay: false,
      confim: false,
      mPesa: false,
      totalVal: 2,
      fullscreen: false
    }
  },
  methods: {
    payment () {
      let vm = this
      this.totalVal = 0
      // console.log(this.selected)
      this.gridCol = 'col-12'
      if(this.selected.length > 1){
        this.gridCol = 'col-6'
      }
      this.selected.forEach(element => {
        this.totalVal += element.value
      });
      this.alert = true
    },
    onSubmit () {
      console.log("Ola")
      // let vm = this
      // const url_c2b = 'https://mpesa-wsdk.herokuapp.com/api/c2b/'
      // const api_key = 'wyi2qfh5fw270e3ytlykda4250pwouas' //exemplo, coloque a tua Api Key
      // const public_key = 'MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAmptSWqV7cGUUJJhUBxsMLonux24u+FoTlrb+4Kgc6092JIszmI1QUoMohaDDXSVueXx6IXwYGsjjWY32HGXj1iQhkALXfObJ4DqXn5h6E8y5/xQYNAyd5bpN5Z8r892B6toGzZQVB7qtebH4apDjmvTi5FGZVjVYxalyyQkj4uQbbRQjgCkubSi45Xl4CGtLqZztsKssWz3mcKncgTnq3DHGYYEYiKq0xIj100LGbnvNz20Sgqmw/cH+Bua4GJsWYLEqf/h/yiMgiBbxFxsnwZl0im5vXDlwKPw+QnO2fscDhxZFAwV06bgG0oEoWm9FnjMsfvwm0rUNYFlZ+TOtCEhmhtFp+Tsx9jPCuOd5h2emGdSKD8A6jtwhNa7oQ8RtLEEqwAn44orENa1ibOkxMiiiFpmmJkwgZPOG/zMCjXIrrhDWTDUOZaPx/lEQoInJoE2i43VN/HTGCCw8dKQAwg0jsEXau5ixD0GUothqvuX3B9taoeoFAIvUPEq35YulprMM7ThdKodSHvhnwKG82dCsodRwY428kg2xM/UjiTENog4B6zzZfPhMxFlOSFX4MnrqkAS+8Jamhy1GgoHkEMrsT5+/ofjCx0HjKbT5NuA2V/lmzgJLl3jIERadLzuTYnKGWxVJcGLkWXlEPYLbiaKzbJb2sYxt+Kt5OxQqC1MCAwEAAQ==' //exemplo, coloque a public Api Key
      // let data = {
      //   api_key: api_key, 
      //   public_key: public_key,
      //   amount: this.totalVal, // valor da tranzacao
      //   msidsn: this.number
      // }
      // /* This is for Codepen (using UMD) to work */
      // const spinner = typeof QSpinnerRings !== 'undefined'
      //   ? QSpinnerRings // Non-UMD, imported above
      //   : Quasar.components.QSpinnerRings // eslint-disable-line
      // /* End of Codepen workaround */
      // this.$q.loading.show({
      //   spinner,
      //   spinnerColor: 'teal',
      //   spinnerSize: 340,
      //   backgroundColor: 'blue-3',
      //   message: 'Pagamento sendo processo...',
      //   messageColor: 'white'
      // })
      // // const request = Mixin.methods.client_rest(this.$store.state.tokenLog);
      // axios.post(url_c2b, data)
      // .then(function (response) {
      //   console.log(response);
      // })
      // .catch(function (error) {
      //   console.log(error);
      //   vm.$q.loading.hide()
      //   vm.mPesa = false
      //   vm.onReset()
      //   vm.sucessPay = false
      //   vm.confim = true
      // });

      // /* This is for Codepen (using UMD) to work */
      const spinner = typeof QSpinnerRings !== 'undefined'
        ? QSpinnerRings // Non-UMD, imported above
        : Quasar.components.QSpinnerRings // eslint-disable-line
      // /* End of Codepen workaround */

      this.$q.loading.show({
        spinner,
        spinnerColor: 'teal',
        spinnerSize: 340,
        backgroundColor: 'blue-3',
        message: 'Pagamento sendo processo...',
        messageColor: 'white'
      })

      // this.$q.loading.show({
      //   delay: 400 // ms
      // })

      let vm = this
      const url_c2b = 'https://mpesa-wsdk.herokuapp.com/api/c2b/'
      const api_key = 'wyi2qfh5fw270e3ytlykda4250pwouas' //exemplo, coloque a tua Api Key
      const public_key = 'MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAmptSWqV7cGUUJJhUBxsMLonux24u+FoTlrb+4Kgc6092JIszmI1QUoMohaDDXSVueXx6IXwYGsjjWY32HGXj1iQhkALXfObJ4DqXn5h6E8y5/xQYNAyd5bpN5Z8r892B6toGzZQVB7qtebH4apDjmvTi5FGZVjVYxalyyQkj4uQbbRQjgCkubSi45Xl4CGtLqZztsKssWz3mcKncgTnq3DHGYYEYiKq0xIj100LGbnvNz20Sgqmw/cH+Bua4GJsWYLEqf/h/yiMgiBbxFxsnwZl0im5vXDlwKPw+QnO2fscDhxZFAwV06bgG0oEoWm9FnjMsfvwm0rUNYFlZ+TOtCEhmhtFp+Tsx9jPCuOd5h2emGdSKD8A6jtwhNa7oQ8RtLEEqwAn44orENa1ibOkxMiiiFpmmJkwgZPOG/zMCjXIrrhDWTDUOZaPx/lEQoInJoE2i43VN/HTGCCw8dKQAwg0jsEXau5ixD0GUothqvuX3B9taoeoFAIvUPEq35YulprMM7ThdKodSHvhnwKG82dCsodRwY428kg2xM/UjiTENog4B6zzZfPhMxFlOSFX4MnrqkAS+8Jamhy1GgoHkEMrsT5+/ofjCx0HjKbT5NuA2V/lmzgJLl3jIERadLzuTYnKGWxVJcGLkWXlEPYLbiaKzbJb2sYxt+Kt5OxQqC1MCAwEAAQ==' //exemplo, coloque a public Api Key
      

      let data = {
        api_key: api_key, 
        public_key: public_key,
        amount: this.totalVal, // valor da tranzacao
        msidsn: this.number
      }

      axios.post(url_c2b, data)
      .then(function (response) {
        console.log(response);
        vm.$q.loading.hide()
        vm.mPesa = false,
        vm.sucessPay = true
      })
      .catch(function (error) {
        console.log(error);
        vm.$q.loading.hide()
        vm.mPesa = false
        vm.onReset()
        vm.sucessPay = false
        vm.confim = true
      });
    },
    onReset () {
      this.number = ''
    },
  }
}
</script>
