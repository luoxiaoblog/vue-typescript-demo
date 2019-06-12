<template>
  <div id="loupanDetail">
    <lpdetail-header></lpdetail-header>
    <lpdetail-summary-info></lpdetail-summary-info>
    <lpdetail-baodian></lpdetail-baodian>
    <lpdetail-description></lpdetail-description>
    <lpdetail-price-info></lpdetail-price-info>
    <lpdetail-pos-and-around></lpdetail-pos-and-around>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Provide } from 'vue-property-decorator';
import LPDetailComponents from '@/components/loupan-detail';

@Component({
  components: {
    ...LPDetailComponents
  }
})
export default class LoupanDetail extends Vue {}
</script>
