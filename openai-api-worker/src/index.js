import OpenAI from "openai";

//to set a rate limit for requests to each connecting ip
async function rateLimit(request, env) {
  try {
    //construct the key to use for search
    const clientIP = request.headers.get('CF-Connecting-IP'); //get the client ip
    const today = new Date().toISOString().split('T')[0]; //get today's date. exp: '2025-02-08'
    const key = `rate-limit:${clientIP}:${today}`; 
		// await await env.kv_gourou_exchange.put("Testk", "testv" , { expirationTtl: 86400}); //for debugging  
    
    const cachedValue = await env.kv_gourou_exchange.get(key);
		console.log("cachedValue:"+ cachedValue);  
    let count = 0
    if(cachedValue!=null){ 
			count = parseInt(cachedValue, 10) + 1;
      if(count > 4){
        return false ;
      }
    }else{
      count = count + 1
    }
    
    await env.kv_gourou_exchange.put(key, count, { expirationTtl: 86400 });
    return true
  
  } catch (err) {
    console.error(`rate limit check returned an error: ${err}`);
		throw err;
  }
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type'
};

export default {
	async fetch(request, env, ctx) {
		// Add rate limit headers
		const baseHeaders = {
			...corsHeaders,
			'X-RateLimit-Limit': '4'
		};

		// Handle CORS preflight requests
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }
		// Only process POST requests
    if (request.method !== 'POST') {
      return new Response(JSON.stringify({ error: `${request.method} method not allowed.`}), { headers: corsHeaders })
    }

		// Check rate limit
    const allowed = await rateLimit(request, env);
    if (!allowed) {
      return new Response(
        // JSON.stringify({ error: 'Rate limit exceeded' }), 
        JSON.stringify({ error: 'Baraka elik assat(a) 😂' }), 
        { 
          status: 429, 
          headers: {
            ...baseHeaders,
            'Retry-After': '86400'
          }
        }
      );
    }
		const openai = new OpenAI({ //instantiate the openai api client here
				apiKey: env.OPENAI_API_KEY
		})
		try{
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