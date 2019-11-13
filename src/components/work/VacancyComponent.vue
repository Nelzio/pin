<template>
    <q-item
        class="q-mb-sm text-black"
        :style="appMode.modeName === 'dark' ? 'border: 2px solid white;' : ''"
        :class="[appMode.bgColor]"
        clickable
    >
			<q-item-section avatar top>
				<q-avatar>
					<img :src="vacancy.img">
				</q-avatar>
			</q-item-section>

			<q-item-section>
				<div>
					<q-item-label :class="[appMode.textColorOptional]">
							{{ vacancy.name }}
					</q-item-label>
					<q-item-label :class="[appMode.textColorOptional]" caption lines="4">
							{{ vacancy.desc }}
					</q-item-label>
				</div>
				<div class="row justify-end q-pt-md">
					<div>
						<q-btn
							rounded
							color="white"
							text-color="black"
							label="Detalhes"
							to="/work/details"
						/>
					</div>
					<div>
						<q-btn
							round
							flat
							:color="appMode.modeName === 'dark' ? 'white' : ''"
							icon="volume_up"
						/>
					</div>
				</div>
			</q-item-section>
    </q-item>
</template>

<script>
    import { mapState } from 'vuex'
    export default {
        name: "VacancyComponent",
        props: ['vacancy'],
        computed: {
            ...mapState('settings', [
                'appMode'
            ])
        }
    }
</script>

<style scoped>

</style>