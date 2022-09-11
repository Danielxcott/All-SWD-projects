<template>
  <div class="row justify-content-center">
    <div class="col-12 col-md-4">
      <div class="my-4">
        <div class="card">
          <div class="card-title mt-2 text-center">
            <h4 calss="mb-0">Vue Cli To-do list</h4>
          </div>
          <VueButton @toparent="add"></VueButton>
          <div
              class="card-body d-flex justify-content-between align-items-center"
          >
            <p class="text-info mb-0">To-do list{{ lists.length >1 ? "s" : "" }}</p>
            <p v-if="lists.length>0 && totalDone == lists.length" class="badge badge-success rounded-pill mb-0">All Done <i class="fas fa-check"></i> </p>
            <p v-else class="badge badge-primary rounded-pill mb-0">Done <span>{{totalDone}}</span></p>
          </div>
          <ul class="list-group p-2">
           <VueList  v-for="list in lists"
                     :key="list.id"
                     :list="list"
                     @to-del="del"></VueList>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>




import VueButton from "@/components/VueButton";
import VueList from "@/components/VueList";
export default {
  name: 'HomeView',
  components: {VueList, VueButton},
  data() {
    return {
      lists: [],
      currentId: 0,
    };
  },
  computed:{
    totalDone(){
      return this.lists.filter((el)=>el.isCheck == true).length
    }
  },
  methods: {
    add(x) {
      this.currentId++;
      this.lists.push({
        id: this.currentId,
        newMessage: x,
        isCheck: false,
      });
    },
    del(x) {
      setTimeout(()=> this.lists = this.lists.filter((el) => el.id !== x),400
      )

    },
  },
}
</script>npm

<style>
.done{
  text-decoration: line-through;
}
.create{
  animation: 0.8s fadeInDown;
}
.delete{
  animation: 0.5s slideOutLeft;
}

</style>
