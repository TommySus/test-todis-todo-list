<template>
  <div  v-b-modal="`modal${Card.id}`" id="card">
    <div id="cardTitle">
      <span id="titleCard">{{Card.name}}</span>
    </div>
    <div v-if="checklistChecked.totalCheck > 0" id="label">
      <p> <b>&#10003; {{checklistChecked.checked}}/{{checklistChecked.totalCheck}}</b> </p>
    </div>

    <b-modal :id="`modal${Card.id}`" ok-title="Save" title="Card Detail">

        <label for="cardTitle">Title:</label>
        <b-form-textarea
          style="font-size: 20px; font-weight:700;"
          v-model="newCardName"
          id="cardTitle"
          placeholder="Card title.."
          @change="updateCardTitle"
        ></b-form-textarea>

        <p>in list <b style="text-decoration: underline; font-size: 20px;">{{BoardName}}</b></p>

        <label for="cardDescription">Description:</label>
        <b-form-textarea
          style="font-size: 20px; font-weight:700;"
          v-model="Card.description"
          id="cardDescription"
          placeholder="Description here..."
          @change="updateCardDescription"
        ></b-form-textarea>

      <div id="listChecklist">
        <button id="addChecklistBtn" v-b-modal="`modalNewChecklist${Card.id}`">add Checklist</button>
        <Checklist
        v-for="Checklist in sortedArray"
        :key="Checklist.id"
        :Checklist="Checklist"
        >
        </Checklist>
      </div>

    <!-- modal for add new checklist -->
    <b-modal @ok="createNewChecklist" :id="`modalNewChecklist${Card.id}`" title="Add New Checklist">
      <b-form>
        <b-form-group
          label="New Checklist Name"
          label-for="name-input"
          invalid-feedback="Checklist Name is required"
        >
          <b-form-input
            id="name-input"
            v-model="newChecklist"
            placeholder="Enter Checklist Name"
            required
          ></b-form-input>
        </b-form-group>
      </b-form>
    </b-modal>

    </b-modal>
  </div>
</template>

<script>
import Checklist from './Checklist.vue'
import Swal from 'sweetalert2'

export default {
  name: 'Card',
  components: {
    Checklist
  },
  data () {
    return {
      newChecklist: '',
      newCardName: this.Card.name
    }
  },
  props: ['Card', 'BoardName'],
  methods: {
    updateCardTitle (e) {
      if (e.length > 0) {
        const payload = {
          id: this.Card.id,
          name: e,
          description: this.Card.description,
          BoardId: this.Card.BoardId
        }
        this.$store.dispatch('updateCard', payload)
      } else {
        console.log(e, 'update card')
        const payload = {
          id: this.Card.id,
          name: this.Card.name,
          description: this.Card.description,
          BoardId: this.Card.BoardId
        }
        this.$store.dispatch('updateCard', payload)
        this.newCardName = this.Card.name
        console.log(this.newCardName, 'update card')
      }
    },
    updateCardDescription (e) {
      console.log(e, 'update card')
      const payload = {
        id: this.Card.id,
        name: this.Card.name,
        description: e,
        BoardId: this.Card.BoardId
      }
      this.$store.dispatch('updateCard', payload)
    },
    createNewChecklist () {
      if (this.newChecklist) {
        const payload = {
          name: this.newChecklist,
          CardId: this.Card.id
        }
        this.$store.dispatch('createChecklist', payload)
      } else {
        Swal.fire({
          title: 'Checklist name required!',
          icon: 'error',
          confirmButtonText: 'back'
        })
      }
      this.newChecklist = ''
    }
  },
  computed: {
    checklistChecked () {
      let checked = 0
      let unCheck = 0
      let totalCheck = 0
      if (this.Card.Checklists) {
        for (let i = 0; i < this.Card.Checklists.length; i++) {
          for (let j = 0; j < this.Card.Checklists[i].Checklistdata.length; j++) {
            totalCheck++
            if (this.Card.Checklists[i].Checklistdata[j].status === 1) {
              checked++
            } else {
              unCheck++
            }
          }
        }
      }
      const result = {
        checked,
        unCheck,
        totalCheck
      }
      return result
    },
    sortedArray () {
      const result = this.Card.Checklists
      return result.sort((a, b) => a.id - b.id)
    }
  }
}
</script>

<style>
  #card {
    background-color: #fff;
    min-height: 30px;
    width: 100% ;
    border-radius: 3px;
    box-shadow: 0 1px 0 rgb(9 30 66 / 25%);
    margin-top: 10px;
    margin-bottom: 10px;
    cursor: pointer;
    padding: 10px;
    line-height: 0;
    text-align: left;
    white-space: normal;
    display: flex;
    flex-direction: column;
    line-height: 20px;
  }

  #card:hover {
    background-color: whitesmoke;
  }

  #label{
    bottom: 0;
    float: left;
    height: 20px;
  }
  #label p {
    margin-top: 5px;
    font-weight: 400;
    opacity: 0.6;
  }
  #cardTitle {
    position: relative;
    white-space: normal;
    overflow: hidden;
    word-wrap: break-word;
  }
  .modal-dialog .close {
    width: 40px;
    border-radius: 10px;
    font-weight: 800;
    font-size: 30px;
    border: none;
    background-color: transparent;
  }
  .modal-content {
    min-width: 600px;
  }
  #addChecklistBtn {
    border-radius: 3px;
    border: 0;
    outline: none;
    border-radius: 3px;
    opacity: 0.7;
    margin-top: 10px;
  }
  #addChecklistBtn:hover {
    opacity: 1;
  }
</style>
