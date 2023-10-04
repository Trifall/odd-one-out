import { GitHubLogoIcon, PersonIcon } from '@radix-ui/react-icons';
import * as Tooltip from '@radix-ui/react-tooltip';
import { Button } from './ui/button';

const Footer = () => {
	return (
		<footer className='absolute bottom-2 flex w-full flex-row justify-center text-center text-gray-300'>
			<>
				<span>
					© {new Date().getFullYear()} <a href='https://trifall.com'>Jerren Trifan</a> |
				</span>
			</>
			<div className='self-cente1 flex items-center gap-2 pl-1'>
				<Tooltip.Provider>
					<Tooltip.Root delayDuration={100}>
						<Tooltip.Trigger asChild>
							<Button
								variant={'outline'}
								size={'icon'}
								className='m-0 flex max-h-[20px] min-h-[20px] min-w-[20px] max-w-[20px]  hover:bg-red-600'
								onClick={() => window.open('https://github.com/Trifall', '_blank')}
							>
								<GitHubLogoIcon className='self-center' />
							</Button>
						</Tooltip.Trigger>
						<Tooltip.Content sideOffset={5} side={'top'} className='text-center'>
							<span className='text-center'>GitHub Profile</span>
						</Tooltip.Content>
					</Tooltip.Root>
				</Tooltip.Provider>
				<Tooltip.Provider>
					<Tooltip.Root delayDuration={100}>
						<Tooltip.Trigger asChild>
							<Button
								variant={'outline'}
								size={'icon'}
								className='m-0 flex max-h-[20px] min-h-[20px] min-w-[20px] max-w-[20px]  hover:bg-red-600'
								onClick={() => window.open('https://trifall.com', '_blank')}
							>
								<PersonIcon className='self-center' />
							</Button>
						</Tooltip.Trigger>
						<Tooltip.Content sideOffset={5} side={'top'} className='text-center'>
							<span className='text-center'>Personal Website</span>
						</Tooltip.Content>
					</Tooltip.Root>
				</Tooltip.Provider>
			</div>
		</footer>
	);
};

export default Footer;
