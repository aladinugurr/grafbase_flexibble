"use client"
import { getProviders, signIn } from 'next-auth/react';
import React, { useEffect, useState } from 'react'
import Button from './Button';

type Provider = {
	id: string;
	name: string;
	type: string;
	signinUrl: string;
	callbackUrl: string;
	signinUrlParams?: Record<string, string> | null;
}
type Providers = Record<string, Provider>;

const AuthProviders = () => {
	const [providers, setProviders] = useState<Providers | null>(null);
	console.log(providers);
	
	useEffect(()=> {
		const fetchProviders = async()=> {
			const res = await getProviders();

			setProviders(res);
			console.log(res);
			
	}
		fetchProviders();
	},[])

	console.log(providers);
	
  if (providers) {
	return (
		<div>
			{Object.values(providers).map((provider: Provider, i:number) => (
				<Button title='Sign in' key={i} handleClick={()=> signIn(provider?.id)} />
			))}
		</div>
	)
  }
}

export default AuthProviders
