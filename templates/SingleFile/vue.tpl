<template>
  <div class="{{kebabCaseName}}-page"></div>
</template>

<script>
export default {
  name: "{{kebabCaseName}}"
};
</script>

<style{{#if lang}} lang="{{lang}}"{{/if}}{{scoped}}>
.{{kebabCaseName}}-page{}
</style>
