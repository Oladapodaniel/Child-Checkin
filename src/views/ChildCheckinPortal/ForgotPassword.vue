<template>
    <div class="container-wide container-top">
        <div class="row">
            <div class="col-12 col-sm-6 offset-sm-3 event-header">Forgot Password?</div>
            <div class="col-12 col-sm-6 offset-sm-3 ">
                Enter your email or phone number for you to retrieve or reset your password.
            </div>
            <div class="col-12 col-sm-6 offset-sm-3 mt-4 form-group">
                <label class="font-weight-bold ">Email / Phone Number</label>
                <input type="text" class=" form-control all-input " v-model="phoneNumber" placeholder="Enter email / phone number">
                <div class="default-btn btn border-0 text-white mt-3" :class="{ 'primary-bg' : !changeColorBtn, 'bg-secondary' : changeColorBtn }" @click="retrieveFamily"><i class="pi pi-spin pi-spinner text-white" v-if="retrieveLoading"></i> Retrieve Password</div>
            </div>
            <div class="col-12 col-sm-6 offset-sm-3 mt-2 form-group" v-if="showPassword">
                <label class="font-weight-bold ">Password</label>
                <input type="text" class=" form-control all-input " v-model="password" placeholder="Enter password">
                <div class="default-btn btn border-0 text-white primary-bg mt-3" @click="resetPassword"><i class="pi pi-spin pi-spinner text-white" v-if="resetLoading"></i> Reset Password</div>
                <div class="font-weight-700 mt-3" @click="goBack">👈 Back to login</div>
            </div>
        </div>
    </div>
    <Toast />    
</template>

<script>
import { ref } from 'vue'
import axios from "@/gateway/backendapi";
import { useToast } from "primevue/usetoast";
import router from '../../router';
export default {
    setup () {
        const phoneNumber = ref("")
        const password = ref("")
        const toast = useToast()
        const resetBody = ref({})
        const showPassword = ref(false)
        const resetDetail = ref({})
        const retrieveLoading = ref(false)
        const resetLoading = ref(false)
        const changeColorBtn = ref(false)


        const retrieveFamily = async() => {
            if (phoneNumber.value.includes('@')) {
                resetBody.value = {
                    email: phoneNumber.value
                }
            }   else {
                resetBody.value = {
                    phoneNumber: phoneNumber.value
                }
            }
            retrieveLoading.value = true
            try {
                const res = await axios.post(`/familyRetrivePassword`, resetBody.value)
                console.log(res)
                retrieveLoading.value = false
                if (res.data.response.toLowerCase().includes('no family registered')) {
                    toast.add({
                        severity: "info",
                        summary: "Incorrect input",
                        detail: res.data.response,
                        life: 4000,
                    });
                        showPassword.value = false
                }   else if (res.data.response.toLowerCase().includes("password reset required")) {
                    toast.add({
                        severity: "info",
                        summary: "Reset your password",
                        detail: res.data.response,
                        life: 4000,
                    });
                    showPassword.value = true
                    password.value = ""
                }   else if (res.data.response.toLowerCase().includes("successful")) {
                    toast.add({
                        severity: "success",
                        summary: "Password retrieved",
                        detail: "Your password has been retrieved",
                        life: 4000,
                    });
                    password.value = res.data.returnObject.password
                    showPassword.value = true
                    changeColorBtn.value = true
                }
                // 08167927876
            }
            catch (err) {
                console.log(err)
                retrieveLoading.value = false
            }
        }
        
        
        const resetPassword = async() => {
            
            if (phoneNumber.value.includes('@')) {
                resetDetail.value = {
                    email: phoneNumber.value,
                    password: password.value
                }
            }   else {
                resetDetail.value = {
                    phoneNumber: phoneNumber.value,
                    password: password.value
                }
            }
            resetLoading.value = true
            try {
                const res = await axios.post(`/familyResetPassword`, resetDetail.value)
                console.log(res)
                resetLoading.value = false
                if (res.data.response.toLowerCase().includes('success')) {
                    toast.add({
                        severity: "success",
                        summary: "Confirmed",
                        detail: 'Password reset succesful',
                        life: 4000,
                    });
                }   
                // 08167927876
            }
            catch (err) {
                console.log(err)
                resetLoading.value = false
            }
        }

        const goBack = () => {
            router.go(-1)
        }

        // /familyRetrivePassword
        // /familyResetPassword
        return {
            retrieveFamily,
            phoneNumber,
            password,
            resetBody,
            showPassword,
            resetPassword,
            resetDetail,
            retrieveLoading,
            resetLoading,
            goBack,
            changeColorBtn
        }
    }
}
</script>

<style scoped>
.event-header {
    font: normal normal 800 29px/46px Nunito Sans;
    letter-spacing: 0px;
    color: #02172E;
}
</style>