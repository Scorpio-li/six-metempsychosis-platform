<template>
    <div class="content">
        <!-- 借鉴网站页面 -->
        <div class="website website-list">
            <!-- 网站列表 -->
            <a-list :grid="{ gutter: 24, xl: 4, lg: 3, md: 3, sm: 2, xs: 1 }" :data-source="listData">
                <a-list-item slot="renderItem" slot-scope="item">
                    <a-card class="list-card-item" hoverable> 
                        <!-- 上部图片 -->
                        <img slot="cover" :src="item.imgsrc" :alt="item.name">
                        <!-- 中部内容 -->
                        <a-card-meta :title="item.title">
                            <template slot="description">
                                <ellipsis :length="20">{{ item.desc }}</ellipsis>
                            </template>
                        </a-card-meta>
                        <!-- 底部标签 -->
                        <div class="card-footer">
                            <template v-for="(tag) in item.tags">
                                <a-tooltip v-if="tag.length > 10" :key="tag" :title="tag">
                                    <a-tag :key="tag">
                                        {{ `${tag.slice(0, 20)}...` }}
                                    </a-tag>
                                </a-tooltip>
                                <a-tag v-else :key="tag">
                                    {{ tag }}
                                </a-tag>
                            </template>
                        </div>
                    </a-card>
                </a-list-item>
            </a-list>
        </div>
    </div>
</template>

<script>
import { Ellipsis } from '@/views/template/Ellipsis'
export default {
    components: {
        Ellipsis
    },
    data() {
        return {
            breadcrumb: [{title: '网站管理', path: ''}, {title: '借鉴网站', path: ''}],
            listData: [{
                id: 1,
                imgsrc: 'https://cdn.jsdelivr.net/gh/Scorpio-li/picture/document/jimi/scan-code-login.png',
                name: '1111',
                desc: '这是按实际大神解答快结束了看党建埃里克森几点啦快结束了的课件案例三等奖拉克丝建档立卡吉林省肯德基拉手孔建档立卡结束了',
                address: 'http://www.baidu.com',
                tags: ['cs', 'lzl']
            }]
        }
    },
    created() {
    },
    mounted() {
        this.setBreadcrumb()
    },
    methods: {
        setBreadcrumb() {
            this.$store.dispatch('setBreadcrumb', this.breadcrumb)
        }
    }
}
</script>

// <style lang="scss" scoped>

//
 </style>
