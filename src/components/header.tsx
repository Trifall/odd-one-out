import RulesBox from './rulesBox';

const Header = () => {
	return (
		<>
			<div className='flex w-full items-center justify-center py-4'>
				<h1 className='text-4xl'>Odd One Out</h1>
			</div>
			<RulesBox />
		</>
	);
};

export default Header;
