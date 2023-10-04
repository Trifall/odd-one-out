import Footer from './components/footer';
import GameBox from './components/gameBox';
import Header from './components/header';

function App() {
	return (
		<>
			<main>
				<section className='bg-dark'>
					<Header />
					<div className='absolute left-0 top-0 h-full w-full'>
						<GameBox />
					</div>
				</section>
			</main>
			<Footer />
		</>
	);
}

export default App;
