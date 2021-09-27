<template>
  <article class="card">
    <div class="card-content">
      <router-link :to="`/posts/${post.id}`" class="card-header-title">
        {{ post.title }}
      </router-link>
      <div class="content">
        {{ post.description }}
      </div>
      <div class="buttons is-justify-content-right">
        <span class="card-content-date-left">
          {{ post.createdAt | date }}
        </span>
        <b-button
          type="is-light"
          tag="a"
          @click.prevent="$emit('like-post', post.id, post.claps)"
          v-if="isReader"
        >
          <b-icon icon="sign-language" type="is-info" class="mr-1"></b-icon>
          {{ post.claps }}
        </b-button>
        <b-button
          type="is-light"
          tag="router-link"
          :to="`/posts/${post.id}/edit`"
          v-if="isWriter"
        >
          <b-icon pack="far" icon="edit" type="is-info" class="mr-1"></b-icon>
          Изменить
        </b-button>
        <b-button
          type="is-light"
          tag="a"
          @click.prevent="$emit('remove-post', post.id)"
          v-if="isWriter"
        >
          <b-icon
            pack="far"
            icon="trash-alt"
            type="is-info"
            class="mr-1"
          ></b-icon>
          Удалить
        </b-button>
      </div>
    </div>
  </article>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  props: ['post'],
  computed: {
    ...mapGetters(['isWriter', 'isReader']),
  },
}
</script>
<style lang="scss">
.card {
  max-width: 600px;
  margin: 20px 0;
  .card-footer-like {
    padding: 10px;
  }
  .card-header-title {
    padding: 0 0 1em 0;
  }
  .card-content-date-left {
    align-self: flex-end;
    flex: 1;
    margin-bottom: 0.5rem;
    opacity: 0.6;
  }
}
</style>
