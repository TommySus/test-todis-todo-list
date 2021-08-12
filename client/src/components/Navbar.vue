<template>
  <div>
        <b-navbar id="navbar" class="navbar fixed-top" type="secondary " variant="secondary ">
            <b-navbar-nav class="navbar-logo mx-auto ">
                <img id="logo2" src="../assets/trello.png" alt="">
                <h1 id="logo" class="mr-sm-2 ">Orello</h1>
            </b-navbar-nav>
        </b-navbar>
  </div>
</template>

<script>
export default {

}
</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,wght@1,900&family=RocknRoll+One&display=swap');
  #navbar {
    opacity: 80%;
    font-family: 'Nunito Sans', sans-serif;
    height: 53px;
  }

  #logo2{
    height: 25px;
    margin-top: 15px;
    margin-right: 3px;
    opacity: 70%;
  }

  #logo{
    color: white;
    margin-top: 10px;
    font-size: 29px;
    opacity: 50%;
  }
</style>
