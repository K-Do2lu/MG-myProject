<template>
    <h1>Form</h1>
    <section>
        <div class="cont">
            <div class="bx">
                <h2><em>Input</em></h2>
                <div class="bx">

                    <!-- input -->
                     <!-- .form-field -> form 공통 class -->
                     <div class="form-field">

                        <label class="form-field__label">
                            <span class="form-field__label-text">title</span>

                            <div class="form-input">
                                <!-- icon -->
                                <span class="form-input__icon form-input__icon--prefix" aria-hidden="true"><img src="/src/assets/vue.svg" alt=""></span>
                                <!-- input -->
                                <input
                                    type="text"
                                    class="form-input__control"
                                    placeholder="입력하세요"
                                    aria-describedby="search-error search-hint"
                                    aria-invalid="false"
                                    required
                                    />
                            </div>
                        </label>
                        <span id="search-hint" class="form-field__hint">최소 2자 이상 입력</span>
                        <span id="search-error" class="form-field__error" role="alert">에러 메시지</span>

                     </div>
      


                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import {computed}
</script>

<style lang="scss" scoped></style>