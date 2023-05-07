<template>
  <div>
    <template v-if="hasShowingChild(item.children) && !item.hidden">
      <router-link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
        <el-menu-item :index="resolvePath(onlyOneChild.path)">
          <i :class="onlyOneChild.meta.icon" />
        </el-menu-item>
      </router-link>
    </template>
  </div>
</template>

<script>
import path from 'path'

export default {
    name: 'SidebarItem',
    props: {
        // route object
        item: {
            type: Object,
            required: true
        },
        basePath: {
            type: String,
            default: ''
        }
    },
    data() {
        this.onlyOneChild = null
        return {}
    },
    methods: {
        // 将子路由的第一个添加到左边栏目中，同时保证只出现一个子路由
        hasShowingChild(children = []) {
            const showingChildren = children.filter(item => {
                if (item.hidden) {
                    return false
                }
                this.onlyOneChild = item
                return true
            })
            return showingChildren.length === 1
        },
        // 重组路由
        resolvePath(routePath) {
            return path.resolve(this.basePath, routePath)
        }
    }
}
</script>
