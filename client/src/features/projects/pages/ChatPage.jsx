import '../chat.css';

const SAMPLE_MESSAGES = [
  {
    id: 'm1',
    name: 'Amina',
    initials: 'AM',
    avatarClass: 'am',
    time: '9:12 AM',
    text: 'Hey team — I pushed the updated wireframes to the shared drive. Can everyone take a look before standup?',
  },
  {
    id: 'm2',
    name: 'Noah',
    initials: 'NO',
    avatarClass: 'no',
    time: '9:15 AM',
    text: 'On it. The navigation flow looks way cleaner now. Nice work, Amina.',
  },
  {
    id: 'm3',
    name: 'Lina',
    initials: 'LI',
    avatarClass: 'li',
    time: '9:18 AM',
    text: 'Agreed — one thing though, should we add a confirmation modal on the delete action? Feels risky without one.',
  },
  {
    id: 'm4',
    name: 'Kai',
    initials: 'KA',
    avatarClass: 'ka',
    time: '9:22 AM',
    text: 'Good call, Lina. I can stub that out this afternoon. Also, the API endpoint for file uploads is ready for integration whenever you need it.',
  },
  {
    id: 'm5',
    name: 'Maya',
    initials: 'MA',
    avatarClass: 'ma',
    time: '9:30 AM',
    text: 'Quick heads-up: the client moved the review meeting to Thursday. I updated the calendar — make sure your demos are ready by Wednesday EOD.',
  },
  {
    id: 'm6',
    name: 'Amina',
    initials: 'AM',
    avatarClass: 'am',
    time: '9:34 AM',
    text: 'Got it. I\'ll sync with Noah on the final layout pass today so we\'re locked in before the demo.',
  },
];

function ChatMessage({ message }) {
  return (
    <div className="chat-message">
      <div className={`chat-message__avatar chat-message__avatar--${message.avatarClass}`}>
        {message.initials}
      </div>
      <div className="chat-message__body">
        <div className="chat-message__topline">
          <p className="chat-message__name">{message.name}</p>
          <span className="chat-message__time">{message.time}</span>
        </div>
        <p className="chat-message__text">{message.text}</p>
      </div>
    </div>
  );
}

function ChatPage() {
  return (
    <main className="chat-page">
      <header className="chat-page__header">
        <div>
          <p className="chat-page__eyebrow">Projects</p>
          <h1>Team Chat</h1>
        </div>
        <p className="chat-page__summary">
          Quick conversations with your project team — all in one thread.
        </p>
      </header>

      <div className="chat-online">
        <span className="chat-online__dot" aria-hidden="true" />
        <span className="chat-online__label">5 members online</span>
      </div>

      <div className="chat-messages">
        <div className="chat-divider">
          <span className="chat-divider__label">Today</span>
        </div>

        {SAMPLE_MESSAGES.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
      </div>

      <div className="chat-composer">
        <input
          className="chat-composer__input"
          type="text"
          placeholder="Type a message…"
          readOnly
        />
        <button type="button" className="chat-composer__send">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M5 12h14" />
            <path d="M13 6l6 6-6 6" />
          </svg>
          Send
        </button>
      </div>
    </main>
  );
}

export default ChatPage;
