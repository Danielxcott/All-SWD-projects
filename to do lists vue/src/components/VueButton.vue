<template>
  <div class="form-row mb-3 p-2">
    <div class="col-10">
      <input
          type="text"
          v-model="message"
          class="form-control-lg form-control"
          @keyup="isShow = false"
      />
    </div>
    <div class="col-2">
      <button @click="add" class="btn btn-primary rounded btn-lg">
        <i class="fas fa-plus-circle"></i>
      </button>
    </div>
    <div class="col-12">
      <p v-if="isShow" class="text-danger mb-0 font-weight-bold">{{errorMessage}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "VueButton",
  data() {
    return {
      message:"",
      errorMessage:"",
      isShow:false,
    };
  },
  methods: {
    add() {
      if(this.message.length){
        this.isShow = false;
        this.$emit("toparent",this.message);
        this.message="";
      }else{
        this.isShow = true;
        this.errorMessage="Type Something!"
      }

    },
  },
}
</script>

