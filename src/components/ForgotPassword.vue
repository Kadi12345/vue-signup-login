<template>
  <div>
    <div class="bgc-white h5276b8 text-align-center font-size-20-s padding-20-0 border-radius-5">A password reset link was sent to {{ emailentry }}.</div>
    <div class="width-93p bgc-white font-size-1 line-height-9 margin-0-auto-60-auto">&nbsp</div>
  </div>
</template>

<script>
export default {
  name: 'ForgotPassword',
  props: ['emailentry']
}
</script>
