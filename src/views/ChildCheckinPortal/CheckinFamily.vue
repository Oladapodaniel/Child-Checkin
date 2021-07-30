

<template>
  <div
    class="container-fluid container-wide container-top">
    <!-- Header Area -->
    <div
      class="row d-flex justify-content-between">
      <div class="family-header">Family</div>
      <div
        class="
          button-add-member
          default-btn
          border-0
          text-white
          c-pointer
          modal-dialog-centered
        "
        data-toggle="modal"
        data-target="#familyModal"
        @click="addNewMember"
      >
        Add Member
      </div>
    </div>
    <div
      class="modal fade"
      id="familyModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title header1" id="exampleModalLabel">{{ Object.keys(memberDetails).length > 0 ? 'Update' : 'Add New' }} Member</h5>
            <div
              type="button"
              class="btn-close"
              data-dismiss="modal"
              aria-label="close"
              ref="close"
            ><i class="pi pi-times"></i></div>
          </div>
          <div class="modal-body">
            <Memberform :familyDetails="familyDetails" @member-roles="getMemberRoles" @remove-modal="dismissModal" @push-to-view="pushToView" :memberDetails="memberDetails" @editted-value="edittedValue" :resetImage="resetImage"/>
          </div>

        </div>
      </div>
    </div>
     <!--End of Modal -->

    <!-- Table Area -->
    <div class="row mt-5" v-if="familyDetails ? familyDetails.familyMembers ? familyDetails.familyMembers.length > 0 : '' : ''">
      <div class="col-12 col-sm-12">
        <div class="row">
            <div class="col-12 px-0 mb-0 table">
                <div class="top-con">
                    <div class="table-top">
                        <!-- <div
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
                    </div> -->
                    <div class="col-4">
                    <p @click="toggleSearch" class="search-text w-100 mt-2">
                        <i class="fa fa-search"></i> SEARCH
                    </p>
                    </div>

                    <div class="search d-flex ml-2">
                    <label
                        class="label-search d-flex"
                        :class="{
                        'show-search': searchIsVisible,
                        'hide-search': !searchIsVisible,
                        }"
                    >
                        <input
                        type="text"
                        placeholder="Search..."
                        v-model="searchText"
                        />
                        <span class="empty-btn">x</span>
                        <span class="search-btn">
                        <i class="fa fa-search"></i>
                        </span>
                    </label>
                    </div>
                </div>
                </div>
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


                <div class="container-fluid d-none d-md-block">
                    <div class="row t-header">
                    <!-- <div class="col-12 parent-desc first p-2 pl-4"> -->
                        <div class="col-md-1 px-3"></div>
                        <div class="small-text text-capitalize col-md-2 font-weight-bold">PICTURE</div>
                        <div class="small-text text-capitalize col-md-3 font-weight-bold">FIRSTNAME</div>
                        <div class="small-text text-capitalize col-md-3 font-weight-bold">LASTNAME</div>
                        <div class="small-text text-capitalize col-md-2 font-weight-bold">ROLE</div>
                        <div class="small-text text-capitalize col-md-1 font-weight-bold"></div>
                    <!-- </div> -->
                    </div>
                </div>
                <div v-if="searchMember.length > 0">
                    <div class="row row-hover" style="margin:0;" v-for="(item, index) in searchMember" :key="item.id">
                        <div
                        class="col-12 parent-desc py-3 px-0 c-pointer tr-border-bottom  hover"
                        >

                        <div class="row w-100" style="margin:0">
                            <div class="col-md-1 d-flex d-md-block px-3 justify-content-end align-self-center">
                            <!-- <input
                                type="checkbox"
                                class="form-check"
                            /> -->
                            </div>

                            <div class="col-md-2" style="height: 52px">
                            <p class="mb-0 d-flex justify-content-between">
                                <span class="text-dark font-weight-bold d-flex d-md-none">PICTURE</span>
                                <span class="text-decoration-none">
                                    <img :src="item.person.pictureUrl" class="member-image" v-if="item.person.pictureUrl" />
                                    <!-- <div class="child-pic" v-else></div> -->
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
                                <!-- <i class="pi pi-trash" @click="showConfirmModal(item.id, index)"></i> -->
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
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
    </div>
    <div class="row" v-else-if="familyDetails ? familyDetails.familyMembers ? familyDetails.familyMembers.length === 0 : '' : '' && !loading" >
        <div class="col-8 offset-2 col-sm-5 col-md-3 offset-sm-3 offset-md-4 empty-img mt-5 text-center">
            <img src="../../assets/people/people-empty.svg" class="w-100" alt="" />
            <div class="mt-3">You have not added any family members yet</div>
            <div class="default-btn border-0 text-white mt-4 button-add-member c-pointer" data-toggle="modal" data-target="#familyModal">Add member</div>
        </div>
    </div>
    <div v-if="familyDetails ? familyDetails.familyMembers ? familyDetails.familyMembers.length > 0 : '' : ''" class="row d-flex justify-content-end mt-5">
        <div class="button-add-member default-btn border-0 text-white c-pointer text-center" @click="routeToEvent">
        Register for service
      </div>
    </div>
    
        <div class="text-center mt-5" v-if="loading">
            <ProgressSpinner />
        </div>

    <!--End of Table Area -->
    <ConfirmDialog />
    <Toast />
  </div>
