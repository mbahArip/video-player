import { createRef, useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';

function App() {
	const [vidURL, setVidURL] = useState<string>('');
	const videoPlayer = useRef<ReactPlayer>(null);

	useEffect(() => {
		console.log(videoPlayer.current);
	}, [vidURL]);

	return (
		<div className="w-screen min-h-screen bg-zinc-900 m-0 p-2 flex flex-col items-center justify-center gap-8">
			<ReactPlayer
				url={vidURL}
				light
				controls
				pip
				playing
				config={{ file: { forceVideo: true } }}
			/>
			<input
				value={vidURL}
				placeholder="Video URL"
				className="w-96 rounded p-2"
				onChange={(e) => {
					setVidURL(e.currentTarget.value);
				}}
			/>
		</div>
	);
}

export default App;
