<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

declare module 'vue/types/vue' {
  interface Vue {
    valEmptyTool(val: string, unitStr: string, emptyStr: string): string;
  }
}

@Component
export default class ValTool extends Vue {
  valEmptyTool(
    val: string,
    unitStr: string = '',
    emptyStr: string = ''
  ): string {
    return !val ? emptyStr : val + unitStr;
  }
}
</script>
