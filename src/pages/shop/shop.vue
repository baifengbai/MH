<template>
  <div class="page-shop">
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
      <div class="category-bar" :style="{'max-height':showCategory ? '360rpx' : '116rpx'}">
        <div class="category">
					<scroll-view class="category-x" scroll-x scroll-left scroll-with-animation :scroll-into-view="'category' + categoryIndex" :style="{'margin-top':showCategory ? '-90rpx' : '0'}">
            <div :id="'category' + index" class="item" :class="{'active':categoryIndex == index}" v-for="(item, index) in categoryList" :key="item.id" @click="btnChangeCategory(index)">{{item.name}}</div>
          </scroll-view>
          <div class="category-list">
            <div class="title">所有分类</div>
            <div class="list">
              <div class="item" v-for="item in categoryList" :key="item.id">{{item.name}}</div>
            </div>
          </div>
        </div>
        <div class="show">
					<img :class="{'active':showCategory}" :style="{'padding':showCategory ? '10rpx 30rpx' : '30rpx','margin-top':showCategory ? '20rpx' : '0'}" :src="icon + 'to-down.png'" lazy-load webp @click="showCategory = !showCategory">
        </div>
      </div>
		</div>
    <div class="page-shop-list" style="margin-top:0;box-shadow:none;border-radius:0;">
			<div class="status-bar-dao" :style="{'height':statusBarHeight + 'px'}"></div>
      <div class="list">
        <div class="list-left">
          <div class="item fade-in-top" v-for="item in shopListLeft" :key="item.id">
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
          <div class="item fade-in-top" v-for="item in shopListRight" :key="item.id">
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
      <div class="loading-end">- 已经到底了 -</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return{
      icon: this.$config.ICON_URL,
      statusBarHeight: '',
      showCategory: false,
      categoryIndex: 0,
      categoryList: [
        { id: 0, name: '推荐' },
        { id: 1, name: '明星' },
        { id: 2, name: '动漫' },
        { id: 3, name: '文旅' },
        { id: 4, name: '故宫系列' },
        { id: 5, name: '泡泡玛特' },
        { id: 5, name: '杨幂' }
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
    btnChangeCategory(index) {
      this.categoryIndex = index
    }
  }
}
</script>

<style>

</style>