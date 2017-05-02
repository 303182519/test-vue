<style lang="scss">
	.right_side_wrapper {
	    width: 37.5px;
	    position: fixed;
	    right: 0;
	    bottom: 20%;
	    z-index: 10;
	    li {
		    background-color: rgba(46,46,58,.85);
		    color: #fff;
		    text-align: center;
		    width: 100%;
		    font-size: 12px;
		    margin-bottom: 2px;
		    height: 40px;
		    padding: 3px 0 2px;
		    border-radius: 3px 0 0 3px;
		    &:nth-child(3) {
			    line-height: 15px
			}
			&.transparent_ico {
			    opacity: 0;
			    -webkit-transition: all .5s
			}

			.right_side_ico {
			    display: inline-block;
			    width: 14px;
			    height: 15px;
			}
			.right_ico_top {
			    background-image: url(./right_side_toTop.png?__sprite)
			}
			.right_ico_free {
			    background-image: url(./right_sidefree_back.png?__sprite)
			}
			.right_ico_kaibo {
			    background-image: url(./right_side_kaibo.png?__sprite)
			}

		}
	}

</style>

<template>
	<div class="right_side_wrapper" id="globalRightSide">
		<ul>
			<li id="rightSideTop" class="transparent_ico" :style="show" @touchstart="gotoTop"><i class="right_side_ico right_ico_top "></i><p>顶部</p></li>
			<li class="freeback_btn"><i class="right_side_ico right_ico_free freeback_btn"></i><br>反馈</li>
			<li ><i class="right_side_ico right_ico_kaibo"></i><br>开播</li>
		</ul>
	</div>
</template>


<script>

	export default {
		data(){
			return {
				show : {
					opacity : 0,
				}
			}
		}
	}
</script>