<template>
    <div>
        <div class="container-wide container-top">
            <div class="row">
              <div class="col-12 header1">Profile</div>


              <div class=" col-12 col-md-4 imagefolder d-block d-md-none">
                      <div class="grey-bg light-grey-bg mt-5 py-2 image1">
                        <div class="person-img mt-3">
                          <img v-if="url" :src="url" alt="Uploaded Image" />
                          <img
                            v-else-if="!profile.pictureUrl"
                            src="../../assets/people/phone-import.svg"
                            alt="Uploaded Image"
                          />
                          <img v-else :src="profile.pictureUrl" alt="Uploaded Image" />
                        </div>
                        <div>
                          <div class="cs-input">
                            <label for="imgUpload" class="choose-file">
                              Choose file
                              <input
                                type="file"
                                class="input file-input"
                                placeholder=""
                                id="imgUpload"
                                @change="chooseImage"
                              />
                            </label>
                          </div>
                        </div>
                        <div>
                          <button :disabled="disabled" class="cursor-pointer outline-none" :class="{ 'upload-image-disabled' : disabled, 'upload-image' : !disabled }" @click.prevent="uploadImage">
                            Upload
                          </button>
                        </div>
                      </div>

                </div>


                <div class=" col-10 offset-1 offset-md-0 col-md-8 mt-5">
                    <div class="row">
                    
                        <div class="col-12 col-md-3 text-md-right ">
                        <label class="small-text lb font-weight-600" for="">First Name</label>
                        </div>
                        <div class="col-12 col-md-8 form-group">
                        <input type="text" 
                        placeholder="first Name"
                        v-model="profile.firstName"
                        class="form-control ml-0" />
                        </div>
                    </div>
                     <div class="row">
                        <div class="col-12 col-md-3 text-md-right ">
                        <label class="small-text lb font-weight-600" for="">last Name</label>
                        </div>
                        <div class="col-12 col-md-8 form-group ">
                        <input type="text" 
                        placeholder="Last Name"
                        v-model="profile.lastName"
                        class="form-control ml-0" />
                        </div>
                    </div>
                    <div class="row">
                            <div class="col-12 col-md-3 text-md-right">
                            <label class="small-text lb font-weight-600" for="">Phone Number</label>
                            </div>
                            <div class="col-12 col-md-8 form-group">
                            <input type="text"
                            placeholder="Phone Number"
                            v-model="profile.homePhone"
                                class="form-control ml-0"/>
                            </div>
                    </div>
                     <div class="row">
                            <div class="col-12 col-md-3 text-md-right ">
                            <label class="small-text lb font-weight-600" for="">Email</label>
                            </div>
                            <div class="col-12 col-md-8 form-group ">
                            <input type="text"
                            placeholder="Email"
                                class="form-control ml-0"
                                v-model="profile.email" 
                              />
                            </div>
                      </div>
                      <div class="row">
                        <div class="col-12 col-md-3 text-md-right">
                        <label class="small-text lb font-weight-600" for="">Address</label>
                        </div>
                        <div class="col-12 col-md-8 form-group">
                        <input type="text" 
                        placeholder="Address"
                        v-model="profile.homeAddress"
                        class="form-control ml-0" />
                        </div>
                    </div>
                    <div class="row">
                      <div class="col-md-2 offset-1 offset-md-5 mt-5" @click="save">
                          <button class="primary-btn text-white px-5">Save</button>
                      </div>
                    </div>

                </div>
                <div class="d-none d-md-block col-12 col-md-4 mt-5 imagefolder">
                      <div class="grey-bg light-grey-bg image1">
                        <div class="person-img mt-3">
                          <img v-if="url" :src="url" alt="Uploaded Image" />
                          <img
                            v-else-if="!profile.pictureUrl"
                            src="../../assets/people/phone-import.svg"
                            alt="Uploaded Image"
                          />
                          <img v-else :src="profile.pictureUrl" alt="Uploaded Image" />
                        </div>
                        <div>
                          <div class="cs-input">
                            <label for="imgUpload" class="choose-file">
                              Choose file
                              <input
                                type="file"
                                class="input file-input"
                                placeholder=""
                                id="imgUpload"
                                @change="chooseImage"
                              />
                            </label>
                          </div>
                        </div>
                        <div>
                          <button :disabled="disabled" class="cursor-pointer outline-none" :class="{ 'upload-image-disabled' : disabled, 'upload-image' : !disabled }" @click.prevent="uploadImage">
                            Upload
                          </button>
                        </div>
                      </div>

                </div>
            </div>
            <div class="row mt-5 mb-4">
                <div class="col-12 col-md-5">

                </div>
                
                <div class="col-12 col-md-5">

                </div>

            </div>

        </div>

    </div>
