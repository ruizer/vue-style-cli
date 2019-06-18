import { Component, Vue } from 'vue-property-decorator';
import withRender from './{{kebabCaseName}}.html';
import './{{kebabCaseName}}.less';

@withRender
@Component
export default class {{camelCaseName}} extends Vue {}
