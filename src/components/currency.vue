<template>
    <div>
        <!--Left Part-->
        <div class="table-cell-left col"
             :class="{s10: isAppModeEdit, s12: !isAppModeEdit}">
            <!--Row 1-->
            <!--Image and Abbr. of Currency-->
            <div class="table-cell-name col s4" @click="abbrClicked()">
                <img class="imgNation" v-bind:src="data.img" alt="">
                <span class="abbrNation">{{ abbr }}</span>
            </div>
            <!--Amount and Input-->
            <div class="table-cell-number col s8">
                <div class="col s12">
                <span class="table-amount col s12 right-align"
                      v-show="!abbrInputEditing || abbr !== abbrInputEditing"
                      @click="toggleEditing(true)">
                    {{ data.amount }}
                </span>
                    <input class="table-input col s12 right-align"
                           type="number"
                           ref="input"
                           v-show="abbrInputEditing && abbr === abbrInputEditing"
                           v-model="amountEditing"
                           @blur="toggleEditing(false)"
                           @keyup.enter="toggleEditing(false)"
                           @keyup.esc="toggleEditing(false)">
                </div>
            </div>
            <!--Row 2-->
            <div class="col s12">
                <span class="table-money-unit col s12 right-align">{{ data.unit }}</span>
            </div>
        </div>

        <!--Right Part-->
        <div class="col s2"
             v-show="isAppModeEdit"
        >
            <div class="row edit-btn"
                 @click="btnRemove()">
                <i class="fas fa-trash"></i>
            </div>

            <div class="row handle edit-btn">
                <i class="fas fa-bars"></i>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState} from "vuex";

    export default {
        name: "currency",
        // 获取父组件信息
        props: ["abbr"],
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
                "abbrInputEditing",
                "isAppModeEdit",
                "listAbbr"
            ])
        },
        methods: {
            abbrClicked: function () {
                // no need to mapMutations it
                this.$store.commit("changeTopRow", {
                    abbr: this.abbr
                });
            },
            toggleEditing: function (startEditing) {
                // 判断无效toggle
                // 用于解决 @enter 和 @blur 两次触发该函数
                if (this.abbrInputEditing !== this.abbr && !startEditing) {
                    // 不是编辑当前 && 退出编辑
                    return;
                }

                // todo: 顺序有问题
                // 更新编辑状态
                this.$store.commit("toggleEditing", {
                    abbr: this.abbr
                });

                if (this.abbrInputEditing === this.abbr) {
                    // 如果开始编辑当前货币
                    // update input value
                    this.amountEditing = this.data.amount;

                    // input focus
                    // select
                    const elm = this.$refs.input;
                    elm.focus();
                } else {
                    // 如果退出编辑当前货币
                    // 更新 store.state.amount
                    this.$store.commit("updateAmount", {
                        amount: this.amountEditing,
                        abbr: this.abbr
                    });
                }

            },
            btnRemove: function () {
                this.$store.commit('deleteAbbr', {
                    abbr: this.abbr
                });
            }
        },
    };
</script>

<style scoped lang="scss">
    $border-color: rgba(128, 128, 128, 0.1);

    input {
        font-size: 1.6em;
    }

    .edit-btn {
        cursor: pointer;
        margin: 0;
        text-align: center;
        padding: 0.28em 0;

        border-left: $border-color 1px solid;

        &:first-child {
            border-bottom: $border-color 1px solid;
        }
    }

    .abbrNation {
        font-weight: bold;
        font-size: 1.5em;
    }

    .table-amount {
        font-size: 1.6em;
    }

    .table-money-unit {
        font-weight: lighter;
    }

</style>