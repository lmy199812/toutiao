<template>
  <div>
    <van-cell
      v-if="articleInfo.cover.type === 0"
      :title="articleInfo.title"
      :label="articleDesc"
      @click="toDetail(articleInfo.art_id)"
    ></van-cell>
    <van-cell
      v-if="articleInfo.cover.type === 1"
      :title="articleInfo.title"
      label="articleDesc"
      @click="toDetail(articleInfo.art_id)"
      ><van-image
        width="3rem"
        height="2rem"
        :src="articleInfo.cover.images[0]"
      />
    </van-cell>
    <van-cell
      v-if="articleInfo.cover.type === 3"
      :title="articleInfo.title"
      @click="toDetail(articleInfo.art_id)"
      ><template #label
        ><div>
          <van-image
            v-for="(item, index) in articleInfo.cover.images"
            :key="index"
            width="3rem"
            height="
      2rem"
            :src="item"
          />
        </div>
        <span>{{ articleDesc }}</span>
      </template></van-cell
    >
  </div>
</template>

<script>
import dayjs from '@/utils/day'
export default {
  props: {
    articleInfo: {
      type: Object,
      required: true
    }
  },
  computed: {
    articleDesc() {
      const art = this.articleInfo
      const relativeTime = dayjs(art.pubdate).fromNow()
      return `${art.aut_name} ${art.comm_count}评论 ${relativeTime}`
    }
  },
  methods: {
    toDetail(id) {
      this.$router.push(`/detail/${id}`)
    }
  }
}
</script>

<style></style>
