import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { invoke } from '@tauri-apps/api/tauri'
import { emit, listen } from '@tauri-apps/api/event'
import { useEffect, useState } from 'react'
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher'
import { format } from 'path'

const isClient = typeof window !== 'undefined'

isClient


const Home: NextPage = () => {

	const [image, setImage] = useState(null);
	const [createObjectURL, setCreateObjectURL] = useState(String);

	const handleUploadClock = async (event: any) => {
		const file = event.target.files[0];
		const formData = new FormData();
		formData.append('file', file);
	
		try {
			setImage(file)
			//setCreateObjectURL(URL.createObjectURL(file))
			console.log(formData.values.toString.arguments);
		} catch (e) {
			console.error(e);
		}
	};

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
