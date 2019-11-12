<template>
    <q-item class="q-mb-sm" clickable>
        <q-item-section avatar top>
            <q-avatar>
                <img :src="vacancy.img">
            </q-avatar>
        </q-item-section>

        <q-item-section>
            <div>
                <q-item-label>{{ vacancy.name }}</q-item-label>
                <q-item-label caption lines="4">{{ vacancy.desc }}</q-item-label>
            </div>
            <div class="row justify-end q-pt-md">
                <div>
                    <q-btn rounded color="white" text-color="black" label="Detalhes" to="/work/details" />
                </div>
                <div>
                    <q-btn
                            round
                            flat
                            icon="volume_up"
                    />
                </div>
            </div>
        </q-item-section>

    </q-item>
</template>

<script>
    export default {
        name: "VacancyComponent",
        props: ['vacancy']
    }
</script>

<style scoped>

</style>