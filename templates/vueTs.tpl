<template>
  <div class="{{kebabCaseName}}">
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class {{camelCaseName}} extends Vue {
}
</script>

<style{{#if lang}} lang="{{lang}}"{{/if}}{{scoped}}>
</style>
