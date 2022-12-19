import { useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';

function App() {
	const [vidURL, setVidURL] = useState<string>('');
	const [showInput, setShowInput] = useState<boolean>(true);
	const videoPlayer = useRef<ReactPlayer>(null);

	useEffect(() => {
		document.addEventListener('mousedown', (e) => {
			console.log(e);
		});
		const { search } = window.location;
		const urlQuery = search.split('url=')[1];
		if (urlQuery) {
			setVidURL(urlQuery);
			setShowInput(false);
		}

		const timer = setTimeout(() => {
			let vidElement: HTMLVideoElement | null = document.querySelector('video');
			if (!vidElement) return;
			vidElement.play();
			if (vidElement.requestFullscreen) {
				vidElement.requestFullscreen();
				//@ts-ignore
			} else if (vidElement.mozRequestFullScreen) {
				//@ts-ignore
				vidElement.mozRequestFullScreen();
				//@ts-ignore
			} else if (vidElement.webkitRequestFullscreen) {
				//@ts-ignore
				vidElement.webkitRequestFullscreen();
			}
			vidElement.focus();
		}, 500);

		return () => {
			clearTimeout(timer);
		};
	}, []);

	useEffect(() => {
		console.log(videoPlayer.current);
	}, [vidURL]);

	return (
		<div className="w-screen min-h-screen bg-zinc-900 m-0 p-2 flex flex-col items-center justify-center gap-8">
			<ReactPlayer
				url={vidURL}
				controls
				playing
				config={{ file: { forceVideo: true } }}
				height={'100vh'}
				width={'100vw'}
			/>
			{showInput && (
				<input
					value={vidURL}
					placeholder="Video URL"
					className="w-96 rounded p-2"
					onChange={(e) => {
						setVidURL(e.currentTarget.value);
					}}
				/>
			)}
		</div>
	);
}

export default App;
