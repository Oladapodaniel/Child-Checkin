<template>
    <div class="container-wide container-top">
        <div class="row mt-5 ">
            <div class="col-6 font-weight-bold">
                <h2 class="font-weight-bold">Guardian</h2>
            </div>
            <div class="col-6  text-right ">
                <el-button data-toggle="modal" data-target="#guardianModal" plain round type="primary" color="#136acd"
                    size="large">Add Guardian</el-button>
            </div>

            <div class="modal fade" id="guardianModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
                aria-hidden="true">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header py-4">
                            <h4 class="modal-title font-weight-bold px-4" id="exampleModalLabel">Add New Guardian</h4>
                            <button type="button" class="close" ref="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true"><i class="pi pi-times"></i></span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <MemberForm :familyDetails="fullDetails" @member-roles="getMemberRoles"
                                @remove-modal="dismissModal" @push-to-view="pushToView" />
                        </div>
                    </div>
                </div>
            </div>

            <!-- guardian table -->
            <div class="col-12 mt-5" v-if="familyDetails && familyDetails?.familyMembers?.length > 0">
                <el-auto-resizer class="border">
                    <el-table :data="searchMember" stripe style="width: 100%">
                        <!-- @current-change="handleChange" -->
                        <el-table-column prop="pictureUrl" label="Picture">
                            <template #default="scope">
                                <div style="display: flex; align-items: center">
                                    <el-image :src="scope.row.pictureUrl"
                                        style="width: 30px; height: 30px; border-radius: 50%;"
                                        :preview-src-list="srcList" :initial-index="scope.$index" hide-on-click-modal>
                                        <template #error>
                                            <div class="image-slot error-image">
                                                <el-icon><icon-picture /></el-icon>
                                            </div>
                                        </template>
                                    </el-image>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="firstName" label="First Name">
                            <template #default="scope">
                                <div class="c-pointer">{{ scope.row.firstName }}</div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="lastName" label="Last Name">
                            <template #default="scope">
                                <div class="c-pointer">{{ scope.row.lastName }}</div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="familyRoleID" label="Role">
                            <template #default="scope">
                                <div style="display: flex; align-items: center" class="c-pointer">
                                    {{ getRoleName(scope.row.familyRoleID) }}
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column label="Actions">
                            <template #default="scope">
                                <el-button size="small" type="danger"
                                    @click="showConfirmModal(scope.row.id, scope.$index)">
                                    Delete
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-auto-resizer>
                <!-- <div class="top-con">
                    <div class="table-top">
                    <div
                                    class="filter col-2"
                                    >
                                <p class="mt-2">
                                    <i class="fa fa-print"></i>
                                    SORT
                                </p>
                                </div>
                                <div class="filter col-2">
                                <p @click="toggleFilterFormVissibility" class="mt-2">
                                    <i class="fas fa-filter"></i>
                                    FILTER
                                </p>
                                </div>
                        <div class="col-2">
                            <p @click="toggleSearch" class="search-text w-100 mt-2">
                                <i class="fa fa-search"></i> SEARCH
                            </p>
                        </div>

                        <div class="search d-flex ml-2">
                            <label class="label-search d-flex" :class="{
                                'show-search': searchIsVisible,
                                'hide-search': !searchIsVisible,
                            }">
                                <input type="text" placeholder="Search..." v-model="searchText" />
                                <span class="empty-btn">x</span>
                                <span class="search-btn">
                                    <i class="fa fa-search"></i>
                                </span>
                            </label>
                        </div>
                    </div>
                </div> -->
                <!-- <div class="filter-options" :class="{ 'filter-options-shown': filterFormIsVissible }" id="ignore1">
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-md-9">
                                <div class="row">
                                    <div class="col-12 col-sm-6 col-md-4 offset-sm-3 offset-md-0 form-group inp w-100">
                                      

                                        <input type="text" class="input w-100" placeholder="Offering" />
                                    </div>


                                    <div class="col-12 col-md-4 form-group d-none d-md-block">
                                        <input type="text" class="input w-100" placeholder="donor" />
                                    </div>
                                </div>
                            </div>

                            <div class="col-md-3 d-flex flex-column align-items-center">
                                <button class="apply-btn text-white" @click="applyFilter">
                                    Apply
                                </button>
                                <span class="mt-2">
                                    <a class="clear-link mr-2" @click="clearAll">Clear all</a>
                                    <span class="mx-2"><i class="fas fa-circle" style="font-size: 4px"></i></span><a
                                        class="hide-link ml-2" @click="hide">Hide</a>
                                </span>
                            </div>
                        </div>
                    </div>
                </div> -->

                <!-- contribution -->
                <!-- <div v-if="searchContribution.length > 0"> -->
                <!-- <div class="container-fluid d-none d-md-block">
                    <div class="row t-header">
       
                        <div class="col-md-1 px-3"></div>
                        <div class="small-text text-capitalize col-md-2 font-weight-bold">PICTURE</div>
                        <div class="small-text text-capitalize col-md-3 font-weight-bold">FIRSTNAME</div>
                        <div class="small-text text-capitalize col-md-3 font-weight-bold">LASTNAME</div>
                        <div class="small-text text-capitalize col-md-3 font-weight-bold">PERMISSION</div>
              
                    </div>
                </div>
                <div class="row" style="margin:0;" v-for="(item, index) in familyDetails.familyMembers" :key="item.id">
                    <div class="col-12 parent-desc py-3 px-0 c-pointer tr-border-bottom  hover">

                        <div class="row align-items-center w-100" style="margin:0">
                            <div class="col-md-1 d-flex d-md-block px-3 justify-content-end">
                         
                            </div>

                            <div class="col-md-2">
                                <p class="mb-0 d-flex justify-content-between">
                                    <span class="text-dark font-weight-bold d-flex d-md-none">PICTURE</span>
                                    <img :src="item.person.pictureUrl" class="member-image"
                                        v-if="item.person.pictureUrl" />
                                </p>
                            </div>

                            <div class="col-md-3">
                                <div class="d-flex justify-content-between">
                                    <span class="text-dark font-weight-bold d-flex d-md-none">FIRSTNAME</span>
                                    <div>
                                        <div class="text-right text-md-left">{{ item.person.firstName }}</div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="d-flex justify-content-between">
                                    <span class="text-dark font-weight-bold d-flex d-md-none">LASTNAME</span>
                                    <div>
                                        <div class="desctext-right text-md-left">{{ item.person.lastName }}</div>
                                    </div>
                                </div>
                            </div>



                            <div class="col-md-2">
                                <p class="mb-0 d-flex justify-content-between">
                                    <span class="text-dark font-weight-bold d-flex d-md-none">PERMISSION</span>
                                    <span><span class=""> Allowed</span></span>
                                </p>
                            </div>

                        <div class="action data action-icon">
                                        <div class="dropdown">
                                        <i
                                            class=" pi pi-trash  cursor-pointer"
                                            id="dropdownMenuButton"
                                            data-toggle="dropdown"
                                            aria-haspopup="true"
                                            aria-expanded="false"
                                        ></i>
                                        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                            <a class="dropdown-item elipsis-items">
                                        Edit
                                        </a>
                                        <a
                                            class="dropdown-item elipsis-items cursor-pointer"
                                            @click="showConfirmModal(item.id, index)"
                                            >Delete</a
                                        >
                                        </div>
                                        </div>
                                    </div>
                                <i class=" pi pi-trash  cursor-pointer" @click="showConfirmModal(item.id, index)"></i>
                            </div>
                        </div>
                    </div>
                </div> -->
            </div>

            <div class="col-8 offset-2 col-sm-5 col-md-3 offset-sm-3 offset-md-4 empty-img mt-5 text-center"
                v-else-if="(familyDetails && familyDetails?.familyMembers?.length === 0 || Object.keys(familyDetails).length === 0) && !loading">
                <img src="../../assets/people/people-empty.svg" class="w-100" alt="" />
                <div class="mt-3">You have not added any guardian yet</div>
                <el-button data-toggle="modal" data-target="#guardianModal" plain round type="primary" color="#136acd"
                    size="large">Add Guardian</el-button>
            </div>
            <div class="col-12 text-center mt-5" v-if="loading">
                <ProgressSpinner style="width: 50px" />
            </div>
            <Toast />
            <ConfirmDialog />
        </div>
    </div>
