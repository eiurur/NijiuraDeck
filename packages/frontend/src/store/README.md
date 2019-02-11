```js
import Vue from 'vue';
import Vuex from 'vuex';
import { SOME_MUTATION } from './modules/mutation-types';

// コンポーネントが複数のストアのステートプロパティやゲッターを必要としているとき、これらすべてにおいて、算出プロパティを宣言することは繰り返しで冗長です。これに対処するため、算出ゲッター関数を生成し、いくつかのキーストロークを省くのに役立つ mapState ヘルパーを使うことができます:

Vue.use(Vuex);

// https://vuex.vuejs.org/ja/guide/mutations.html
// mutation:  Vuex のストアの状態を変更できる唯一の方法は、ミューテーションをコミットすることです。
// Vuex のミューテーションはイベントにとても近い概念です: 各ミューテーションはタイプとハンドラを持ちます。ハンドラ関数は Vuex の状態（state）を第1引数として取得し、実際に状態の変更を行います:
// ミューテーションハンドラを起動するためにはミューテーションのタイプを指定して store.commit を呼び出す必要があります:


/**
// 追加の引数を渡してコミットする
store.commit('increment', {
  amount: 10,
});
// オブジェクトスタイルのコミット
store.commit({
  type: 'increment',
  amount: 10,
});
 */




// https://vuex.vuejs.org/ja/guide/actions.html
// action: アクションは、状態を変更するのではなく、ミューテーションをコミットします。
// アクションは任意の非同期処理を含むことができます。
// アクションハンドラはストアインスタンスのメソッドやプロパティのセットと同じものを呼び出せるコンテキストオブジェクトを受け取ります。したがって context.commit を呼び出すことでミューテーションをコミットできます。あるいは context.state や context.getters で、状態やゲッターにアクセスできます。
// アクションは store.dispatch がトリガーとなって実行されます:
// store.dispatch('increment')

/**
// ペイロードを使ってディスパッチする
store.dispatch('incrementAsync', {
  amount: 10
})

// オブジェクトを使ってディスパッチする
store.dispatch({
  type: 'incrementAsync',
  amount: 10
})
 */

export default new Vuex.Store({
  // 状態
  state: { count: 0 },
  // mutaion: 同期処理
  mutations: {
    [SOME_MUTATION](state, payload) {
      state.count += payload.amount;
    },
  },
  // 非同期処理
  actions: {
    [SOME_MUTATION](context) {
      context.commit('increment');
    },
  },
});

// モジュールのミューテーションやゲッターの中では、渡される第1引数はモジュールのローカルステートです。
const moduleA = {
  state: { count: 0 },
  mutations: {
    increment (state) {
      // `state` はモジュールのローカルステート
      state.count++
    },
    // モジュールのアクションの中では context.state はローカルステートにアクセスでき、ルートのステートは context.rootState でアクセスできます:
    incrementIfOddOnRootSum ({ state, commit, rootState }) {
      if ((state.count + rootState.count) % 2 === 1) {
        commit('increment')
      }
    },
    // モジュールのゲッターの中では、ルートのステートは第3引数でアクセスできます:
    sumWithRootCount (state, getters, rootState) {
      return state.count + rootState.count
    }
  },

  getters: {
    doubleCount (state) {
      return state.count * 2
    }
  }
}

const moduleB = {
  state: {  },
  mutations: {  },
  actions: {  }
}

// store.state.a // -> `moduleA` のステート
// store.state.b // -> `moduleB` のステート
export default new Vuex.Store({
  modules: {
    a: moduleA,
    b: moduleB
  }
})
```
