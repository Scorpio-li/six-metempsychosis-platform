<template>
    <a-modal
        title="新建网站"
        :width="640"
        :visible="visible"
        :confirm-loading="loading"
        @ok="() => { $emit('ok') }"
        @cancel="() => { $emit('cancel') }"
    >
        <a-spin :spinning="imgloading">
            <a-form :form="form" v-bind="formLayout">
                <!-- 检查是否有 id 并且大于0，大于0是修改。其他是新增，新增不显示主键ID -->
                <a-form-item v-show="model && model.id > 0" label="主键ID">
                    <a-input v-decorator="['id', { initialValue: 0 }]" disabled />
                </a-form-item>
                <a-form-item label="上传图片">
                    <a-upload
                        v-decorator="['imgsrc', {rules: [{required: true, message: '请上传图片！'}]}]"
                        name="imgsrc"
                        list-type="picture-card"
                        class="img-uploader"
                        :show-upload-list="false"
                        action="http://127.0.0.1:36677/upload"
                        :before-upload="beforeUpload"
                        @change="handleChange"
                    >
                        <img v-if="imageUrl" :src="imageUrl" alt="img">
                        <div v-else>
                            <a-icon :type="imgloading ? 'loading' : 'plus'" />
                            <div class="ant-upload-text">
                                Upload
                            </div>
                        </div>
                    </a-upload>
                </a-form-item>
                <a-form-item label="网站名称">
                    <a-input v-decorator="['name', {rules: [{required: true, max: 12, message: '请输入至多12个字符的网站名称！'}]}]" />
                </a-form-item>
                <a-form-item label="网站简介">
                    <a-input v-decorator="['desc', {rules: [{required: true, min: 10, message: '请输入至多十个字符的网站简介！'}]}]" type="textarea" />
                </a-form-item>
                <a-form-item label="网站地址">
                    <a-input v-decorator="['address', {rules: [{required: true, message: '请输入网站地址！'}]}]" />
                </a-form-item>
            </a-form>
        </a-spin>
    </a-modal>
</template>

<script>
import pick from 'lodash.pick'

// 表单字段
const fields = ['imgsrc', 'name', 'address', 'desc', 'id']

export default {
    props: {
        visible: {
            type: Boolean,
            required: true
        },
        loading: {
            type: Boolean,
            default: () => false
        },
        model: {
            type: Object,
            default: () => null
        }
    },
    data() {
        this.formLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 7 }
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 13 }
            }
        }
        return {
            form: this.$form.createForm(this),
            imgloading: false,
            imageUrl: ''
        }
    },
    created() {
        console.log('custom modal created')

        // 防止表单未注册
        fields.forEach(v => this.form.getFieldDecorator(v))

        // 当 model 发生改变时，为表单设置值
        this.$watch('model', () => {
            this.model && this.form.setFieldsValue(pick(this.model, fields))
        })
    },
    methods: {
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
        handleChange(info) {
            console.log('info.file', info, this.getFileUrl(info.file))
            this.imageUrl = this.getFileUrl(info.file)
            this.imgloading = false
            // getBase64(info.file, imageUrl => {
            //     // console.log('imageUrl', imageUrl)
            //     this.imageUrl = imageUrl
            //     this.imgloading = false
            // })
            // if (info.file.status === 'uploading') {
            //     this.imgloading = true
            //     return
            // } else if (info.file.status === 'done') {
            //     // Get this url from response in real world.
            //     getBase64(info.file.originFileObj, imageUrl => {
            //         console.log('imageUrl', imageUrl)
            //         this.imageUrl = imageUrl
            //         this.imgloading = false
            //     })
            // } else {
            //     getBase64(info.file.originFileObj, imageUrl => {
            //         console.log('imageUrl', imageUrl)
            //         this.imageUrl = imageUrl
            //         this.imgloading = false
            //     })
            // }
        },
        beforeUpload(file) {
            console.log('file', file, file.webkitRelativePath)
            const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
            if (!isJpgOrPng) {
                this.$message.error('You can only upload JPG or PNG file!')
            }
            const isLt2M = file.size / 1024 / 1024 < 2
            if (!isLt2M) {
                this.$message.error('Image must smaller than 2MB!')
            }
            // return isJpgOrPng && isLt2M
            return false
        }
    }
}
</script>

<style lang="scss">

.img-uploader {
    img {
        width: 128px;
        height: 128px;
    }
    .ant-upload {
        width: 128px;
        height: 128px;
    }
}
.ant-upload-select-picture-card i {
    font-size: 32px;
    color: #999;
}
.ant-upload-select-picture-card .ant-upload-text {
    margin-top: 8px;
    color: #666;
}

</style>
