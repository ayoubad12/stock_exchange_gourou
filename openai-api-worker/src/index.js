import OpenAI from "openai";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type'
};

export default {
	async fetch(request, env, ctx) {
		// Handle CORS preflight requests
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }
		// Only process POST requests
    if (request.method !== 'POST') {
      return new Response(JSON.stringify({ error: `${request.method} method not allowed.`}))
    }

		const openai = new OpenAI({ //instantiate the openai api client here
				apiKey: env.OPENAI_API_KEY
		})

		try{
			// const messages = JSON.parse(request.body)
			const messages = await request.json() ;

			const chatCompletion = await openai.chat.completions.create({
				model: 'gpt-4o-mini',
				messages ,
				temperature: 1.1,
				presence_penalty: 0,
				frequency_penalty: 0,
				// max_tokens : 10 //Added this for testing purposes (remove this later)
			})		
			const response = chatCompletion.choices[0].message ;
			return new Response(JSON.stringify(response), {headers: corsHeaders})

		}catch(e){	
			return new Response(JSON.stringify({error: e.message}), {status: 500, headers: corsHeaders}) 
		}
	},
};