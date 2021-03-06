<template>
    <a-config-provider :locale="locale">
        <div id="app">
            <RouterView v-if="isRouterAlive" />
        </div>
    </a-config-provider>  
</template>

<script>
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
import { deviceEnquire, DEVICE_TYPE } from '@/util/device'

export default {
    provide() {
        return {
            reload: this.reload
        }
    },
    data() {
        return {
            locale: zhCN,
            isRouterAlive: true
        }
    },
    watch: {
        $route: 'routeChange'
    },
    mounted() {
        const { $store } = this
        deviceEnquire(deviceType => { // 响应式
            switch (deviceType) {
                case DEVICE_TYPE.DESKTOP:
                    $store.commit('TOGGLE_DEVICE', 'desktop')
                    $store.dispatch('setSidebar', true)
                    break
                case DEVICE_TYPE.TABLET:
                    $store.commit('TOGGLE_DEVICE', 'tablet')
                    $store.dispatch('setSidebar', false)
                    break
                case DEVICE_TYPE.MOBILE:
                default:
                    $store.commit('TOGGLE_DEVICE', 'mobile')
                    $store.dispatch('setSidebar', true)
                    break
            }
        })
    },
    methods: {
        reload() {
            this.isRouterAlive = false
            this.$nextTick(() => (this.isRouterAlive = true))
        },
        routeChange(newVal, oldVal) {
            if (newVal.name == oldVal.name) {
                this.reload()
            }
        }
    },
    metaInfo: {
        titleTemplate: title => {
            return title
                ? `${title} - ${process.env.VUE_APP_TITLE}`
                : process.env.VUE_APP_TITLE
        }
    }
}
</script>

<!--这里存放全局样式-->
<style>
    #app {
        height: 100%;
    }
    body {
        font-size: 12px;
    }
    .ant-table-wrapper {
        font-size: 12px !important;
        background: #fff;
        border: 1px solid #e9eaec;
    }
    .ant-table-pagination.ant-pagination {
        margin: 5px 10px 5px 0 !important;
    }
    .ant-table-content .ant-table-thead > tr > th {
        font-weight: 700 !important;
    }
    .scrollbar {
        max-height: 520px;
        overflow-y: auto;
    }
    .scrollbar::-webkit-scrollbar {/* 滚动条整体样式 */
        width: 5px;     /* 高宽分别对应横竖滚动条的尺寸 */
        height: 5px;
    }
    .scrollbar::-webkit-scrollbar-thumb {/* 滚动条里面小方块 */
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        background: #535353;
    }
    .scrollbar::-webkit-scrollbar-track {/* 滚动条里面轨道 */
        -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        border-radius: 10px;
        background: #ededed;
    }

    /* ant-select-dropdown-menu 下拉框的滚动条的改写 */
    .ant-select-dropdown-menu::-webkit-scrollbar {/* 滚动条整体样式 */
        width: 5px;     /* 高宽分别对应横竖滚动条的尺寸 */
        height: 5px;
    }
    .ant-select-dropdown-menu::-webkit-scrollbar-thumb {/* 滚动条里面小方块 */
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        background: #535353;
    }
    .ant-select-dropdown-menu::-webkit-scrollbar-track {/* 滚动条里面轨道 */
        -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        border-radius: 10px;
        background: #ededed;
    }

    /* ant-transfer组件的滚动条的改写 */
    .ant-transfer-list-content {
        overflow-y: auto;
    }
    .ant-transfer-list-content::-webkit-scrollbar {/* 滚动条整体样式 */
        width: 5px;     /* 高宽分别对应横竖滚动条的尺寸 */
        height: 5px;
    }
    .ant-transfer-list-content::-webkit-scrollbar-thumb {/* 滚动条里面小方块 */
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        background: #535353;
    }
    .ant-transfer-list-content::-webkit-scrollbar-track {/* 滚动条里面轨道 */
        -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        border-radius: 10px;
        background: #ededed;
    }
</style>
