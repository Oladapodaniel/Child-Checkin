<template>
    <div class="container topper py-2">
        <div class="row">
            <div class="col-md-12">
                <div class="row">
                    <div class="col-6 offset-3 col-md-10 offset-md-1 upl-img-box border" style="border: 2px solid red;">
                        <img v-if="url" class="w-100" :src="url" alt="Uploaded Image" />
                          <img
                            v-else-if="!pictureUrl"
                            src="../assets/people/phone-import.svg"
                            alt="Uploaded Image"
                            class="w-100"
                          />
                          <img v-else :src="pictureUrl" class="w-100" alt="Uploaded Image" />
                    </div>
                </div>
            </div>

            <div class="col-md-12">
                <div class="row">
                    <div class="col-md-10 offset-1">
                        <div>
                            <div class="cs-input">
                                <label for="imgUpload" class="choose-file">
                                Choose Picture
                                <input
                                    type="file"
                                    class="input file-input"
                                    placeholder=""
                                    id="imgUpload"
                                    @change="imageSelected"
                                />
                                </label>
                            </div>
                        </div>
                        <div>
                          <!-- <button :disabled="false" class="cursor-pointer outline-none" :class="{ 'upload-image-disabled' : disabled, 'upload-image' : !disabled }" @click.prevent="uploadImage">
                              <i class="pi pi-spin pi-spinner" v-if="loading"></i>
                            Upload
                          </button> -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { onUpdated, ref } from 'vue'
// import axios from "@/gateway/backendapi"
    export default {
        props: ['editPicture', 'resetImage', 'memberDetails'],
        setup (props, { emit }) {
            // const disabled =ref(true)
            const pictureUrl = ref("")
            const url = ref("")
            const image = ref({})
            const loading = ref(false)


            const imageSelected = (e) => {
                image.value = e.target.files[0]
                // disabled.value = false
                url.value = URL.createObjectURL(image.value);
                emit("image", image.value)
            }

            // const uploadImage = () => {
            //     loading.value = true
            //     let formData = new FormData()
            //     formData.append("mediaFileImage", image.value)

            //     axios.post("/api/Media/UploadProfilePicture", formData)
            //     .then(res => {
            //         loading.value = false
            //     console.log(res)
            //     pictureUrl.value = res.data.pictureUrl
            //     // url.value = URL.createObjectURL(image.value);

            //     emit("picture-url", pictureUrl.value)
            //     })
            //     .catch(err => {
            //         loading.value = false
            //         console.log(err)
            //     })
            // }

            onUpdated(() => {
                if (props.editPicture) {
                    pictureUrl.value = props.editPicture
                    console.log('getting picture')
                }   else {
                    console.log('Not getting')
                    pictureUrl.value = ""
                }
                // console.log(props.memberDetails, 'hereeee')
                if ((!props.memberDetails || Object.keys(props.memberDetails).length === 0) && (url.value || pictureUrl.value)) {
                    pictureUrl.value = ""
                    // url.value = ""
                }

                if (props.resetImage) {
                    url.value = ""
                }
            })

            // onUpdated(() => {
            //     if(!props.resetImage && pictureUrl.value) {
            //         pictureUrl.value = props.resetImage
            //         console.log('here111')
            //     }
                // if (!props.resetImage && url.value) {
                //     url.value = props.resetImage
                //     console.log('here222')
                // }
                // console.log(props.resetImage, 'reset hereee')
            // })

            return {
                // disabled,
                imageSelected,
                // uploadImage,
                pictureUrl,
                url,
                image,
                loading
            }
        }
    }
</script>

<style scoped>
    .topper {
        background: #797e810d;
        border-radius: 15px;
    }

    .upl-img-box {
        /* width: 90px;
        height: 150px; */
        border-radius: 22px;
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