</template>

<script>
import { computed, ref } from 'vue'
import axios from "@/gateway/backendapi";
import MemberForm from './FormMember'
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import ProgressSpinner from 'primevue/progressspinner';
import { ElMessage, ElMessageBox } from 'element-plus';
export default {
    components: {
        MemberForm,
        ProgressSpinner
    },
    setup() {
        const confirm = useConfirm()
        const toast = useToast()
        const filterFormIsVissible = ref(false);
        const searchIsVisible = ref(false);
        const familyDetails = ref({})
        const memberRoles = ref([])
        const close = ref("")
        const fullDetails = ref({})
        const loading = ref(false)
        const response = ref("")
        const searchText = ref("")


        const toggleFilterFormVissibility = () =>
            (filterFormIsVissible.value = !filterFormIsVissible.value);
        const toggleSearch = () => {
            searchIsVisible.value = !searchIsVisible.value;
        };

        const getFamilyMembers = async () => {
            loading.value = true
            let getBaseAuth = localStorage.getItem('baseAuth')
            let baseAuth = JSON.parse(getBaseAuth)
            try {
                const res = await axios.get(`/api/Family/getfamilybymemberid?personId=${baseAuth.checkinPerson}`)
                console.log(res)
                fullDetails.value = res.data
                getGuardian(res.data.id)
            }
            catch (error) {
                console.log(error)
            }
        }
        getFamilyMembers()

        const getGuardian = async (id) => {

            try {
                const res = await axios.get(`/api/Family/familyGuidians?familyId=${id}`)
                console.log(res)
                if (!res.data.returnObject) {
                    familyDetails.value.familyMembers = []
                } else {
                    familyDetails.value.familyMembers = res.data.returnObject
                }
                loading.value = false
            }
            catch (error) {
                console.log(error)
                loading.value = false
            }

        }

        const getMemberRoles = (payload) => {
            memberRoles.value = payload
        }

        const dismissModal = () => {
            close.value.click()
        }

        const pushToView = (payload) => {
            let data = {
                person: {
                    firstName: payload.firstName,
                    lastName: payload.lastName,
                    pictureUrl: payload.pictureUrl
                },
                familyRoleID: payload.roleId,
                id: payload.id
            }
            familyDetails.value.familyMembers.push(data)
            console.log(data)
        }

        const deleteGuardian = async (id, index) => {
            if (id) {
                try {
                    const res = await axios.delete(`/api/Family/removeAFamilyMember?id=${id}`)
                    console.log(res)
                    toast.add({
                        severity: "success",
                        summary: "Deleted",
                        detail: "Deleted Successfully",
                        life: 3000,
                    });
                    familyDetails.value.familyMembers.splice(index, 1)
                }
                catch (error) {
                    console.log(error)
                }
            } else {
                toast.add({
                    severity: "success",
                    summary: "Deleted",
                    detail: "Deleted Successfully",
                    life: 3000,
                });
                familyDetails.value.familyMembers.splice(index, 1)
            }

        }


        const showConfirmModal = (id, index) => {
            ElMessageBox.confirm(
                'Are you sure you want to proceed?',
                'Confirm delete',
                {
                    confirmButtonText: 'OK',
                    cancelButtonText: 'Cancel',
                    type: 'error',
                }
            )
                .then(() => {
                    deleteGuardian(id, index);
                })
                .catch(() => {
                    ElMessage({
                        type: 'info',
                        message: 'Delete canceled',
                    })
                })
        };


        const searchMember = computed(() => {
            if (!searchText.value && familyDetails.value.familyMembers.length === 0) return familyDetails.value.familyMembers.map(i => ({
                firstName: i.person?.firstName,
                pictureUrl: i.person?.pictureUrl,
                lastName: i.person?.lastName,
                familyRoleID: i.familyRoleID,
                id: i.id
            }))
            return familyDetails.value.familyMembers.filter(i => i.person.firstName.toLowerCase().includes(searchText.value.toLowerCase())).map(i => ({
                firstName: i.person?.firstName,
                pictureUrl: i.person?.pictureUrl,
                lastName: i.person?.lastName,
                familyRoleID: i.familyRoleID,
                id: i.id
            }))
        })

        const srcList = computed(() => {
            if (searchMember.value.length === 0) return []
            return searchMember.value.map(i => i.pictureUrl);
        })

        const getRoleName = (roleId) => {
            if (!roleId) return 'Not selected'
            return memberRoles.value.find(i => i.id === roleId)?.name
        }


        return {
            filterFormIsVissible, toggleFilterFormVissibility, searchIsVisible, toggleSearch, familyDetails, getMemberRoles, memberRoles, dismissModal, close, pushToView, fullDetails, showConfirmModal, deleteGuardian, loading, response, searchMember, srcList, getRoleName
        }
    }
}
</script>

<style scoped>
.dashboard-header {
    font: normal normal 800 29px/46px Nunito Sans;
    letter-spacing: 0px;
    color: #02172E;
}

.register-event {
    background: #136ACD 0% 0% no-repeat padding-box;
    border-radius: 22px;
}

.analytics-text,
.family-text {
    font: normal normal 700 21px/32px Nunito Sans;
    letter-spacing: 0px;
    color: #02172E;
}

.table-top {
    font-weight: 800;
    font-size: 12px;
    display: flex;
    justify-content: flex-end;
}

.table-top label:hover,
.table-top p:hover {
    cursor: pointer;
}

.filter-options {
    height: 0;
    overflow: hidden;
    transition: all 0.5s ease-in-out;
}

.filter-options-shown {
    height: 80px !important;
    overflow: hidden;
    transition: all 0.5s ease-in-out;
}

.t-header {
    background: #dde2e6 0% 0% no-repeat padding-box;
    font-size: 16px;
    padding: .5rem 0;
}

.upcoming-event {
    background: #1369CD 0% 0% no-repeat padding-box;
    border-radius: 20px;
    opacity: 1;
    /* width: 275px; */
}

.member-image {
    height: 60px;
    width: 60px;
    border-radius: 50%;
}
</style>
