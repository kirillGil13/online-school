<template>
    <el-col>
        <div class="tabs">
            <ul>
                <li v-for="(tab, index) in tabsResponse" :key="index" :class="{ 'is-active': tab.isActive }">
                    <a :href="'#' + tab.id" @click="selectTab(tab.id)">{{ tab.title }}</a>
                </li>
            </ul>
        </div>

        <div class="tabs-details">
            <slot></slot>
        </div>
    </el-col>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { ITabs } from '@/entity/tabs/tabs.types';

@Component
export default class Tabs extends Vue {
    @Prop() readonly tabsResponse!: ITabs[];
    selectTab(id: string): void {
        this.$emit('select', id);
    }
}
</script>
<style lang="scss">
.tabs {
    display: flex;
    align-items: center;
    width: max-content;
    height: 60px;
    margin-top: 36px;
    margin-bottom: 16px;
    background: #ffffff;
    border: 1px solid #f2f2f2;
    box-sizing: border-box;
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.04);
    border-radius: 8px;
    padding: 6px 16px 16px 16px;
    ul {
        list-style: none;
        display: flex;
        flex-direction: row;
        align-items: center;
        padding-left: 0;
        margin: 0;
        li {
            margin-right: 24px;
            &:nth-last-child(1) {
                margin-right: 0;
            }
            &.is-active {
                a {
                    color: #426df6;
                    &::after {
                        width: 100%;
                    }
                }
            }
            a {
                font-size: 14px;
                color: #5f739c;
                position: relative;
                &:hover {
                    color: #426df6;
                }
                &::after {
                    content: '';
                    width: 0;
                    position: absolute;
                    height: 2px;
                    background-color: #426df6;
                    left: 0;
                    bottom: -10px;
                }
            }
        }
    }
}
</style>
