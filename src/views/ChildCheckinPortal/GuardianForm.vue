<template>
    <div class="container">
       <div class="row">
           <div class="col-md-12 px-0">
               <form action="">
                    <div class="row">
                        <div class="col-md-8">
                            <div class="row my-3">
                                <div class="col-md-3 text-md-right pr-md-0">
                                    <label for="" class="font-weight-700">Firstname<span class="text-danger">*</span></label>
                                </div>
                                <div class="col-md-9">
                                    <input type="text" class="form-control">
                                </div>
                            </div>

                            <div class="row my-3">
                                <div class="col-md-3 text-md-right pr-md-0">
                                    <label for="" class="font-weight-700">Surname</label>
                                </div>
                                <div class="col-md-9">
                                    <input type="text" class="form-control">
                                </div>
                            </div>

                            <div class="row my-3">
                                <div class="col-md-3 text-md-right pr-md-0">
                                    <label for="" class="font-weight-700">Gender</label>
                                </div>
                                <div class="col-md-9">
                                    <Dropdown :options="['Female', 'Male' ]" style="width: 100%" />
                                </div>
                            </div>

                            <div class="row my-3">
                                <div class="col-md-3 text-md-right pr-md-0">
                                    <label for="" class="font-weight-700">Age</label>
                                </div>
                                <div class="col-md-9">
                                    <input type="text" class="form-control">
                                </div>
                            </div>
                             <div class="row my-3">
                                <div class="col-md-3 text-md-right pr-md-0">
                                    <label for="" class="font-weight-700">Permission</label>
                                </div>
                                <div class="col-md-9">
                                    <Dropdown :options="[ 'Allowed','Denied','Allowed' ]" style="width: 100%" />
                                </div>
                            </div>
                        </div>

                        <div class="col-md-4">
                            <ImageForm />
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-12 d-flex justify-content-center my-5">
                            <router-link class="text-decoration-none text-dark default-btn text-center border font-weight-bold mx-md-3 mx-2" to="">Cancel</router-link>
                            <button class="default-btn text-white border-0 primary-bg font-weight-bold mx-md-3 mx-2">Save</button>
                        </div>
                    </div>
               </form>
           </div>
       </div>
    </div>
</template>

<script>
import Dropdown from "primevue/dropdown";
import ImageForm from "../../components/ImageForm";

export default {
    components: { Dropdown, ImageForm },
    setup () {
        

        return {}
    }
}
</script>

<style scoped>

</style>