<template>
  <div class="container-fluid container-wide container-top">
    <!-- Header Area -->
    <div class="row d-flex justify-content-between">
      <div class="family-header">Family</div>
      <el-button data-toggle="modal" data-target="#familyModal" @click="addNewMember" plain round type="primary"
        color="#136acd" size="large">Add Member</el-button>
    </div>
    <div class="modal fade" id="familyModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title header1" id="exampleModalLabel">{{ Object.keys(memberDetails).length > 0 ? 'Update' :
              'Add New' }} Member</h5>
            <div type="button" class="btn-close" data-dismiss="modal" aria-label="close" ref="close"><i
                class="pi pi-times"></i></div>
          </div>
          <div class="modal-body">
            <Memberform :familyDetails="familyDetails" @member-roles="getMemberRoles" @remove-modal="dismissModal"
              @push-to-view="pushToView" :memberDetails="memberDetails" @editted-value="edittedValue"
              :resetImage="resetImage" />
          </div>

        </div>
      </div>
    </div>
    <!--End of Modal -->

    <!-- Table Area -->
    <div class="row mt-5" v-if="familyDetails && familyDetails?.familyMembers?.length > 0">
      <div class="col-12 col-sm-12">
        <div class="row">


          <!-- <div
                class="filter-options"
                :class="{ 'filter-options-shown': filterFormIsVissible }"
                id="ignore1"
                >
                <div class="container-fluid">
                    <div class="row">
                    <div class="col-md-9">
                        <div class="row">
                        <div
                            class="col-12 col-sm-6 col-md-4 offset-sm-3 offset-md-0 form-group inp w-100"
                        >


                            <input
                            type="text"
                            class="input w-100"
                            placeholder="First name"

                            />
                        </div>


                        <div class="col-12 col-md-4 form-group d-none d-md-block">
                            <input
                            type="text"
                            class="input w-100"
                            placeholder="Role"

                            />
                        </div>
                        </div>
                    </div>

                    <div class="col-md-3 d-flex flex-column align-items-center">
                        <button class="apply-btn text-white" @click="applyFilter">
                        Apply
                        </button>
                        <span class="mt-2">
                        <a class="clear-link mr-2" @click="clearAll">Clear all</a>
                        <span class="mx-2"
                            ><i class="fas fa-circle" style="font-size: 4px"></i></span
                        ><a class="hide-link ml-2" @click="hide">Hide</a>
                        </span>
                    </div>
                    </div>
                </div>
                </div> -->

          <div class="container-fluid">
            <div class="row">
              <el-auto-resizer class="border">
                <el-table :data="searchMember" stripe style="width: 100%">
                  <!-- @current-change="handleChange" -->
                  <el-table-column prop="pictureUrl" label="Picture">
                    <template #default="scope">
                      <div style="display: flex; align-items: center">
                        <el-image :src="scope.row.pictureUrl" style="width: 30px; height: 30px; border-radius: 50%;"
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
                      <div @click="editMember(scope.row, scope.$index)" data-toggle="modal" data-target="#familyModal"
                        class="c-pointer">{{ scope.row.firstName }}</div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="lastName" label="Last Name">
                    <template #default="scope">
                      <div @click="editMember(scope.row, scope.$index)" data-toggle="modal" data-target="#familyModal"
                        class="c-pointer">{{ scope.row.lastName }}</div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="familyRoleID" label="Role">
                    <template #default="scope">
                      <div style="display: flex; align-items: center" class="c-pointer"
                        @click="editMember(scope.row, scope.$index)" data-toggle="modal" data-target="#familyModal">
                        {{ getRoleName(scope.row.familyRoleID) }}
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column label="Actions">
                    <template #default="scope">
                      <div class="d-flex flex-column flex-sm-row">
                        <div class="mr-3 mb-2 md-sm-0">
                          <el-button size="small" data-toggle="modal" data-target="#familyModal"
                            @click="editMember(scope.row, scope.$index)">
                            Edit
                          </el-button>
                        </div>
                        <el-button size="small" type="danger" @click="showConfirmModal(scope.row.id, scope.$index)">
                          Delete
                        </el-button>
                      </div>
                    </template>
                  </el-table-column>
                </el-table>
              </el-auto-resizer>
            </div>
          </div>
          <!-- 
                <div class="container-fluid d-none d-md-block">
                    <div class="row t-header">
                    
                        <div class="col-md-1 px-3"></div>
                        <div class="small-text text-capitalize col-md-2 font-weight-bold">PICTURE</div>
                        <div class="small-text text-capitalize col-md-3 font-weight-bold">FIRSTNAME</div>
                        <div class="small-text text-capitalize col-md-3 font-weight-bold">LASTNAME</div>
                        <div class="small-text text-capitalize col-md-2 font-weight-bold">ROLE</div>
                        <div class="small-text text-capitalize col-md-1 font-weight-bold"></div>
                    
                    </div>
                </div>
                <div v-if="searchMember.length > 0">
                    <div class="row row-hover" style="margin:0;" v-for="(item, index) in searchMember" :key="item.id">
                        <div
                        class="col-12 parent-desc py-3 px-0 c-pointer tr-border-bottom  hover"
                        >

                        <div class="row w-100" style="margin:0">
                            <div class="col-md-1 d-flex d-md-block px-3 justify-content-end align-self-center">
                     
                            </div>

                            <div class="col-md-2" style="height: 52px">
                            <p class="mb-0 d-flex justify-content-between">
                                <span class="text-dark font-weight-bold d-flex d-md-none">PICTURE</span>
                                <span class="text-decoration-none">
                                    <img :src="item.person.pictureUrl" class="member-image" v-if="item.person.pictureUrl" />
                      
                                </span>
                            </p>
                            </div>

                            <div class="col-md-3 align-self-center">
                            <div class="d-flex justify-content-between">
                                <span class="text-dark font-weight-bold d-flex d-md-none">FIRSTNAME</span>
                            <div>
                                
                                <div class="desc text-right text-md-left" data-toggle="modal" data-target="#familyModal" @click="editMember(item, index)">{{ item.person.firstName }}</div>
                            </div>
                            </div>
                            </div>

                            <div class="col-md-3 align-self-center">
                            <p class="mb-0 d-flex justify-content-between">
                                <span class="text-dark font-weight-bold d-flex d-md-none">LASTNAME</span>
                                <span data-toggle="modal" data-target="#familyModal" @click="editMember(item, index)">{{ item.person.lastName }}</span>
                            </p>
                            </div>

                            <div class="col-md-2 align-self-center">
                            <p class="mb-0 d-flex justify-content-between">
                                <span class="text-dark font-weight-bold d-flex d-md-none">ROLE</span>
                                <span><span class="c-pointer" data-toggle="modal" data-target="#familyModal" @click="editMember(item, index)"
                                > {{ memberRoles.length > 0 ? memberRoles.find(i => i.id === item.familyRoleID).name : "" }}</span
                            ></span>
                            </p>
                            </div>

                            <div class="col-md-1 align-self-center">
                            <div class="action data action-icon">
                                <div class="dropdown">
                                <i
                                    class="fas fa-ellipsis-v cursor-pointer"
                                    id="dropdownMenuButton"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                ></i>
                                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    
                                    <a class="dropdown-item elipsis-items" data-toggle="modal" data-target="#familyModal" @click="editMember(item, index)">
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
                            </div>
                        </div>
                        </div>
                    </div>
                </div> -->
          <div v-if="searchMember.length === 0">
            <div class="row">
              <div class="col-12 p-2 text-center text-danger">
                No members matches you searched text, trying searching with another text
              </div>
            </div>
          </div>


        </div>
      </div>
    </div>
    <div class="row"
      v-else-if="(familyDetails && familyDetails?.familyMembers?.length === 0 || Object.keys(familyDetails).length === 0) && !loading">
      <div class="col-8 offset-2 col-sm-5 col-md-3 offset-sm-3 offset-md-4 empty-img mt-5 text-center">
        <img src="../../assets/people/people-empty.svg" class="w-100" alt="" />
        <div class="mt-3">You have not added any family members yet</div>
        <div class="default-btn border-0 text-white mt-4 button-add-member c-pointer" data-toggle="modal"
          data-target="#familyModal">Add member</div>
      </div>
    </div>
    <div v-if="familyDetails && familyDetails?.familyMembers?.length > 0" class="row d-flex justify-content-end mt-5">
      <el-button class="button-text" round color="#136acd" size="large" @click="routeToEvent">Register for
        service</el-button>
    </div>

    <div class="text-center mt-5" v-if="loading">
      <ProgressSpinner style="width: 50px" />
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import Memberform from "./FormMember";
import axios from "@/gateway/backendapi";
import ProgressSpinner from 'primevue/progressspinner';
import router from '../../router';
import { Picture as IconPicture } from '@element-plus/icons-vue';
import { ElMessage, ElMessageBox, ElNotification } from 'element-plus';

