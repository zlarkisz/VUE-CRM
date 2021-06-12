<template>
  <div>
    <div class="page-title">
      <h3>{{ 'ProfileTitle' | localize }}</h3>
    </div>

    <form class="form" @submit.prevent="submitHandler">
      <div class="input-field">
        <input
            id="description"
            type="text"
            v-model="name"
            :class="{ invalid: ($v.name.$dirty && !$v.name.required)}"
        >
        <label for="description">{{ 'Name' | localize }}</label>
        <small
          v-if="$v.name.$dirty && !$v.name.required"
          class="helper-text invalid"
        >
          {{ 'Message_EnterName' | localize }}
        </small>
      </div>

      <div class="switch">
        <label>
          English
          <input type="checkbox" v-model="isUaLocale">
          <span class="lever"></span>
          Ukrainian
        </label>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        {{ 'Update' | localize }}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import { required } from 'vuelidate/lib/validators'
  import localizeFilter from '@/filters/localize.filter'

  export default {
    name: 'Profile',

    metaInfo () {
      return {
        title: this.$title('ProfileTitle')
      }
    },

    data() {
      return {
        name: '',
        isUaLocale: true
      }
    },

    validations: {
      name: { required },
    },

    computed: {
      ...mapGetters(['info'])
    },

    mounted () {
      this.name = this.info.name;
      this.isUaLocale = this.info.locale === 'uk-UA'

      setTimeout(() => {
        M.updateTextFields()
      });
    },

    methods: {
      ...mapActions(['updateInfo']),
      async submitHandler() {
        if (this.$v.$invalid) {
          this.$v.$touch()
          return
        }

        try {
          await this.updateInfo({
            name: this.name,
            locale: this.isUaLocale ? 'uk-UA' : 'en-US'
          })
        } catch (error) {}
      }
    }
  }
</script>

<style scoped>
.switch {
  margin-bottom: 2rem;
}
</style>