</template>

<script>
import { ref } from "vue"
// import router from '../../router';
import axios from "@/gateway/backendapi";
    export default {
        setup(){
          const profile = ref({})
          const selectedRole = ref(null)
          const roles = ref([])
          const url = ref("")
          const image = ref('')
          const disabled = ref(true)
          const familyId = ref("")
          const role = ref("")

          const getFamilyRoles = async () => {
            try {
                let { data } = await axios.get('/getfamilyroles')
                console.log(data)
                roles.value = data.result
            }
            catch (err) {
                console.log(err)
            }
        }
        getFamilyRoles()
          
          const getFamilyMembers = async() => {
            let getBaseAuth = localStorage.getItem('baseAuth')
            let baseAuth = JSON.parse(getBaseAuth)
            try {
                const res = await axios.get(`/api/Family/family?personId=${baseAuth.checkinPerson}`)
                console.log(res)
                familyId.value = res.data.id
                if (res.data.father) {
                  role.value = "father"
                  profile.value = res.data.father
                } else {
                  role.value = "mother"
                  profile.value = res.data.mother
                }
                profile.value.homePhone = res.data.homePhone

            }
            catch (error) {
                console.log(error)
            }
        }
        getFamilyMembers()

        const chooseImage = (e) => {
          console.log(e.target.files[0])
          image.value = e.target.files[0]
          disabled.value = false

        }

          const save = () => {
            console.log(profile.value)
            
            const updateProfile = {
              id: familyId.value,
              familyName: profile.value.lastName,
              address: profile.value.homeAddress,
              email: profile.value.email,
              homePhone: profile.value.homePhone,
            }
            if (role.value === 'father') {
               updateProfile.father = {
                  firstName: profile.value.firstName,
                  lastName: profile.value.lastName,
                  pictureUrl: profile.value.pictureUrl
                }
            } else {
              updateProfile.mother = {
                  firstName: profile.value.firstName,
                  lastName: profile.value.lastName,
                  pictureUrl: profile.value.pictureUrl
                }
            }
            axios.put("/api/Family/editProfile", updateProfile)
            .then(res => {
              console.log(res)
            })
            .catch(err => console.log(err))
            // router.push({ name: 'CheckinDashboard' })
          }

          const uploadImage = () => {
            let formData = new FormData()
            formData.append("mediaFileImage", image.value)
            axios.post("/api/Media/UploadProfilePicture", formData)
            .then(res => {
              console.log(res)
              profile.value.pictureUrl = res.data.pictureUrl
              url.value = URL.createObjectURL(image.value);
            })
            .catch(err => console.log(err))
          }

          return{
            selectedRole,
            roles,
            save,
            profile,
            url,
            chooseImage,
            uploadImage,
            disabled,
            familyId,
            role

          }

        }
        
    }
</script>

<style scoped>
.header1{
font: normal normal 800 34px/46px Nunito Sans;
letter-spacing: 0px;
color: #02172E;
opacity: 1;
}
.image1{
border-radius: 22px;
width: 267px;
height: 336px;
}
.person-img{
width: 170px;
height: 174px;
background: #FFFFFF 0% 0% no-repeat padding-box;
border: 1px solid #707070;
border-radius: 20px;
opacity: 1;
}

.upload-image-disabled {
    padding: 8px 10px;
    background: #dde2e6;
    border-radius: 22px;
    width: 135px;
    border: none;
    outline: none;
    color: #fff;
}

.upload-image {
    background: #136acd;
    cursor: pointer;
    color: #fff;
    padding: 8px 10px;
    border-radius: 22px;
    width: 135px;
    border: none;
    outline: none;
  }

</style>