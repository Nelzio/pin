<template>
    <q-card class="my-card">
			<q-img src="statics/img/01-11.jpg">
				<div style="padding: 10px; background: transparent;">
					<q-avatar text-color="white">
						<q-img src="statics/app-logo-128x128.png" spinner-color="white" />
					</q-avatar>
				</div>
			</q-img>

			<q-card-section>
					<div class="text-h5">{{ vacancy.title }}</div>
			</q-card-section>

			<q-card-section>
				{{ vacancy.description }}
			</q-card-section>

			<q-card-actions align="right">
				<q-btn
					rounded
					outline
					:color="darkModeConf.colorBtn"
					:text-color="darkModeConf.textBtn"
					label="Detalhes"
					:to="'/work/details/'+vacancy.key"
				/>
				<!-- <q-btn
					round
					outline
					size="sm"
					flat
					:color="appMode.modeName === 'dark' ? 'white' : ''"
					icon="volume_up"
				/> -->
			</q-card-actions>
    </q-card>
</template>

<script>
		import { mapState } from 'vuex'
    export default {
        name: "VacancyDesktopComponent",
				props: ['lorem', 'vacancy'],
        computed: {
            ...mapState('settings', [
								'appMode',
								'darkModeConf'
            ])
        }
    }
</script>

<style scoped>

</style>