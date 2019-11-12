<template>
    <div class="">
        <q-list>

            <q-item-label header>Modo da app:</q-item-label>

            <q-item tag="label" v-ripple>
                <q-item-section>
                    <q-item-label>Light Mode</q-item-label>
                </q-item-section>
                <q-item-section side >
                    <q-radio v-model="localSettings.mode" checked-icon="check" val="light" />
                </q-item-section>
            </q-item>

            <q-item tag="label" v-ripple>
                <q-item-section>
                    <q-item-label>Dark Mode</q-item-label>
                    <!--<q-item-label caption>Allow notification</q-item-label>-->
                </q-item-section>
                <q-item-section side top>
                    <q-radio v-model="localSettings.mode" checked-icon="check" val="dark" />
                </q-item-section>
            </q-item>

        </q-list>

        <q-separator />

        <q-list item="inset">

            <q-item-label header>Som de navegação:</q-item-label>

            <q-item tag="label" v-ripple>
                <q-item-section>
                    <q-item-label>Narrar as páginas</q-item-label>
                </q-item-section>
                <q-item-section side >
                    <q-toggle
                        v-model="localSettings.isNarratorActive"
                    />
                </q-item-section>
            </q-item>

        </q-list>

        <div class="q-pa-md">
            <q-btn
               label="Actualizar"
               color="primary"
               dense
               rounded
               @click="setSettings (localSettings)"
               class="full-width relative-position float-right q-mt-xl"
            />
        </div>
    </div>
</template>

<script>
    import { mapActions, mapState, mapGetters } from 'vuex'
    export default {
        name: "PageSettings",
        data () {
            return {
                localSettings: {} //Veja a estrutura desse objecto no state do /store/store-modules/settings-module.js
            }
        },
        computed: {
            ...mapState('settings', [
                'settings'
            ]),
            // ...mapGetters('settings', [
            //     'getSettings'
            // ]),
        },
        mounted () {
            this.$root.$emit('isHomePage', 'Preferências')
            this.localSettings = this.settings //recuperando as configurações do state/store

            if (this.settings.isNarratorActive) {
                this.playSound('/statics/audios/configs.aac')
            }
        },
        methods: {
            ...mapActions ('settings', ['setSettings', 'playSound'])
        },
    }
</script>

<style scoped>

</style>