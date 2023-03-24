import { useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import format from 'format-duration';

function App() {
	const searchParams = new URLSearchParams(window.location.search);
	const url = searchParams.get('url');

	const [vidURL, setVidURL] = useState<string>(url || '');
	const videoPlayer = useRef<ReactPlayer>(null);
	const [currentTime, setCurrentTime] = useState<number | string>();
	const [duration, setDuration] = useState<number | string>();

	useEffect(() => {
		const { search } = window.location;
		const urlQuery = search.split('url=')[1];
		if (urlQuery) {
			setVidURL(urlQuery);
		}

		const timer = setTimeout(() => {
			let vidElement: HTMLVideoElement | null = document.querySelector('video');
			if (!vidElement) return;
			vidElement.play();
			// vidElement.focus();
		}, 500);

		document.addEventListener('keydown', (e) => {
			if (!videoPlayer.current) return;
			if (e.key === 'ArrowRight' || e.key === 'd') {
				videoPlayer.current.seekTo(
					videoPlayer.current.getCurrentTime() + 2.5,
					'seconds'
				);
			}
			if (e.key === 'ArrowLeft' || e.key === 'a') {
				videoPlayer.current.seekTo(
					videoPlayer.current.getCurrentTime() - 2.5,
					'seconds'
				);
			}
			if (e.key === 'e') {
				videoPlayer.current.seekTo(
					videoPlayer.current.getCurrentTime() + 1,
					'seconds'
				);
			}
			if (e.key === 'q') {
				videoPlayer.current.seekTo(
					videoPlayer.current.getCurrentTime() - 1,
					'seconds'
				);
			}
			if (e.key === 'c') {
				videoPlayer.current.seekTo(
					videoPlayer.current.getCurrentTime() + 5,
					'seconds'
				);
			}
			if (e.key === 'z') {
				videoPlayer.current.seekTo(
					videoPlayer.current.getCurrentTime() - 5,
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

			if (e.key === 's') {
				let vidElement: HTMLVideoElement | null =
					document.querySelector('video');
				if (!vidElement) return;
				if (vidElement.volume > 0) {
					vidElement.volume -= 0.05;
				}
			}
			if (e.key === 'w') {
				let vidElement: HTMLVideoElement | null =
					document.querySelector('video');
				if (!vidElement) return;
				if (vidElement.volume < 1) {
					vidElement.volume += 0.05;
				}
			}
			if (e.key === 'f') {
				let vidElement: HTMLVideoElement | null =
					document.querySelector('video');
				if (!vidElement) return;
				if (vidElement.requestFullscreen) {
					vidElement.requestFullscreen();
					// @ts-expect-error
				} else if (vidElement.mozRequestFullScreen) {
					/* Firefox */
					// @ts-expect-error
					vidElement.mozRequestFullScreen();
					// @ts-expect-error
				} else if (vidElement.webkitRequestFullscreen) {
					/* Chrome, Safari & Opera */
					// @ts-expect-error
					vidElement.webkitRequestFullscreen();
					// @ts-expect-error
				} else if (vidElement.msRequestFullscreen) {
					/* IE/Edge */
					// @ts-expect-error
					vidElement.msRequestFullscreen();
				}
			}
		});

		return () => {
			clearTimeout(timer);
		};
	}, []);

	// useEffect(() => {
	// 	console.log(videoPlayer.current);
	// }, [vidURL]);

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
		<div className="w-screen h-screen bg-zinc-900 m-0 p-0 flex flex-col items-center justify-center gap-8">
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
				onError={(err) => {
					console.log(err);
				}}
				volume={0.5}
			/>
		</div>
	);
}

export default App;
