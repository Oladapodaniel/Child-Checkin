<template>
    <div class="container-fluid background">
        <div class="row">
            <div class="col-8 offset-1 container-top">
                <img :src="churchLogo" v-if="churchLogo" class="w-100"/>
                <!-- <img src="../../assets/churchplus-logo.png" v-else class="w-100"/> -->
                
                
            </div>
            <div class="col-10 offset-1 menu-links">
                <router-link to="/checkin">
                <div class="row" :class="{ 'active' : route.fullPath.includes('checkin'), 'style-font' : !route.fullPath.includes('checkin') }" @click="closeNav">
                    <div class="col-2">
                        <img src="../../assets/checkin-assets/dashboard.svg" >
                    </div>
                    <div class="col-10">Dashboard</div>
                </div>
                </router-link>

                <router-link :to="{ name: 'CheckinProfile' }">
                <div class="row push-down" :class="{ 'active' : route.fullPath.includes('profile'), 'style-font' : !route.fullPath.includes('profile') }" @click="closeNav">
                    <div class="col-2">
                        <img src="../../assets/checkin-assets/Icon-ionic-ios-person.svg" >
                    </div>
                    <div class="col-10">Profile</div>
                </div>
                </router-link>

                <router-link to="/checkin/checkinfamily">
                    <div class="row push-down" :class="{ 'active' : route.fullPath.includes('family'), 'style-font' : !route.fullPath.includes('family') }" @click="closeNav">
                        <div class="col-2">
                            <img src="../../assets/checkin-assets/family-silhouette.svg" >
                        </div>
                        <div class="col-10">Family</div>
                    </div>
                </router-link>
                <router-link :to="{ name: 'Guardian' }">
                <div class="row push-down" :class="{ 'active' : route.fullPath.includes('guardian'), 'style-font' : !route.fullPath.includes('guardian') }" @click="closeNav">
                    <div class="col-2">
                        <img src="../../assets/checkin-assets/Group-16991.svg" >
                    </div>
                    <div class="col-10">Guardian</div>
                </div>
                </router-link>
                
                <router-link :to="{ name: 'UpcomingEvents' }">
                <div class="row push-down" :class="{ 'active' : route.fullPath.includes('checkin-event'), 'style-font' : !route.fullPath.includes('checkin-event') }" @click="closeNav">
                    <div class="col-2">
                        <img src="../../assets/checkin-assets/Group-157.svg" >
                    </div>
                    <div class="col-10">Events</div>
                </div>
                </router-link>

                <router-link :to="{ name: 'CheckinSignin', params: { tenantId: tenantID } }">
                <div class="row push-down" @click="logOut">
                    <div class="col-2">
                        <img src="../../assets/checkin-assets/Group-157.svg" >
                    </div>
                    <div class="col-10">Logout</div>
                </div>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import { useRoute }  from "vue-router"
import { ref } from "vue"
import axios from "@/gateway/backendapi";
export default {
    setup (props, { emit }) {
        const route = useRoute()
        const churchLogo = ref("")
        const tenantID = ref("")    

        const getChurchProfile = async() => {
            let getTenantId = localStorage.getItem('baseAuth')
            let tenantId = JSON.parse(getTenantId)
            tenantID.value = tenantId.tenantId
            try {
                let res = await axios.get(`/GetChurchProfileById?tenantId=${tenantId.tenantId}`)
                console.log(res)
                churchLogo.value = res.data.returnObject.logo
            }
            catch (err) {
                console.log(err)
            }
        }
        getChurchProfile()

        const closeNav = () => {
            emit('close-nav', false)
        }

        const logOut = () => {
            localStorage.clear()
        }
        return {
            route,
            churchLogo,
            closeNav,
            tenantID,
            logOut
        }
    }
}
</script>

<style scoped>
.background {
    background: #EBEFF4 0% 0% no-repeat padding-box;
    height: 100vh;
}

.style-font {
    font: normal normal normal 18px/24px Nunito Sans;
    letter-spacing: 0px;
    color: #020E1C;
    opacity: 0.5;
}

.active {
    font: normal normal normal 18px/24px Nunito Sans;
    letter-spacing: 0px;
    color: #2E67CE;
    opacity: 1;
}

.menu-links {
    margin-top: 45px;
}

.push-down {
    margin-top: 30px;
}
</style>