<template>
  <div id="listChecklistData">
     <b-form-checkbox
      id="name"
      name="checkbox"
      :value="setValue"
      checked="true"
      @click.native.prevent="updateStatus"
    >
      <a v-if="setValue" style="margin-left: 10px; text-decoration: line-through;">{{ChecklistData.name}}</a>
      <a v-if="!setValue" style="margin-left: 10px;">{{ChecklistData.name}}</a>
    </b-form-checkbox>
    <div>
      <button @click="renderName" style="margin-right: 10px;" id="checklistDataUpdateBtn" v-b-modal="`modalEditChecklistData${ChecklistData.id}`">update</button>
      <button @click="warningDelete" id="checklistDataBtn">delete</button>
    </div>

    <!-- modal for edit checklist data-->
    <b-modal @ok="updateChecklistDataName" :id="`modalEditChecklistData${ChecklistData.id}`" title="Edit Checklist Item">
      <b-form>
        <b-form-group
          label="Edit checklist"
          label-for="name-input"
          invalid-feedback="Checklist Item Name is required"
        >
          <b-form-input
            id="update-name-input"
            v-model="existingChecklistDataName"
            placeholder="Enter Checklist Item Name"
            required
          ></b-form-input>
        </b-form-group>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import Swal from 'sweetalert2'

export default {
  name: 'ChecklistData',
  props: ['ChecklistData'],
  data () {
    return {
      status: this.setValue,
      existingChecklistDataName: this.ChecklistData.name
    }
  },
  methods: {
    renderName () {
      this.existingChecklistDataName = this.ChecklistData.name
    },
    updateChecklistDataName () {
      if (this.existingChecklistDataName.length > 0) {
        const payload = {
          name: this.existingChecklistDataName,
          id: this.ChecklistData.id,
          status: this.ChecklistData.status
        }
        this.$store.dispatch('updateChecklistData', payload)
      } else {
        Swal.fire({
          title: 'Checklist Item name required!',
          icon: 'error',
          confirmButtonText: 'back'
        })
      }
      this.existingChecklistDataName = this.ChecklistData.name
    },
    updateStatus (e) {
      if (this.setValue) {
        const payload = {
          name: this.ChecklistData.name,
          status: 0,
          id: this.ChecklistData.id
        }
        this.$store.dispatch('updateChecklistData', payload)
      } else {
        const payload = {
          name: this.ChecklistData.name,
          status: 1,
          id: this.ChecklistData.id
        }
        this.$store.dispatch('updateChecklistData', payload)
      }
    },
    warningDelete () {
      Swal.fire({
        title: `Are you want to delete this checklist item (${this.ChecklistData.name})?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.deleteChecklistData()
        }
      })
    },
    deleteChecklistData () {
      this.$store.dispatch('deleteChecklistData', this.ChecklistData.id)
    }
  },
  computed: {
    setValue () {
      if (this.ChecklistData.status === 1) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>

<style>
 #checkbox {
   width: 20px;
 }
  #listChecklistData {
    margin: 10px;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
  }
  #checklistDataBtn {
    border-radius: 3px;
    border: 0;
    outline: none;
    border-radius: 3px;
    opacity: 0.7;
    height: 100%;
  }
  #checklistDataBtn:hover {
    opacity: 1;
    color: white;
    background-color: rgb(255, 0, 0);
  }
  #checklistDataUpdateBtn {
    border-radius: 3px;
    border: 0;
    outline: none;
    border-radius: 3px;
    opacity: 0.7;
    height: 100%;
  }
  #checklistDataUpdateBtn:hover {
    opacity: 1;
  }
</style>
