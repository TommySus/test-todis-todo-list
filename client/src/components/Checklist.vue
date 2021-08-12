<template>
  <div id="checklist">
    <div id="checklistHeader">
      <p style="font-size:20px;"> <b>&#10003; {{Checklist.name}}</b> </p>
      <div>
        <button id="updateChecklistBtn" @click="renderName" v-b-modal="`modalEditChecklist${Checklist.id}`">Update</button>
        <button id="deleteChecklistBtn" @click="warningDelete">Delete</button>
      </div>
    </div>
    <div id="progressBar" style="margin-top: 10px;">
        <b-progress :max="progress.totalChecklistData" show-progress animated>
        <b-progress-bar :value="progress.totalChecked" :label="`${parseInt((progress.totalChecked / progress.totalChecklistData) * 100)}%`"></b-progress-bar>
        </b-progress>
    </div>
    <button v-b-modal="`modalNewChecklistData${Checklist.id}`" id="addChecklistDataBtn">add an item</button>
    <ChecklistData
    v-for="ChecklistData in sortedArray"
    :key="ChecklistData.id"
    :ChecklistData="ChecklistData"
    ></ChecklistData>

    <!-- modal for add new checklist data -->
    <b-modal @ok="addChecklistData" :id="`modalNewChecklistData${Checklist.id}`" title="Add New Checklist item">
      <b-form>
        <b-form-group
          label="New Checklist item Name"
          label-for="name-input"
          invalid-feedback="Checklist item Name is required"
        >
          <b-form-input
            id="name-input"
            v-model="newChecklistData"
            placeholder="Enter Checklist item Name"
            required
          ></b-form-input>
        </b-form-group>
      </b-form>
    </b-modal>

    <!-- modal for edit checklist -->
    <b-modal @ok="updateChecklist" :id="`modalEditChecklist${Checklist.id}`" title="Edit Checklist">
      <b-form>
        <b-form-group
          label="Edit checklist"
          label-for="name-input"
          invalid-feedback="Checklist Name is required"
        >
          <b-form-input
            id="update-name-input"
            v-model="existingChecklistName"
            placeholder="Enter Checklist Name"
            required
          ></b-form-input>
        </b-form-group>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import ChecklistData from './ChecklistData.vue'
import Swal from 'sweetalert2'

export default {
  name: 'Checklist',
  props: ['Checklist'],
  data () {
    return {
      newChecklistData: '',
      existingChecklistName: this.Checklist.name
    }
  },
  methods: {
    addChecklistData () {
      if (this.newChecklistData) {
        const payload = {
          name: this.newChecklistData,
          ChecklistId: this.Checklist.id
        }
        this.$store.dispatch('createChecklistData', payload)
      } else {
        Swal.fire({
          title: 'Checklist Item name required!',
          icon: 'error',
          confirmButtonText: 'back'
        })
      }
      this.newChecklistData = ''
    },
    renderName () {
      this.existingChecklistName = this.Checklist.name
    },
    updateChecklist () {
      console.log(this.existingChecklistName, '<<<<< nama yang belum update')
      if (this.existingChecklistName.length > 0) {
        const payload = {
          name: this.existingChecklistName,
          id: this.Checklist.id
        }
        this.$store.dispatch('updateChecklist', payload)
      } else {
        Swal.fire({
          title: 'Checklist name required!',
          icon: 'error',
          confirmButtonText: 'back'
        })
      }
      this.existingChecklistName = this.Checklist.name
    },
    warningDelete () {
      Swal.fire({
        title: `Are you want to delete this checklist (${this.Checklist.name})?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.deleteChecklist()
        }
      })
    },
    deleteChecklist () {
      this.$store.dispatch('deleteChecklist', this.Checklist.id)
    }
  },
  components: {
    ChecklistData
  },
  computed: {
    progress () {
      const data = this.Checklist.Checklistdata
      let totalChecklistData = 0
      let totalChecked = 0

      for (let i = 0; i < data.length; i++) {
        totalChecklistData++
        if (data[i].status === 1) {
          totalChecked++
        }
      }
      const result = {
        totalChecked,
        totalChecklistData
      }
      return result
    },
    sortedArray: function () {
      const result = this.Checklist.Checklistdata
      return result.sort((a, b) => a.id - b.id)
    }
  }
}
</script>

<style>
  #checklist{
    margin-top: 20px;
    margin-bottom: 20px;
  }
  #checklistHeader{
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    height: 25px;
  }
  #deleteChecklistBtn {
    border-radius: 3px;
    border: 0;
    outline: none;
    border-radius: 3px;
    opacity: 0.7;
    height: 100%;
  }
  #updateChecklistBtn {
    border-radius: 3px;
    border: 0;
    outline: none;
    border-radius: 3px;
    opacity: 0.7;
    height: 100%;
    margin-right: 10px;
  }
  #deleteChecklistBtn:hover {
    opacity: 1;
    color: white;
    background-color: rgb(255, 0, 0);
  }
  #updateChecklistBtn:hover {
    opacity: 1;
  }
  #addChecklistDataBtn {
    border-radius: 3px;
    border: 0;
    outline: none;
    border-radius: 3px;
    opacity: 0.7;
    margin-top: 10px;
  }
  #addChecklistDataBtn:hover {
    opacity: 1;
  }
</style>
