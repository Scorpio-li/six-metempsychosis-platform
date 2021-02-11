<template>
    <div class="content">
        <!-- 查询模块 -->
        <div class="search-wrapper">
            <a-form layout="inline">
                <a-row :gutter="48">
                    <a-col :md="8" :sm="24">
                        <a-form-item label="网站名称">
                            <a-input v-model="queryParam.name" placeholder="" />
                        </a-form-item>
                    </a-col>
                    <a-col :md="8" :sm="24">
                        <a-form-item label="网站标签">
                            <a-select v-model="queryParam.tags" placeholder="请选择" :token-separators="[',']" @change="handleChange">
                                <a-select-option value="0">全部</a-select-option>
                                <a-select-option value="1">关闭</a-select-option>
                                <a-select-option value="2">运行中</a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :md="!advanced && 8 || 24" :sm="24">
                        <span class="table-page-search-submitButtons" :style="advanced && { float: 'right', overflow: 'hidden' } || {} ">
                            <a-button type="primary" @click="$refs.table.refresh(true)">查询</a-button>
                            <a-button style="margin-left: 8px;" @click="() => queryParam = {}">重置</a-button>
                        <!-- <a @click="toggleAdvanced" style="margin-left: 8px">
                        {{ advanced ? '收起' : '展开' }}
                        <a-icon :type="advanced ? 'up' : 'down'"/>
                        </a> -->
                        </span>
                    </a-col>
                </a-row>
            </a-form>
        </div>
        <!-- 借鉴网站页面 -->
        <div class="website website-list">
            <a-button class="add-btn" type="primary" icon="plus" @click="handleAdd">新建</a-button>
            <!-- 网站列表 -->
            <a-list :grid="{ gutter: 24, xl: 4, lg: 3, md: 3, sm: 2, xs: 1 }" :data-source="listData">
                <a-list-item slot="renderItem" slot-scope="item">
                    <a-card class="list-card-item" hoverable> 
                        <!-- 上部图片 -->
                        <img slot="cover" :src="item.imgsrc" :alt="item.name">
                        <!-- 中部内容 -->
                        <a-card-meta :title="item.title">
                            <template slot="description">
                                <ellipsis :length="50">{{ item.desc }}</ellipsis>
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
            <!-- <a-button class="new-btn" type="dashed">
                <a-icon type="plus" />
                新增网站
            </a-button> -->
        </div>
        <!-- 新建网站表单 -->
        <create-form
            ref="createModal"
            :visible="visible"
            :loading="confirmLoading"
            :model="mdl"
            @cancel="handleCancel"
            @ok="handleOk"
        />
    </div>
</template>

<script>
import Ellipsis from '@/views/template/Ellipsis'
import CreateForm from './modules/CreateForm'

// function getBase64(img, callback) {
//     const reader = new FileReader()
//     reader.addEventListener('load', () => callback(reader.result))
//     reader.readAsDataURL(img)
// }

export default {
    components: {
        Ellipsis,
        CreateForm
    },
    data() {
        return {
            breadcrumb: [{title: '网站管理', path: ''}, {title: '借鉴网站', path: ''}],
            // 高级搜索 展开/关闭
            advanced: false,
            // 查询参数
            queryParam: {},
            listData: [{
                id: 1,
                imgsrc: 'https://cdn.jsdelivr.net/gh/Scorpio-li/picture/document/jimi/scan-code-login.png',
                name: '1111',
                desc: '这是按实际大神解答快结束了看党建埃里克森几点啦快结束了的课件案例三等奖拉克丝建档立卡吉林省肯德基拉手孔建档立卡结束了',
                address: 'http://www.baidu.com',
                tags: ['cs', 'lzl']
            }],
            // create model
            visible: false,
            confirmLoading: false,
            mdl: null
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
        },
        // 切换标签选择
        handleChange(val) {
            console.log(`selected${val}`) 
        },
        // 添加网站
        handleAdd() {
            this.mdl = null
            this.visible = true
        },
        handleCancel() {
            this.visible = false
            const form = this.$refs.createModal.form
            form.resetFields() // 清理表单数据（可不做）
        },
        getFileUrl(file) {
            let getUrl = null
            if (window.createObjectURL != undefined) { // basic
                getUrl = window.createObjectURL(file)
            } else if (window.URL != undefined) { // firefox
                getUrl = window.URL.createObjectURL(file)
            } else if (window.webkitURL != undefined) { // chrome
                getUrl = window.webkitURL.createObjectURL(file)
            }
            return getUrl
        },
        handleOk() {
            const form = this.$refs.createModal.form
            // this.confirmLoading = true
            form.validateFields((errors, values) => {
                console.log('values', values, errors)
                values.imgsrc = this.getFileUrl(values.imgsrc.file)
                if (!errors) {
                    console.log('values', values)
                    
                    if (values.id > 0) {
                        // 修改 e.g.
                        // new Promise(resolve => {
                        //     setTimeout(() => {
                        //         resolve()
                        //     }, 1000)
                        // }).then(() => {
                        //     this.visible = false
                        //     this.confirmLoading = false
                        //     // 重置表单数据
                        //     form.resetFields()
                        //     // 刷新表格
                        //     this.$refs.table.refresh()

                        //     this.$message.info('修改成功')
                        // })
                    } else {
                        // 新增
                        new Promise(resolve => {
                            // setTimeout(() => {
                            //     resolve()
                            // }, 1000)
                            values.type = 'reference'
                            
                            this.$api.websites.addwebsite(values).then(res => {
                                console.log('res', res)
                                if (res.code === 0) {
                                    this.$message.success(res.msg)
                                } else {
                                    this.$message.warning(res.msg)
                                }
                            }).finally(() => {
                                resolve()
                            })
                        }).then(() => {
                            this.visible = false
                            this.confirmLoading = false
                            // 重置表单数据
                            form.resetFields()
                            // 刷新表格
                            // this.$refs.table.refresh()

                            this.$message.info('新增成功')
                        })
                    }
                } else {
                    this.confirmLoading = false
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.add-btn,
.search-wrapper {
    margin-bottom: 15px;
}
.card-footer {
    margin-top: 15px;
}
.new-btn {
    background-color: #fff;
    border-radius: 2px;
    width: 100%;
    height: 188px;
}

 </style>
