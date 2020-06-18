Vue.component('quotes', {
  data: function(){
    return{
      user_input: '',
      reveal: []
    }
  },
  template: `
    <form>
      <input v-model="user_input" id="user_input" type="text"></input>
      <button @click.prevent="quote_btn">reveal quotes!</button>
    </form>
  `,
  methods:{
    quote_btn: function() {
      axios({
        method: 'get',
        // url:'https://favqs.com/api/qotd',
        url:"https://favqs.com/api/quotes/",
        headers:{
          Authorization: 'Token token="b4e307531c2619699ea3df9c3f0ced40"'
        },
        params: {
          filter: this.user_input,
          type: 'tag',
        }
      })
      .then(response => {(this.reveal = response.data.quotes);
      this.$emit('output', this.reveal)
      })
    }
  }
});
let vm = new Vue ({
  el:'#app',
  data: {
    reveal:[],
    qotd:null
  },
  mounted() {
    axios({
      url:'https://favqs.com/api/qotd',
      method: 'get',
    }).then(response => {(this.qotd = response.data.quote.body)})
  }
});