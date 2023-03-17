import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { invoke } from '@tauri-apps/api/tauri'
import { emit, listen } from '@tauri-apps/api/event'
import { useEffect } from 'react'
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher'
import { format } from 'path'

const isClient = typeof window !== 'undefined'

isClient

const handleUploadClock = async (event: Params) => {
	const file = event.target.files;
	const formData = new FormData();
	formData.append('file', file);

	try {
		console.log(file);
	} catch (e) {
		console.error(e);
	}
};

const Home: NextPage = () => {
	useEffect(() => {
		invoke('data_command', { number: 42 })
			.then((res) => console.log({ res }))
			.catch((e) => console.error(e))
	}, []);

	return (
		<div className=' p-20'>
			<label htmlFor='upload-button' className=' border rounded-md p-10 cursor-pointer '>
				<input
					id="upload-button"
					type="file"
					onChange={handleUploadClock}
					hidden
				/>
				Chose file
			</label>
		</div>
	)
}

export default Home
