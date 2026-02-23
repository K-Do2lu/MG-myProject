<template>
    <h1>Form</h1>
    <section>
        <div class="cont">
            <div class="bx">
                <h2><em>Input</em></h2>
                <div class="bx">


                    <div class="form-field">
                        <label class="form-field_label">
                            {{ label }}
                            <div class="form-input">
                                <span class="form-input__icon form-input__icon--prefix">
                                    <slot name="prefix"></slot>
                                </span>

                                <input
                                type="text"
                                class="form-input__control"
                                :value="modelValue"
                                :placeholder="placeholder"
                                
                                >
                            </div>
                        </label>
                    </div>


                </div>
            </div>
        </div>
    </section>
</template>

<script setup></script>

<style lang="scss" scoped></style>