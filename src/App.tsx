import { useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import format from 'format-duration';

function App() {
	const [vidURL, setVidURL] = useState<string>('');
	const [showInput, setShowInput] = useState<boolean>(true);
	const videoPlayer = useRef<ReactPlayer>(null);
	const [currentTime, setCurrentTime] = useState<number | string>();
	const [duration, setDuration] = useState<number | string>();

	useEffect(() => {
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
			// vidElement.focus();
		}, 500);

		document.addEventListener('keydown', (e) => {
			if (!videoPlayer.current) return;
			if (e.key === 'ArrowRight') {
				videoPlayer.current.seekTo(
					videoPlayer.current.getCurrentTime() + 2,
					'seconds'
				);
			}
			if (e.key === 'ArrowLeft') {
				videoPlayer.current.seekTo(
					videoPlayer.current.getCurrentTime() - 2,
					'seconds'
				);
			}
			// console.log(e);
			if (e.key === ' ') {
				let vidElement: HTMLVideoElement | null =
					document.querySelector('video');
				if (!vidElement) return;
				if (vidElement.paused) {
					vidElement.play();
				} else {
					vidElement.pause();
				}
			}
		});

		return () => {
			clearTimeout(timer);
		};
	}, []);

	useEffect(() => {
		console.log(videoPlayer.current);
	}, [vidURL]);

	setInterval(() => {
		if (!videoPlayer.current) return;
		const current = format(
			Math.round(videoPlayer.current.getCurrentTime()) * 1000
		);
		const duration = format(
			Math.round(videoPlayer.current.getDuration()) * 1000
		);
		setCurrentTime(current);
		setDuration(duration);
	}, 500);

	return (
		<div className="w-screen min-h-screen bg-zinc-900 m-0 p-2 flex flex-col items-center justify-center gap-8">
			<div className="fixed right-4 top-4 bg-white px-2 py-1 rounded-lg">
				{currentTime} / {duration}
			</div>
			<ReactPlayer
				ref={videoPlayer}
				url={vidURL}
				controls
				playing
				loop={false}
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
