<template>
     <div class="container-wide container-top">
     <div class="row d-flex justify-content-center justify-content-sm-between">
            <div class="dashboard-header">Dashboard</div>
       </div>
       <div class="row mt-3 text-center text-sm-left" v-if="familyDetails ? familyDetails.familyMembers ? familyDetails.familyMembers.length === 0 : '' : ''">
           <div class="col-12 welcome-name">Welcome {{ familyDetails && familyDetails.father ? familyDetails.father.firstName : familyDetails && familyDetails.mother ? familyDetails.mother.firstName : "" }} 👋</div> 
           <div class="col-12">To get started with, add your family members to the family.</div>
       </div>
       
       <div class="row mt-3 text-center text-sm-left" v-if="familyDetails ? familyDetails.familyMembers ? familyDetails.familyMembers.length > 0 : '' : ''">
           <div class="col-12 welcome-name">Hey {{ familyDetails && familyDetails.father ? familyDetails.father.firstName : familyDetails && familyDetails.mother ? familyDetails.mother.firstName : "" }}! 🖐</div> 
           <div class="col-12">Now that you have registered your family member, click the register button below to register them for the event</div>
       </div>
        <!-- <div class="row d-flex justify-content-center justify-content-sm-between mt-5" v-if="analyticValue && analyticValue.allRegisteredEvents">
            <div class="analytics-text">Analytics Overview</div>
        </div>
        <div class="row mt-4" v-show="analyticValue && analyticValue.allRegisteredEvents">
            <div class="col-12 card analytic">
                <div class="row align-items-center">
                    <div class="col-12 col-md-5 py-2 pl-4">
               
                        <div v-if="loading" class="text-center col-12">
                            <div class=" mt-5" v-if="loading">
                                <ProgressSpinner />
                            </div>
                        </div>
                        <div v-else>
                            <ByGenderChart
                            domId="source"
                            title="Register"
                            distance="5"
                            :titleMargin="10"
                            :data="analyticData"
                        />
                        </div>
                        
                    </div>
                    <div class="col-8 col-md-3 my-3 py-1 px-2 total-attendant offset-2">
                        <div class="container">
                            <div class="row mt-5">
                                <div class="col-12 attendant-text">Total Event Attended</div>
                                <div class="col-12 attendant-amount">{{ analyticValue.allAttendedEvents }}</div>
                                <div class="col-12 attendant-text mt-3">Total Event Registered</div>
                                <div class="col-12 attendant-amount">{{ analyticValue.allRegisteredEvents }}</div>
                               
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div> -->
        <!-- <div class="row mt-5">
            <div class="col-sm-6">
                <div class="family-text" v-if="familyDetails ? familyDetails.familyMembers ? familyDetails.familyMembers.length > 0 : '' : ''">Family Members</div>
            </div>
            <div class="col-sm-6 text-right">
                <div class="default-btn border-0 bg-primary">
                    Register
                </div>
            </div>
        </div> -->
        <div class="row">
            <!-- <div class="col-12 col-md-8">
                <div class="row">
                    
                    <div class="col-12 px-0 mb-0 table" v-if="familyDetails ? familyDetails.familyMembers ? familyDetails.familyMembers.length > 0 : '' : ''">
                        <div class="top-con">
                            <div class="table-top">
                              
                            <div class="col-2">
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
                            <div class="row" style="margin:0;" v-for="(item, index) in searchMember" :key="item.id">
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
                                        
                                        <div class="desc text-right text-md-left">{{ item.person.firstName }}</div>
                                    </div>
                                    </div>
                                    </div>

                                    <div class="col-md-3 align-self-center">
                                    <p class="mb-0 d-flex justify-content-between">
                                        <span class="text-dark font-weight-bold d-flex d-md-none">LASTNAME</span>
                                        <span>{{ item.person.lastName }}</span>
                                    </p>
                                    </div>

                                    <div class="col-md-2 align-self-center">
                                    <p class="mb-0 d-flex justify-content-between">
                                        <span class="text-dark font-weight-bold d-flex d-md-none">ROLE</span>
                                        <span><span class="c-pointer"
                                        > {{ memberRoles.length > 0 ? memberRoles.find(i => i.id === item.familyRoleID).name : "" }}</span
                                    ></span>
                                    </p>
                                    </div>

                                    <div class="col-md-1 align-self-center">
                                    <div class="action data action-icon">
                                       
                                        <i class="pi pi-trash" @click="showConfirmModal(item.id, index)"></i>
                                    </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>
                        <div v-if="searchMember.length === 0">
                            <div class="row">
                                <div class="col-12 p-4 text-center text-danger">
                                    No members matches your searched text, trying searching with another text
                                </div>
                            </div>
                        </div>
                    </div>-->
                    <div v-if="familyDetails ? familyDetails.familyMembers ? familyDetails.familyMembers.length === 0 : '' : '' && !loading" class="col-10 col-sm-6  p-0 offset-1 offset-sm-3 offset-md-4 col-md-4">
                        <div class=" empty-img my-5 text-center">
                            <img src="../../assets/people/people-empty.svg" class="w-100" alt="" />
                            <div class="mt-3">You have not added any family member yet</div>
                            <router-link to="/checkin/checkinfamily" class="remove-underline"><div class="default-btn border-0 primary-bg text-white mt-2">Go to family to add now</div></router-link>
                        </div>
                    </div>
                    <div v-if="loading" class="text-center col-12">
                        <div class=" mt-5" v-if="loading">
                            <ProgressSpinner />
                        </div>
                    </div>
                <!-- </div> -->
            <!-- </div>  -->
            <div class="col-10 col-sm-6  p-0 offset-1 offset-sm-3 offset-md-4 col-md-4" >
                <div class="upcoming-event table" v-if="upcomingEvent">
                    <div class="remove-decoration" @click="viewUpcomingEventDetails">
                    <div class="container">
                        <div class="row mt-2 p-3 d-flex justify-content-between align-items-center">
                            <!-- <div class="upcoming-text">Upcoming Event</div> -->
                            <div class="col-12 p-0">
                                <img :src="upcomingEvent.eventBanner" v-if="upcomingEvent.eventBanner" class="mt-4 w-100">
                                <div v-else-if="loading" class="text-center col-12">
                                    <div class=" mt-5">
                                        <ProgressSpinner />
                                    </div>
                                </div>
                                <img src="../../assets/checkin-assets/worship-service.jpeg" v-else class="mt-4 w-100">
                            </div>
                            <div class="col-12 mt-4 font-weight-700 text-dark text-center">
                                {{ upcomingEvent.name }}
                            </div>
                            <div class="col-12 upcoming-date text-center"><i class="pi pi-calendar"></i>  {{ formatDate(upcomingEvent.date) }}</div>
                        </div>
                    </div>
                    </div>
                </div>
                <div v-else> 
                    <img src="../../assets/checkin-assets/No-Upcoming-Events.png" class="col-12"/>
                </div>
            </div>
            <div v-if="upcomingEvent" class="col-10 col-sm-6 offset-sm-3 col-md-4 offset-md-4 offset-1 mt-2 default-btn primary-bg text-white border-0 text-center cursor-pointer" @click="viewUpcomingEventDetails">
                Register for service
            </div>
        </div>
    </div>
    <!-- <Toast />
    <ConfirmDialog /> -->
