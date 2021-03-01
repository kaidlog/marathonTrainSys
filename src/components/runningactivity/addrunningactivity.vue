 <template>
  <div id="addrunningactivity">
    {{ result }}
    <div>
        <Form :model="formLeft" label-position="left" :label-width="100">
            <FormItem label="pacePerKm">
                <Input v-model="formLeft.pacePerKm"></Input>
            </FormItem>
            <FormItem label="distance">
                <Input v-model="formLeft.distance"></Input>
            </FormItem>
            <FormItem label="calories">
                <Input v-model="formLeft.calories"></Input>
            </FormItem>
            <FormItem label="heartRate">
                <Input v-model="formLeft.heartRate"></Input>
            </FormItem>
            <FormItem label="elevationVariation">
                <Input v-model="formLeft.elevationVariation"></Input>
            </FormItem>
            <button v-on:click="greet">summit</button>
                
        </Form>
    </div>
  </div>
</template>
<script>
import addrunningactivityApi from "@api/addrunningactivity/addrunningactivity-api.js";

export default {
    name: 'addrunningactivity',
    data() {
        return {
            result: "",
            formLeft: {
                    runningActivityId: '',
                    pacePerKm: '',
                    distance: '',
                    calories: '',
                    heartRate: '',
                    elevationVariation: '',
                    creDateTime: '',
                    updDateTime: '',
                    creator: 'test1234',
                    updater: 'test4321',
                    isValid: '1'
                }
            }
        },
    methods: {
        greet: async function () {
        //alert(event.target.tagName)
            this.result = await addrunningactivityApi.doAddRunningActivityList(this.formLeft);
            if(this.result.status != 200) return this.$router.push({path:"/error"});
        }
    }
}
</script>

<style>
</style>
