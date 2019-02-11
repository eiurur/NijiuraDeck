# watch

    var watchExampleVM = new Vue({
      el: '#watch-example',
      data: {
        question: '',
        answer: 'I cannot give you an answer until you ask a question!'
      },
      watch: {
        // この関数は question が変わるごとに実行されます。
        question: function (newQuestion) {
          this.answer = 'Waiting for you to stop typing...'
          this.getAnswer()
        }
      },
      methods: {
        // _.debounce は特にコストの高い処理の実行を制御するための
        // lodash の関数です。この場合は、どのくらい頻繁に yesno.wtf/api
        // へのアクセスすべきかを制限するために、ユーザーの入力が完全に
        // 終わるのを待ってから ajax リクエストを実行しています。
        // _.debounce (とその親戚である _.throttle )  についての詳細は
        // https://lodash.com/docs#debounce を見てください。
        getAnswer: _.debounce(
          function () {
            if (this.question.indexOf('?') === -1) {
              this.answer = 'Questions usually contain a question mark. ;-)'
              return
            }
            this.answer = 'Thinking...'
            var vm = this
            axios.get('https://yesno.wtf/api')
              .then(function (response) {
                vm.answer = _.capitalize(response.data.answer)
              })
              .catch(function (error) {
                vm.answer = 'Error! Could not reach the API. ' + error
              })
          },
          // ユーザーの入力が終わるのを待つ時間をミリ秒で指定します。
          500
        )
      }
    })

# computed

    var vm = new Vue({
      el: '#demo',
      data: {
        firstName: 'Foo',
        lastName: 'Bar'
      },
      computed: {
        fullName: function () {
          return this.firstName + ' ' + this.lastName
        },
        now: function () {
          return Date.now()
        }
      }
    })

# methods

# mounted

ライフサイクル

beforeCreate
created
beforeMount
mounted
beforeUpdate
updated
activated
deactivated
beforeDestroy
destroyed
errorCaptured

> https://jp.vuejs.org/v2/api/index.html#mounted

![](https://d33wubrfki0l68.cloudfront.net/435786c6cbd23e078c35c2b21f40e1756b2c3d30/2098f/images/vuejs/external/component-lifecycle.png)

> https://alligator.io/vuejs/component-lifecycle/

