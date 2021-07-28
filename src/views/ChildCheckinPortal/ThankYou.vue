<template>
    <div class="container-fluid container-top">
        <div class="row">
            <!-- <img src="../../assets/checkin-assets/falling_stars.gif" class="col-12 col-md-4"/> -->
            <div class="col-4">
                <img src="../../assets/checkin-assets/clapping_hands.gif" class="w-100"/>
            </div>
            <div class="col-8 align-self-center">
                <img src="../../assets/checkin-assets/congrats.jpeg" class="w-100"/>
            </div>
            
             
        </div>
        <div class="row">
            <div class="col-12 text-center">
                <div>You have successfully registered your family members for this event!</div>
                <div class="mt-3"><span class="nb">NB:</span> <span>Keep this code, it is what will be used to check you in.</span></div>
                <div class="col-6 offset-3 stylish-text border rounded mt-3">{{ code }}</div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
export default {
    setup () {
        const route = useRoute()
        const code = ref(route.params.code)



        return {
            code
        }
    }
}
</script>

<style>
.nb {
    font-size: 0.9em;
    font-weight: 700
}

.stylish-text {
    font-size: 3em;
    font-weight: 700;
}
</style>