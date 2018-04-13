import { h, app } from 'hyperapp'
import { Enter, Exit } from '@hyperapp/transitions'
import { div, blockquote, span } from '@hyperapp/html'
import quotes from './quotes'

const Quote = (props, message) => Enter(
  { time: 500, css: { opacity: 0, position: 'absolute', transform: 'scale(0.1, 0.1)' }},
  Exit({ time: 500, css: { opacity: 0, transform: 'scale(2, 2)', color: 'rgba(0, 0, 0, 0' } }, [
    blockquote(props,
      span(message)
    )
  ])
)

const rng = num => Math.floor(Math.random() * num)

const state = {
  quote: ['Keep Calm and Be RESTful'],
  len: quotes.length,
}

const actions = {
  updateQuote: state => ({ quote: [quotes[rng(state.len)]] }),
}

const view = (state, actions) => div({}, [
  state.quote.map(q => (Quote(
    { key: q, onclick: () => actions.updateQuote(state) }, q
  )))
])

app(state, actions, view, document.body)
