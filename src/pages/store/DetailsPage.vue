<template>
  <q-page padding>
    <!-- content -->
    <q-carousel
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
    </q-carousel>

    <div class="row no-wrap items-center">
          <div class="col text-h6 ellipsis">Sandalias de Cabdal</div>
      </div>

      <div class="row no-wrap items-center q-gutter-md q-pa-md">
          <div class="col-auto">
            <q-btn class="shadow-4" color="primary" label="Comprar" />
              <!-- <q-btn class="shadow-4" color="red" flat round icon="favorite" /> -->
              <!-- <q-btn class="shadow-4" color="blue" flat round icon="share" /> -->
          </div>
          <!-- <div class="col-auto text-grey">
              <q-icon color="blue-8" name="share" /> 14
              <q-icon color="red" name="favorite" /> 65
          </div> -->
      </div>

      <q-list>
        <q-item>
        <q-item-section avatar top>
            <q-icon color="blue-9" name="attach_money" />
        </q-item-section>
            <q-item-section>
            <q-item-label class="text-h5">
                2500 mt
            </q-item-label>
            </q-item-section>
        </q-item>

        <q-separator spaced inset="item" />

        <q-item>
        <q-item-section avatar top>
            <q-icon color="blue-9" name="place" />
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
        

        <q-item>
        <q-item-section top avatar>
            <q-icon color="blue-9" name="description" />
        </q-item-section>

        <q-item-section>
            <q-item-label class="text-h6">Descrição</q-item-label>
            <q-item-label>
            Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.
            </q-item-label>
        </q-item-section>
        </q-item>
      </q-list>
      <q-toolbar class="bg-white text-black">
        <q-toolbar-title>Comentarios</q-toolbar-title>
      </q-toolbar>
      <q-list>
        <q-item>
          <q-item-section avatar style="padding-top: 0; justify-content: left;">
            <q-avatar style="top: 0; padding-top: 0;">
            <img src="data:image/jpeg;base64,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">
            <q-badge color="red " floating style="height: 13px; width: 13px; border-radius: 13px;" />
            </q-avatar>
          </q-item-section>
          <q-item-section>
          <q-item-label>Nelzio Sitoe</q-item-label>
          <q-item-label lines="5" class="text-body2 text-grey-9">Como vai o curso?</q-item-label>
          <q-item-label lines="1">
            <div class="row">
              <div class="col-6"><q-btn flat rounded color="blue-9" label="Responder" class="text-caption" style="padding: 0;"/></div>
              <div class="col-6"><q-btn flat rounded color="blue-9" label="Avaliar" class="text-caption" style="padding: 0;"/></div>
            </div>
          </q-item-label>
          </q-item-section>

          <q-item-section side top>
          <q-item-label caption>5 min ago</q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section avatar style="padding-top: 0; justify-content: left;">
            <q-avatar style="top: 0; padding-top: 0;">
            <img src="https://www.explicador.co.mz/images/uploads/users/avatars/80x80/UMKHbxB23qUykgtaGziiof4w8ghMLwJj.png">
            <q-badge color="green " floating style="height: 13px; width: 13px; border-radius: 13px;" />
            </q-avatar>
          </q-item-section>
          <q-item-section>
          <q-item-label>José Seie</q-item-label>
          <q-item-label lines="5" class="text-body2 text-grey-9">O curso já iniciou??</q-item-label>
          <q-item-label lines="1">
            <div class="row">
              <div class="col-6"><q-btn flat rounded color="blue-9" label="Responder" class="text-caption" style="padding: 0;"/></div>
              <div class="col-6"><q-btn flat rounded color="blue-9" label="Avaliar" class="text-caption" style="padding: 0;"/></div>
            </div>
          </q-item-label>
          </q-item-section>

          <q-item-section side top>
            <q-item-label caption>9 min ago</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
  </q-page>
</template>

<script>
export default {
  // name: 'PageName',
  data () {
    return {
      slide: 1,
      fullscreen: false
    }
  }
}
</script>
