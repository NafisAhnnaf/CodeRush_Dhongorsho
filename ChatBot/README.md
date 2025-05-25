# React Chat Bubble Component

A floating chat bubble component that can be easily integrated into any React website. The chat bubble appears in the bottom-right corner of your website and expands into a full chat interface when clicked.

## Features

- 💬 Floating chat bubble with smooth animations
- 🎨 Modern and clean UI design
- 📱 Responsive layout
- ⌨️ Support for markdown formatting in messages
- 🔄 Real-time chat interface with loading states
- 🎯 Easy to integrate into any React project

## Installation

1. Make sure you have the required dependencies:

```bash
npm install axios react-markdown
```

2. Copy the `ChatBot` folder into your React project.

## Usage

Import and use the ChatBubble component in your React application:

```jsx
import ChatBubble from './ChatBot/ChatBubble';

function App() {
  return (
    <div>
      {/* Your existing website content */}
      <ChatBubble />
    </div>
  );
}
```

## Environment Variables

Create a `.env` file in your project root and add your Google Gemini API key:

```
VITE_API_GENERATIVE_LANGUAGE_CLIENT=your_api_key_here
```

## Customization

You can customize the appearance of the chat bubble by modifying the `ChatBot.css` file. The component uses Tailwind CSS classes for styling, but you can override them with your own styles.

## Dependencies

- React 16.8+
- axios
- react-markdown
- Google Gemini API key

## License

MIT 