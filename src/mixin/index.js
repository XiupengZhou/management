import moment from 'moment';
export default {
  methods: {
      formatDate(time) {   
        return moment(time*1).format("YYYY-MM-DD");
      }
  }
};
