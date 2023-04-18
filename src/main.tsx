import { render } from 'preact'
import { App } from './app'
import './index.css'
import "@fontsource/barlow"

render(<App />, document.getElementById('app') as HTMLElement)
