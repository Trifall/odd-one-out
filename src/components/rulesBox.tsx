import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';

const RulesBox = () => {
	return (
		<div className='relative z-[1005]  px-4'>
			<Accordion type='single' collapsible className='w-full'>
				<AccordionItem value='item-1'>
					<AccordionTrigger>
						<span className='ml-1 text-2xl'>Rules</span>
					</AccordionTrigger>
					<AccordionContent>
						<ul className='ml-5 list-disc text-xl '>
							<li>Board starts as a 5x5 grid with 1 random tile being the odd-one-out.</li>
							<li>You have until the time runs out to click on the tile with the unique symbol.</li>
							<li>
								Every round the starting time (10 seconds) decreases by 0.1 seconds, until it reaches 0.5 seconds.
							</li>
							<li>Every 5 rounds, the grid size increases by 1 (Max: 10x10)</li>
							<li>Game ends when the time runs out or an incorrect tile is selected. Score is rounds completed.</li>
						</ul>
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</div>
	);
};

export default RulesBox;
