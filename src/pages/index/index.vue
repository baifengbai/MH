<template>
	<div class="page-index">
		<div class="page-header">
			<div class="status-bar" :style="{'height':statusBarHeight + 'px'}"></div>
			<div class="nav-bar">
				<div class="search">
					<img :src="icon + 'search.png'" lazy-load webp>
					<input type="text" placeholder="推荐热门盲盒" placeholder-class="placeholder">
				</div>
				<div class="shopping-cart">
					<img :src="icon + 'shopping-cart.png'" lazy-load webp>
					<span>99</span>
				</div>
			</div>
		</div>
		<div class="section">
			<div class="status-bar-dao" :style="{'height':statusBarHeight + 'px'}"></div>
			<div class="banner">
				<swiper class="swiper" :current="current" autoplay circular interval="3000" @change="getBannerChange">
					<swiper-item class="swiper-slide" v-for="item in bannerList" :key="item.id">
						<img :src="item.url" lazy-load webp mode="aspectFill">
					</swiper-item>
				</swiper>
				<div class="current">
					<div class="current-item" :class="{'current-active':current == index}" v-for="(item, index) in bannerList" :key="item.id"></div>
				</div>
			</div>
			<div class="module">
				<div class="style-1">
					<div class="module-title">
						<div class="title">
							<div class="text">明星推荐</div>
							<div class="line"></div>
						</div>
						<div class="more">
							<span>ALL</span>
							<img :src="icon + 'to-right.png'" lazy-load webp>
						</div>
					</div>
					<scroll-view class="celebrity" scroll-x>
						<div class="item fade-in-left" v-for="item in celebrityList" :key="item.id">
							<div class="picture">
								<img class="avatar" :src="item.avatar" lazy-load webp mode="aspectFill">
								<img class="v" :src="icon + 'v.png'" lazy-load webp v-if="item.hot">
							</div>
							<div class="name">{{item.name}}</div>
							<div class="hot">
								<img :src="icon + 'hot.png'" lazy-load webp>
								<span>{{item.hot}}万</span>
							</div>
							<img class="add" :src="icon + 'add.png'" lazy-load webp>
						</div>
					</scroll-view>
				</div>
				<div class="style-3">
					<div class="module-title">
						<div class="title">
							<div class="text">热门盲盒推荐</div>
							<div class="line"></div>
						</div>
						<div class="more">
							<span>ALL</span>
							<img :src="icon + 'to-right.png'" lazy-load webp>
						</div>
					</div>
					<div class="images">
						<div class="left fade-in-big">
							<img class="avatar" src="https://popwebsite.paquapp.com/popmartwww/pc/about/aboutUs_banner.jpg?x-oss-process=image%2Fresize%2Cw_1920" lazy-load webp mode="aspectFill">
						</div>
						<div class="right">
							<div class="item fade-in-big">
								<img class="avatar" src="https://popwebsite.paquapp.com/popmartwww/pc/index_middle_banner_bg5.jpg?x-oss-process=image/resize,w_1920/quality,q_90" lazy-load webp mode="aspectFill">
							</div>
							<div class="item fade-in-big">
								<img class="avatar" src="https://popwebsite.paquapp.com/cms/news/T6428cJ3M7b7atakcN6e9fweH918CeTr.png" lazy-load webp mode="aspectFill">
							</div>
						</div>
					</div>
				</div>
				<div class="style-2">
					<div class="module-title">
						<div class="title">
							<div class="text">官方榜单</div>
							<div class="line"></div>
						</div>
						<div class="more">
							<span>ALL</span>
							<img :src="icon + 'to-right.png'" lazy-load webp>
						</div>
					</div>
					<div class="ranking ranking-bg-1">
						<div class="left">
							<div class="title">飙升榜</div>
							<div class="avatar">
								<img src="https://popwebsite.paquapp.com/cms/news/T6428cJ3M7b7atakcN6e9fweH918CeTr.png" lazy-load webp mode="aspectFill">
								<img src="https://popwebsite.paquapp.com/cms/news/T6428cJ3M7b7atakcN6e9fweH918CeTr.png" lazy-load webp mode="aspectFill">
								<img src="https://popwebsite.paquapp.com/cms/news/T6428cJ3M7b7atakcN6e9fweH918CeTr.png" lazy-load webp mode="aspectFill">
							</div>
						</div>
						<div class="right">
							<div class="time">刚刚更新</div>
							<div class="text">
								<div class="item">
									<div class="name">1. 易洋千玺</div>
									<div class="number">
										<img :src="icon + 'hot.png'" lazy-load webp>
										<span>187988万</span>
									</div>
								</div>
								<div class="item">
									<div class="name">2. 杨幂</div>
									<div class="number">
										<img :src="icon + 'hot.png'" lazy-load webp>
										<span>187988万</span>
									</div>
								</div>
								<div class="item">
									<div class="name">3. 迪丽热巴</div>
									<div class="number">
										<img :src="icon + 'hot.png'" lazy-load webp>
										<span>187988万</span>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="ranking ranking-bg-2">
						<div class="left">
							<div class="title">热销榜</div>
							<div class="avatar">
								<img src="https://popwebsite.paquapp.com/cms/news/T6428cJ3M7b7atakcN6e9fweH918CeTr.png" lazy-load webp mode="aspectFill">
								<img src="https://popwebsite.paquapp.com/cms/news/T6428cJ3M7b7atakcN6e9fweH918CeTr.png" lazy-load webp mode="aspectFill">
								<img src="https://popwebsite.paquapp.com/cms/news/T6428cJ3M7b7atakcN6e9fweH918CeTr.png" lazy-load webp mode="aspectFill">
							</div>
						</div>
						<div class="right">
							<div class="time">刚刚更新</div>
							<div class="text">
								<div class="item">
									<div class="name">1. 易洋千玺</div>
									<div class="number">
										<img :src="icon + 'shop.png'" lazy-load webp>
										<span>187988 件</span>
									</div>
								</div>
								<div class="item">
									<div class="name">2. 杨幂</div>
									<div class="number">
										<img :src="icon + 'shop.png'" lazy-load webp>
										<span>1988 件</span>
									</div>
								</div>
								<div class="item">
									<div class="name">3. 迪丽热巴</div>
									<div class="number">
										<img :src="icon + 'shop.png'" lazy-load webp>
										<span>1888 件</span>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="ranking ranking-bg-3">
						<div class="left">
							<div class="title">人气榜</div>
							<div class="avatar">
								<img src="https://popwebsite.paquapp.com/cms/news/T6428cJ3M7b7atakcN6e9fweH918CeTr.png" lazy-load webp mode="aspectFill">
								<img src="https://popwebsite.paquapp.com/cms/news/T6428cJ3M7b7atakcN6e9fweH918CeTr.png" lazy-load webp mode="aspectFill">
								<img src="https://popwebsite.paquapp.com/cms/news/T6428cJ3M7b7atakcN6e9fweH918CeTr.png" lazy-load webp mode="aspectFill">
							</div>
						</div>
						<div class="right">
							<div class="time">刚刚更新</div>
							<div class="text">
								<div class="item">
									<div class="name">1. 易洋千玺</div>
									<div class="number">
										<img :src="icon + 'hot.png'" lazy-load webp>
										<span>187988万</span>
									</div>
								</div>
								<div class="item">
									<div class="name">2. 杨幂</div>
									<div class="number">
										<img :src="icon + 'hot.png'" lazy-load webp>
										<span>187988万</span>
									</div>
								</div>
								<div class="item">
									<div class="name">3. 迪丽热巴</div>
									<div class="number">
										<img :src="icon + 'hot.png'" lazy-load webp>
										<span>187988万</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="page-shop-list">
				<div class="shop-list-title">
					<div class="title">
						<div class="text">猜你喜欢</div>
						<div class="line"></div>
					</div>
				</div>
				<div class="list">
					<div class="list-left">
						<div class="item" v-for="item in shopListLeft" :key="item.id">
							<div class="picture">
								<img :src="item.picture" lazy-load webp mode="widthFix">
							</div>
							<div class="title">
								<div class="tag" v-if="item.tag">{{item.tag}}</div>
								{{item.title}}
							</div>
							<div class="other">
								<div class="price">{{item.price}}</div>
								<div class="number">{{item.num}} 人付款</div>
							</div>
						</div>
					</div>
					<div class="list-right">
						<div class="item" v-for="item in shopListRight" :key="item.id">
							<div class="picture">
								<img :src="item.picture" lazy-load webp mode="widthFix">
							</div>
							<div class="title">
								<div class="tag" v-if="item.tag">{{item.tag}}</div>
								{{item.title}}
							</div>
							<div class="other">
								<div class="price">{{item.price}}</div>
								<div class="number">{{item.num}} 人付款</div>
							</div>
						</div>
					</div>
				</div>
				<div class="loading-end">- THE END -</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				icon: this.$config.ICON_URL,
				statusBarHeight: '',
				current: 0,
				bannerList: [
					{ id: 0, url: 'https://popwebsite.paquapp.com/popmartwww/pc/index_middle_banner_bg1.jpg', title: '' },
					{ id: 1, url: 'https://popwebsite.paquapp.com/popmartwww/pc/index_middle_banner_bg4.jpg', title: '' },
					{ id: 2, url: 'https://popwebsite.paquapp.com/popmartwww/pc/index_middle_banner_bg2.jpg', title: '' },
					{ id: 3, url: 'https://popwebsite.paquapp.com/popmartwww/pc/index_middle_banner_bg3.jpg', title: '' }
				],
				celebrityList: [
					{ id: 0, name: '王一博', avatar: 'https://popwebsite.paquapp.com/popmartwww/pc/about/labubu_a.png', hot: 187988, isVip: true },
					{ id: 1, name: '易烊千玺', avatar: 'https://popwebsite.paquapp.com/popmartwww/pc/about/dimoo_a.png', hot: 187988, isVip: true },
					{ id: 2, name: '肖战', avatar: 'https://popwebsite.paquapp.com/popmartwww/pc/about/pucky_a.png', hot: 187988, isVip: true },
					{ id: 3, name: '王源', avatar: 'https://popwebsite.paquapp.com/popmartwww/pc/about/bobo_a.png', hot: 187988, isVip: true }
				],
				shopListLeft: [
					{ id: 0, picture: 'https://popwebsite.paquapp.com/popmartwww/pc/popularProduct/ipAvatar27.png', title: '迪丽热巴古风造型系列1', tag: '', price: 1499.99, num: 49 },
					{ id: 1, picture: 'https://popwebsite.paquapp.com/cms/news/T6428cJ3M7b7atakcN6e9fweH918CeTr.png', title: '迪丽热巴古风造型系列2', tag: '热销', price: 1499.99, num: 49 },
					{ id: 2, picture: 'https://popwebsite.paquapp.com/popmartwww/pc/popularProduct/ipAvatar25.png', title: 'DIMOO 银河系列', tag: '', price: 1499.99, num: 49 }
				],
				shopListRight: [
					{ id: 0, picture: 'https://popwebsite.paquapp.com/popmartwww/pc/popularProduct/ipAvatar23.png', title: '迪丽热巴古风造型系列2', tag: '新品尝鲜', price: 1499.99, num: 49 },
					{ id: 1, picture: 'https://popwebsite.paquapp.com/popmartwww/pc/popularProduct/ipAvatar24.png', title: '迪丽热巴古风造型系列1', tag: '', price: 1499.99, num: 49 },
					{ id: 2, picture: 'https://popwebsite.paquapp.com/popmartwww/pc/index_middle_banner_bg4.jpg', title: '三姐妹潮酷手办12套限量抢购', tag: '', price: 1499.99, num: 49 }
				]
			}
		},
		onLoad() {
			this.getSystemInfo()
		},
		methods: {
			getSystemInfo() {
				let systemInfo = uni.getSystemInfoSync()
				this.statusBarHeight = systemInfo.statusBarHeight
			},
			getBannerChange(e) {
      	this.current = e.detail.current
			}
		}
	}
</script>

<style>
</style>
