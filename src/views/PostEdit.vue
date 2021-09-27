<template>
  <form @submit.prevent="submitHandler">
    <b-field
      label="Название поста"
      :type="$v.title.$dirty && !$v.title.required ? 'is-danger' : 'is-success'"
      :message="
        $v.title.$dirty && !$v.title.required
          ? 'Поле не должно быть пустым'
          : ''
      "
    >
      <b-input type="text" v-model.trim="title"> </b-input>
    </b-field>

    <b-field
      label="Описание"
      :type="
        $v.description.$dirty && !$v.description.required
          ? 'is-danger'
          : 'is-success'
      "
      :message="
        $v.description.$dirty && !$v.description.required
          ? 'Поле не должно быть пустым'
          : ''
      "
    >
      <b-input type="textarea" v-model.trim="description"> </b-input>
    </b-field>

    <b-button type="is-success" native-type="submit">Добавить</b-button>
  </form>
</template>
<script>
import { required } from 'vuelidate/lib/validators';

export default {
  name: 'postEdit',
  data: () => ({
    title: '',
    description: '  ',
  }),
  validations: {
    title: { required },
    description: { required },
  },
  async mounted() {
    const id = this.$route.params.id;
    const data = await this.$store.dispatch('fetchPostById', id);
    this.title = data[0].title;
    this.description = data[0].description;
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      const formData = {
        title: this.title,
        description: this.description,
        id: this.$route.params.id,
      };
      try {
        await this.$store.dispatch('updatePost', formData);
        this.$buefy.toast.open({
          message: 'Запись обновлена.',
          type: 'is-success',
        });
        this.$v.$reset();
        this.title = '';
        this.description = '';
        this.$router.push('/posts');
      } catch (error) {}
    },
  },
};
</script>
