<template>
  <div id="board" class=" d-flex d-flex flex-column ">
      <div id="boardName">
          <input @change="updateBoard" v-model="newBoard" type="text">
          <button @click="warningDelete">x</button>
      </div>
      <div v-if="Board.Cards.length > 0" id="listCard" >
        <Card
        v-for="Cards in sortedArray"
        :key="Cards.id"
        :Card="Cards"
        :BoardName="Board.name"
        ></Card>
      </div>
      <div id="footerBoard">
          <button v-b-modal="`modalNewCard${Board.id}`"> + Add a card </button>
      </div>

    <!-- modal for add new card -->
    <b-modal @ok="handleOk" :id="`modalNewCard${Board.id}`" title="Add New Card">
      <b-form>
        <b-form-group
          label="New Card Name"
          label-for="name-input"
          invalid-feedback="Card Name is required"
        >
          <b-form-input
            id="name-input"
            v-model="newCard"
            placeholder="Enter Card Name"
            required
          ></b-form-input>
        </b-form-group>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import Card from './Card.vue'
import Swal from 'sweetalert2'

export default {
  name: 'Board',
  props: ['Board'],
  data () {
    return {
      newCard: '',
      newBoard: this.Board.name
    }
  },
  components: {
    Card
  },
  methods: {
    updateBoard (e) {
      const payload = {
        id: this.Board.id,
        name: e.target.value
      }
      this.$store.dispatch('updateBoard', payload)
    },
    warningDelete () {
      Swal.fire({
        title: 'Are you want to delete this list?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.deleteList()
        }
      })
    },
    deleteList () {
      this.$store.dispatch('deleteBoard', this.Board.id)
        .then(data => {
          console.log(data, 'dataaaaa')
          Swal.fire(
            'Deleted!',
            'List has been deleted.',
            'success'
          )
        })
        .catch(error => {
          console.log(error)
        })
    },
    handleOk () {
      console.log(this.newCard)
      const payload = {
        name: this.newCard,
        BoardId: this.Board.id
      }
      console.log(payload)
      this.$store.dispatch('createCard', payload)
      this.newCard = ''
    }
  },
  computed: {
    sortedArray: function () {
      const result = this.Board.Cards
      return result.sort((a, b) => a.id - b.id)
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');

  #board {
    flex-shrink: 0;
    margin: 20px;
    min-height: 0px;
    max-height: 700px;
    width: 350px;
    border-radius: 3px;
    background-color: #ebecf0;
    position: relative;
    white-space: normal;
    overflow: hidden;
  }

  #boardName {
    width: 100%;
    height: 40px;
    display: flex;
    flex-direction: row;
    border-radius: 3px;
    margin-bottom: 5px;
    justify-content: center;
    margin-top: 10px;
  }

  #boardName input {
    width: 80%;
    border-top-left-radius: 3px;
    border-width:0px;
    border:none;
    padding: 15px;
    font-size: 20px;
    font-family: 'Roboto', sans-serif;
    background-color: #ebecf0;
  }

  #boardName input:focus {
    border-radius: 5px;
    border: 3px solid #1670BE;
    box-shadow: 0 0 3px #1670BE;
    outline-offset: 0px;
    outline: none;
    background-color: white;
  }

  #boardName button {
    width: 15%;
    float: right;
    border-radius: 3px;
    border: none;
    background-color: #ebecf0;
    font-size: 25px;
    font-weight: 400;
  }
  #boardName button:hover {
    background-color: rgba(0, 0, 0, 0.1);
    color: rgb(218, 3, 3);
  }
  #listCard {
    flex: 1 1 auto;
    overflow-y: auto;
    overflow-x: hidden;
    margin: 0 4px;
    padding: 0 4px;
    min-height: 0;
    max-height: 590px;
  }
  ::-webkit-scrollbar {
    width: 12px;
  }

  ::-webkit-scrollbar-track:vertical {
    border-radius: 10px;
    background-color: rgba(17, 17, 17, 0.1);
  }

  ::-webkit-scrollbar-track:horizontal {
    margin-left: 20px;
    margin-right: 20px;
    border-radius: 10px;
    background-color: rgba(17, 17, 17, 0.1);
  }

  ::-webkit-scrollbar-thumb:vertical {
    border-radius: 10px;
    background-color: rgba(0, 0, 0, 0.1);
  }

  ::-webkit-scrollbar-thumb:horizontal {
    border-radius: 10px;
    background-color: rgba(0, 0, 0, 0.432);
  }

  #footerBoard button {
    width: 95%;
    height: 40px;
    margin-bottom: 10px;
    border: 0;
    outline: none;
    border-radius: 3px;
    opacity: 0.5;
    font-size: 18px;
    text-align: left;
    font-weight: 500;
  }

  #footerBoard button:hover {
    background-color: rgba(0, 0, 0, 0.1);
    opacity: 0.9;
  }
</style>
