require('dotenv').config();
const { Telegraf } = require('telegraf');
const OpenAI = require('openai');

// OpenAI Configuration
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Telegram Bot Configuration
const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

// Marcus Aurelius Personality
const MARCUS_AURELIUS_PERSONALITY = `
Você é Marco Aurélio, imperador romano e filósofo estoico (121-180 d.C.). 
Responda sempre como se fosse ele, mantendo estas características:

PERSONALIDADE:
- Sábio, reflexivo e introspectivo
- Humilde apesar de ser imperador
- Focado na virtude, autodisciplina e aceitação
- Oferece conselhos práticos baseados na filosofia estoica
- Fala sobre o controle das emoções, aceitação do destino e foco no que podemos controlar

ESTILO DE COMUNICAÇÃO:
- Use linguagem respeitosa mas acessível
- Inclua reflexões filosóficas quando apropriado
- Cite exemplos da natureza e da vida cotidiana
- Mantenha respostas concisas mas profundas
- Use "tu" ou "você" conforme o contexto
- Ocasionalmente mencione conceitos como: virtude, dever, natureza, logos, memento mori

TEMAS CENTRAIS:
- Aceitação do que não podemos controlar
- Foco no momento presente
- Importância da virtude sobre prazeres materiais
- Autodisciplina e crescimento pessoal
- Morte como parte natural da vida
- Responsabilidade com a comunidade

Responda sempre em português brasileiro, como se Marco Aurélio estivesse conversando diretamente com a pessoa.
`;

// Function to get GPT response
async function getGPTResponse(userMessage, userName = '') {
  try {
    const messages = [
      {
        role: 'system',
        content: MARCUS_AURELIUS_PERSONALITY
      },
      {
        role: 'user',
        content: userMessage
      }
    ];

    const response = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || 'gpt-3.5-turbo',
      messages: messages,
      max_tokens: 500,
      temperature: 0.8,
    });

    return response.choices[0].message.content.trim();
  } catch (error) {
    console.error('Error communicating with OpenAI:', error);
    return 'Perdão, estou tendo dificuldades para refletir neste momento. Como diria em minhas "Meditações": a paciência é uma virtude fundamental.';
  }
}

// /start command
bot.start(async (ctx) => {
  const welcomeMessage = `
Salve! Sou Marco Aurélio, imperador de Roma e estudante da filosofia estoica.

Como escrevi em minhas "Meditações": "A cada amanhecer, diga a si mesmo: hoje encontrarei pessoas intrometidas, ingratas, arrogantes, desonestas, invejosas e antissociais."

Mas isso não deve nos desencorajar, pois nossa tarefa é viver com virtude independentemente das circunstâncias.

Em que posso ajudá-lo em sua jornada de reflexão? Fale comigo sobre suas inquietações, e buscaremos juntos a sabedoria estoica.
  `;
  
  await ctx.reply(welcomeMessage);
});

// /help command
bot.help(async (ctx) => {
  const helpMessage = `
🏛️ *Marco Aurélio - Bot Filosófico*

Sou um humilde servo da sabedoria estoica. Aqui estão algumas formas de interagir comigo:

• Simplesmente me envie suas dúvidas ou reflexões
• Pergunte sobre filosofia estoica, vida, virtudes
• Busque conselhos para situações difíceis
• Converse sobre autodisciplina e crescimento pessoal

*Comandos disponíveis:*
/start - Começar nossa conversa
/help - Ver esta mensagem
/quote - Receber uma reflexão estoica

"O melhor meio de se vingar de um inimigo é não se parecer com ele."
- Marco Aurélio
  `;
  
  await ctx.reply(helpMessage, { parse_mode: 'Markdown' });
});

// Command for inspirational quotes
bot.command('quote', async (ctx) => {
  const stoicQuotes = [
    "Você tem poder sobre sua mente - não sobre os eventos externos. Perceba isso, e encontrará força.",
    "A melhor vingança é não ser como seu inimigo.",
    "Quando você acorda de manhã, diga a si mesmo: as pessoas com quem vou lidar hoje serão intrometidas, ingratas, arrogantes, desonestas, invejosas e mal-humoradas.",
    "Muito pouco é necessário para fazer uma vida feliz; está tudo dentro de você, em sua forma de pensar.",
    "Se você procura tranquilidade, faça menos. Ou, mais precisamente, faça o que é essencial.",
    "A vida de um homem é o que seus pensamentos fazem dela.",
    "Aceite as coisas que não pode mudar, e você encontrará paz.",
    "O universo é mudança; nossa vida é o que nossos pensamentos fazem dela.",
    "Seja como o rochedo contra o qual as ondas se quebram continuamente; ele permanece firme.",
    "Lembre-se de que você é um ator em uma peça: curta, se o autor assim quiser; longa, se ele assim preferir."
  ];
  
  const randomQuote = stoicQuotes[Math.floor(Math.random() * stoicQuotes.length)];
  await ctx.reply(`💭 *Reflexão Estoica:*\n\n"${randomQuote}"\n\n- Marco Aurélio`, { parse_mode: 'Markdown' });
});

// Respond to all text messages
bot.on('text', async (ctx) => {
  const userMessage = ctx.message.text;
  const userName = ctx.from.first_name || '';
  
  // Show "typing" action
  await ctx.sendChatAction('typing');
  
  try {
    const response = await getGPTResponse(userMessage, userName);
    await ctx.reply(response);
  } catch (error) {
    console.error('Error processing message:', error);
    await ctx.reply('Perdão, encontro dificuldades para responder neste momento. Como ensina a filosofia estoica, devemos aceitar os obstáculos como parte do caminho.');
  }
});

// Error handling
bot.catch((err, ctx) => {
  console.error('Bot error:', err);
  return ctx.reply('Algo inesperado aconteceu. Como Marco Aurélio diria: "Que cada adversidade seja uma oportunidade de crescimento."');
});

// Start the bot
const startBot = async () => {
  try {
    console.log('🏛️ Marcus Aurelius Bot starting...');
    await bot.launch();
    console.log('✅ Bot is running!');
    console.log('💭 "Very little is needed to make a happy life; it is all within yourself, in your way of thinking." - Marcus Aurelius');
  } catch (error) {
    console.error('❌ Error starting bot:', error);
    process.exit(1);
  }
};

// Graceful stop
process.once('SIGINT', () => {
  console.log('\n🛑 Stopping bot...');
  bot.stop('SIGINT');
});

process.once('SIGTERM', () => {
  console.log('\n🛑 Stopping bot...');
  bot.stop('SIGTERM');
});

// Start the bot
startBot(); 