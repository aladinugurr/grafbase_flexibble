import {GraphQLClient} from 'graphql-request'
import { createUserMutation, getUserQuery } from '@/graphql';
import { ProjectForm } from '@/common.types';

const isProduction = process.env.NODE_ENV === 'production';
const apiUrl = isProduction ? process.env.NEXT_PUBLIC_GRAFBASE_API_URL || '' : 'http://127.0.0.1:4000/graphql';
const apiKey = isProduction ? process.env.NEXT_PUBLIC_GRAFBASE_API_KEY || '' : 'justletmein';
const serverUrl = isProduction ? process.env.NEXT_PUBLIC_SERVER_URL : 'http://localhost:3000';

const client = new GraphQLClient(apiUrl);

const makeGrapghQLRequest = async(query: string, variables = {}) => {
	try {
		//client request
		return client.request(query, variables);
	} catch (error) {
		throw error;
	}
}

export const getUser = (email: string) => {
	client.setHeader('x-api-key',apiKey)
	return makeGrapghQLRequest(getUserQuery, {email})
}

export const createUser= (name:string, email:string, avatarUrl: string) => {
	client.setHeader('x-api-key',apiKey);
	const variables = {
		input: {
			name,email,avatarUrl
		}
	}
	return makeGrapghQLRequest(createUserMutation,variables);
}

export const uploadImage = async(imagePath: string) => {
	try {
		const response = await fetch(`${serverUrl}/api/upload`, {
		
		})
	} catch {
		
	}
}

export const createNewProject = async(form: ProjectForm, creatorId: string, token: string) => {
	const imageUrl = await uploadImage(form.image);
}
