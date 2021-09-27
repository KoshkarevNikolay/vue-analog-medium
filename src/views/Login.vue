<template>
  <form @submit.prevent="submitHandler">
    <b-field
      label="Email"
      :type="
        ($v.email.$dirty && !$v.email.required) ||
        ($v.email.$dirty && !$v.email.email)
          ? 'is-danger'
          : 'is-success'
      "
      :message="
        $v.email.$dirty && !$v.email.required
          ? 'Поле Email не должно быть пустым'
          : $v.email.$dirty && !$v.email.email
          ? 'Введите корректный email'
          : ''
      "
    >
      <b-input type="text" v-model.trim="email"> </b-input>
    </b-field>

    <b-field
      label="Password"
      :type="
        ($v.password.$dirty && !$v.password.required) ||
        ($v.password.$dirty && !$v.password.minLength)
          ? 'is-danger'
          : 'is-success'
      "
      :message="
        $v.password.$dirty && !$v.password.required
          ? 'Поле password не должно быть пустым'
          : $v.password.$dirty && !$v.password.password
          ? `Пароль должен быть ${$v.password.$params.minLength.min} символов.
            Вы ввели ${password.length}`
          : ''
      "
    >
      <b-input type="password" v-model.trim="password" password-reveal>
      </b-input>
    </b-field>

    <b-button type="is-success" native-type="submit">Login</b-button>
  </form>
</template>

<script>
import { email, required, minLength } from 'vuelidate/lib/validators';
export default {
  name: 'login',
  data: () => ({
    email: 'writer@mail.com',
    password: '123456',
  }),
  validations: {
    email: { email, required },
    password: { required, minLength: minLength(6) },
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      const formData = {
        email: this.email,
        password: this.password,
      };
      try {
        await this.$store.dispatch('login', formData);
        this.$router.push('/posts');
      } catch (error) {
        this.$buefy.toast.open({
          message: error.message,
          type: 'is-danger',
        });
      }
    },
  },
};
</script>
