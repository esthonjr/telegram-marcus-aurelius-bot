# 🏛️ Telegram Marcus Aurelius Bot

A Telegram chatbot that simulates the personality of Emperor and Stoic philosopher Marcus Aurelius (121-180 AD). The bot uses GPT to generate authentic responses based on Stoic philosophy and teachings from "Meditations" using pt-BR language.

## ✨ Features

- **Authentic Personality**: Responds as Marcus Aurelius, maintaining the philosophical and wise tone
- **Stoic Philosophy**: Offers advice based on Stoic principles
- **Natural Conversation**: Uses GPT for fluid and contextually appropriate conversations
- **Useful Commands**: Includes commands for quotes and help
- **Portuguese Brazilian**: All interactions in Portuguese (can be easily adapted to other languages)

## 🚀 Functionality

- `/start` - Starts conversation with a greeting from Marcus Aurelius
- `/help` - Shows information about how to use the bot
- `/quote` - Receive a random Stoic quote
- **Free Conversation** - Send any message and receive a philosophical response

## 📋 Prerequisites

- Node.js 16+ 
- A Telegram account
- Telegram bot token (via @BotFather)
- OpenAI API key

## ⚙️ Setup

### 1. Clone and install dependencies

```bash
cd telegram-marcus-aurelius-bot
npm install
```

### 2. Configure environment variables

Copy the `.env.example` file to `.env`:

```bash
cp .env.example .env
```

Edit the `.env` file with your credentials:

```env
TELEGRAM_BOT_TOKEN=your_bot_token_here
OPENAI_API_KEY=your_openai_key_here
OPENAI_MODEL=gpt-3.5-turbo
```

### 3. Get Telegram Token

1. Open Telegram and search for `@BotFather`
2. Send `/newbot` and follow the instructions
3. Copy the provided token to your `.env` file

### 4. Get OpenAI Key

1. Access [platform.openai.com](https://platform.openai.com)
2. Create an account or log in
3. Go to "API Keys" and create a new key
4. Copy the key to your `.env` file

## 🎯 Usage

### Development
```bash
npm run dev
```

### Production
```bash
npm start
```

## 💬 Conversation Examples

**User**: "Estou muito estressado com o trabalho"

**Marcus Aurelius**: "Entendo sua preocupação. Como escrevi em minhas Meditações: 'Você tem poder sobre a sua mente — não sobre os eventos externos. Perceba isso, e encontrará a força.' O estresse surge quando tentamos controlar o que está além do nosso alcance. Foque no que você pode controlar: suas ações, suas reações e sua atitude."

## 🏛️ About Marcus Aurelius

Marcus Aurelius (121-180 AD) was:
- Roman Emperor (161-180 AD)
- Last of the "Five Good Emperors"
- Renowned Stoic philosopher
- Author of "Meditations", one of the most influential works of Stoic philosophy

## 🎯 Implemented Stoic Philosophy

The bot incorporates fundamental principles of Stoicism:

- **Control vs. Acceptance**: Focus on what we can control
- **Virtue**: Prioritizing virtue over material pleasures
- **Present**: Attention to the current moment
- **Self-discipline**: Development of self-control
- **Memento Mori**: Acceptance of mortality
- **Cosmopolitanism**: Responsibility to the community

## 🛠️ Project Structure

```
├── index.js         # Main bot file
├── package.json     # Dependencies and scripts
├── .env.example     # Example environment variables
├── .env             # Your environment variables (do not commit)
├── .gitignore       # Git ignore file
└── README.md        # This file
```

## 🔒 Security

- Keep your API keys secure
- Never commit the `.env` file to repository
- Use environment variables in production
- Monitor OpenAI API usage

## 📝 License

MIT License - Feel free to use and modify.

## 🤝 Contributions

As Marcus Aurelius would say: "What brings no benefit to the hive can bring none to the bee." Contributions are welcome to improve this philosophical project.

---

*"Very little is needed to make a happy life; it is all within yourself, in your way of thinking."* - Marcus Aurelius 