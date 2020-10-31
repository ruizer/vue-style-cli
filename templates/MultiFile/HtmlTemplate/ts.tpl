import { Component, Vue } from "vue-property-decorator";
import withRender from "./{{kebabCaseName}}.html";
import "./{{kebabCaseName}}.{{lang}}";

@withRender
@Component({ name: "{{kebabCaseName}}" })
export default class {{camelCaseName}} extends Vue {}
