<template>
    <div>
        <ul>
            <li v-for="node in data" :key="node.label">
                <test :num="node.Option"></test>
                {{ node.label }}
                <ul v-if="node.children">
                    <li v-for="child in node.children" :key="child.label">
                        <test :num="child.Option"></test>
                        {{ child.label }}
                        <ul v-if="child.children">
                            <li v-for="childs in child.children" :key="childs.label">
                                <test :num="childs.Option"></test>
                                {{ childs.label }}
                            </li>
                        </ul>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</template>

<script>
import test from '@/test/test.vue'
export default {
  components: {
    test,
  },
    data() {
        return {
            data: [
                {

                    label: '报告列表',
                    icon: 'el-icon-folder',
        
                    children: [
                        {
                            label: 'NBI组件演示',
                            icon: 'el-icon-folder',
                            thumbnail: '/src/assets/imgs/excel.png',
                            children: [
                                {
                                    Option: 1,
                                    label: '组件',
                                    icon: 'el-icon-document',
                        
                                },
                            ],
                        },
                        {
                            label: 'NBI功能演示',
                            icon: 'el-icon-folder',
                
                            children: [
                                {
                                    Option: 2,
                                    label: '功能',
                                    icon: 'el-icon-document',
                        
                                },
                            ],
                        },
                        {
                            label: '其他',
                            icon: 'el-icon-folder',
                
                            children: [
                                {
                                    Option: 3,
                                    label: '1',
                                    icon: 'el-icon-document',
                        
                                },
                            ],
                        },
                    ],
                },
            ],
        }
    }
}
</script>
