import '../App.css'

const Home = () => {
  return (
    <div id="Home" className="w-screen h-screen">
        <header className="flex justify-between">
            <h1 className="text-5xl"><strong>Joji</strong> SMITHEREENS OUT NOW </h1>
            <div className="flex space-x-10 text-5xl">
                <a href="https://jojimusic.com/" target="_blank"><h1> Tour </h1></a>
                <a href="https://shop.jojimusic.com/" target="_blank"><h1> Shop </h1></a>
                <button type="button"> Invert </button>
            </div>
        </header>
        
    </div>
  )
}

export default Home