</template>

<script>
import { ref, computed } from "vue";
import Memberform from "./FormMember";
import axios from "@/gateway/backendapi";
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import ProgressSpinner from 'primevue/progressspinner';
import router from '../../router';
export default {
   components: { Memberform, ProgressSpinner },
  setup() {
    const showFilterForm = ref(false);
    const searchIsVisible = ref(false);
    const memberRoles = ref([])
    const confirm = useConfirm();
    const toast = useToast()
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

    const getFamilyMembers = async() => {
            loading.value = true
            let getBaseAuth = localStorage.getItem('baseAuth')
            let baseAuth = JSON.parse(getBaseAuth)
            try {
                const res = await axios.get(`/api/Family/family?personId=${baseAuth.checkinPerson}`)
                console.log(res)
                familyDetails.value = res.data
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

    const deleteMember = async(id, index) => {
      console.log(id)
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
          familyDetails.value.familyMembers.splice(index, 1)
          toast.add({
                  severity: "success",
                  summary: "Deleted",
                  detail: "Deleted Successfully",
                  life: 3000,
              });
        }

    }


    const showConfirmModal = (id, index) => {
        confirm.require({
            message: "Are you sure you want to proceed?",
            header: "Confirmation",
            icon: "pi pi-exclamation-triangle",
            acceptClass: "confirm-delete",
            rejectClass: "cancel-delete",
            accept: () => {
            deleteMember(id, index);
            },
            reject: () => {
            toast.add({
                severity: "info",
                summary: "Discarded",
                detail: "Delete discarded",
                life: 3000,
            });
            },
        });
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
                    id: payload.personId
                },
                familyRoleID: payload.roleId,
                id: payload.id
            }
            familyDetails.value.familyMembers.push(data)
            console.log(data)
        }

        const searchMember = computed(() => {
            if (!searchText.value && familyDetails.value.familyMembers.length === 0) return familyDetails.value.familyMembers
            return familyDetails.value.familyMembers.filter(i => i.person.firstName.toLowerCase().includes(searchText.value.toLowerCase()))
        })

        const editMember = (member, index) => {
          memberDetails.value = member
          memberToEditIndex.value = index

        }

        const edittedValue = (payload) => {
         
       
          let edittedData = {
            person: {
              firstName: payload.firstName,
                    lastName: payload.lastName,
                    pictureUrl: payload.pictureUrl,
                    id: payload.personId,
                    genderID: payload.genderID
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
      routeToEvent
    };
  },
};
</script>

<style scoped>
.modal-large{
  width:100%;
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

.header-textarea{
  font: normal normal normal 11px/13px Nunito Sans;
  color: #8898AA;
}

.img-resize{
  width:2.2rem ;
  height:2.2rem ;
}

.img-resize2{
 width:100%;
  height:100%;
  border-radius: 50%;
}

/* modal style */
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

</style>