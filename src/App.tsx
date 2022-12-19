import { useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';

function App() {
	const [vidURL, setVidURL] = useState<string>('');
	const [showInput, setShowInput] = useState<boolean>(true);
	const videoPlayer = useRef<ReactPlayer>(null);

	useEffect(() => {
		const { search } = window.location;
		const urlQuery = search.split('url=')[1];
		if (urlQuery) {
			setVidURL(urlQuery);
			setShowInput(false);
		}
	}, []);

	useEffect(() => {
		console.log(videoPlayer.current);
	}, [vidURL]);

	return (
		<div className="w-screen min-h-screen bg-zinc-900 m-0 p-2 flex flex-col items-center justify-center gap-8">
			<ReactPlayer
				url={vidURL}
				controls
				pip
				playing
				config={{ file: { forceVideo: true } }}
				height={640}
				width={920}
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
