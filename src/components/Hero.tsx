import Socials from './Socials'
import helloWordArr from '~/lib/hello'

export default () => {
  const helloWord = helloWordArr[Math.floor((Math.random() * helloWordArr.length))]
  
  return (
    <header mt-18 class="outfit">
      <h1>
        <span class="block">{helloWord}, </span>
        <span class="block mt-2">I'm Diu.</span>
      </h1>
      <div mt-6>
        <div>
          <span>Front-end & iOS developer / Amateur designer.</span>
        </div>
        <div mt-2>
          <span>Currently working at DiDi.</span>
        </div>
        <div mt-2>
          <span>I Like making interesting projects.</span>
        </div>
      </div>
      <Socials />
    </header>
  )
}