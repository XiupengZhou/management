<template>
  <div class="flex jc-sa fww">
    <li>1</li>
    <li>1</li>
    <li>1</li>
    <li>1</li>
    <li>1</li>
    <li>1</li>
    <li>1</li>
    <li>1</li>
  </div>
</template>

<script>
export default {
  created() { 
    let list = [
        {
            "id": "ff894830-271b-11ec-bbbe-19661d3139dd",
            "cTime": 1633576174642,
            "uTime": 1633576174642,
            "amount": "1111",
            "type": "recharge"
        },
        {
            "id": "e03babd0-271b-11ec-a685-834618437a06",
            "cTime": 1633576122124,
            "uTime": 1633576122124,
            "amount": "100",
            "type": "recharge"
        },
        {
            "id": "dc6109b0-271b-11ec-9536-a3192c4efe10",
            "cTime": 1633576115659,
            "uTime": 1633576115659,
            "amount": 0,
            "type": "recharge"
        },
        {
            "id": "a89db1f0-271b-11ec-a5af-2b9df889e2f6",
            "cTime": 1633576028814,
            "uTime": 1633576028814,
            "amount": "100",
            "type": "recharge"
        },
        {
            "id": "9a84afb0-271b-11ec-abc7-2992ab29fe83",
            "cTime": 1633576005163,
            "uTime": 1633576005163,
            "amount": "100",
            "type": "recharge"
        }
    ]

    list.reduce((a,b)=> {
      console.log(a);
    },0)
  }
};
</script>

<style> 
</style>