<template>
    <div class="container">
        <div class="row">
            <div class="col-md-12 px-0">
                <form @submit.prevent="uploadImageToAddMember">
                    <div class="row">
                        <div class="col-md-8">

                            <div class="row my-3" v-if="!route.fullPath.includes('/checkin/checkinguardian')">
                                <div class="col-md-3 text-md-right pr-md-0">
                                    <label for="" class="font-weight-700">Role</label>
                                </div>
                                <div class="col-md-9">
                                    <el-select-v2 v-model="role"
                                        :options="roles.map(i => ({ label: i.name, value: i.id }))"
                                        placeholder="Select a role" size="large" class="w-100" />
                                    <!-- <Dropdown :options="roles" v-model="role" optionLabel="name"
                                        placeholder="Select a role" style="width: 100%" /> -->
                                </div>
                            </div>

                            <div class="row my-3">
                                <div class="col-md-3 text-md-right pr-md-0">
                                    <label for="" class="font-weight-700">Firstname<span
                                            class="text-danger">*</span></label>
                                </div>
                                <div class="col-md-9">
                                    <el-input type="text" v-model="person.firstName" placeholder="First Name"
                                        class="w-100" size="large" />
                                </div>
                            </div>

                            <div class="row my-3">
                                <div class="col-md-3 text-md-right pr-md-0">
                                    <label for="" class="font-weight-700">Last Name</label>
                                </div>
                                <div class="col-md-9">
                                    <el-input type="text" v-model="person.lastName" placeholder="Last Name"
                                        class="w-100" size="large" />
                                </div>
                            </div>

                            <div class="row my-3">
                                <div class="col-md-3 text-md-right pr-md-0">
                                    <label for="" class="font-weight-700">Gender</label>
                                </div>
                                <div class="col-md-9">
                                    <el-select-v2 v-model="selectedGender"
                                        :options="gender?.map(i => ({ label: i.value, value: i.id }))"
                                        placeholder="Select gender" size="large" class="w-100" />

                                    <!-- <Dropdown :options="gender.lookUps" optionLabel="value" placeholder="Select gender"
                                        v-model="selectedGender" style="width: 100%" /> -->
                                </div>
                            </div>

                            <div class="row my-3">
                                <div class="col-md-3 text-md-right pr-md-0">
                                    <label for="" class="font-weight-700">Date of birth</label>
                                </div>
                                <div class="col-md-9">
                                    <div class="row">
                                        <div class="col-6 col-md-4">
                                            <!-- <Dropdown :options="['Day', ...birthDaysArr]" v-model="person.dayOfBirth"
                                                placeholder="Day" style="width: 100%" /> -->
                                            <el-select-v2 v-model="person.dayOfBirth"
                                                :options="['Day', ...birthDaysArr].map(i => ({ label: i, value: i }))"
                                                placeholder="Day" size="large" class="w-100" />
                                        </div>
                                        <div class="col-6 col-md-4 p-md-0">
                                            <!-- <Dropdown :options="['Month', ...months]" v-model="person.monthOfBirth"
                                                placeholder="Month" style="width: 100%" /> -->
                                            <el-select-v2 v-model="person.monthOfBirth"
                                                :options="['Month', ...months].map(i => ({ label: i, value: i }))"
                                                placeholder="Month" size="large" class="w-100" />
                                        </div>
                                        <div class="col-12 col-md-4 mt-1 mt-md-0">
                                            <!-- <Dropdown :options="['Year', ...birthYearsArr]" v-model="person.yearOfBirth"
                                                placeholder="Year" style="width: 100%" /> -->
                                            <el-select-v2 v-model="person.yearOfBirth"
                                                :options="['Year', ...birthYearsArr].map(i => ({ label: i, value: i }))"
                                                placeholder="Year" size="large" class="w-100" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- <div class="row my-3">
                                <div class="col-md-3 text-md-right pr-md-0">
                                    <label for="" class="font-weight-700">Group</label>
                                </div>
                                <div class="col-md-9">
                                    <Dropdown :options="[ 'Todler', 'Primaries', 'Teenagers' ]" style="width: 100%" />
                                </div>
                            </div> -->
                        </div>

                        <div class="col-md-4">
                            <ImageForm :editPicture="pictureUrl" @image="setImage" :resetImage="resetImage"
                                :memberDetails="memberDetails" />
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-12 d-flex justify-content-center my-5">
                            <div class="c-pointer text-decoration-none text-dark default-btn text-center border font-weight-bold mx-md-3 mx-2"
                                @click="removeModal">Cancel</div>
                            <el-button class="px-5" size="large" color="#136acd" :loading="loading" native-type="submit"
                                round>Save</el-button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { watchEffect, ref, computed } from "vue"