export default {
  components: { Memberform, ProgressSpinner, IconPicture },
  setup() {
    const showFilterForm = ref(false);
    const searchIsVisible = ref(false);
    const memberRoles = ref([])
    const close = ref("")
    const searchText = ref("")
    const loading = ref(false)
    const memberDetails = ref({})
    const memberToEditIndex = ref(0)
    const familyDetails = ref({})
    const resetImage = ref("")



    const toggleFilterFormVissibility = () =>
      (showFilterForm.value = !showFilterForm.value);
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
        if (res.data) {
          familyDetails.value = res.data
        }
        loading.value = false
      }
      catch (error) {
        console.log(error)
        loading.value = false
      }
    }
    getFamilyMembers()

    const getMemberRoles = (payload) => {
      memberRoles.value = payload
    }

    const deleteMember = async (id, index) => {
      console.log(id)
      if (id) {
        try {
          const res = await axios.delete(`/api/Family/removeAFamilyMember?id=${id}`)
          console.log(res)
          ElNotification({
            title: 'Deleted',
            message: 'Deleted succesfully',
            type: 'success',
          })
          familyDetails.value.familyMembers.splice(index, 1)
        }
        catch (error) {
          console.log(error)
        }
      } else {
        familyDetails.value.familyMembers.splice(index, 1)
        ElNotification({
          title: 'Deleted',
          message: 'Deleted succesfully',
          type: 'success',
        })
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
          deleteMember(id, index);
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: 'Delete canceled',
          })
        })
    };

    const dismissModal = () => {
      close.value.click()
    }

    const pushToView = (payload) => {
      let data = {
        person: {
          firstName: payload.firstName,
          lastName: payload.lastName,
          pictureUrl: payload.pictureUrl,
          genderID: payload.genderID,
          id: payload.personId,
          dayOfBirth: payload.dayOfBirth,
          monthOfBirth: payload.monthOfBirth,
          yearOfBirth: payload.yearOfBirth
        },
        familyRoleID: payload.roleId,
        id: payload.id
      }
      familyDetails.value.familyMembers.push(data)
    }

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

    const editMember = (member, index) => {
      const memberFullDetails = familyDetails.value?.familyMembers?.find(i => i.id === member.id)
      memberDetails.value = memberFullDetails
      memberToEditIndex.value = index

    }

    const edittedValue = (payload) => {
      let edittedData = {
        person: {
          firstName: payload.firstName,
          lastName: payload.lastName,
          pictureUrl: payload.pictureUrl,
          id: payload.personId,
          genderID: payload.genderID,
          dayOfBirth: payload.dayOfBirth,
          monthOfBirth: payload.monthOfBirth,
          yearOfBirth: payload.yearOfBirth
        },
        familyRoleID: payload.roleId
      }
      console.log(edittedData)
      familyDetails.value.familyMembers.splice(memberToEditIndex.value, 1, edittedData)
    }

    const addNewMember = () => {
      memberDetails.value = {}
    }

    const routeToEvent = () => {
      router.push({ name: 'UpcomingEvents' })
    }

    const getRoleName = (roleId) => {
      if (!roleId) return 'Not selected'
      return memberRoles.value.find(i => i.id === roleId)?.name
    }

    const handleChange = (val) => {
      console.log(val)
    }


    return {
      showFilterForm,
      toggleFilterFormVissibility,
      searchIsVisible,
      toggleSearch,
      familyDetails,
      getMemberRoles,
      memberRoles,
      showConfirmModal,
      deleteMember,
      dismissModal,
      close,
      pushToView,
      searchMember,
      searchText,
      loading,
      editMember,
      memberDetails,
      edittedValue,
      memberToEditIndex,
      resetImage,
      addNewMember,
      routeToEvent,
      srcList,
      getRoleName,
      handleChange
      // data,
      // memberList
    };
  },
};
</script>

