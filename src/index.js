import { h, app } from 'hyperapp'
import { Enter, Exit } from '@hyperapp/transitions'
import { div, blockquote, p } from '@hyperapp/html'
import quotes from './quotes'

const Quote = (props, message) => Enter(
  { time: 500, css: { opacity: 0, position: 'absolute', transform: 'scale(0.1, 0.1)' }},
  Exit({ time: 500, css: { opacity: 0, transform: 'scale(2, 2)', color: 'rgba(0, 0, 0, 0' } }, [
    blockquote(props, [
      p(message.quote),
      p(message.author)
    ])
  ])
)

const rng = num => Math.floor(Math.random() * num)

const state = {
  quote: [{ 
    quote: 'An inventor is simply a fellow who doesn\'t take his education too seriously.',
    author: 'Charles Kettering' 
  }],
  len: quotes.length,
}

const actions = {
  updateQuote: state => ({ currentKey: state.currentKey + 1, quote: [quotes[rng(state.len)]] }),
}

const view = (state, actions) => div({}, [
  state.quote.map(q => (Quote(
    { key: Date.now(), onclick: () => actions.updateQuote(state) }, q
  )))
])

app(state, actions, view, document.body)
