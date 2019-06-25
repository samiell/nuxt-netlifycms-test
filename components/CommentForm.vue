<template lang="html">
  <form name="comment" method="post" @submit.prevent="submitComment" netlify>
    <input type="hidden" name="form-name" value="comment" />
    <input type="hidden" name="post" :value="post" />
    <label class="form-label" for="name">
      Name:
    </label>
    <input class="form-field" name="name" id="name" v-model="name"/>
    <label class="form-label" for="email">
      Email:
    </label>
    <input class="form-field" name="email" id="email" v-model="email"/>
    <label class="form-label" for="message">
      Comment:
    </label>
    <textarea class="form-field" name="comment" id="comment" v-model="comment"></textarea>
    <input class="form-button" type="submit" value="Submit" />
  </form>
</template>

<script>
import { encodeForm } from '~/utils/utils.js';

export default {
  name: "CommentForm",
  data() {
    return {
      name: '',
      email: '',
      comment: '',
    };
  },
  props: {
    post: String,
  },
  methods: {
    submitComment() {
      fetch('/', {
        method: "POST",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: encodeForm({
          'form-name': 'comment',
          name: this.name,
          email: this.email,
          comment: this.comment,
          post: this.post,
        }),

      })
    }
  }
}
</script>

<style lang="css" scoped>
</style>
