<template>
    <!--Left Part-->
    <div class="table-cell-left col"
         :class="{s11: isModeEdit, s12: !isModeEdit}">
        <!--Row 1-->
        <!--Image and Abbr. of Currency-->
        <div class="table-cell-name col s4" @click="abbrClicked()">
            <img class="imgNation" v-bind:src="data.img" alt="">
            <span class="abbrNation">{{ abbr }}</span>
        </div>
        <!--Amount and Input-->
        <div class="table-cell-number col s8">
            <div class="col s12">
                <span v-show="!editingAbbr || abbr !== editingAbbr"
                      @click="toggleEditing(true)"
                      class="table-amount col s12 right-align">
                    {{ data.amount }}
                </span>
                <input v-show="editingAbbr && abbr === editingAbbr" class="table-input col s12 right-align"
                       type="number"
                       v-bind:id="'input-' + abbr"
                       v-model="amountEditing"
                       v-input-focus="editingAbbr === abbr"
                       @blur="toggleEditing(false)"
                       @keyup.enter="toggleEditing(false)">
            </div>
        </div>
        <!--Row 2-->
        <div class="col s12">
            <span class="table-money-unit col s12 right-align">{{ data.unit }}</span>
        </div>
    </div>

    <!--Right Part-->
    <!--<div class="table-cell-right col s1"-->
         <!--v-show="isModeEdit"-->
         <!--@click="btnRemove()">-->
        <!--<a href="#">X</a>-->
    <!--</div>-->

    <!--<div class="table-row row" v-show="modeEdit">-->
    <!--<div class="col s8">-->
    <!--<v-select multiple :value.sync="selections" :options="dataSelection">-->
    <!--</v-select>-->
    <!--</div>-->
    <!--<div class="col s2">-->
    <!--<button class="waves-effect waves-light btn" @click="toggleEditMode()">Done</button>-->
    <!--</div>-->
    <!--</div>-->

    <!--<div id="padding" class="row" style="height: 70px"></div>-->
</template>

<script>
    import {mapMutations, mapGetters, mapState} from 'vuex';

    export default {
        name: "currency",
        // 获取父组件信息
        props: ['abbr'],
        data: function () {
            return {
                amountEditing: null
            };
        },
        computed: {
            /**
             * Gets data to display
             * @returns {img, unit, amount}
             */
            data: function () {
                return this.$store.getters.getCurrency({
                    abbr: this.abbr
                });
            },
            ...mapState([
                'editingAbbr',
                'isModeEdit'
            ]),
        },
        methods: {
            abbrClicked: function () {
                // no need to mapMutations it
                this.$store.commit('changeTopRow', {
                    abrr: this.abbr
                });
            },
            toggleEditing: function (startEditing) {
                // 判断无效toggle
                // 用于解决 @enter 和 @blur 两次触发该函数
                if (this.editingAbbr !== this.abbr && !startEditing) {
                    // 不是编辑当前 && 退出编辑
                    return;
                }

                if (this.editingAbbr !== this.abbr) {
                    // 如果开始编辑当前货币
                    // update input value
                    this.amountEditing = this.data.amount;
                } else {
                    // 如果退出编辑当前货币
                    // 更新 store.state.amount
                    this.$store.commit('updateAmount', {
                        amount: this.$store.getters.convertTo({
                            from: this.abbr,
                            to: this.$store.state.listAbbr[0],
                            amount: this.amountEditing
                        })
                    });
                }

                // 更新编辑状态
                this.$store.commit('toggleEditing', {
                    abbr: this.abbr
                });
            },
            btnRemove: function () {
                // todo
            }
        },
        directives: {
            'input-focus': function (el, binding) {
                if (binding.value) {
                    el.focus();
                }
            }
        }
    };
</script>

<style scoped lang="scss">
</style>