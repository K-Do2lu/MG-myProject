<template>
     <!-- input -->
                     <!-- .form-field -> form 공통 class -->
                     <div class="form-field">

<label class="form-field__label">
    <span class="form-field__label-text">{{label}}</span>

    <div class="form-input">
        <!-- icon -->
        <span class="form-input__icon form-input__icon--prefix" aria-hidden="true"><img src="/src/assets/vue.svg" alt=""></span>
        <!-- input -->
        <input
            type="text"
            class="form-input__control"
            :value="modelValue"
            :placeholder="placeholder"
            :aria-describedby="describedByIds"
            :aria-invalid="!!error"
            :required="required"
            @input="$emit('update:modelValue', $event.target.value)"
            />
    </div>
</label>
<span v-if="hint" :id="`${fieldId}-hint`" class="form-field__hint">{{ hint }}</span>
<span v-if="error" :id="`${fieldId}-error`" class="form-field__error" role="alert">{{ error }}</span>
</div>
</template>

<script setup>
    
</script>