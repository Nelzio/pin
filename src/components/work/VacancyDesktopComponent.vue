<template>
    <q-card class="my-card">
        <q-img src="https://cdn.quasar.dev/img/mountains.jpg">
            <div style="padding: 10px; background: transparent;">
                <q-avatar text-color="white">
                    <q-img src="https://explicador.co.mz/images/explicador%20logo.png" spinner-color="white" />
                </q-avatar>
            </div>

        </q-img>

        <q-card-section>
            <div class="text-h5">Vaga de contabilista</div>
        </q-card-section>

        <q-card-section>
            {{ lorem }}
        </q-card-section>

        <q-card-actions>
            <q-btn flat round color="teal" icon="pan_tool" />
            <q-btn flat round color="teal" icon="thumb_up" />
            <q-btn flat round color="teal" icon="share" />
            <q-btn flat round color="teal" icon="more_horiz" to="/work/details" />

        </q-card-actions>
    </q-card>
</template>

<script>
    export default {
        name: "VacancyDesktopComponent",
        props: ['lorem']
    }
</script>

<style scoped>

</style>