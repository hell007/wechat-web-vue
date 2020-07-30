<template>
	<section class="node-panel">
		<div class="node-panel-title">审批流程</div>
		<ul class="node-panel-list">
			<li class="node-item" 
				v-for="item,index in nodes"
				:key="index">
				<div class="node-item-box sponsor"
					v-if="item.type=='sponsor'">
					<div class="node-item-left">
						<b>审批人</b>
						<span>5个网格主任或签审批</span>
					</div>
					<ul class="node-item-right">
						<li class="node-item-people">
							<div class="icon">
								<img src="../../../assets/images/icons/pro_xqtbrcbs.png" />
							</div>
							<span @click="go">查看全部</span>
						</li>
						<li>+</li>
						<li class="node-item-people">
							<div class="icon">
								<img src="../../../assets/images/icons/pro_xqtbrcbs.png" />
							</div>
							<span>张三</span>
						</li>
						<li>+</li>
						<li class="node-item-people">
							<div class="icon">
								<img src="../../../assets/images/icons/pro_xqtbrcbs.png" />
							</div>
							<span>李四</span>
						</li>
					</ul>
				</div>
				<div class="node-item-box notifier"
					v-if="item.type=='notifier'">
					<div class="node-item-left">
						<b>抄送人</b>
						<span>抄送2人</span>
					</div>
					<ul class="node-item-right">
						<li class="node-item-people">
							<div class="icon">
								<img src="../../../assets/images/icons/pro_xqtbrcbs.png" />
							</div>
							<span>张三</span>
						</li>
						<li>+</li>
						<li class="node-item-people">
							<div class="icon">
								<img src="../../../assets/images/icons/pro_xqtbrcbs.png" />
							</div>
							<span>李四</span>
						</li>
					</ul>
				</div>
			</li>
		</ul>
	</section>
</template>
<script>
import { theme } from '@/config';
export default {
  name: "flow-node",
  data() {
    return {
      primary: theme.primary
    }
  },
  props: {
    nodes: {
      type: Array,
      default: null
    }
  },
  methods: {
  	go() {
  		this.$router.push('flowApprover')
  	}
  },
  created() {
  }
}
</script>
<style scoped lang="scss">
@import "../../../styles/_global.scss";
.node {

	&-panel {
		background-color:$color-white;
		margin:8px 0;

		&-title {
			font-size:14px;
			color:$color-32;
			padding:8px 16px;
		}

		&-list {
			@include clearfix();
			padding-bottom:10px;
			margin-bottom:0;
		}
	}

	&-item {
		padding:0 16px 0 20px;
		border-bottom:1px solid $color-border-gray;

		&-box {
			position:relative;
			@include flex-row();
			align-items:center;
			padding:6px 0 12px 15px;
			//border-left:2px dashed $color-c8;
			
			&.sponsor,
			&.notifier {

				&::before {
					position:absolute;
					left:-5px;
					z-index:2;
					display:inline-block;
					content:'';
					width:10px;
					height:10px;
					border-radius:999px;
					background-color:$color-c8;
				}

				&::after {
					position:absolute;
					left:-1px;
					z-index:2;
					display:inline-block;
					content:'';
					width:2px;
					height:100%;
					background-color:$color-c8;
				}
			}

			&.sponsor {
				
				&::before {
					top:18px;
				}

				&::after {
					top:18px;
				}
			}
			
			&.notifier {
				
				&::before {
					bottom:38px;
				}

				&::after {
					bottom:38px;
				}
			}
		}

		&-left {
			flex:1.5;
			margin-right:15px;
			@include flex-column();

			b {
				height:30px;
				line-height:30px;
				font-weight:normal;
				white-space:nowrap;
			}

			span {
				font-size:10px;
				color:$color-c8;
			}
		}

		&-right {
			flex:4;
			@include flex-row();
			align-items:center;
			justify-content: flex-end;

			li {
				color:$color-c8;
			}
		}

		&-people {
			flex:1;
			max-width:30%;
			text-align:center;

			.icon {
				width:30px;
				height:30px;
				margin:0 auto;
			}

			span {
				font-size:10px;
				color:$color-c8;
				white-space:nowrap;
			}
		}
	}
}
</style>

