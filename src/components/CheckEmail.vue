<template>
  <div>
    <div class="bgc-white h5276b8 text-align-center font-size-20-s padding-20 border-radius-5">
      <p>A verification link was sent to {{ emailentry }}.</p>
      <p>Please open your email and click the link to gain access.</p>
    </div>
    <div class="width-93p bgc-white font-size-1 line-height-9 margin-0-auto-60-auto">&nbsp</div>
  </div>
</template>

<script>
  export default {
    name: 'CheckEmail',
    props: ['emailentry']
  }
</script>