<style scoped>
.modal-large {
  width: 100%;
  max-width: 680px;
}

.t-header {
  background: #dde2e6 0% 0% no-repeat padding-box;
  font-size: 16px;
  padding: .5rem 0;
}

.button-add-member {
  background: #136acd 0% 0% no-repeat padding-box;
  border-radius: 22px;
}

.family-header {
  font: normal normal 800 29px/46px Nunito Sans;
  letter-spacing: 0px;
  color: #02172e;
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

.header-textarea {
  font: normal normal normal 11px/13px Nunito Sans;
  color: #8898AA;
}

.img-resize {
  width: 2.2rem;
  height: 2.2rem;
}

.img-resize2 {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

/* modal style */
.header1 {
  font: normal normal 800 34px/46px Nunito Sans;
  letter-spacing: 0px;
  color: #02172E;
  opacity: 1;
}

.image1 {
  border-radius: 22px;
  width: 267px;
  height: 336px;
}

.person-img {
  width: 170px;
  height: 174px;
  background: #FFFFFF 0% 0% no-repeat padding-box;
  border: 1px solid #707070;
  border-radius: 20px;
  opacity: 1;
}

.child-pic {
  border: 1px solid black;
  width: 55px;
  height: 55px;
  border-radius: 50%
}

.member-image {
  height: 60px;
  width: 60px;
  border-radius: 50%;
  object-fit: cover;
}

.empty-img {
  font-size: 1.1em
}

.row-hover:hover {
  background: #eee;
  transition: all 0.1s ease-in-out;
}

.error-image {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
</style>