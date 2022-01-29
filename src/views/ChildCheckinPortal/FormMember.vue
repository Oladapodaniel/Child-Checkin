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
                                    <Dropdown :options="roles" v-model="role" optionLabel="name" placeholder="Select a role" style="width: 100%" />
                                </div>
                            </div>

                            <div class="row my-3">
                                <div class="col-md-3 text-md-right pr-md-0">
                                    <label for="" class="font-weight-700">Firstname<span class="text-danger">*</span></label>
                                </div>
                                <div class="col-md-9">
                                    <input type="text" v-model="person.firstName" placeholder="First Name" class="form-control">
                                </div>
                            </div>

                            <div class="row my-3">
                                <div class="col-md-3 text-md-right pr-md-0">
                                    <label for="" class="font-weight-700">Last Name</label>
                                </div>
                                <div class="col-md-9">
                                    <input type="text" v-model="person.lastName" placeholder="Last Name" class="form-control">
                                </div>
                            </div>

                            <div class="row my-3">
                                <div class="col-md-3 text-md-right pr-md-0">
                                    <label for="" class="font-weight-700">Gender</label>
                                </div>
                                <div class="col-md-9">
                                    <Dropdown :options="gender.lookUps" optionLabel="value" placeholder="Select gender" v-model="selectedGender" style="width: 100%" />
                                </div>
                            </div>

                            <div class="row my-3">
                                <div class="col-md-3 text-md-right pr-md-0">
                                    <label for="" class="font-weight-700">Date of birth</label>
                                </div>
                                <div class="col-md-9">
                                    <div class="row">
                                        <div class="col-6 col-md-4">
                                            <Dropdown :options="['Day', ...birthDaysArr ]" v-model="person.dayOfBirth" placeholder="Day" style="width: 100%" />
                                        </div>
                                        <div class="col-6 col-md-4 p-md-0">
                                            <Dropdown :options="['Month', ...months]" v-model="person.monthOfBirth" placeholder="Month" style="width: 100%" />
                                        </div>
                                        <div class="col-12 col-md-4 mt-1 mt-md-0">
                                            <Dropdown :options="['Year', ...birthYearsArr]" v-model="person.yearOfBirth" placeholder="Year" style="width: 100%" />
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
                            <ImageForm :editPicture="pictureUrl" @image="setImage" :resetImage="resetImage" :memberDetails="memberDetails"/>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-12 d-flex justify-content-center my-5">
                            <div class="c-pointer text-decoration-none text-dark default-btn text-center border font-weight-bold mx-md-3 mx-2" @click="removeModal">Cancel</div>
                            <button class="default-btn text-white border-0 primary-bg font-weight-bold mx-md-3 mx-2"><i class="pi pi-spin pi-spinner text-white" v-if="loading"></i>&nbsp;Save</button>
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

export default {
    props: ['familyDetails', 'memberDetails'],
    components: { Dropdown, ImageForm },
    setup (props, { emit }) {
        const route = useRoute()
        const roles = ref([])
        const person = ref({})
        const gender = ref({})
        const dateOfBirth = ref("")
        const role = ref({})
        const selectedGender = ref({})
        const pictureUrl = ref("")
        const memberId = ref("")
        const image = ref({})
        const loading = ref(false)
        const resetImage = ref(false)
        const birthDaysArr = ref([ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31 ]);
        const months = ref([ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ]);


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
            console.log(data)
            roles.value = data.result
            emit('member-roles', data.result)
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
                gender.value = data.find(i => i.type === "Gender")
    
            }
            catch (err) {
                console.log(err)
            } console.log(route.fullPath)
    }
    getGender()

    const uploadImageToAddMember = () => {
        if (image.value instanceof File) {
                    loading.value = true
                    console.log(image.value)
                    let formData = new FormData()
                    formData.append("mediaFileImage", image.value)
                    axios.post("/api/Media/UploadProfilePicture", formData)
                    .then(res => {
                        console.log(res)
                        pictureUrl.value = res.data.pictureUrl
                        loading.value = false
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

    const addMember = async() => {
        const memberDetails = {
            familyId: props.familyDetails.id,
                person: {
                    firstName: person.value.firstName,
                    lastName: person.value.lastName,
                    pictureUrl: pictureUrl.value,
                    dayOfBirth: person.value.dayOfBirth,
                    monthOfBirth: months.value.indexOf(person.value.monthOfBirth) + 1,
                    yearOfBirth: person.value.yearOfBirth,
                    genderId: selectedGender.value.id
                },
                tenantId: props.familyDetails.tenantID
            }
            if (!route.fullPath.includes('/checkin/checkinguardian')) {
                memberDetails.familyRoleId = role.value.id
            }   else {
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
                    roleId: role.value.id,
                    personId: data.person.id,
                    genderID: selectedGender.value.id,
                    id: data.id
                }
                console.log(member)
                emit("remove-modal")
                emit("push-to-view", member)
                resetImage.value = true

                // Re-initialize the variables when upload is successful
                person.value = {}
                dateOfBirth.value = {}
                role.value = {}
                selectedGender.value = {}
                pictureUrl.value = ""
            }
            catch (err) {
                loading.value = false
                console.log(err)
            }
        }   else {
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
                    roleId: role.value.id,
                    personId: person.value.personId,
                    genderID: selectedGender.value.id
                }
                console.log(member)
                emit("remove-modal")
                emit("editted-value", member)
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
        if(props.memberDetails && person.value) {
            person.value.firstName = props.memberDetails.person ? props.memberDetails.person.firstName : ""
            person.value.lastName = props.memberDetails.person ? props.memberDetails.person.lastName : ""
            person.value.personId = props.memberDetails.person ? props.memberDetails.person.id : ""
            memberId.value = props.memberDetails ? props.memberDetails.id : ""
            role.value = roles.value ? roles.value.find(i => i.id === props.memberDetails.familyRoleID) : {}
            selectedGender.value = gender.value ? gender.value.lookUps ? gender.value.lookUps.find(i => {
                if (props.memberDetails.person) return i.id === props.memberDetails.person.genderID
            }) : {} : {}
            pictureUrl.value = props.memberDetails.person && props.memberDetails.person.pictureUrl ? props.memberDetails.person.pictureUrl : ""
            person.value.dayOfBirth = props.memberDetails.person ? props.memberDetails.person.dayOfBirth : "Day"
            person.value.monthOfBirth = props.memberDetails.person ? months.value[props.memberDetails.person.monthOfBirth - 1] : "Month"
            person.value.yearOfBirth = props.memberDetails.person ? props.memberDetails.person.yearOfBirth : "Year"
        }

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
        birthYearsArr
    }
    }
}
</script>

<style scoped>

</style>