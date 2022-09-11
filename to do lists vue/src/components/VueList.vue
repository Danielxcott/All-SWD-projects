<template>
  <li
      @dblclick="isEdit = true"
      :class="['list-group-item d-flex justify-content-between align-items-center create',{'delete':isDelete}]"
  >
    <input
        v-if="isEdit"
        type="text"
        v-model="list.newMessage"
        @keyup.enter="isEdit = false"
        class="custom-control form-control-lg mr-2"
    />
    <div v-else class="custom-checkbox custom-control">
      <input
          type="checkbox"
          :id="'customcheck' + list.id"
          class="custom-control-input"
          v-model="list.isCheck"
      />
      <label :for="'customcheck' + list.id" :class="['custom-control-label',{'done':list.isCheck}]">{{
          list.newMessage
        }}</label>
    </div>
    <i class="fas fa-trash-alt text-danger" @click="[isDelete = true,del(list.id)]"></i>
  </li>
</template>

<script>
export default {
  name: "VueList",
  props: {
    list: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isEdit: false,
      isDelete: false,
    };
  },
  methods: {
    del(x) {
      this.$emit("toDel", x);
    },
  },
}
</script>

<style scoped>

</style>