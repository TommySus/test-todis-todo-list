<template>
  <div id="Home">
    <Navbar></Navbar>
    <div id="boardList">
      <Board
        v-for="Board in allData"
        :key="Board.id"
        :Board="Board"
      ></Board>
      <button v-b-modal="`modalNewBoard`" id="newList">+ Add another list</button>

      <b-modal @ok="handleOk" :id="`modalNewBoard`" title="Add New List">
        <b-form>
          <b-form-group
            label="New List Name"
            label-for="name-input"
            invalid-feedback="List Name is required"
          >
            <b-form-input
              id="name-input"
              v-model="newBoard"
              placeholder="Enter List Name"
              required
            ></b-form-input>
          </b-form-group>
        </b-form>
      </b-modal>
    </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar'
import Board from '../components/Board'
import Swal from 'sweetalert2'

export default {
  name: 'HomePage',
  data () {
    return {
      newBoard: ''
    }
  },
  components: {
    Navbar,
    Board
  },
  methods: {
    fetchData () {
      this.$store.dispatch('fetchData')
    },
    handleOk () {
      const payload = {
        name: this.newBoard
      }
      if (this.newBoard) {
        this.$store.dispatch('createBoard', payload)
          .then(data => {
            const Toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
              }
            })
            Toast.fire({
              icon: 'success',
              title: 'create new list success'
            })
            this.newBoard = ''
          })
          .catch(error => {
            console.log(error)
          })
      } else {
        Swal.fire({
          title: 'List name required!',
          icon: 'error',
          confirmButtonText: 'back'
        })
      }
    }
  },
  computed: {
    allData () {
      const result = this.$store.state.data
      return result.sort((a, b) => a.id - b.id)
    }
  },
  created () {
    this.fetchData()
  }
}
</script>

<style>
  #boardList {
    display: flex;
    align-items: flex-start;
    height: 100%;
    margin-top: 50px;
    margin-right: 20px;
  }
  #newList {
    flex-shrink: 0;
    margin: 20px;
    width: 350px;
    height: 40px;
    border: 0;
    outline: none;
    border-radius: 3px;
    opacity: 0.5;
    font-size: 18px;
    text-align: left;
    font-weight: 500;
  }

  #newList:hover {
    opacity: 0.8;
  }
</style>