</template>

<script>
import { ref, computed } from 'vue'
// import ColumnChart from "@/components/charts/ColumnChart.vue";
// import { useRoute } from "vue-router"

import axios from "@/gateway/backendapi";
import ProgressSpinner from 'primevue/progressspinner';
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import dateFormatter from '../../services/dates/dateformatter';

import router from '../../router';
export default {
    components: {
        ProgressSpinner
    },
    setup () {
        // const route = useRoute()
        const confirm = useConfirm()
        const toast = useToast()
        const filterFormIsVissible = ref(false);
        const searchIsVisible = ref(false);
        const chartData = ref({ "name": "Attendance", "color": "", "data": [ 175, 220, 75, 31, 151, 7, 540 ] })
        const series = ref([ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29 ])
        const attendanceSeries = ref([1, 2, 3, 4, 5, 6, 7])
        const familyDetails = ref({})
        const searchText = ref("")
        const memberRoles = ref([])
        const loading = ref(false)
        const upcomingEvent = ref({})
        const analyticData = ref([])
        const analyticValue = ref({})

        const toggleFilterFormVissibility = () =>
        (filterFormIsVissible.value = !filterFormIsVissible.value);
        const toggleSearch = () => {
        searchIsVisible.value = !searchIsVisible.value;
        };


        const getFamilyRoles = async () => {
            try {
                    let { data } = await axios.get('/getfamilyroles')
                    console.log(data)
                    memberRoles.value = data.result
                }
                catch (err) {
                    console.log(err)
                }
            }
            getFamilyRoles()

        const getFamilyMembers = async() => {
            loading.value = true
            let getBaseAuth = localStorage.getItem('baseAuth')
            let baseAuth = JSON.parse(getBaseAuth)
            console.log(baseAuth)
            try {
                const res = await axios.get(`/api/Family/family?personId=${baseAuth.checkinPerson}`)
                familyDetails.value = res.data
                getAttendanceAnalytics(res.data.id)
                console.log(res.data)
                console.log(familyDetails.value.familyMembers)
                loading.value = false

            }
            catch (error) {
                console.log(error)
                loading.value = false
            }
        }
        getFamilyMembers()

        const deleteMember = async(id, index) => {
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

        const searchMember = computed(() => {
            if (!searchText.value && familyDetails.value && familyDetails.value.familyMembers && familyDetails.value.familyMembers.length === 0) return familyDetails.value.familyMembers
            return familyDetails.value ? familyDetails.value.familyMembers ? familyDetails.value.familyMembers.filter(i => i.person.firstName.toLowerCase().includes(searchText.value.toLowerCase())) : "" : ""
        })


        const getUpcomingEvents = () => {
            loading.value = true
            axios.get('/api/CheckInAttendance/upcomingCheckinEvents')
                .then(res => {
                    console.log(res)
                    upcomingEvent.value = res.data[0]
                    loading.value = false
                })
                .catch(err => {
                    console.log(err)
                    loading.value = false
                })
        }
        getUpcomingEvents()

        const formatDate = (date) => {
            return dateFormatter.monthDayYear(date)
        }

        const getAttendanceAnalytics = (id) => {
            axios.get(`/api/CheckInAttendance/FamilyAttendanceRecord?familyId=${id}`)
                .then(res => {
                    console.log(res)
                    analyticData.value = [ { name: 'Present', y: res.data.returnObject.allRegisteredEvents - res.data.returnObject.totalAbsent }, { name: 'Absent', y: res.data.returnObject.totalAbsent } ]

                    analyticValue.value = res.data.returnObject
                })
                .catch(err => {
                    console.log(err)
                })
        }

        const viewUpcomingEventDetails = () => {
            localStorage.setItem("event_register", JSON.stringify(upcomingEvent.value))
            router.push({ name: 'CheckinEvent', params: { eventId: upcomingEvent.value.activityID } })
        }


        return {
            filterFormIsVissible, toggleFilterFormVissibility, searchIsVisible, toggleSearch, chartData, series, attendanceSeries, familyDetails, searchText, memberRoles, searchMember, loading, showConfirmModal, deleteMember, upcomingEvent, formatDate, analyticData, analyticValue, viewUpcomingEventDetails
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

.analytics-text, .family-text {
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
    background: #dde2e6bb 0% 0% no-repeat padding-box;
    border-radius: 20px;
    opacity: 1;
}

.upcoming-text {
    font: normal normal bold 16px/27px Nunito Sans;
    letter-spacing: 0px;
    color: #050505;
}

.upcoming-date {
    font: normal normal 600 12px/12px Nunito Sans;
    letter-spacing: 0px;
    color: #000000;
}

.total-attendant {
    background: #EEFDFD 0% 0% no-repeat padding-box;
    border: 1px solid #F2E8FF;
    border-radius: 10px;
    /* margin: 30px; */
}

.attendant-text {
    font: normal normal bold 17px/16px Nunito Sans;
letter-spacing: 0px;
color: #020E1C; 
}

.attendant-amount {
    font: normal normal bold 53px/54px Nunito Sans;
    letter-spacing: 0px;
    color: #020E1C;
    margin-top: 15px
}

.card.analytic {
    box-shadow: 0px 3px 6px #2c28281c;
    border-radius: 30px;
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

.remove-decoration:hover {
    text-decoration: none
}
.remove-underline:hover {
    text-decoration: none
}

.welcome-name {
    font: normal normal 800 19px/46px Nunito Sans
}
</style>