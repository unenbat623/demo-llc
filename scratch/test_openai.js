const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');
const fetch = global.fetch || require('node-fetch');

async function testTranslation() {
  console.log('🌐 Testing OpenAI Connection...');
  
  // Load env manually
  const envPath = path.join(__dirname, '../backend/.env');
  const envContent = fs.readFileSync(envPath, 'utf8');
  const env = {};
  envContent.split('\n').forEach(line => {
    const [key, value] = line.split('=');
    if (key && value) env[key.trim()] = value.trim();
  });

  const apiKey = env.OPENAI_API_KEY;
  if (!apiKey) {
    console.error('❌ API KEY NOT FOUND IN .ENV');
    return;
  }

  console.log('📡 Sending request to OpenAI...');
  
  const systemPrompt = `You are a professional translator. Translate the following team member details from Mongolian to English. Return ONLY a JSON object with name, position fields.`;
  
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: JSON.stringify({
            name: 'Бат-Эрдэнэ',
            position: 'Ахлах инженер, Node.js мэргэжилтэн'
          }) }
        ],
        temperature: 0.1,
        response_format: { type: 'json_object' }
      })
    });

    if (response.ok) {
      const data = await response.json();
      const translation = JSON.parse(data.choices[0].message.content);
      console.log('✨ SUCCESS! Translation received:');
      console.log(JSON.stringify(translation, null, 2));
      console.log('✅ OpenAI is fully connected and working.');
    } else {
      const err = await response.json();
      console.error('❌ OpenAI API Error:', JSON.stringify(err, null, 2));
    }
  } catch (err) {
    console.error('❌ Connection Error:', err);
  }
}

testTranslation().catch(console.error);