import axios from "@/gateway/backendapi";
import Dropdown from "primevue/dropdown";
import ImageForm from "../../components/ImageForm";
import { useRoute } from "vue-router"
import { ElNotification } from "element-plus";

export default {
    props: ['familyDetails', 'memberDetails'],
    components: { Dropdown, ImageForm },
    setup(props, { emit }) {
        const route = useRoute()
        const roles = ref([])
        const person = ref({})
        const gender = ref([])
        const dateOfBirth = ref("")
        const role = ref(null)
        const selectedGender = ref(null)
        const pictureUrl = ref("")
        const memberId = ref("")
        const image = ref({})
        const loading = ref(false)
        const resetImage = ref(false)
        const birthDaysArr = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]);
        const months = ref(["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]);


        const birthYearsArr = computed(() => {
            const arrOfYears = [];
            let currentYear = new Date().getFullYear();
            while (arrOfYears.length <= 100) {
                arrOfYears.push(currentYear);
                currentYear = currentYear - 1;
            }
            return arrOfYears;
        });


        const getFamilyRoles = async () => {
            try {
                let { data } = await axios.get('/getfamilyroles')
                roles.value = data
                emit('member-roles', data)
            }
            catch (err) {
                console.log(err)
            }
        }
        getFamilyRoles()

        const getGender = async () => {
            try {
                let { data } = await axios.get('/api/LookUp/GetAllLookUps')
                console.log(data)
                gender.value = data.find(i => i.type === "Gender")?.lookUps

            }
            catch (err) {
                console.log(err)
            } console.log(route.fullPath)
        }
        getGender()

        const uploadImageToAddMember = () => {
            loading.value = true
            if (image.value instanceof File) {
                console.log(image.value)
                let formData = new FormData()
                formData.append("mediaFileImage", image.value)
                axios.post("/api/Media/UploadProfilePicture", formData)
                    .then(res => {
                        console.log(res)
                        pictureUrl.value = res.data.pictureUrl
                        // loading.value = false
                        addMember()
                    })
                    .catch(err => {
                        console.log(err)
                        loading.value = false
                    })
            } else {
                addMember()
            }
        }

        const addMember = async () => {
            const memberDetails = {
                familyId: props.familyDetails.id,
                person: {
                    firstName: person.value.firstName,
                    lastName: person.value.lastName,
                    pictureUrl: pictureUrl.value,
                    dayOfBirth: person.value.dayOfBirth,
                    monthOfBirth: months.value.indexOf(person.value.monthOfBirth) + 1,
                    yearOfBirth: person.value.yearOfBirth,
                    genderId: selectedGender.value
                },
                tenantId: props.familyDetails.tenantID
            }
            if (!route.fullPath.includes('/checkin/checkinguardian')) {
                memberDetails.familyRoleId = role.value
            } else {
                memberDetails.familyRoleId = 6
            }
            console.log(memberDetails)
            console.log(props.memberDetails)
            if (!props.memberDetails || Object.keys(props.memberDetails).length === 0) {
                try {
                    let { data } = await axios.post('/api/Family/addFamilyMember', memberDetails)
                    loading.value = false
                    console.log(data)
                    const member = {
                        firstName: person.value.firstName,
                        lastName: person.value.lastName,
                        pictureUrl: pictureUrl.value,
                        roleId: role.value,
                        personId: data.person.id,
                        genderID: selectedGender.value,
                        id: data.id,
                        dayOfBirth: person.value.dayOfBirth,
                        monthOfBirth: months.value.indexOf(person.value.monthOfBirth) + 1,
                        yearOfBirth: person.value.yearOfBirth
                    }
                    console.log(member)
                    emit("remove-modal")
                    emit("push-to-view", member)
                    resetImage.value = true

                    ElNotification({
                        title: 'Success',
                        message: 'Family member created successfully',
                        type: 'success',
                    })

                    // Re-initialize the variables when upload is successful
                    person.value = {}
                    dateOfBirth.value = {}
                    role.value = null
                    selectedGender.value = null
                    pictureUrl.value = ""
                }
                catch (err) {
                    loading.value = false
                    console.log(err)
                }
            } else {
                delete memberDetails.familyId
                memberDetails.person.id = person.value.personId
                memberDetails.id = memberId.value

                // console.log(m)
                try {
                    let { data } = await axios.put('/api/family/editfamilymember', memberDetails)
                    console.log(data)
                    loading.value = false
                    const member = {
                        firstName: person.value.firstName,
                        lastName: person.value.lastName,
                        pictureUrl: pictureUrl.value,
                        roleId: role.value,
                        personId: person.value.personId,
                        genderID: selectedGender.value,
                        dayOfBirth: person.value.dayOfBirth,
                        monthOfBirth: months.value.indexOf(person.value.monthOfBirth) + 1,
                        yearOfBirth: person.value.yearOfBirth
                    }
                    console.log(member)
                    emit("remove-modal")
                    emit("editted-value", member)

                    ElNotification({
                        title: 'Success',
                        message: 'Family member created successfully',
                        type: 'success',
                    })
                }
                catch (err) {
                    console.log(err)
                    loading.value = false
                }
            }

        }

        const removeModal = () => {
            emit("remove-modal")
        }

        const watchForMember = watchEffect(() => {
            console.log(props.memberDetails)
            if (props.memberDetails && person.value) {
                person.value.firstName = props.memberDetails.person ? props.memberDetails.person.firstName : ""
                person.value.lastName = props.memberDetails.person ? props.memberDetails.person.lastName : ""
                person.value.personId = props.memberDetails.person ? props.memberDetails.person.id : ""
                memberId.value = props.memberDetails ? props.memberDetails.id : ""

                let roleobj = roles.value.find(i => i.id === props.memberDetails.familyRoleID);
                if (roleobj) {
                    role.value = roleobj.id
                    // role.value = {
                    //     label: roleobj.name,
                    //     value: roleobj.id
                    // }
                }


                if (props.memberDetails.person) {
                    const genderobj = gender.value.find(i => i.id === props.memberDetails.person.genderID)
                    if (genderobj) {
                        selectedGender.value = genderobj.id
                    }
                }
                // selectedGender.value = gender.value ? gender.value.find(i => {
                //         if (i.id === props.memberDetails.person.genderID) {
                //             return {
                //                 label: i.value,
                //                 value: i.id
                //             }
                //         }
                //     }
                // }) : null
                pictureUrl.value = props.memberDetails.person && props.memberDetails.person.pictureUrl ? props.memberDetails.person.pictureUrl : ""
                person.value.dayOfBirth = props.memberDetails.person ? props.memberDetails.person.dayOfBirth : "Day"
                person.value.monthOfBirth = props.memberDetails.person ? months.value[props.memberDetails.person.monthOfBirth - 1] : "Month"
                person.value.yearOfBirth = props.memberDetails.person ? props.memberDetails.person.yearOfBirth : "Year"
            }

            console.log(props.memberDetails, 'ehre ')

            // if(props.resetImage) {
            //     pictureUrl.value = props.resetImage
            // }
        })

        const setImage = (payload) => {
            image.value = payload
        }

        return {
            roles,
            person,
            gender,
            dateOfBirth,
            addMember,
            role,
            selectedGender,
            pictureUrl,
            removeModal,
            route,
            watchForMember,
            memberId,
            uploadImageToAddMember,
            setImage,
            image,
            loading,
            resetImage,
            birthDaysArr,
            months,
            birthYearsArr,
        }
    }
}
</script>

<style scoped></style>