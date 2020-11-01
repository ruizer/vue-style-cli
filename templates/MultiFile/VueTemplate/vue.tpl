<template>
  <div class="{{kebabCaseName}}">
  </div>
</template>

<script>
export default {
  name: "{{kebabCaseName}}"
};
</script>

<style{{#if lang}} lang="{{lang}}"{{/if}} {{scoped}} src="./index.{{lang}}"></style>
