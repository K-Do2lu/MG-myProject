<template>
    <div class="form-field">
        <label for="form-field__label"><span class="form-field__label-text"></span>{{ label }}</label>

        <div class="form-select">

            <!-- prefix icon: select 왼쪽에 표시 (위치 아이콘 등) -->
            <!-- aria-hidden: 스크린리더에서 건너뜀 (장식용용) -->
            <span class="form-select__icon form-select__icon--prefix" aria-hidden="true"><slot name="prefix"></slot></span>

            <!-- select: 실제 선택 요소 -->
             <select
                class="form-select__control"
                :value="modelValue"
                :aria-describedby="desc"
             ></select>
        </div>
    </div>
</template>