<template>
	<section class="detail-panel">
		<div class="detail-panel-title">{{title}}</div>
		<ul class="detail-panel-list">
			<li class="detail-item" 
				v-for="item,index in details"
				:key="index">
				<span class="detail-item-label">{{item.label}}：</span>
				<span class="detail-item-value">{{item.value}}</span>
			</li>
		</ul>
	</section>
</template>
<script>
import { theme } from '@/config';
export default {
  name: "flow-detail",
  data() {
    return {
      primary: theme.primary
    }
  },
  props: {
  	title: {
  		type: String,
  		default: null
  	},
    details: {
      type: Array,
      default: null
    }
  },
  methods: {
  },
  created() {
  }
}
</script>
<style scoped lang="scss">
@import "../../../styles/_global.scss";
.detail {

	&-panel {
		background-color:$color-white;
		margin:8px 0;

		&-title {
			font-size:14px;
			color:$color-32;
			padding:8px 16px;
			font-weight:bold;
		}

		&-list {
			padding-bottom:10px;
			margin-bottom:0;
		}
	}

	&-item {
		@include flex-row();
		padding:3px 16px;
		font-size:14px;

		
		&-label {
			flex:1.5;
			white-space:nowrap;
			color:$color-7d;
		}

		&-value {
			flex:3;
			color:$color-32;
		}
	}
}
</style>

