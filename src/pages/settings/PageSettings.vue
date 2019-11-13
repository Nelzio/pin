<template>
    <div
        class=""
        v-touch-swipe.mouse="handleSwipe"
        :class="[appMode.textColorOptional, appMode.bgColor]"
    >
        <!-- <q-list>

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
                </q-item-section>
                <q-item-section side top>
                    <q-radio
                       v-model="localSettings.mode"
                       checked-icon="check"
                       val="dark"
                    />
                </q-item-section>
            </q-item>

        </q-list> -->

        <q-separator />

        <!-- <q-list item="inset">

            <q-item-label header>Som e vibração:</q-item-label>

            <q-item tag="label" v-ripple>
                <q-item-section>
                    <q-item-label>Narrar as telas</q-item-label>
                </q-item-section>
                <q-item-section side >
                    <q-toggle
                        v-model="localSettings.isNarratorActive"
                    />
                </q-item-section>
            </q-item>
            <q-item tag="label" v-ripple>
                <q-item-section>
                    <q-item-label>Vibrar ao abrir tela</q-item-label>
                </q-item-section>
                <q-item-section side >
                    <q-toggle
                        v-model="localSettings.isVibrationActive"
                    />
                </q-item-section>
            </q-item>

        </q-list> -->

        <q-separator />

        <!-- <q-list item="inset">

            <q-item-label header>Tamanho de letras e cores:</q-item-label>

            <q-item tag="label" v-ripple>
                <q-item-section>
                    <q-item-label>Tamanho de fonte</q-item-label>
                </q-item-section>
                <q-item-section>

                    <q-range
                        v-model="snap"
                        :min="0"
                        :max="20"
                        :step="2"
                        label
                        snap
                    />
                </q-item-section>
            </q-item>

        </q-list> -->

        <q-list>
					<q-item>
						<q-item-section avatar>
							<q-icon color="blue-9" name="highlight" />
						</q-item-section>

						<q-item-section>
							<q-item-label class="text-h6">Modo claro</q-item-label>
						</q-item-section>

						<q-item-section side>
							<q-toggle
								v-model="localSettings.mode"
							/>
						</q-item-section>
					</q-item>

					<q-separator spaced inset="item" />

					<q-item>
						<q-item-section avatar>
							<q-icon color="blue-9" name="volume_up" />
						</q-item-section>

						<q-item-section>
							<q-item-label class="text-h6">Naração das telas</q-item-label>
						</q-item-section>

						<q-item-section side>
							<q-toggle
								v-model="localSettings.isNarratorActive"
							/>
						</q-item-section>
					</q-item>

					<q-separator spaced inset="item" />

					<q-item>
						<q-item-section avatar>
							<q-icon color="blue-9" name="vibration" />
						</q-item-section>

						<q-item-section>
							<q-item-label class="text-h6">Vibrador</q-item-label>
						</q-item-section>

						<q-item-section side>
							<q-toggle
								v-model="localSettings.isVibrationActive"
							/>
						</q-item-section>
					</q-item>
					

					<q-item>
						<q-item-section avatar>
							<q-icon color="blue-9" name="format_size" />
						</q-item-section>

						<q-item-section>
							<!-- <q-item-label class="text-h6">Tamanho do texto</q-item-label> -->
							<q-select v-model="model" :options="fontText" label="Tamanho de texto" />
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
						fontText: [
							'Pequeno', 'Medio', 'Grande',
						],
						snap: {
							min: 2,
							max: 12
						},
						localSettings: {} //Veja a estrutura desse objecto no state do /store/store-modules/settings-module.js
					}
        },
        computed: {
            ...mapState('settings', [
                'settings', 'appMode'
            ]),

            // ...mapGetters('settings', [
            //     'getSettings'
            // ]),
        },
        mounted () {
            this.$root.$emit('isHomePage', 'Preferências')
            this.localSettings = this.settings //recuperando as configurações do state/store


            // Vibração
            if (this.settings.isVibrationActive) {
                this.vibrate ()
            }
            // Play do áudio
            if (this.settings.isNarratorActive) {
                this.playSound('/statics/audios/configs.aac')
            }
        },
        methods: {
            ...mapActions ('settings', ['setSettings', 'playSound', 'vibrate']),

            handleSwipe (val) {
                if (val.direction === 'right') {
                    this.$router.push('/store')
                }
            }
        },
        watch: {
            snap (val) {
                console.log('Fonte: ', val)
            }
        }
    }
</script>

<style scoped>

</style>